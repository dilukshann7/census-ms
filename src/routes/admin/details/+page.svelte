<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Badge } from "$lib/components/ui/badge";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
  } from "$lib/components/ui/card";
  import Search from "lucide-svelte/icons/search";
  import Eye from "lucide-svelte/icons/eye";

  let { data } = $props();

  let searchQuery = $state(data.query || "");

  // Helper to get head of household name
  function getHeadOfHousehold(family: any) {
    const head = family.persons.find(
      (p: any) => p.relationship.toLowerCase() === "head",
    );
    return head ? head.name : family.persons[0]?.name || "Unknown";
  }
</script>

<div
  class="container mx-auto px-4 py-6 md:py-10 space-y-6 md:space-y-8 max-w-full lg:max-w-7xl"
>
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-2xl md:text-3xl font-bold tracking-tight">
        Family Details
      </h2>
      <p class="text-sm md:text-base text-muted-foreground">
        View approved census records.
      </p>
    </div>
  </div>

  <div class="flex items-center space-x-2">
    <form method="GET" class="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="search"
        name="q"
        placeholder="Search by ID or Phone..."
        bind:value={searchQuery}
      />
      <Button type="submit" size="icon">
        <Search class="h-4 w-4" />
      </Button>
    </form>
  </div>

  <Card class="overflow-hidden">
    <CardHeader>
      <CardTitle>Approved Records</CardTitle>
      <CardDescription>
        {data.families.length} approved families found.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="overflow-x-auto">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head>Family ID</Table.Head>
              <Table.Head>Head of Household</Table.Head>
              <Table.Head>Village</Table.Head>
              <Table.Head>Address</Table.Head>
              <Table.Head>Members</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head class="text-right">Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#each data.families as family}
              <Table.Row>
                <Table.Cell class="font-medium">#{family.id}</Table.Cell>
                <Table.Cell>{getHeadOfHousehold(family)}</Table.Cell>
                <Table.Cell>{family.village}</Table.Cell>
                <Table.Cell>{family.address}</Table.Cell>
                <Table.Cell>{family.persons.length}</Table.Cell>
                <Table.Cell>
                  <Badge variant="default">
                    {family.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell class="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    href={`/admin/details/${family.id}`}
                  >
                    <Eye class="h-4 w-4" />
                    <span class="sr-only">View Details</span>
                  </Button>
                </Table.Cell>
              </Table.Row>
            {:else}
              <Table.Row>
                <Table.Cell colspan={7} class="h-24 text-center">
                  No results found.
                </Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
      </div>
    </CardContent>
  </Card>
</div>
