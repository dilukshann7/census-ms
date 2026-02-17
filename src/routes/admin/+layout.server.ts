import { redirect } from "@sveltejs/kit";
import { auth } from "$lib/auth";
import { isAdminEmail, resolveAdminRedirect } from "$lib/server/admin-auth";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ request, url }) => {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (!session?.user) {
		const redirectTo = resolveAdminRedirect(`${url.pathname}${url.search}`);
		throw redirect(303, `/login?redirectTo=${encodeURIComponent(redirectTo)}`);
	}

	if (!isAdminEmail(session.user.email)) {
		await auth.api.signOut({
			headers: request.headers,
		});

		throw redirect(303, "/login?error=unauthorized");
	}

	return {
		authUser: {
			name: session.user.name,
			email: session.user.email,
		},
	};
};
