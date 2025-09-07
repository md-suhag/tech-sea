import { AppSidebar } from "@/components/layout/dashboard/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | TechSea",
  description: "Tech Sea",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-accent">
      <AppSidebar className=" p-4 pr-0" />
      <SidebarInset className="bg-transparent p-4 gap-4 ">
        <header className=" rounded-md bg-white flex h-16 shrink-0 items-center gap-2 ">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
          </div>
        </header>
        <div className="rounded-xl flex-1 bg-white">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
