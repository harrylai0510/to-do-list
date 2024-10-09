'use client';

import {Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useState, useEffect} from "react";
import {useRouter} from 'next/navigation'
import {useForm} from "react-hook-form";
import axios from "axios";
import {z} from "zod";

export default function EditView({params}) {
    const userId = (params.id === "create") ? null : params.id;
    console.log(userId)
    const router = useRouter()
    const [formData, setFormData] = useState(null)
    const [isLoading, setLoading] = useState(true)

    let formSchema = z.object({
        userName: z.string().trim().nonempty()
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: formData
    });

    async function onSubmit(values) {
        // console.log(values);
        if (userId) {
            // Update
            await axios.put(process.env.backend_url + `/users/${userId}`, values)
                .then(function (res) {
                    if (res.data.status === "ok") {
                        router.push('/users');
                    }
                })
        } else {
            // Create
            await axios.post(process.env.backend_url + '/users', values)
                .then(function (res) {
                    if (res.data.status === "ok") {
                        router.push('/users');
                    }
                })
        }
    }

    function onCancel(e) {
        e.preventDefault();
        router.back();
    }

    useEffect(() => {
        if (userId) {
            fetch(process.env.backend_url + `/users/${userId}`)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    form.reset(data)
                    setFormData(data)
                    setLoading(false)
                })
        }
        else {
            setLoading(false)
        }
    }, []);

    if (isLoading) return <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"><p>Loading...</p></div>
    if (userId && !formData) return <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"><p>No data...</p></div>

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Edit User</h1>
            </div>
            <div className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="userName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>User Name</FormLabel>
                                    <FormControl className="w-[300px]">
                                        <Input placeholder="" {...field} />
                                    </FormControl>
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
    )
}
