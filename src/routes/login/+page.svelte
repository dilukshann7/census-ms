<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Admin Login</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-muted/30 px-4">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle>Admin Login</CardTitle>
			<CardDescription>
				Sign in to access protected admin pages.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<form method="POST" class="space-y-4">
				<input
					type="hidden"
					name="redirectTo"
					value={form?.redirectTo ?? data.redirectTo}
				/>

				<div class="space-y-2">
					<Label for="username">Username or Email</Label>
					<Input
						id="username"
						name="username"
						type="text"
						required
						autocomplete="username"
						value={form?.values?.username ?? ""}
					/>
				</div>

				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						required
						autocomplete="current-password"
					/>
				</div>

				{#if form?.message}
					<p class="text-sm text-destructive">{form.message}</p>
				{/if}

				{#if !data.hasAdminAllowList}
					<p class="text-xs text-muted-foreground">
						Set `ADMIN_EMAIL` or `ADMIN_EMAILS` in `.env` to enable admin
						login.
					</p>
				{/if}

				<Button type="submit" class="w-full">Sign in</Button>
			</form>
		</CardContent>
	</Card>
</div>
