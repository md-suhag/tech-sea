"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

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

import {
  LayoutDashboard,
  BarChart2,
  Book,
  Users,
  PlusSquare,
  FileText,
} from "lucide-react";

const adminData = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      items: [{ title: "Analytics", url: "/dashboard/admin", icon: BarChart2 }],
    },
    {
      title: "Blogs",
      url: "#",
      icon: Book,
      items: [
        {
          title: "Create Blog",
          url: "/dashboard/admin/blog/create",
          icon: PlusSquare,
        },
        {
          title: "All Blogs",
          url: "/dashboard/admin/blog/all",
          icon: FileText,
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      items: [
        { title: "All Users", url: "/dashboard/admin/users", icon: Users },
      ],
    },
  ],
};

const userData = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      items: [{ title: "Analytics", url: "/dashboard/user", icon: BarChart2 }],
    },
    {
      title: "Blogs",
      url: "#",
      icon: Book,
      items: [
        { title: "My Blogs", url: "/dashboard/user/blog", icon: FileText },
        {
          title: "Create Blog",
          url: "/dashboard/user/blog/create",
          icon: PlusSquare,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { user } = useAuth();

  const isItemActive = (url: string) => pathname === url;

  const renderMenu = (menuData: typeof adminData.navMain) =>
    menuData.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <Link href={item.url} className="flex items-center gap-2 font-medium">
            {item.icon &&
              React.createElement(item.icon, { className: "h-4 w-4" })}
            {item.title}
          </Link>
        </SidebarMenuButton>
        {item.items?.length ? (
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  asChild
                  isActive={isItemActive(subItem.url)}
                >
                  <Link href={subItem.url} className="flex items-center gap-2">
                    {subItem.icon &&
                      React.createElement(subItem.icon, {
                        className: "h-4 w-4",
                      })}
                    {subItem.title}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        ) : null}
      </SidebarMenuItem>
    ));

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="">
          <h2 className="text-lg md:text-2xl font-semibold">Dashboard </h2>
          <p className="font-normal text-sm text-muted-foreground">
            {user?.role}
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") &&
              renderMenu(adminData.navMain)}
            {user?.role === "USER" && renderMenu(userData.navMain)}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
