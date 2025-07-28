"use client";

import { Listbox, ListboxItem } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

    const itemClass =
        "data-[selected=true]:bg-gray-100 data-[hover=true]:bg-gray-200 dark:data-[selected=true]:bg-gray-800 transition-colors";

    return (
        <div className="w-[260px] h-full px-2 py-4 border-r border-gray-200 bg-amber-50 dark:border-gray-700">
            <Listbox
                aria-label="Sidebar Navigation"
                selectedKeys={selectedKeys}
                selectionMode="single"
                onSelectionChange={(keys) => {
                    const key = Array.from(keys)[0];
                    setSelectedKeys(new Set([key]));
                    const target = keyToPath[key];
                    if (target && target !== pathname) {
                        router.push(target);
                    }
                }}
            >
                <ListboxItem key="home"
                             className={itemClass}
                description={"Home"}>

                    主页
                </ListboxItem>
                <ListboxItem key="chat" className={itemClass}>
                    聊天
                </ListboxItem>
            </Listbox>
        </div>
    );
}