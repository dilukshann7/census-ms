<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import type { SuperForm } from "sveltekit-superforms";
  import type { FamilyFormData } from "$lib/schema";
  import { t } from "$lib/i18n";

  let { form }: { form: SuperForm<FamilyFormData> } = $props();
  const { form: formData } = form;
</script>

<div class="space-y-6">
  <div class="mb-6">
    <h2 class="text-lg font-semibold tracking-tight">
      {$t("sections.location")}
    </h2>
    <p class="text-sm text-muted-foreground">
      {$t("sections.location_desc")}
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Form.Field {form} name="gsDivision">
      {#snippet children({ constraints })}
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>{$t("fields.gs_division")}</Form.Label>
            <Input
              {...props}
              {...constraints}
              bind:value={$formData.gsDivision}
              placeholder={$t("fields.gs_division_placeholder")}
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
            <Form.Label>{$t("fields.village")}</Form.Label>
            <Input
              {...props}
              {...constraints}
              bind:value={$formData.village}
              placeholder={$t("fields.village_placeholder")}
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
          <Form.Label>{$t("fields.address")}</Form.Label>
          <Textarea
            {...props}
            {...constraints}
            bind:value={$formData.address}
            placeholder={$t("fields.address_placeholder")}
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
          <Form.Label>{$t("fields.whatsapp")}</Form.Label>
          <Input
            {...props}
            {...constraints}
            bind:value={$formData.whatsappNumber}
            placeholder="e.g. 0771234567"
            type="tel"
          />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    {/snippet}
  </Form.Field>
</div>
