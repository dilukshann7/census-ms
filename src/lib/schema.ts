import { z } from "zod/v4";

export const personSchema = z.object({
	_id: z.number().optional(),
	name: z.string().min(1, "Name is required"),
	nicNumber: z.string().min(1, "NIC number is required"),
	relationship: z.string().min(1, "Relationship is required"),
	gender: z.string().min(1, "Gender is required"),
	dateOfBirth: z.string().min(1, "Date of birth is required"),
	educationLevel: z.string().min(1, "Education level is required"),
	occupation: z.string().min(1, "Occupation is required"),
	telephoneNumber: z.string().min(1, "Telephone number is required"),
});

export const familySchema = z.object({
	gsDivision: z.string().min(1, "GS Division is required"),
	village: z.string().min(1, "Village is required"),
	address: z.string().min(1, "Address is required"),
	samurdhiPayment: z.number().int().min(0, "Must be a non-negative number").max(2147483647, "Value too large"),
	eldersPayment: z.number().int().min(0, "Must be a non-negative number").max(2147483647, "Value too large"),
	diseasePayment: z.number().int().min(0, "Must be a non-negative number").max(2147483647, "Value too large"),
	monthlyPayment: z.number().int().min(0, "Must be a non-negative number").max(2147483647, "Value too large"),
	whatsappNumber: z.string().min(1, "WhatsApp number is required"),
	houseLength: z.number().int().min(1, "House length is required").max(2147483647, "Value too large"),
	houseWidth: z.number().int().min(1, "House width is required").max(2147483647, "Value too large"),
	landLength: z.number().int().min(1, "Land length is required").max(2147483647, "Value too large"),
	landWidth: z.number().int().min(1, "Land width is required").max(2147483647, "Value too large"),
	landSizeValue: z.number().min(0, "Land size is required"),
	landSizeUnit: z.string().min(1, "Land size unit is required"),
	specialNeedsMemberDetails: z.string().default(""),
	persons: z.array(personSchema).min(1, "At least one family member is required"),
});

export type FamilyFormData = z.infer<typeof familySchema>;
export type PersonFormData = z.infer<typeof personSchema>;
