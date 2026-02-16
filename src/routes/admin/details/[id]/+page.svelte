<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import { zod4Client as zodClient } from "sveltekit-superforms/adapters";
    import { familySchema } from "$lib/schema";
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { Separator } from "$lib/components/ui/separator";
    import { Badge } from "$lib/components/ui/badge";
    import {
        FamilyInfoSection,
        PaymentInfoSection,
        PropertyInfoSection,
        PersonEntrySection,
    } from "$lib/components/census-form";
    import Loader2 from "lucide-svelte/icons/loader-2";
    import Save from "lucide-svelte/icons/save";
    import Trash2 from "lucide-svelte/icons/trash-2";
    import ArrowLeft from "lucide-svelte/icons/arrow-left";
    import { toast } from "svelte-sonner";
    import { page } from "$app/state";

    let { data } = $props();

    const form = superForm(data.form, {
        validators: zodClient(familySchema),
        dataType: "json",
        resetForm: false,
        onResult({ result }) {
            if (result.type === "success") {
                toast.success("Family data updated successfully!");
            } else if (result.type === "failure") {
                toast.error("Failed to update family data");
            } else if (result.type === "error") {
                toast.error("Server error");
            }
        },
    });

    const { enhance, delayed } = form;
</script>

<svelte:head>
    <title>Family Details — Admin</title>
</svelte:head>

<div class="min-h-screen bg-muted/40 pb-12">
    <header class="bg-background border-b sticky top-0 z-10">
        <div
            class="container mx-auto px-4 py-4 flex items-center justify-between"
        >
            <div class="flex items-center gap-4">
                <Button variant="ghost" size="icon" href="/admin/details">
                    <ArrowLeft class="w-5 h-5" />
                </Button>
                <div>
                    <h1 class="text-xl font-bold flex items-center gap-2">
                        Family Details #{data.family.id}
                        <Badge
                            variant={data.family.status === "Pending"
                                ? "secondary"
                                : data.family.status === "Approved"
                                  ? "default"
                                  : "destructive"}
                        >
                            {data.family.status}
                        </Badge>
                    </h1>
                    <p class="text-sm text-muted-foreground">
                        Created on {new Date(
                            data.family.createdAt,
                        ).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <form
                    method="POST"
                    action="?/delete"
                    use:enhance
                    onsubmit={() =>
                        confirm(
                            "Are you sure you want to delete this family record? This action cannot be undone.",
                        )}
                >
                    <Button variant="destructive" size="sm" type="submit">
                        <Trash2 class="mr-2 h-4 w-4" /> Delete Record
                    </Button>
                </form>
            </div>
        </div>
    </header>

    <main class="container mx-auto px-4 py-8 max-w-4xl">
        <form method="POST" action="?/save" use:enhance class="space-y-8">
            <Card.Root>
                <Card.Content class="pt-6">
                    <FamilyInfoSection {form} />
                </Card.Content>
            </Card.Root>

            <Card.Root>
                <Card.Content class="pt-6">
                    <PaymentInfoSection {form} />
                </Card.Content>
            </Card.Root>

            <Card.Root>
                <Card.Content class="pt-6">
                    <PropertyInfoSection {form} />
                </Card.Content>
            </Card.Root>

            <Card.Root>
                <Card.Content class="pt-6">
                    <PersonEntrySection {form} />
                </Card.Content>
            </Card.Root>

            <div class="flex justify-end gap-4 sticky bottom-4">
                <Button type="submit" size="lg" disabled={$delayed}>
                    {#if $delayed}
                        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                    {:else}
                        <Save class="mr-2 h-4 w-4" />
                        Save Changes
                    {/if}
                </Button>
            </div>
        </form>
    </main>
</div>
