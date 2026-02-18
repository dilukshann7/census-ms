<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import type { SuperForm } from "sveltekit-superforms";
  import type { FamilyFormData } from "$lib/schema";
  import { t } from "$lib/i18n";

  let { form }: { form: SuperForm<FamilyFormData> } = $props();
  const { form: formData } = form;

  const landSizeUnits = [
    "perches",
    "acres",
    "hectares",
    "square_meters",
    "square_feet",
  ];
</script>

<div class="space-y-6">
  <div class="mb-6">
    <h2 class="text-lg font-semibold tracking-tight">
      {$t("sections.property")}
    </h2>
    <p class="text-sm text-muted-foreground">
      {$t("sections.property_desc")}
    </p>
  </div>

  <div>
    <p class="text-sm font-medium text-foreground mb-3">
      {$t("fields.house_dims")}
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Form.Field {form} name="houseLength">
        {#snippet children({ constraints })}
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>{$t("fields.length")}</Form.Label>
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
              <Form.Label>{$t("fields.width")}</Form.Label>
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
    <p class="text-sm font-medium text-foreground mb-3">
      {$t("fields.land_dims")}
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Form.Field {form} name="landLength">
        {#snippet children({ constraints })}
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>{$t("fields.length")}</Form.Label>
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
              <Form.Label>{$t("fields.width")}</Form.Label>
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
    <p class="text-sm font-medium text-foreground mb-3">
      {$t("fields.land_size")}
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Form.Field {form} name="landSizeValue">
        {#snippet children({ constraints })}
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>{$t("fields.size")}</Form.Label>
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
              <Form.Label>{$t("fields.unit")}</Form.Label>
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
                        ? $t(`options.units.${$formData.landSizeUnit}`)
                        : $t("fields.select_unit")}
                    </span>
                  {/snippet}
                </Select.Trigger>
                <Select.Content>
                  {#each landSizeUnits as unit}
                    <Select.Item value={unit}
                      >{$t(`options.units.${unit}`)}</Select.Item
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
          <Form.Label>{$t("fields.special_needs")}</Form.Label>
          <Textarea
            {...props}
            {...constraints}
            bind:value={$formData.specialNeedsMemberDetails}
            placeholder={$t("fields.special_needs_placeholder")}
            rows={3}
          />
        {/snippet}
      </Form.Control>
      <Form.Description>{$t("fields.special_needs_desc")}</Form.Description>
      <Form.FieldErrors />
    {/snippet}
  </Form.Field>
</div>
