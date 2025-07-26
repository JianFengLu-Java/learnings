"use client"
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import { Button } from "@heroui/react";
import {Link} from "@heroui/link";
import {LXButton} from "@/components/LXButton";
import {signOut} from "next-auth/react";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            <div className="flex h-screen">
                <div className={'w-[120px] bg-blue-500'}>侧边</div>
                <div className={'flex-1 flex-col flex'}>
                    <Navbar isBordered={true}  className={"w-full px-4 !max-w-full"}>

                        <NavbarContent className="hidden sm:flex gap-4" justify="center">
                            <NavbarItem>
                                <Link color="foreground" href="#">
                                    Features
                                </Link>
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
                            <LXButton onPress={()=>{signOut().then(r => console.log(r))}} isBordered={true} key={'out'} color={'yellow'}>退出登录</LXButton>

                        </NavbarContent>
                    </Navbar>

                    {children}</div>
                <div className={'w-[150px] bg-green-500'}>you</div>
            </div>

        </>
    )
}