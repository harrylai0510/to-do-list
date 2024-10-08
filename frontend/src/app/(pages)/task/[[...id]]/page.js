'use client';

import {useState, useEffect} from "react";
import {useRouter} from 'next/navigation'
import {Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Command, CommandEmpty, CommandGroup, CommandItem, CommandList} from "@/components/ui/command"
import {Calendar} from "@/components/ui/calendar"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {cn} from "@/lib/utils"
import {Check, ChevronsUpDown, Calendar as CalendarIcon} from 'lucide-react';
import moment from "moment";
import axios from "axios";

export default function FormView({params}) {
    const taskId = params?.id ? params.id[0] : null;
    const router = useRouter()
    const [userList, setUserList] = useState(null)
    const [formData, setFormData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const statusList = [
        "Not Yet",
        "Processing",
        "Completed"
    ];

    let formSchema = z.object({
        taskName: z.string(),
        assign: z.string(),
        dueDate: z.date(),
        status: z.string(),
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: formData
    });

    async function onSubmit(values) {
        console.log(values);
        if (taskId) {
            // Update
            await axios.put(process.env.backend_url + `/tasks/${taskId}`, values)
                .then(function (res) {
                    if (res.data.status === "ok") {
                        router.push('/list');
                    }
                })
        } else {
            // Create
            await axios.post(process.env.backend_url + '/tasks', values)
                .then(function (res) {
                    if (res.data.status === "ok") {
                        router.push('/list');
                    }
                })
        }
    }

    function onCancel(e) {
        e.preventDefault();
        router.back();
    }

    useEffect(() => {
        if (taskId) {
            fetch(process.env.backend_url + `/tasks/${taskId}`)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    let formData = data;
                    formData['dueDate'] = new Date(formData['dueDate']);
                    form.reset(formData)
                    setFormData(formData)
                    setLoading(false)
                })
        }

        fetch(process.env.backend_url + '/users')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setUserList(data)
                setLoading(false)
            })
    }, []);
    if (isLoading) return <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"><p>Loading...</p></div>
    if (!userList) return <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"><p>No option data...</p></div>

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Create Task</h1>
            </div>
            <div className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="taskName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Task Name</FormLabel>
                                    <FormControl className="w-[300px]">
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="assign"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="block">Assign To</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline" role="combobox"
                                                    className={cn(
                                                        "w-[300px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? userList.find((user) => user.id === field.value)?.userName : "Select User"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] p-0">
                                            <Command>
                                                {/*<CommandInput*/}
                                                {/*    placeholder="Search framework..."*/}
                                                {/*    className="h-9"*/}
                                                {/*/>*/}
                                                <CommandList>
                                                    <CommandEmpty>No user found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {userList.map((user) => (
                                                            <CommandItem
                                                                key={user.id}
                                                                value={user.id}
                                                                onSelect={() => {
                                                                    form.setValue("assign", user.id)
                                                                }}
                                                            >
                                                                {user.userName}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4",
                                                                        user.id === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription></FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="block">Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[300px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (moment(field.value).format("DD/MM/YYYY")) : (
                                                        <span>Pick a date</span>)}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                // disabled={(date) =>
                                                //     date > new Date() || date < new Date("1900-01-01")
                                                // }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription></FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="block">Status</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline" role="combobox"
                                                    className={cn(
                                                        "w-[300px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? field.value : "Select Status"}
                                                    {/*{field.value ? statusList.find((user) => user.id === field.value)?.userName : "Select User"}*/}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] p-0">
                                            <Command>
                                                {/*<CommandInput*/}
                                                {/*    placeholder="Search framework..."*/}
                                                {/*    className="h-9"*/}
                                                {/*/>*/}
                                                <CommandList>
                                                    {/*<CommandEmpty>No user found.</CommandEmpty>*/}
                                                    <CommandGroup>
                                                        {statusList.map((status) => (
                                                            <CommandItem
                                                                // key={user.id}
                                                                value={status}
                                                                onSelect={() => {
                                                                    form.setValue("status", status)
                                                                }}
                                                            >
                                                                {status}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4",
                                                                        status === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription></FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-4">
                            <Button type="submit">Submit</Button>
                            <Button variant="outline" onClick={onCancel}>Cancel</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
