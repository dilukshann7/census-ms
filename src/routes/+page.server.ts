import type { Actions, PageServerLoad } from "./$types";
import { superValidate, fail, message } from "sveltekit-superforms";
import { zod4 as zod } from "sveltekit-superforms/adapters";
import { familySchema, type FamilyFormData, type PersonFormData } from "$lib/schema";
import { db } from "$lib/server/db";
import { family, person } from "$lib/server/db/schema";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(familySchema)),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(familySchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { persons, landSizeValue, landSizeUnit, ...familyData } = form.data as FamilyFormData;

			const [insertedFamily] = await db
				.insert(family)
				.values({
					...familyData,
					landSize: `${landSizeValue} ${landSizeUnit}`,
					status: "Pending",
				})
				.returning({ id: family.id });

			if (persons.length > 0) {
				await db.insert(person).values(
					persons.map((p: PersonFormData) => {
						const { _id, ...personData } = p;
						return {
							...personData,
							dateOfBirth: new Date(p.dateOfBirth),
							familyId: insertedFamily.id,
							status: "Pending",
						};
					})
				);
			}

			return message(form, "Family census data submitted successfully!");
		} catch (error) {
			console.error("Error submitting census data:", error);
			return message(form, "Failed to submit data. Please try again.", { status: 500 });
		}
	},
};
