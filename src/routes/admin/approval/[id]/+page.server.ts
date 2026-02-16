
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 as zod } from 'sveltekit-superforms/adapters';
import { familySchema, type FamilyFormData, type PersonFormData } from '$lib/schema';
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
			// 1. Get existing IDs
			const existingPersons = await db.query.person.findMany({
				where: eq(person.familyId, familyId),
				columns: { id: true }
			});
			const existingIds = existingPersons.map(p => p.id);
			
			// 2. Identify entries to update, insert, delete
			const submittedIds = persons.map(p => p._id).filter((id): id is number => id !== undefined);
			const toDelete = existingIds.filter(id => !submittedIds.includes(id));
			
			// Delete removed persons
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
						status: 'Pending' // Inherit or default
					});
				}
			}

			return message(form, "Family data updated successfully!");
		} catch (err) {
			console.error("Error updating family:", err);
			return message(form, "Failed to update data.", { status: 500 });
		}
	},

	approve: async ({ params }) => {
		const id = Number(params.id);
		await db.update(family).set({ status: 'Approved' }).where(eq(family.id, id));
		// Also approve all persons?
		await db.update(person).set({ status: 'Approved' }).where(eq(person.familyId, id));
		throw redirect(303, '/admin/approval');
	},

	reject: async ({ params }) => {
		const id = Number(params.id);
		await db.update(family).set({ status: 'Rejected' }).where(eq(family.id, id));
		await db.update(person).set({ status: 'Rejected' }).where(eq(person.familyId, id));
		throw redirect(303, '/admin/approval');
	}
};
