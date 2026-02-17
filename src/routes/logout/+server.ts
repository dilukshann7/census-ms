import { redirect } from "@sveltejs/kit";
import { auth } from "$lib/auth";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	try {
		await auth.api.signOut({
			headers: request.headers,
		});
	} finally {
		throw redirect(303, "/login");
	}
};

export const GET: RequestHandler = POST;
