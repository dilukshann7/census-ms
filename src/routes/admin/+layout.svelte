<script lang="ts">
	import { Button } from "$lib/components/ui/button";

	let { data, children } = $props();
</script>

<div class="min-h-screen bg-muted/40">
	<header class="border-b bg-background/90 backdrop-blur-sm">
		<div
			class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6"
		>
			<div>
				<h1 class="text-lg font-semibold">Admin</h1>
			</div>

			<div class="flex items-center gap-2">
				<Button href="/admin/approval" variant="secondary" size="sm">
					Approval
				</Button>
				<Button href="/admin/details" variant="secondary" size="sm">
					Details
				</Button>
				<form method="POST" action="/logout">
					<Button type="submit" variant="outline" size="sm">
						Sign out
					</Button>
				</form>
			</div>
		</div>
	</header>

	<main class="pb-8">
		{@render children()}
	</main>
</div>
