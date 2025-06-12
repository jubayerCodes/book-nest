"use client"
import { Button } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import { SidebarTrigger } from "@/Components/ui/sidebar"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const navMenu = {
  admin: [
    {
      title: "Dashboard",
      url: "/dashboard",

    },
    {
      title: "Manage Admins",
      url: "/dashboard/admin/admins"
    },
    {
      title: "Manage Authors",
      url: "/dashboard/admin/authors"
    },
    {
      title: "Manage Users",
      url: "/dashboard/admin/users"
    },
    {
      title: "Manage Books",
      url: "#"
    },
    {
      title: "Manage Categories",
      url: "/dashboard/admin/categories"
    },
  ],
  author: [
    {
      title: "Dashboard",
      url: "/dashboard"
    },
    {
      title: "My Books",
      url: "/dashboard/author/books"
    },
    {
      title: "Drafts",
      url: "/dashboard/author/drafts"
    },
    {
      title: "Add Book",
      url: "/dashboard/author/add-book"
    }
  ],
  user: [
    {
      title: "Dashboard",
      url: "/dashboard"
    },
    {
      title: "Purchase History",
      url: "/dashboard/user/purchase-history"
    },
    {
      title: "Wishlist",
      url: "/dashboard/user/wishlist"
    }
  ]
}

export function SiteHeader() {
  const { role } = useSelector(state => state.auth)

  const pathName = usePathname()
  const title = navMenu[role].find(nav => nav.url === pathName)?.title

  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <Link
              href="/"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground">
              Go to Home
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
