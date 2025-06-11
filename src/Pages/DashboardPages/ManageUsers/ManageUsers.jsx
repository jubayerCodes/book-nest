"use client"
import { useGetUsersQuery } from '@/lib/redux/api/usersApi';
import React, { useEffect } from 'react';
import tableData from "@/app/(pages)/dashboard/data.json"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"

const ManageUsers = () => {

    const { data } = useGetUsersQuery()


    const users = data

    useEffect(() => {
        console.log(data);
    }, [data])


    const columns = [
        {
            accessorKey: "user_img",
            header: "",
        },
        {
            accessorKey: "user_name",
            header: "Name",
        },
        {
            accessorKey: 'user_email',
            header: 'Email'
        },
        {
            accessorKey: 'user_id',
            header: 'User ID'
        },
        {
            accessorKey: 'user_role',
            header: 'Role'
        },
        {
            header: 'Actions'
        }
    ]

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns?.map((column, idx) => {
                                return (
                                    <TableHead key={idx}>
                                        {column?.header}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.length ? (
                            users?.map((row) => (
                                <TableRow
                                    key={row?._id}
                                >
                                    {
                                        columns.map((column, idx) => (
                                            <TableCell key={idx}>
                                                {row[column?.accessorKey]}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={users?.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default ManageUsers;