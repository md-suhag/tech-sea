"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const adminData = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Analytics",
          url: "/dashboard/admin",
        },
      ],
    },
    {
      title: "Blogs",
      url: "#",
      items: [
        {
          title: "Create Blog",
          url: "/dashboard/admin/blog/create",
          isActive: true,
        },
        {
          title: "All Blogs",
          url: "/dashboard/admin/blog/all",
        },
      ],
    },

    {
      title: "Users",
      url: "#",
      items: [
        {
          title: "All Users",
          url: "#",
        },
      ],
    },
  ],
};
const userData = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Analytics",
          url: "/dashboard/user",
        },
      ],
    },
    {
      title: "Blogs",
      url: "#",
      items: [
        {
          title: "My Blogs",
          url: "/dashboard/user/blog",
          isActive: true,
        },
        {
          title: "Create Blog",
          url: "/dashboard/user/blog/create",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h2 className="text-lg font-semibold">Tech Sea Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") &&
              adminData.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="font-medium">
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={item.isActive}
                          >
                            <Link href={item.url}>{item.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            {user?.role === "USER" &&
              userData.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="font-medium">
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={item.isActive}
                          >
                            <Link href={item.url}>{item.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
