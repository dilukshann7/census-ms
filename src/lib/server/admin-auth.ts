import { env } from "$env/dynamic/private";

const DEFAULT_ADMIN_REDIRECT = "/admin/approval";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const getAdminEmails = () => {
	const configuredEmails = [
		env.ADMIN_EMAIL,
		...(env.ADMIN_EMAILS?.split(",") ?? []),
	]
		.map((email) => email?.trim() ?? "")
		.filter(Boolean)
		.map(normalizeEmail);

	return new Set(configuredEmails);
};

export const hasAdminAllowList = () => getAdminEmails().size > 0;

export const isAdminEmail = (email: string) => {
	const adminEmails = getAdminEmails();

	if (adminEmails.size === 0) {
		return false;
	}

	return adminEmails.has(normalizeEmail(email));
};

export const resolveAdminRedirect = (redirectTo: string | null | undefined) => {
	if (!redirectTo) {
		return DEFAULT_ADMIN_REDIRECT;
	}

	if (!redirectTo.startsWith("/") || redirectTo.startsWith("//")) {
		return DEFAULT_ADMIN_REDIRECT;
	}

	if (!redirectTo.startsWith("/admin")) {
		return DEFAULT_ADMIN_REDIRECT;
	}

	return redirectTo;
};

export const defaultAdminRedirect = DEFAULT_ADMIN_REDIRECT;
