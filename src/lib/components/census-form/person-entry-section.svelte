<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import type { SuperForm } from "sveltekit-superforms";
  import type { FamilyFormData } from "$lib/schema";
  import UserPlus from "@lucide/svelte/icons/user-plus";
  import Trash2 from "@lucide/svelte/icons/trash-2";
  import UserIcon from "@lucide/svelte/icons/user";
  import { t } from "$lib/i18n";

  let nextId = 0;

  let { form: superform }: { form: SuperForm<FamilyFormData> } = $props();
  const { form: formData } = superform;

  const genderOptions = ["male", "female", "other"];

  const relationshipOptions = [
    "head",
    "spouse",
    "son",
    "daughter",
    "father",
    "mother",
    "brother",
    "sister",
    "grandfather",
    "grandmother",
    "uncle",
    "aunt",
    "nephew",
    "niece",
    "other",
  ];

  const educationOptions = [
    "no_education",
    "primary",
    "junior_secondary",
    "senior_secondary",
    "gce_ol",
    "gce_al",
    "diploma",
    "bachelors",
    "masters",
    "doctorate",
    "other",
  ];

  const occupationOptions = [
    "unemployed",
    "government",
    "private",
    "self_employed",
    "student",
    "retired",
    "semi_government",
    "other",
  ];

  function addPerson() {
    $formData.persons = [
      ...$formData.persons,
      {
        _id: nextId++,
        name: "",
        nicNumber: "",
        relationship: "",
        gender: "",
        dateOfBirth: "",
        educationLevel: "",
        occupation: "",
        telephoneNumber: "",
      },
    ];
  }

  function removePerson(index: number) {
    $formData.persons = $formData.persons.filter(
      (_: unknown, i: number) => i !== index,
    );
  }
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h3 class="text-lg font-semibold tracking-tight">
        {$t("sections.family")}
      </h3>
      <p class="text-sm text-muted-foreground">
        {$t("sections.family_desc")} ({$formData.persons.length}
        {$t("fields.added_suffix")})
      </p>
    </div>
    <Button
      type="button"
      variant="outline"
      size="sm"
      onclick={addPerson}
      class="gap-2"
    >
      <UserPlus class="size-4" />
      {$t("fields.add_member")}
    </Button>
  </div>

  {#if $formData.persons.length === 0}
    <Card.Root class="border-dashed">
      <Card.Content
        class="flex flex-col items-center justify-center py-10 text-center"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4"
        >
          <UserIcon class="size-6 text-muted-foreground" />
        </div>
        <p class="text-sm font-medium text-muted-foreground mb-2">
          {$t("fields.no_members")}
        </p>
        <p class="text-xs text-muted-foreground mb-4">
          {$t("fields.start_adding")}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onclick={addPerson}
          class="gap-2"
        >
          <UserPlus class="size-4" />
          {$t("fields.add_first_member")}
        </Button>
      </Card.Content>
    </Card.Root>
  {/if}

  {#each $formData.persons as _person, i (_person._id)}
    <Card.Root
      class="relative overflow-hidden transition-all duration-200 hover:shadow-md"
    >
      <Card.Header class="pb-4">
        <div class="flex items-center justify-between">
          <Card.Title class="text-base flex items-center gap-2">
            <div
              class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold"
            >
              {i + 1}
            </div>
            {$t("fields.member_label")}
            {i + 1}
            {#if $formData.persons[i].name}
              <span class="text-muted-foreground font-normal"
                >— {$formData.persons[i].name}</span
              >
            {/if}
          </Card.Title>
          {#if $formData.persons.length > 1}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onclick={() => removePerson(i)}
              class="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5"
            >
              <Trash2 class="size-4" />
              {$t("fields.remove_member")}
            </Button>
          {/if}
        </div>
      </Card.Header>
      <Card.Content class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="person-name-{i}">{$t("fields.full_name")}</Label>
            <Input
              id="person-name-{i}"
              bind:value={$formData.persons[i].name}
              placeholder={$t("fields.full_name_placeholder")}
            />
          </div>

          <div class="space-y-2">
            <Label for="person-nic-{i}">{$t("fields.nic")}</Label>
            <Input
              id="person-nic-{i}"
              bind:value={$formData.persons[i].nicNumber}
              placeholder="e.g. 200012345678"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="space-y-2">
            <Label>{$t("fields.relationship")}</Label>
            <Select.Root
              type="single"
              name="person-relationship-{i}"
              onValueChange={(value) => {
                $formData.persons[i].relationship = value;
              }}
            >
              <Select.Trigger class="w-full">
                {#snippet children()}
                  <span data-slot="select-value">
                    {$formData.persons[i].relationship
                      ? $t(
                          `options.relationship.${$formData.persons[i].relationship}`,
                        )
                      : $t("common.select")}
                  </span>
                {/snippet}
              </Select.Trigger>
              <Select.Content>
                {#each relationshipOptions as option}
                  <Select.Item value={option}
                    >{$t(`options.relationship.${option}`)}</Select.Item
                  >
                {/each}
              </Select.Content>
            </Select.Root>
          </div>

          <div class="space-y-2">
            <Label>{$t("fields.gender")}</Label>
            <Select.Root
              type="single"
              name="person-gender-{i}"
              onValueChange={(value) => {
                $formData.persons[i].gender = value;
              }}
            >
              <Select.Trigger class="w-full">
                {#snippet children()}
                  <span data-slot="select-value">
                    {$formData.persons[i].gender
                      ? $t(`options.gender.${$formData.persons[i].gender}`)
                      : $t("common.select")}
                  </span>
                {/snippet}
              </Select.Trigger>
              <Select.Content>
                {#each genderOptions as option}
                  <Select.Item value={option}
                    >{$t(`options.gender.${option}`)}</Select.Item
                  >
                {/each}
              </Select.Content>
            </Select.Root>
          </div>

          <div class="space-y-2">
            <Label for="person-dob-{i}">{$t("fields.dob")}</Label>
            <Input
              id="person-dob-{i}"
              type="date"
              bind:value={$formData.persons[i].dateOfBirth}
            />
          </div>
        </div>

        <Separator />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="space-y-2">
            <Label>{$t("fields.education")}</Label>
            <Select.Root
              type="single"
              name="person-education-{i}"
              onValueChange={(value) => {
                $formData.persons[i].educationLevel = value;
              }}
            >
              <Select.Trigger class="w-full">
                {#snippet children()}
                  <span data-slot="select-value">
                    {$formData.persons[i].educationLevel
                      ? $t(
                          `options.education.${$formData.persons[i].educationLevel}`,
                        )
                      : $t("common.select")}
                  </span>
                {/snippet}
              </Select.Trigger>
              <Select.Content>
                {#each educationOptions as option}
                  <Select.Item value={option}
                    >{$t(`options.education.${option}`)}</Select.Item
                  >
                {/each}
              </Select.Content>
            </Select.Root>
          </div>

          <div class="space-y-2">
            <Label for="person-occupation-{i}">{$t("fields.occupation")}</Label>
            <Select.Root
              type="single"
              name="person-occupation-{i}"
              onValueChange={(value) => {
                $formData.persons[i].occupation = value;
              }}
            >
              <Select.Trigger class="w-full">
                {#snippet children()}
                  <span data-slot="select-value">
                    {$formData.persons[i].occupation
                      ? $t(
                          `options.occupation.${$formData.persons[i].occupation}`,
                        )
                      : $t("common.select")}
                  </span>
                {/snippet}
              </Select.Trigger>
              <Select.Content>
                {#each occupationOptions as option}
                  <Select.Item value={option}
                    >{$t(`options.occupation.${option}`)}</Select.Item
                  >
                {/each}
              </Select.Content>
            </Select.Root>
          </div>

          <div class="space-y-2">
            <Label for="person-phone-{i}">{$t("fields.phone")}</Label>
            <Input
              id="person-phone-{i}"
              type="tel"
              bind:value={$formData.persons[i].telephoneNumber}
              placeholder="e.g. 0771234567"
            />
          </div>
        </div>
      </Card.Content>
    </Card.Root>
  {/each}
</div>
