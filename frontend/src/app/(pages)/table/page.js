import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import Icons from "@/components/Icons";

export default function TableView() {
    const toDoList = [
        {
            id: "TODO00001",
            status: "Not Yet",
            taskName: "Write project brief",
            assign: "Tanner",
            due: "November 11, 2024"
        },
        {
            id: "TODO00002",
            status: "Completed",
            taskName: "Build Admin console",
            assign: "Jake Trower",
            due: "November 8, 2024"
        },
        {
            id: "TODO00003",
            status: "Processing",
            taskName: "Draft launch blog post",
            assign: "David Choi",
            due: "November 8, 2024"
        },
    ];

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Table</h1>
            </div>
            <div className="rounded-lg shadow-sm"> {/*flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm*/}
                <div className="flex flex-col items-center gap-1 text-center"> {/*flex flex-col items-center gap-1 text-center*/}
                    <div className="ml-auto flex gap-2"> {/*ml-auto flex items-center gap-2*/}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 gap-1 text-sm"
                                >
                                    <Icons name="list-filter" className="h-3.5 w-3.5"/>
                                    {/*<ListFilter className="h-3.5 w-3.5"/>*/}
                                    <span className="sr-only sm:not-sr-only">Filter</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuCheckboxItem checked>
                                    Not Yet
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Processing
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Completed
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm"
                                variant="outline"
                                className="h-7 gap-1 text-sm"
                        >
                            <Icons name="download" className="h-3.5 w-3.5"/>
                            <span className="sr-only sm:not-sr-only">Export</span>
                        </Button>
                    </div>
                    <Table className="rounded-lg shadow-sm border-collapse border border-slate-400 border-radius">
                        {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="border">Status</TableHead>
                                <TableHead className="border">Task Name</TableHead> {/*w-[100px]*/}
                                <TableHead className="border">Assign</TableHead>
                                <TableHead className="border">Due Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {toDoList.map((todo) => (
                                <TableRow key={todo.id}>
                                    <TableCell
                                        className="border text-left font-medium">{todo.status}</TableCell> {/*text-left text-right font-medium*/}
                                    <TableCell className="border text-left">{todo.taskName}</TableCell>
                                    <TableCell className="border text-left">{todo.assign}</TableCell>
                                    <TableCell className="border text-left">{todo.due}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {/*<TableFooter>*/}
                        {/*    <TableRow>*/}
                        {/*        <TableCell colSpan={3}>Total</TableCell>*/}
                        {/*        <TableCell className="text-right">$2,500.00</TableCell>*/}
                        {/*    </TableRow>*/}
                        {/*</TableFooter>*/}
                    </Table>
                </div>
            </div>
        </div>
    );
}
