"use client";
import { Home, LogOutIcon, UserPenIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";

export default function DashboardUserMenu() {
  const { user, setUser } = useAuth();
  const handleLogout = async () => {
    try {
      const response = await myFetch("/auth/logout", {
        method: "POST",
      });

      if (response.success) {
        toast.success("Logged out successful");
        setUser(null);
      } else toast.error("Logout fail");
    } catch (error) {
      toast.error("Logout fail");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0  hover:bg-transparent">
          <Avatar className="border border-primary/40">
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {user && user.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {user && user.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/">
              <Home size={16} className="opacity-60" aria-hidden="true" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">
              {" "}
              <UserPenIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
