
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 as zod } from 'sveltekit-superforms/adapters';
import { familySchema, type FamilyFormData } from '$lib/schema';
import { db } from '$lib/server/db';
import { family, person } from '$lib/server/db/schema';
import { eq, inArray } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const familyData = await db.query.family.findFirst({
		where: eq(family.id, Number(params.id)),
		with: {
			persons: true
		}
	});

	if (!familyData) {
		throw error(404, 'Family not found');
	}

	// Transform data to match schema
	const landSizeParts = familyData.landSize.split(' ');
	const landSizeValue = parseFloat(landSizeParts[0]);
	const landSizeUnit = landSizeParts.slice(1).join(' ') || 'Perch';

	const formData: FamilyFormData = {
		...familyData,
		landSizeValue,
		landSizeUnit,
		persons: (familyData.persons as any).map((p: any) => ({
			...p,
			_id: p.id,
			dateOfBirth: p.dateOfBirth.toISOString().split('T')[0], // YYYY-MM-DD
		}))
	};

	const form = await superValidate(formData, zod(familySchema));

	return {
		form,
		family: familyData
	};
};

export const actions: Actions = {
	save: async ({ request, params }) => {
		const form = await superValidate(request, zod(familySchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { persons, landSizeValue, landSizeUnit, ...familyData } = form.data;
			const familyId = Number(params.id);

			// Update family
			await db.update(family)
				.set({
					...familyData,
					landSize: `${landSizeValue} ${landSizeUnit}`,
				})
				.where(eq(family.id, familyId));

			// Handle persons
			const existingPersons = await db.query.person.findMany({
				where: eq(person.familyId, familyId),
				columns: { id: true }
			});
			const existingIds = existingPersons.map(p => p.id);
			
			const submittedIds = persons.map(p => p._id).filter((id): id is number => id !== undefined);
			const toDelete = existingIds.filter(id => !submittedIds.includes(id));
			
			if (toDelete.length > 0) {
				await db.delete(person).where(inArray(person.id, toDelete));
			}

			// Upsert persons
			for (const p of persons) {
				const { _id, ...personData } = p;
				const dob = new Date(p.dateOfBirth);

				if (_id) {
					// Update
					await db.update(person)
						.set({
							...personData,
							dateOfBirth: dob,
						})
						.where(eq(person.id, _id));
				} else {
					// Insert
					await db.insert(person).values({
						...personData,
						dateOfBirth: dob,
						familyId: familyId,
						status: 'Approved' // New persons in approved family are approved by default
					});
				}
			}

			return message(form, "Family details updated successfully!");
		} catch (err) {
			console.error("Error updating family:", err);
			return message(form, "Failed to update data.", { status: 500 });
		}
	},

	delete: async ({ params }) => {
		const id = Number(params.id);
		
		try {
            // Delete dependent persons first (if cascade not set, but schema has onDelete: cascade, so let's try delete family)
            await db.delete(person).where(eq(person.familyId, id));
			await db.delete(family).where(eq(family.id, id));
		} catch (error) {
			console.error("Error deleting family:", error);
			return fail(500, { message: "Failed to delete family" });
		}

		throw redirect(303, '/admin/details');
	}
};
