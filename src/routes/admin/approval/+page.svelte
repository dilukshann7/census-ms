<script lang="ts">
    import { enhance } from "$app/forms";
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
    import CheckCircle from "lucide-svelte/icons/check-circle-2";
    import XCircle from "lucide-svelte/icons/x-circle";
    import * as Tabs from "$lib/components/ui/tabs";

    let { data } = $props();

    let searchQuery = $state(data.query || "");

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
                Data Approval
            </h2>
            <p class="text-sm md:text-base text-muted-foreground">
                Manage census submissions and database.
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
            <CardTitle>Pending Submissions</CardTitle>
            <CardDescription>
                {data.families.length} families found matched your criteria.
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
                                <Table.Cell class="font-medium"
                                    >#{family.id}</Table.Cell
                                >
                                <Table.Cell
                                    >{getHeadOfHousehold(family)}</Table.Cell
                                >
                                <Table.Cell>{family.village}</Table.Cell>
                                <Table.Cell>{family.address}</Table.Cell>
                                <Table.Cell
                                    >{(family.persons as any)
                                        .length}</Table.Cell
                                >
                                <Table.Cell>
                                    <Badge
                                        variant={family.status === "Pending"
                                            ? "secondary"
                                            : family.status === "Approved"
                                              ? "default"
                                              : "destructive"}
                                    >
                                        {family.status}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell class="text-right">
                                    <div class="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            href={`/admin/approval/${family.id}`}
                                        >
                                            <Eye class="h-4 w-4" />
                                            <span class="sr-only">View</span>
                                        </Button>
                                        {#if family.status === "Pending"}
                                            <form
                                                method="POST"
                                                action="?/approve"
                                                use:enhance
                                            >
                                                <input
                                                    type="hidden"
                                                    name="id"
                                                    value={family.id}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    type="submit"
                                                    class="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                >
                                                    <CheckCircle
                                                        class="h-4 w-4"
                                                    />
                                                    <span class="sr-only"
                                                        >Approve</span
                                                    >
                                                </Button>
                                            </form>
                                            <form
                                                method="POST"
                                                action="?/reject"
                                                use:enhance
                                            >
                                                <input
                                                    type="hidden"
                                                    name="id"
                                                    value={family.id}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    type="submit"
                                                    class="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <XCircle class="h-4 w-4" />
                                                    <span class="sr-only"
                                                        >Reject</span
                                                    >
                                                </Button>
                                            </form>
                                        {/if}
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        {:else}
                            <Table.Row>
                                <Table.Cell
                                    colspan={7}
                                    class="h-24 text-center"
                                >
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
