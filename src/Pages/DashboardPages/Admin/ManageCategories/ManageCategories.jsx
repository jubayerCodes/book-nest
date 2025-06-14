"use client"
import React, { useEffect, useState } from 'react';
import userPhoto from "@/assets/images/default-user_1.png"

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
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
import { IconCheck, IconChecklist, IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconCross, IconDotsVertical } from '@tabler/icons-react';
import { Input } from '@/Components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Controller, useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useGetAdminCategoriesQuery, usePostCategoryMutation } from '@/lib/redux/api/booksApi';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import { Label } from '@/Components/ui/label';
import { FaCheck, FaTimes } from 'react-icons/fa';

const ManageCategories = () => {

    const { register, handleSubmit, reset, control } = useForm()

    const [open, setOpen] = useState(false)

    const [postCategory, { isLoading }] = usePostCategoryMutation()

    const { data, isLoading: categoryFetchLoading, refetch } = useGetAdminCategoriesQuery()

    const columns = [
        {
            accessorKey: "cat_name",
            header: "Category",
        },
        {
            accessorKey: "cat_featured",
            header: "Featured",
        },
        {
            accessorKey: "cat_status",
            header: "Status",
        },
        {
            header: 'Actions',
            align: "end"
        },
    ]


    const categories = data?.categories

    useEffect(() => {
        console.log(data);
    }, [data])


    const handleAddCategory = async (data) => {
        try {
            const res = await postCategory(data)
            if (res?.data?.success) {
                toast.success("Category added successfully!")
                reset()
                setOpen(false)
                refetch()
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
                                <div className="flex items-center gap-2 mt-3">
                                    <input name='cat_featured' type="checkbox" id='cat_featured' {...register("cat_featured")} />
                                    <label htmlFor="cat_featured">Featured?</label>
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
                            {categories?.length ? (
                                categories?.map((row) => (
                                    <TableRow
                                        key={row?._id}
                                    >
                                        <TableCell className={"font-bold"}>
                                            {row?.cat_name}
                                        </TableCell>
                                        <TableCell>
                                            <span>{row?.cat_featured ? <FaCheck className='p-1 w-[20px] h-[20px] bg-green-600 text-white rounded-full' /> : <FaTimes className='text-red-600 text-[20px]'/>}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`${row?.cat_status == 'active' ? 'bg-green-700' : "bg-red-800"} text-white w-[80px] block text-center py-1 capitalize rounded-md`}>{row?.cat_status}</span>
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
                {/* <div className="flex items-center justify-end w-full">
                    <div className="hidden items-center gap-2 lg:flex">
                        <Label htmlFor="rows-per-page" className="text-sm font-medium">
                            Rows per page
                        </Label>
                        <Select>
                            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                                <SelectValue placeholder={"select"} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50]?.map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        Page 2 of 7
                    </div>
                    <div className="ml-auto flex items-center gap-2 lg:ml-0">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => { }}
                            disabled={false}>
                            <span className="sr-only">Go to first page</span>
                            <IconChevronsLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => { }}
                            disabled={false}>
                            <span className="sr-only">Go to previous page</span>
                            <IconChevronLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => { }}
                            disabled={false}>
                            <span className="sr-only">Go to next page</span>
                            <IconChevronRight />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden size-8 lg:flex"
                            size="icon"
                            onClick={() => { }}
                            disabled={false}>
                            <span className="sr-only">Go to last page</span>
                            <IconChevronsRight />
                        </Button>
                    </div>
                </div> */}
            </section>
        </>
    );
};

export default dynamic(() => Promise.resolve(ManageCategories), { ssr: false })