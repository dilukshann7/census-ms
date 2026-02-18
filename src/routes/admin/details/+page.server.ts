
import { db } from '$lib/server/db';
import { family, person as personTable } from '$lib/server/db/schema';
import { eq, or, ilike, and } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

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
					eq(family.status, 'Approved'),
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
				where: (family, { and, ilike }) => and(
					eq(family.status, 'Approved'),
					ilike(family.whatsappNumber, `%${query}%`)
				),
				with: {
					persons: true
				}
			});
		}
	} else {
		families = await db.query.family.findMany({
			where: eq(family.status, 'Approved'),
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
