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
import dynamic from 'next/dynamic';
import { Input } from '@/Components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Controller, useForm } from 'react-hook-form';
import { useGetAuthorsQuery, usePostAuthorMutation } from '@/lib/redux/api/authorsApi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { toast } from 'sonner';
import { FaCheck, FaTimes } from 'react-icons/fa';

const ManageAuthors = () => {

    const { register, handleSubmit, reset, control } = useForm()

    const [open, setOpen] = useState(false)

    const { data, refetch, isLoading: authorsLoading } = useGetAuthorsQuery("", {
        refetchOnMountOrArgChange: true
    })

    const [postAuthor, { isLoading }] = usePostAuthorMutation()


    const authors = data?.authors


    const columns = [
        {
            accessorKey: "author_img",
            header: "",
        },
        {
            accessorKey: "author_name",
            header: "Name",
        },
        {
            accessorKey: "author_featured",
            header: "Featured",
        },
        {
            accessorKey: "author_status",
            header: "Status",
        },
        {
            header: 'Actions',
            align: "end"
        }
    ]


    const handleAddAuthor = async (data) => {
        try {
            const res = await postAuthor(data)
            if (res?.data?.success) {
                toast.success("Author added successfully!")
                reset()
                setOpen(false)
                refetch()
            } else if (res?.data?.exist) {
                toast.error("Author already exist!")
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
                        placeholder="Search Authors..."
                        value={''}
                        className="max-w-sm"
                    />
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger>
                            <Button className={"cursor-pointer"}>Add Author</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Author</DialogTitle>
                                <DialogDescription />
                            </DialogHeader>
                            <form onSubmit={handleSubmit(handleAddAuthor)}>
                                <Input placeholder="Author Name" type={"text"} name="author_name" {...register("author_name")} required />
                                <Controller
                                    name="author_status"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full mt-3">
                                                <SelectValue placeholder="Author Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <div className="flex items-center gap-2 mt-3">
                                    <input name='author_featured' type="checkbox" id='author_featured' {...register("author_featured")} />
                                    <label htmlFor="author_featured">Featured?</label>
                                </div>
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
                                        <TableHead key={idx} className={`nth-[1]:w-[300px] nth-[2]:w-[200px] font-bold ${column?.align && `text-${column?.align}`}`} style={{ fontFamily: "var(--font-secondary)" }}>
                                            {column?.header}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        </TableHeader>
                        <TableBody style={{ fontFamily: "var(--font-secondary)" }}>
                            {authors?.length ? (
                                authors?.map((row) => (
                                    <TableRow
                                        key={row?._id}
                                    >
                                        <TableCell>
                                            <img src={row?.author_img || userPhoto.src} alt={`${row?.author_name} Photo`} className='w-10 rounded-full' />
                                        </TableCell>
                                        <TableCell className={"font-bold"}>
                                            {row?.author_name}
                                        </TableCell>
                                        <TableCell>
                                            <span>{row?.author_featured ? <FaCheck className='p-1 w-[20px] h-[20px] bg-green-600 text-white rounded-full' /> : <FaTimes className='text-red-600 text-[20px]' />}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`${row?.author_status == 'active' ? 'bg-green-700' : "bg-red-800"} text-white w-[80px] block text-center py-1 capitalize rounded-md`}>{row?.author_status}</span>
                                        </TableCell>
                                        <TableCell className={'text-end'}>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline"><IconDotsVertical /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56" align="end">
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem>
                                                            Update Author
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

export default dynamic(() => Promise.resolve(ManageAuthors), { ssr: false });