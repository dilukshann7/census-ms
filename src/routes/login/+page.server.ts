import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/auth";
import {
	defaultAdminRedirect,
	hasAdminAllowList,
	isAdminEmail,
	resolveAdminRedirect,
} from "$lib/server/admin-auth";
import { db } from "$lib/server/db";
import type { Actions, PageServerLoad } from "./$types";

const INVALID_CREDENTIALS_MESSAGE = "Invalid username or password.";

const getUserEmailFromIdentifier = async (identifier: string) => {
	if (identifier.includes("@")) {
		return identifier;
	}

	const matchedUser = await db.query.user.findFirst({
		columns: {
			email: true,
		},
		where: (user, { ilike }) => ilike(user.name, identifier),
	});

	return matchedUser?.email ?? null;
};

export const load: PageServerLoad = async ({ request, url }: { request: Request, url: URL }) => {
	const redirectTo = resolveAdminRedirect(url.searchParams.get("redirectTo"));
	const allowListIsConfigured = hasAdminAllowList();
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (session?.user && isAdminEmail(session.user.email)) {
		throw redirect(303, redirectTo);
	}

	if (session?.user && !isAdminEmail(session.user.email)) {
		await auth.api.signOut({
			headers: request.headers,
		});
	}

	return {
		redirectTo,
		hasAdminAllowList: allowListIsConfigured,
	};
};

export const actions: Actions = {
	default: async ({ request }: { request: Request }) => {
		const data = await request.formData();
		const username = String(data.get("username") ?? "").trim();
		const password = String(data.get("password") ?? "");
		const redirectTo = resolveAdminRedirect(
			String(data.get("redirectTo") ?? defaultAdminRedirect),
		);
		const allowListIsConfigured = hasAdminAllowList();

		if (!allowListIsConfigured) {
			return fail(403, {
				message:
					"Admin login is disabled. Set ADMIN_EMAIL or ADMIN_EMAILS in .env.",
				values: {
					username,
				},
				redirectTo,
			});
		}

		if (!username || !password) {
			return fail(400, {
				message: "Username and password are required.",
				values: {
					username,
				},
				redirectTo,
			});
		}

		const email = await getUserEmailFromIdentifier(username);

		if (!email) {
			return fail(400, {
				message: INVALID_CREDENTIALS_MESSAGE,
				values: {
					username,
				},
				redirectTo,
			});
		}

		try {
			const signInResult = await auth.api.signInEmail({
				headers: request.headers,
				body: {
					email,
					password,
					rememberMe: true,
				},
			});

			if (!signInResult?.user || !isAdminEmail(signInResult.user.email)) {
				await auth.api.signOut({
					headers: request.headers,
				});

				return fail(403, {
					message: "This account is not allowed to access admin pages.",
					values: {
						username,
					},
					redirectTo,
				});
			}
		} catch {
			return fail(400, {
				message: INVALID_CREDENTIALS_MESSAGE,
				values: {
					username,
				},
				redirectTo,
			});
		}

		throw redirect(303, redirectTo);
	},
};
