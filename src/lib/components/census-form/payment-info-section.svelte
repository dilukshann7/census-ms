<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import type { SuperForm } from "sveltekit-superforms";
  import type { FamilyFormData } from "$lib/schema";
  import { t } from "$lib/i18n";

  let { form }: { form: SuperForm<FamilyFormData> } = $props();
  const { form: formData } = form;
</script>

<div class="space-y-6">
  <div class="mb-6">
    <h2 class="text-lg font-semibold tracking-tight">
      {$t("sections.payment")}
    </h2>
    <p class="text-sm text-muted-foreground">
      {$t("sections.payment_desc")}
    </p>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <Form.Field {form} name="samurdhiPayment">
      {#snippet children({ constraints })}
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>{$t("fields.samurdhi")}</Form.Label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                >{$t("common.rs")}</span
              >
              <Input
                {...props}
                {...constraints}
                bind:value={$formData.samurdhiPayment}
                type="number"
                placeholder="0"
                class="pl-10"
              />
            </div>
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      {/snippet}
    </Form.Field>

    <Form.Field {form} name="eldersPayment">
      {#snippet children({ constraints })}
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>{$t("fields.elders")}</Form.Label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                >{$t("common.rs")}</span
              >
              <Input
                {...props}
                {...constraints}
                bind:value={$formData.eldersPayment}
                type="number"
                placeholder="0"
                class="pl-10"
              />
            </div>
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      {/snippet}
    </Form.Field>

    <Form.Field {form} name="diseasePayment">
      {#snippet children({ constraints })}
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>{$t("fields.disease")}</Form.Label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                >{$t("common.rs")}</span
              >
              <Input
                {...props}
                {...constraints}
                bind:value={$formData.diseasePayment}
                type="number"
                placeholder="0"
                class="pl-10"
              />
            </div>
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      {/snippet}
    </Form.Field>

    <Form.Field {form} name="monthlyPayment">
      {#snippet children({ constraints })}
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>{$t("fields.monthly")}</Form.Label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                >{$t("common.rs")}</span
              >
              <Input
                {...props}
                {...constraints}
                bind:value={$formData.monthlyPayment}
                type="number"
                placeholder="0"
                class="pl-10"
              />
            </div>
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      {/snippet}
    </Form.Field>
  </div>
</div>
