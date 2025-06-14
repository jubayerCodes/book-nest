"use client"

import * as React from "react"
import {
  IconBook,
  IconBook2,
  IconCategory,
  IconDashboard,
  IconShield,
  IconUserPentagon,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/Components/nav-main"
import { NavUser } from "@/Components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar"
import Link from "next/link"
import logo from "@/assets/images/booknest-logo.png"
import { useSelector } from "react-redux"


const navMenu = {
  admin: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Manage Admins",
      url: "/dashboard/admin/admins",
      icon: IconShield,
    },
    {
      title: "Manage Authors",
      url: "/dashboard/admin/authors",
      icon: IconUserPentagon,
    },
    {
      title: "Manage Users",
      url: "/dashboard/admin/users",
      icon: IconUsers,
    },
    {
      title: "Manage Books",
      url: "#",
      icon: IconBook,
    },
    {
      title: "Manage Categories",
      url: "/dashboard/admin/categories",
      icon: IconCategory,
    },
  ],
  author: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "My Books",
      url: "/dashboard/author/books",
      icon: IconBook,
    },
    {
      title: "Drafts",
      url: "/dashboard/author/drafts",
      icon: IconBook2,
    }
  ],
  user: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Purchase History",
      url: "/dashboard/user/purchase-history",
      icon: IconDashboard,
    },
    {
      title: "Wishlist",
      url: "/dashboard/user/wishlist",
      icon: IconDashboard,
    }
  ]
}

export function AppSidebar({
  ...props
}) {

  const { user } = useSelector(state => state.auth)


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-transparent">
              <Link href="/dashboard" className="h-[50px]">
                <img src={logo.src} alt="book nest" className="h-full" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMenu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
