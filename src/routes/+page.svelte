<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import { zod4Client as zodClient } from "sveltekit-superforms/adapters";
    import { familySchema } from "$lib/schema";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import {
        FamilyInfoSection,
        PaymentInfoSection,
        PropertyInfoSection,
        PersonEntrySection,
    } from "$lib/components/census-form/index.js";
    import Loader2 from "@lucide/svelte/icons/loader-2";
    import CheckCircle from "@lucide/svelte/icons/check-circle-2";
    import Sun from "@lucide/svelte/icons/sun";
    import Moon from "@lucide/svelte/icons/moon";
    import { toggleMode, mode } from "mode-watcher";
    import { toast } from "svelte-sonner";

    let { data } = $props();

    const form = superForm(data.form, {
        validators: zodClient(familySchema),
        dataType: "json",
        onResult({ result }) {
            if (result.type === "success") {
                toast.success("Census data submitted successfully!", {
                    description: "The family record has been saved.",
                });
            } else if (result.type === "failure") {
                toast.error("Failed to submit census data", {
                    description:
                        "Please check the form for errors and try again.",
                });
            } else if (result.type === "error") {
                toast.error("Server error", {
                    description:
                        "An unexpected error occurred. Please try again.",
                });
            }
        },
    });

    const { enhance, delayed } = form;
</script>

<svelte:head>
    <title>Census Data Entry — Census Management System</title>
    <meta
        name="description"
        content="Enter family census data including household details, payment information, property measurements, and family member records."
    />
</svelte:head>

<div class="min-h-screen bg-muted/40">
    <header
        class="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50"
    >
        <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div>
                        <h1 class="text-xl font-bold tracking-tight">
                            Census Data Entry
                        </h1>
                        <p class="text-sm text-muted-foreground">
                            Family & household information form
                        </p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onclick={toggleMode}
                    class="rounded-full"
                    aria-label="Toggle dark mode"
                >
                    {#if mode.current === "dark"}
                        <Sun
                            class="size-5 transition-transform duration-300 rotate-0"
                        />
                    {:else}
                        <Moon
                            class="size-5 transition-transform duration-300 rotate-0"
                        />
                    {/if}
                </Button>
            </div>
        </div>
    </header>

    <main class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <form method="POST" use:enhance class="space-y-8">
            <Card.Root class="shadow-sm transition-shadow hover:shadow-md">
                <Card.Content>
                    <FamilyInfoSection {form} />
                </Card.Content>
            </Card.Root>

            <Card.Root class="shadow-sm transition-shadow hover:shadow-md">
                <Card.Content>
                    <PaymentInfoSection {form} />
                </Card.Content>
            </Card.Root>

            <Card.Root class="shadow-sm transition-shadow hover:shadow-md">
                <Card.Content>
                    <PropertyInfoSection {form} />
                </Card.Content>
            </Card.Root>

            <Card.Root class="shadow-sm transition-shadow hover:shadow-md">
                <Card.Content>
                    <PersonEntrySection {form} />
                </Card.Content>
            </Card.Root>

            <Separator />

            <div
                class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-12"
            >
                <p class="text-sm text-muted-foreground">
                    Please review all sections before submitting.
                </p>
                <Button
                    type="submit"
                    size="lg"
                    class="w-full sm:w-auto gap-2 min-w-[200px]"
                    disabled={$delayed}
                >
                    {#if $delayed}
                        <Loader2 class="size-4 animate-spin" />
                        Submitting...
                    {:else}
                        <CheckCircle class="size-4" />
                        Submit Census Data
                    {/if}
                </Button>
            </div>
        </form>
    </main>
</div>
