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
            accessorKey: "",
            header: "",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: 'email',
            header: 'Email'
        },
        {
            accessorKey: 'uid',
            header: 'User ID'
        },
        {
            accessorKey: 'role',
            header: 'Role'
        },
        {
            accessorKey: 'actions',
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
                        {tableData?.length ? (
                            tableData?.map((row) => (
                                <TableRow
                                    key={row?.id}
                                >
                                    <TableCell>
                                        {row.id}
                                    </TableCell>
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