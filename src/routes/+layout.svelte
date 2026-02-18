<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from "svelte-sonner";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  let { children } = $props();

  injectAnalytics();
</script>

<ModeWatcher />
<Toaster richColors position="top-right" />
<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
