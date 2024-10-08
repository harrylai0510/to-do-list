'use client';

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import columns from "./columns"
import { DataTable } from "./data-table"
import {Button} from "@/components/ui/button"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Link from 'next/link'

export default function ListView() {
    const router = useRouter()
    const [userList, setUserList] = useState(null)
    const [taskList, setTaskList] = useState(null)
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        fetch(process.env.backend_url + '/users/ids')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setUserList(data)
                setLoading(false)
            })
        // Load Task(s)
        fetch(process.env.backend_url + '/tasks')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setTaskList(data)
                setLoading(false)
            })
    }, []);
    if (isLoading) return <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"><p>Loading...</p></div>
    if (!userList) return <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"><p>No option data...</p></div>

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">List</h1>
            </div>
            <div className="flex flex-1 rounded-lg shadow-sm"> {/*flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm*/}
                <div className="w-full flex flex-col items-center gap-1 "> {/*flex flex-col items-center gap-1 text-center*/}

                    { taskList && <DataTable columns={columns} data={taskList} userTrans={userList} /> }

                    {/*<Card className="w-full">*/}
                    {/*    /!*<CardHeader className="px-7">*!/*/}
                    {/*    /!*    <CardTitle>Orders</CardTitle>*!/*/}
                    {/*    /!*    <CardDescription>*!/*/}
                    {/*    /!*        Recent orders from your store.*!/*/}
                    {/*    /!*    </CardDescription>*!/*/}
                    {/*    /!*</CardHeader>*!/*/}

                    {/*    <CardContent className="p-0">*/}
                    {/*        /!*<Table>*!/*/}
                    {/*        /!*    <TableHeader>*!/*/}
                    {/*        /!*        <TableRow>*!/*/}
                    {/*        /!*            <TableHead*!/*/}
                    {/*        /!*                className=""> /!*hidden sm:table-cell hidden md:table-cell text-right*!/*!/*/}
                    {/*        /!*                Status*!/*/}
                    {/*        /!*            </TableHead>*!/*/}
                    {/*        /!*            <TableHead className="">*!/*/}
                    {/*        /!*                Task Name*!/*/}
                    {/*        /!*            </TableHead>*!/*/}
                    {/*        /!*            <TableHead className="">*!/*/}
                    {/*        /!*                Assign*!/*/}
                    {/*        /!*            </TableHead>*!/*/}
                    {/*        /!*            <TableHead className="">*!/*/}
                    {/*        /!*                Due Date*!/*/}
                    {/*        /!*            </TableHead>*!/*/}
                    {/*        /!*        </TableRow>*!/*/}
                    {/*        /!*    </TableHeader>*!/*/}
                    {/*        /!*    <TableBody>*!/*/}
                    {/*        /!*        {*!/*/}
                    {/*        /!*            userList && taskList && taskList.map((todo) => (*!/*/}
                    {/*        /!*                <TableRow key={todo.id}> /!*bg-accent*!/*!/*/}
                    {/*        /!*                    /!*<TableCell*!/*!/*/}
                    {/*        /!*                    /!*    className="text-left font-medium">{todo.status}</TableCell> /!*text-left text-right font-medium*!/*!/*!/*/}
                    {/*        /!*                    /!*<TableCell className="text-left">{todo.taskName}</TableCell>*!/*!/*/}
                    {/*        /!*                    /!*<TableCell className="text-left">{todo.assign}</TableCell>*!/*!/*/}
                    {/*        /!*                    /!*<TableCell className="text-left">{todo.due}</TableCell>*!/*!/*/}

                    {/*        /!*                    <TableCell>*!/*/}
                    {/*        /!*                        <Badge className="text-xs"*!/*/}
                    {/*        /!*                               variant={todo.status === "Completed" ? "secondary" : "outline"}> /!*secondary outline*!/*!/*/}
                    {/*        /!*                            {todo.status}*!/*/}
                    {/*        /!*                        </Badge>*!/*/}
                    {/*        /!*                        /!*<div className="hidden text-sm text-muted-foreground md:inline">*!/*!/*/}
                    {/*        /!*                        /!*    liam@example.com*!/*!/*/}
                    {/*        /!*                        /!*</div>*!/*!/*/}
                    {/*        /!*                    </TableCell>*!/*/}
                    {/*        /!*                    <TableCell className="hidden sm:table-cell"> /!*hidden sm:table-cell*!/*!/*/}
                    {/*        /!*                        {todo.taskName}*!/*/}
                    {/*        /!*                    </TableCell>*!/*/}
                    {/*        /!*                    <TableCell className="hidden sm:table-cell">*!/*/}
                    {/*        /!*                        {userList[todo.assign]}*!/*/}
                    {/*        /!*                    </TableCell>*!/*/}
                    {/*        /!*                    <TableCell className="hidden md:table-cell">*!/*/}
                    {/*        /!*                        {moment(todo.dueDate).format("DD/MM/YYYY")}*!/*/}
                    {/*        /!*                    </TableCell>*!/*/}
                    {/*        /!*                </TableRow>*!/*/}
                    {/*        /!*            ))*!/*/}
                    {/*        /!*        }*!/*/}


                    {/*        /!*        /!*<TableRow> /!*bg-accent*!/*!/*!/*/}
                    {/*        /!*        /!*    <TableCell>*!/*!/*/}
                    {/*        /!*        /!*        <div className="font-medium">Liam Johnson</div>*!/*!/*/}
                    {/*        /!*        /!*        /!*<div className="hidden text-sm text-muted-foreground md:inline">*!/*!/*!/*/}
                    {/*        /!*        /!*        /!*    liam@example.com*!/*!/*!/*/}
                    {/*        /!*        /!*        /!*</div>*!/*!/*!/*/}
                    {/*        /!*        /!*    </TableCell>*!/*!/*/}
                    {/*        /!*        /!*    <TableCell className="hidden sm:table-cell">*!/*!/*/}
                    {/*        /!*        /!*        Sale*!/*!/*/}
                    {/*        /!*        /!*    </TableCell>*!/*!/*/}
                    {/*        /!*        /!*    <TableCell className="hidden sm:table-cell">*!/*!/*/}
                    {/*        /!*        /!*        <Badge className="text-xs" variant="secondary">*!/*!/*/}
                    {/*        /!*        /!*            Fulfilled*!/*!/*/}
                    {/*        /!*        /!*        </Badge>*!/*!/*/}
                    {/*        /!*        /!*    </TableCell>*!/*!/*/}
                    {/*        /!*        /!*    <TableCell className="hidden md:table-cell">*!/*!/*/}
                    {/*        /!*        /!*        2023-06-23*!/*!/*/}
                    {/*        /!*        /!*    </TableCell>*!/*!/*/}
                    {/*        /!*        /!*    <TableCell className="text-right">$250.00</TableCell>*!/*!/*/}
                    {/*        /!*        /!*</TableRow>*!/*!/*/}

                    {/*        /!*        /!*<TableRow>*!/*!/*/}
                    {/*        /!*        /!*    <TableCell>*!/*!/*/}
                    {/*        /!*        /!*        <div className="font-medium">Olivia Smith</div>*!/*!/*/}
                    {/*        /!*        /!*        /!*<div className="hidden text-sm text-muted-foreground md:inline">*!/*!/*!/*/}
                    {/*        /!*        /!*        /!*    olivia@example.com*!/*!/*!/*/}
                    {/*        /!*        /!*        /!*</div>*!/*!/*!/*/}
                    {/*        /!*        /!*    </TableCell>*!/*!/*/}
                    {/*        /!*        /!*    <TableCell className="hidden sm:table-cell">*!/*!/*/}
                    {/*        /!*        /!*        Refund*!/*!/*/}
                    {/*        /!*        /!*    </TableCell>*!/*!/*/}
                    {/*        /!*        /!*    <TableCell className="hidden sm:table-cell">*!/*!/*/}
                    {/*        /!*        /!*        <Badge className="text-xs"*!/*!/*/}
                    {/*        /!*        /!*               variant="outline"> /!* variant=["outline", "secondary", ""] *!/*!/*!/*/}
                    {/*        /!*        /!*            Declined*!/*!/*/}
                    {/*        /!*        /!*        </Badge>*!/*!/*/}
                    {/*        /!*        /!*    </TableCell>*!/*!/*/}
                    {/*        /!*        /!*    <TableCell className="hidden md:table-cell">*!/*!/*/}
                    {/*        /!*        /!*        2023-06-24*!/*!/*/}
                    {/*        /!*        /!*    </TableCell>*!/*!/*/}
                    {/*        /!*        /!*    <TableCell className="text-right">$150.00</TableCell>*!/*!/*/}
                    {/*        /!*        /!*</TableRow>*!/*!/*/}

                    {/*        /!*        /!*<TableRow>*!/*!/*/}
                    {/*        /!*        /!*    <TableCell>*!/*!/*/}
                    {/*        /!*        /!*        <div className="font-medium">Noah Williams</div>*!/*!/*/}
                    {/*        /!*        /!*        /!*<div className="hidden text-sm text-muted-foreground md:inline">*!/*!/*!/*/}
                    {/*        /!*        /!*        /!*    noah@example.com*!/*!/*!/*/}
                    {/*        /!*        /!*        /!*</div>*!/*!/*!/*/}
                    {/*        /!*        /!*    </TableCell>*!/*!/*/}
                    {/*        /!*        /!*    <TableCell className="hidden sm:table-cell">*!/*!/*/}
                    {/*        /!*        /!*        Subscription*!/*!/*/}
                    {/*        /!*        /!*    </TableCell>*!/*!/*/}
                    {/*        /!*        /!*    <TableCell className="hidden sm:table-cell">*!/*!/*/}
                    {/*        /!*        /!*        <Badge className="text-xs" variant="secondary">*!/*!/*/}
                    {/*        /!*        /!*            Fulfilled*!/*!/*/}
                    {/*        /!*        /!*        </Badge>*!/*!/*/}
                    {/*        /!*        /!*    </TableCell>*!/*!/*/}
                    {/*        /!*        /!*    <TableCell className="hidden md:table-cell">*!/*!/*/}
                    {/*        /!*        /!*        2023-06-25*!/*!/*/}
                    {/*        /!*        /!*    </TableCell>*!/*!/*/}
                    {/*        /!*        /!*    <TableCell className="text-right">$350.00</TableCell>*!/*!/*/}
                    {/*        /!*        /!*</TableRow>*!/*!/*/}

                    {/*        /!*    </TableBody>*!/*/}
                    {/*        /!*</Table>*!/*/}


                    {/*    </CardContent>*/}
                    {/*</Card>*/}
                </div>
            </div>
        </div>
    )
        ;
}
