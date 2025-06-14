"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export function NavMain({
  items
}) {

  const pathName = usePathname()

  const { role } = useSelector(state => state.auth)

  const menu = items[role]

  console.log(menu, role);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {menu?.map((item) => (
            <SidebarMenuItem key={item.title} >
              <SidebarMenuButton tooltip={item.title} className={"cursor-pointer active:bg-black"} isActive={pathName == item.url}>
                {item.icon && <item.icon />}
                <Link href={item.url} className="w-full" style={{ fontFamily: "var(--font-secondary)" }}>
                  {item.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
