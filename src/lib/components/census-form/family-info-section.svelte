<script lang="ts">
    import * as Form from "$lib/components/ui/form/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import type { SuperForm } from "sveltekit-superforms";
    import type { FamilyFormData } from "$lib/schema";

    let { form }: { form: SuperForm<FamilyFormData> } = $props();
    const { form: formData } = form;
</script>

<div class="space-y-6">
    <div class="mb-6">
        <h2 class="text-lg font-semibold tracking-tight">Location Details</h2>
        <p class="text-sm text-muted-foreground">
            GS Division, village, and address information
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Field {form} name="gsDivision">
            {#snippet children({ constraints })}
                <Form.Control>
                    {#snippet children({ props })}
                        <Form.Label>GS Division</Form.Label>
                        <Input
                            {...props}
                            {...constraints}
                            bind:value={$formData.gsDivision}
                            placeholder="Enter GS Division"
                        />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            {/snippet}
        </Form.Field>

        <Form.Field {form} name="village">
            {#snippet children({ constraints })}
                <Form.Control>
                    {#snippet children({ props })}
                        <Form.Label>Village</Form.Label>
                        <Input
                            {...props}
                            {...constraints}
                            bind:value={$formData.village}
                            placeholder="Enter village name"
                        />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            {/snippet}
        </Form.Field>
    </div>

    <Form.Field {form} name="address">
        {#snippet children({ constraints })}
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label>Address</Form.Label>
                    <Textarea
                        {...props}
                        {...constraints}
                        bind:value={$formData.address}
                        placeholder="Enter full address"
                        rows={3}
                    />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        {/snippet}
    </Form.Field>

    <Form.Field {form} name="whatsappNumber">
        {#snippet children({ constraints })}
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label>WhatsApp Number</Form.Label>
                    <Input
                        {...props}
                        {...constraints}
                        bind:value={$formData.whatsappNumber}
                        placeholder="e.g. 0771234567"
                        type="tel"
                    />
                {/snippet}
            </Form.Control>
            <Form.Description
                >Include country code for WhatsApp contact</Form.Description
            >
            <Form.FieldErrors />
        {/snippet}
    </Form.Field>
</div>
