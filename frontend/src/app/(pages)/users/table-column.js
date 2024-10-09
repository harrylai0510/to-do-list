'use client';

import {Checkbox} from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import Link from "next/link";
import axios from "axios";

async function deleteUser(id) {
    await axios.delete(process.env.backend_url + `/users/${id}`)
        .then((res) => {
            console.log('done')
            window.location.reload();
        })
    // console.log('delete Task', id)
}

const columns = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'userName',
        header: ({column}) => {
            return (
                <Button variant="ghost" className="text-left" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <div className="text-left">User Name</div>
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            return (<div className="text-left font-medium pl-4">{row.getValue("userName")}</div>)
        }
    },
    {
        id: 'actions',
        cell: ({row}) => {
            const user = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link href={`/users/${user.id}`}>
                            <DropdownMenuItem>View User</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className="text-red-600"
                                          onClick={() => deleteUser(user.id)}
                        >
                            Delete User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
];

export default columns;
