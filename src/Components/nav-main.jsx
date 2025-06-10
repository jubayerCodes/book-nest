"use client"

import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";

import { Button } from "@/Components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar"
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items
}) {

  const pathName = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} >
              <SidebarMenuButton tooltip={item.title} className={"cursor-pointer active:bg-black"} isActive={pathName.startsWith(item.url)}>
                {item.icon && <item.icon />}
                <Link href={item.url}>
                  {item.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
