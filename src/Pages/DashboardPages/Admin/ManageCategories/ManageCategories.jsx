"use client"
import React, { useState } from 'react';
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
import { Input } from '@/Components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Controller, useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { usePostCategoryMutation } from '@/lib/redux/api/booksApi';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';

const ManageCategories = () => {

    const { register, handleSubmit, reset, control } = useForm()

    const [open, setOpen] = useState(false)

    const [postCategory, { isLoading }] = usePostCategoryMutation()

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


    const categories = []


    const handleAddCategory = async (data) => {
        try {
            const res = await postCategory(data)
            if (res?.data?.success) {
                toast.success("Category added successfully!")
                reset()
                setOpen(false)
            } else if (res?.data?.exist) {
                toast.error("Category already exist!")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!")
        }
    }


    return (
        <>
            <section className='p-5'>
                <div className="flex justify-between items-center py-4">
                    <Input
                        placeholder="Search Categories..."
                        value={''}
                        className="max-w-sm"
                    />
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger>
                            <Button className={"cursor-pointer"}>Add Category</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Category</DialogTitle>
                                <DialogDescription />
                            </DialogHeader>
                            <form onSubmit={handleSubmit(handleAddCategory)}>
                                <Input placeholder="Category Name" type={"text"} name="cat_name" {...register("cat_name")} required />
                                <Controller
                                    name="cat_status"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full mt-3">
                                                <SelectValue placeholder="Category Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <Button disable={isLoading} type="submit" className={"w-full mt-3 cursor-pointer"}>Add</Button>
                            </form>

                        </DialogContent>
                    </Dialog>
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
                            {categories?.length ? (
                                categories?.map((row) => (
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
                                                        <DropdownMenuItem onClick={() => handleUpdateRole(row._id, "admin")}>
                                                            Make Admin
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleUpdateRole(row._id, "author")}>
                                                            Make Author
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns?.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </>
    );
};

export default dynamic(() => Promise.resolve(ManageCategories), { ssr: false })