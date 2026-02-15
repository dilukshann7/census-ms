<script lang="ts">
    import * as Form from "$lib/components/ui/form/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import type { SuperForm } from "sveltekit-superforms";
    import type { FamilyFormData } from "$lib/schema";

    let { form }: { form: SuperForm<FamilyFormData> } = $props();
    const { form: formData } = form;

    const landSizeOptions = [
        { value: "perches", label: "Perches" },
        { value: "acres", label: "Acres" },
        { value: "hectares", label: "Hectares" },
        { value: "square_meters", label: "Square Meters" },
        { value: "square_feet", label: "Square Feet" },
    ];

    function getLandSizeLabel(value: string): string {
        return landSizeOptions.find((o) => o.value === value)?.label ?? "";
    }
</script>

<div class="space-y-6">
    <div class="mb-6">
        <h2 class="text-lg font-semibold tracking-tight">Property Details</h2>
        <p class="text-sm text-muted-foreground">House and land measurements</p>
    </div>

    <div>
        <p class="text-sm font-medium text-foreground mb-3">House Dimensions</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Form.Field {form} name="houseLength">
                {#snippet children({ constraints })}
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Length (ft)</Form.Label>
                            <Input
                                {...props}
                                {...constraints}
                                bind:value={$formData.houseLength}
                                type="number"
                                placeholder="0"
                            />
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                {/snippet}
            </Form.Field>

            <Form.Field {form} name="houseWidth">
                {#snippet children({ constraints })}
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Width (ft)</Form.Label>
                            <Input
                                {...props}
                                {...constraints}
                                bind:value={$formData.houseWidth}
                                type="number"
                                placeholder="0"
                            />
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                {/snippet}
            </Form.Field>
        </div>
    </div>

    <div>
        <p class="text-sm font-medium text-foreground mb-3">Land Dimensions</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Form.Field {form} name="landLength">
                {#snippet children({ constraints })}
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Length (ft)</Form.Label>
                            <Input
                                {...props}
                                {...constraints}
                                bind:value={$formData.landLength}
                                type="number"
                                placeholder="0"
                            />
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                {/snippet}
            </Form.Field>

            <Form.Field {form} name="landWidth">
                {#snippet children({ constraints })}
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Width (ft)</Form.Label>
                            <Input
                                {...props}
                                {...constraints}
                                bind:value={$formData.landWidth}
                                type="number"
                                placeholder="0"
                            />
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                {/snippet}
            </Form.Field>
        </div>
    </div>

    <div>
        <p class="text-sm font-medium text-foreground mb-3">Land Size</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Form.Field {form} name="landSizeValue">
                {#snippet children({ constraints })}
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Size</Form.Label>
                            <Input
                                {...props}
                                {...constraints}
                                bind:value={$formData.landSizeValue}
                                type="number"
                                placeholder="0"
                            />
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                {/snippet}
            </Form.Field>

            <Form.Field {form} name="landSizeUnit">
                {#snippet children({ constraints: _constraints })}
                    <Form.Control>
                        {#snippet children({ props: _props })}
                            <Form.Label>Unit</Form.Label>
                            <Select.Root
                                type="single"
                                name="landSizeUnit"
                                onValueChange={(value) => {
                                    $formData.landSizeUnit = value;
                                }}
                            >
                                <Select.Trigger class="w-full">
                                    {#snippet children()}
                                        <span data-slot="select-value">
                                            {$formData.landSizeUnit
                                                ? getLandSizeLabel(
                                                      $formData.landSizeUnit,
                                                  )
                                                : "Select unit"}
                                        </span>
                                    {/snippet}
                                </Select.Trigger>
                                <Select.Content>
                                    {#each landSizeOptions as option}
                                        <Select.Item value={option.value}
                                            >{option.label}</Select.Item
                                        >
                                    {/each}
                                </Select.Content>
                            </Select.Root>
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                {/snippet}
            </Form.Field>
        </div>
    </div>

    <Form.Field {form} name="specialNeedsMemberDetails">
        {#snippet children({ constraints })}
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label>Special Needs Member Details</Form.Label>
                    <Textarea
                        {...props}
                        {...constraints}
                        bind:value={$formData.specialNeedsMemberDetails}
                        placeholder="Enter details about family members with special needs (if any)"
                        rows={3}
                    />
                {/snippet}
            </Form.Control>
            <Form.Description>Leave blank if not applicable</Form.Description>
            <Form.FieldErrors />
        {/snippet}
    </Form.Field>
</div>
