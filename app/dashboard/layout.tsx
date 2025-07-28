"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@heroui/navbar";
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
} from "@heroui/react";
import { SessionProvider, signOut } from "next-auth/react";
import SideBar from "@/components/SideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarWidth, setSidebarWidth] = useState(260);
    const isResizing = useRef(false);

    const MIN_WIDTH = 200;
    const MAX_WIDTH = 400;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing.current) return;
            const newWidth = Math.min(Math.max(e.clientX, MIN_WIDTH), MAX_WIDTH);
            setSidebarWidth(newWidth);
        };

        const handleMouseUp = () => {
            isResizing.current = false;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <SessionProvider>
            <div className="w-full h-screen flex flex-col">
                {/* Navbar */}
                <Navbar
                    isBordered

                    className="w-screen px-0 flex"
                    classNames={{
                        wrapper: "max-w-none px-6",
                    }}
                >
                    <NavbarBrand className="pl-1">
                        <p className="font-bold text-xl">Learnings</p>
                    </NavbarBrand>

                    <NavbarContent className="hidden sm:flex gap-4" justify="center">
                        <NavbarItem>
                            <Input
                                radius="full"
                                placeholder="Search..."
                                classNames={{
                                    input: ["hover:bg-gray-100"],
                                    inputWrapper: [
                                        "border",
                                        "bg-zinc-50",
                                        "data-[hover=true]:bg-zinc-100",
                                        "rounded-xl",
                                    ],
                                }}
                            />
                        </NavbarItem>
                    </NavbarContent>

                    <NavbarContent className="hidden sm:flex gap-4" justify="end">
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar as="button" isBordered>
                                    JJJ
                                </Avatar>
                            </DropdownTrigger>
                            <DropdownMenu variant="flat">
                                <DropdownItem
                                    key="sign-out"
                                    onPress={() => {
                                        signOut();
                                    }}
                                >
                                    退出登录
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarContent>
                </Navbar>

                {/* Main Layout */}
                <div className="flex flex-1 w-full overflow-hidden">
                    {/* Sidebar (fixed pixel width) */}
                    <div
                        style={{ width: sidebarWidth }}
                        className="bg-white dark:bg-gray-900 border-r-2 border-gray-300 dark:border-gray-700"
                    >
                        <SideBar />
                    </div>

                    {/* Drag handle */}
                    <div
                        onMouseDown={() => (isResizing.current = true)}
                        className="w-2 cursor-col-resize"
                    />

                    {/* Main content */}
                    <div className="flex-1 overflow-auto dark:bg-gray-800">
                        {children}
                    </div>

                    {/* Optional right panel (fixed width or percentage) */}
                    <div className="w-[180px] border-l-2 border-default-300  p-4 shrink-0">
                        功能开发中。。
                    </div>
                </div>
            </div>
        </SessionProvider>
    );
}