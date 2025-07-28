"use client"
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import {Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/react";
import {Link} from "@heroui/link";
import {LXButton} from "@/components/LXButton";
import {SessionProvider, signOut} from "next-auth/react";
import {Input} from "@heroui/input";
import SideBar from "@/components/SideBar";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <SessionProvider>
            <div className={'w-full h-screen flex flex-col'}>


            <Navbar isBordered={true}  className={"w-screen px-0 flex"} classNames={
                {
                    wrapper:'max-w-none px-6 '
                }
            }>

                    <NavbarBrand className={'pl-1'}>
                        <p className={'font-bold text-xl'}>Learnings</p>
                    </NavbarBrand>
                    <NavbarContent className="hidden sm:flex gap-4" justify="center">
                        <NavbarItem>
                            <Input radius={"full"}
                                   placeholder={"Search..."}
                                   classNames={
                                {
                                    input: ["hover:bg-gray-100"],
                                    inputWrapper: ["border",
                                        "bg-zinc-50",
                                        "data-[hover=true]:bg-zinc-100",
                                        "rounded-xl"
                                    ],
                                }
                            }/>
                        </NavbarItem>
                        <NavbarItem isActive>
                            <Link aria-current="page" href="#">
                                Customers
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="#">
                                Integrations
                            </Link>
                        </NavbarItem>

                    </NavbarContent>
                    <NavbarContent className={'hidden sm:flex gap-4'} justify={'end'}>
                        <Dropdown placement={'bottom-end'}>
                            <DropdownTrigger>
                                <Avatar as={'button'} isBordered>JJJ</Avatar>
                            </DropdownTrigger>
                            <DropdownMenu variant={'flat'}>
                                <DropdownItem key={'sign-out'} onPress={()=>{
                                    console.log("hello")
                                    signOut()
                                }}>退出登陆</DropdownItem>
                            </DropdownMenu>

                        </Dropdown>
                    </NavbarContent>

            </Navbar>
            <div className="flex flex-1">
                <div className={'w-fit '}>
                    <SideBar />
                </div>
                <div className={'flex-1'}>
                    {children}</div>
                <div className={'w-[150px] bg-green-500'}>you</div>
            </div>
            </div>

        </SessionProvider>
    )
}