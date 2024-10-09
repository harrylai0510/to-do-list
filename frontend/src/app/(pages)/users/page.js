'use client';

import {DataTable} from './table';
import columns from './table-column';
import {useEffect, useState} from "react";

export default function UsersView() {
    const [userList, setUserList] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(process.env.backend_url + '/users')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setUserList(data)
                setLoading(false)
            })
    }, []);

    if(!userList) return  <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"><p>No Data</p></div>;
    if (isLoading) return <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"><p>Loading...</p></div>;

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Manage Users</h1>
            </div>
            <div className="grid gap-6">
                { userList && <DataTable columns={columns} data={userList} /> }
            </div>
        </div>
    );
}
