import { User } from "@prisma/client";
import { clear } from "console";
import type { Icon } from "lucide-react";

export type NavItem = {
    title: String;
    href: String;
    disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
    
}