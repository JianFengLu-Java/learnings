"use client";

import {Listbox, ListboxItem, ListboxSection} from "@heroui/react";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {IconDashboardFilled, IconSettings} from '@tabler/icons-react';
import {IconBubbleText} from '@tabler/icons-react';

export default function SideBar() {
    const pathname = usePathname();
    const router = useRouter();

    const pathToKey = (path: string): string => {
        if (path.startsWith("/dashboard/chat")) return "chat";
        if (path.startsWith("/dashboard")) return "home";
        return "home";
    };

    const keyToPath: Record<string, string> = {
        home: "/dashboard",
        chat: "/dashboard/chat",
    };

    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([pathToKey(pathname)]));

    useEffect(() => {
        setSelectedKeys(new Set([pathToKey(pathname)]));
    }, [pathname]);
    // 设置导航列表选中样式，隐藏多余元素
    const itemClass =
        "data-[selected=true]:bg-gray-100 " +
        "data-[selected=true]:border-1.2 " +
        "data-[selected=true]:border-default-300 " +
        "data-[hover=true]:bg-gray-200 " +
        "dark:data-[selected=true]:bg-gray-800 " +
        "transition-colors " +
        "[&>span:last-child]:hidden ";
    return (
        <div className="w-full h-full px-2 py-4  dark:border-gray-700">
            <Listbox
                aria-label="Sidebar Navigation"
                selectedKeys={selectedKeys}
                selectionMode="single"
                disallowEmptySelection={true}
                onSelectionChange={(keys) => {
                    const key = Array.from(keys)[0];
                    setSelectedKeys(new Set([key]));
                    const target = keyToPath[key];
                    if (target && target !== pathname) {
                        router.push(target);
                    }
                }}

                itemClasses={{
                    base: `
      px-3 py-2 rounded-xl box-border mb-2 truncate overflow-hidden text-ellipsis
      data-[selected=true]:bg-yellow-300 data-[selected=true]:text-default-700  data-[selected=true]:outline-2 data-[selected=true]:outline-[#887b32] data-[selected=true]:outline data-[selected=true]:outline-offset-0
      data-[hover=true]:bg-yellow-300 data-[hover=true]:text-default-700 data-[hover=true]:outline-[#887b32] data-[hover=true]:outline-1 data-[hover=true]:outline data-[hover=true]:outline-offset-0
      [&>span:last-child]:hidden  
      
    `,
                }}
            >
                <ListboxItem
                    key="home"
                    // className={itemClass}
                    description={"Home"}
                    endContent={null}
                    startContent={<IconDashboardFilled size={24} className={'shrink-0'}/>}
                >
                    主页
                </ListboxItem>
                <ListboxItem key="chat"
                             startContent={
                                 <IconBubbleText
                                     size={24}
                                     className={'shrink-0'}
                                 />
                }
                    description={'Message'}
                >
                    消息
                </ListboxItem>
                <ListboxSection title={'Settings'} className={'justify-end'}>
                    <ListboxItem key="setting" startContent={<IconSettings size={24} className={'shrink-0 '}/>}>
                        设置
                    </ListboxItem>
                </ListboxSection>
            </Listbox>
        </div>
    );
}