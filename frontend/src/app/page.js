'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {useEffect, useState} from "react";

export default function Home() {
    const STATUS = {
        null: "ERROR",
        "Not Yet": "Not Yet",
        "Processing": "Processing",
        "Completed": "Completed",
    };

    const [taskList, setTaskList] = useState(null)
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        fetch(process.env.backend_url + '/tasks/status')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setTaskList(data)
                setLoading(false)
            })
    }, []);


    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>

            <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">

                        {taskList && taskList.map((item) => (
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardDescription>Task has</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl">
                                        {item.record.length}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {STATUS[item._id]}
                                </CardFooter>
                            </Card>
                        ))}

                        {/*<Card>*/}
                        {/*    <CardHeader className="pb-2">*/}
                        {/*        <CardDescription>This Week</CardDescription>*/}
                        {/*        <CardTitle className="text-4xl">$1,329</CardTitle>*/}
                        {/*    </CardHeader>*/}
                        {/*    <CardContent>*/}
                        {/*        <div className="text-xs text-muted-foreground">*/}
                        {/*            +25% from last week*/}
                        {/*        </div>*/}
                        {/*    </CardContent>*/}
                        {/*    <CardFooter>*/}
                        {/*        <Progress value={25} aria-label="25% increase"/>*/}
                        {/*    </CardFooter>*/}
                        {/*</Card>*/}

                        {/*<Card>*/}
                        {/*    <CardHeader className="pb-2">*/}
                        {/*        <CardDescription>This Month</CardDescription>*/}
                        {/*        <CardTitle className="text-4xl">$5,329</CardTitle>*/}
                        {/*    </CardHeader>*/}
                        {/*    <CardContent>*/}
                        {/*        <div className="text-xs text-muted-foreground">*/}
                        {/*            +10% from last month*/}
                        {/*        </div>*/}
                        {/*    </CardContent>*/}
                        {/*    <CardFooter>*/}
                        {/*        <Progress value={12} aria-label="12% increase"/>*/}
                        {/*    </CardFooter>*/}
                        {/*</Card>*/}

                    </div>
                </div>
            </div>
        </div>


    );
}
