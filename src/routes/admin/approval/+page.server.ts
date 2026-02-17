
import { db } from '$lib/server/db';
import { family, person as personTable } from '$lib/server/db/schema';
import { eq, or, ilike } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q');
	
	let families;
	
	if (query) {
		const matchingPersons = await db.select({ familyId: personTable.familyId })
			.from(personTable)
			.where(or(
					ilike(personTable.nicNumber, `%${query}%`),
					ilike(personTable.telephoneNumber, `%${query}%`)
				));
			
		const familyIds = matchingPersons.map(p => p.familyId);
		
		if (familyIds.length > 0) {
			families = await db.query.family.findMany({
				where: (family, { inArray, or: orCondition, and: andCondition }) => 
				andCondition(
					eq(family.status, 'Pending'),
					orCondition(
						inArray(family.id, familyIds),
						ilike(family.whatsappNumber, `%${query}%`)
					)
				),
				with: {
					persons: true 
				}
			});
		} else {
			families = await db.query.family.findMany({
				where: (family, { and }) => and(
					eq(family.status, 'Pending'),
					ilike(family.whatsappNumber, `%${query}%`)
				),
				with: {
					persons: true
				}
			});
		}
	} else {
		families = await db.query.family.findMany({
			where: eq(family.status, 'Pending'),
			with: {
				persons: true
			},
			orderBy: (family, { desc }) => [desc(family.createdAt)]
		});
	}

	return {
		families,
		query
	};
};

export const actions: Actions = {
	approve: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		
		if (!id) return fail(400, { message: 'ID is required' });
		
		await db.update(family)
			.set({ status: 'Approved' })
			.where(eq(family.id, Number(id)));

		await db.update(personTable)
			.set({ status: 'Approved' })
			.where(eq(personTable.familyId, Number(id)));
			
		return { success: true };
	},
	reject: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		
		if (!id) return fail(400, { message: 'ID is required' });
		
		await db.update(family)
			.set({ status: 'Rejected' })
			.where(eq(family.id, Number(id)));

		await db.update(personTable)
			.set({ status: 'Rejected' })
			.where(eq(personTable.familyId, Number(id)));
			
		return { success: true };
	}
};
