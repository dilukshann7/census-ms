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

  let nextId = 0;

  let { form: superform }: { form: SuperForm<FamilyFormData> } = $props();
  const { form: formData } = superform;

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const relationshipOptions = [
    { value: "head", label: "Head of Household" },
    { value: "spouse", label: "Spouse" },
    { value: "son", label: "Son" },
    { value: "daughter", label: "Daughter" },
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
    { value: "brother", label: "Brother" },
    { value: "sister", label: "Sister" },
    { value: "grandfather", label: "Grandfather" },
    { value: "grandmother", label: "Grandmother" },
    { value: "uncle", label: "Uncle" },
    { value: "aunt", label: "Aunt" },
    { value: "nephew", label: "Nephew" },
    { value: "niece", label: "Niece" },
    { value: "other", label: "Other" },
  ];

  const educationOptions = [
    { value: "no_education", label: "No Formal Education" },
    { value: "primary", label: "Primary (Grade 1-5)" },
    { value: "junior_secondary", label: "Junior Secondary (Grade 6-9)" },
    { value: "senior_secondary", label: "Senior Secondary (Grade 10-11)" },
    { value: "gce_ol", label: "GCE O/L" },
    { value: "gce_al", label: "GCE A/L" },
    { value: "diploma", label: "Diploma" },
    { value: "bachelors", label: "Bachelor's Degree" },
    { value: "masters", label: "Master's Degree" },
    { value: "doctorate", label: "Doctorate" },
    { value: "other", label: "Other" },
  ];

  const occupationOptions = [
    { value: "unemployed", label: "Unemployed" },
    { value: "government", label: "Government Employee" },
    { value: "private", label: "Private Sector Employee" },
    { value: "self_employed", label: "Self-Employed" },
    { value: "student", label: "Student" },
    { value: "retired", label: "Retired" },
    { value: "semi_government", label: "Semi-Government Employee" },
    { value: "other", label: "Other" },
  ];

  function getLabel(
    options: { value: string; label: string }[],
    value: string,
  ): string {
    return options.find((o) => o.value === value)?.label ?? "";
  }

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
      <h3 class="text-lg font-semibold tracking-tight">Family Members</h3>
      <p class="text-sm text-muted-foreground">
        Add all members of the household ({$formData.persons.length}
        added)
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
      Add Member
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
          No family members added
        </p>
        <p class="text-xs text-muted-foreground mb-4">
          Click "Add Member" to start adding family members
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onclick={addPerson}
          class="gap-2"
        >
          <UserPlus class="size-4" />
          Add First Member
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
            Member {i + 1}
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
              Remove
            </Button>
          {/if}
        </div>
      </Card.Header>
      <Card.Content class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="person-name-{i}">Full Name</Label>
            <Input
              id="person-name-{i}"
              bind:value={$formData.persons[i].name}
              placeholder="Enter full name"
            />
          </div>

          <div class="space-y-2">
            <Label for="person-nic-{i}">NIC Number</Label>
            <Input
              id="person-nic-{i}"
              bind:value={$formData.persons[i].nicNumber}
              placeholder="e.g. 200012345678"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="space-y-2">
            <Label>Relationship</Label>
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
                      ? getLabel(
                          relationshipOptions,
                          $formData.persons[i].relationship,
                        )
                      : "Select..."}
                  </span>
                {/snippet}
              </Select.Trigger>
              <Select.Content>
                {#each relationshipOptions as option}
                  <Select.Item value={option.value}>{option.label}</Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
          </div>

          <div class="space-y-2">
            <Label>Gender</Label>
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
                      ? getLabel(genderOptions, $formData.persons[i].gender)
                      : "Select..."}
                  </span>
                {/snippet}
              </Select.Trigger>
              <Select.Content>
                {#each genderOptions as option}
                  <Select.Item value={option.value}>{option.label}</Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
          </div>

          <div class="space-y-2">
            <Label for="person-dob-{i}">Date of Birth</Label>
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
            <Label>Education Level</Label>
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
                      ? getLabel(
                          educationOptions,
                          $formData.persons[i].educationLevel,
                        )
                      : "Select..."}
                  </span>
                {/snippet}
              </Select.Trigger>
              <Select.Content>
                {#each educationOptions as option}
                  <Select.Item value={option.value}>{option.label}</Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
          </div>

          <div class="space-y-2">
            <Label for="person-occupation-{i}">Occupation</Label>
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
                      ? getLabel(
                          occupationOptions,
                          $formData.persons[i].occupation,
                        )
                      : "Select..."}
                  </span>
                {/snippet}
              </Select.Trigger>
              <Select.Content>
                {#each occupationOptions as option}
                  <Select.Item value={option.value}>{option.label}</Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
          </div>

          <div class="space-y-2">
            <Label for="person-phone-{i}">Telephone Number</Label>
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
