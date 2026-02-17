import { json } from "@sveltejs/kit";
import { z } from "zod";
import { auth } from "$lib/auth";
import { hasAdminAllowList, isAdminEmail } from "$lib/server/admin-auth";
import type { RequestHandler } from "@sveltejs/kit";

const signupSchema = z.object({
	name: z.string().trim().min(1).max(100),
	email: z.email().transform((value) => value.trim().toLowerCase()),
	password: z.string().min(8).max(128),
});

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	if (!hasAdminAllowList()) {
		return json(
			{
				error:
					"Admin signup is disabled. Set ADMIN_EMAIL or ADMIN_EMAILS in .env.",
			},
			{ status: 403 },
		);
	}

	const parsedPayload = signupSchema.safeParse(await request.json().catch(() => null));

	if (!parsedPayload.success) {
		return json(
			{
				error: "Invalid signup payload.",
				issues: parsedPayload.error.flatten(),
			},
			{ status: 400 },
		);
	}

	if (!isAdminEmail(parsedPayload.data.email)) {
		return json(
			{
				error: "This email is not allowed to create an admin account.",
			},
			{ status: 403 },
		);
	}

	try {
		const result = await auth.api.signUpEmail({
			headers: request.headers,
			body: {
				name: parsedPayload.data.name,
				email: parsedPayload.data.email,
				password: parsedPayload.data.password,
			},
		});

		return json(
			{
				success: true,
				user: {
					id: result.user.id,
					name: result.user.name,
					email: result.user.email,
				},
			},
			{ status: 201 },
		);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to create account.";

		return json(
			{
				error: message,
			},
			{ status: 400 },
		);
	}
};
