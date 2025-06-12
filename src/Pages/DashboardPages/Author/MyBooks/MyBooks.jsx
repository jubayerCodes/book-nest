"use client"
import { useGetAuthorsQuery, useGetUsersQuery, useUpdateUserRoleMutation } from '@/lib/redux/api/usersApi';
import React, { useEffect } from 'react';
import userPhoto from "@/assets/images/default-user_1.png"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Button } from '@/Components/ui/button';
import { IconDotsVertical } from '@tabler/icons-react';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import { Input } from '@/Components/ui/input';
import Link from 'next/link';

const MyBooks = () => {

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

    const books = []

    return (
        <section className='p-5'>
            <div className="flex justify-between items-center py-4">
                <Input
                    placeholder="Search Books..."
                    value={''}
                    className="max-w-sm"
                />
                <Link href={"/dashboard/author/add-book"}>
                    <Button className={"cursor-pointer"}>Add Book</Button>
                </Link>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns?.map((column, idx) => {
                                return (
                                    <TableHead key={idx} className={`font-bold ${column?.align && `text-${column?.align}`}`} style={{ fontFamily: "var(--font-secondary)" }}>
                                        {column?.header}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    </TableHeader>
                    <TableBody style={{ fontFamily: "var(--font-secondary)" }}>
                        {books?.length ? (
                            books?.map((row) => (
                                <TableRow
                                    key={row?._id}
                                >
                                    <TableCell>
                                        <img src={row?.user_img || userPhoto.src} alt={`${row?.user_name} Photo`} className='w-10 rounded-full' />
                                    </TableCell>
                                    <TableCell>
                                        {row?.user_name}
                                    </TableCell>
                                    <TableCell>
                                        {row?.user_email}
                                    </TableCell>
                                    <TableCell>
                                        {row?.user_id}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`${row?.user_role == 'admin' ? 'bg-red-800' : row?.user_role == 'author' ? 'bg-blue-600' : 'bg-yellow-600'} text-white w-[80px] block text-center py-1 capitalize rounded-[2px]`}>{row?.user_role}</span>
                                    </TableCell>
                                    <TableCell className={'text-end'}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline"><IconDotsVertical /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" align="end">
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem onClick={() => handleUpdateRole(row?._id, "user")}>
                                                        Make User
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
};

export default MyBooks;