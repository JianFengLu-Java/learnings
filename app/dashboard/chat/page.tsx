"use client"

import {Listbox, ListboxItem} from "@heroui/react";

const chat = ()=>{
    return (<>
        <div className={'w-full h-full flex '}>
            <div className={'justify-start border-r-1.5'}>
                <Listbox variant={'faded'}>
                    <ListboxItem>121312312</ListboxItem>
                </Listbox>
            </div>
            <div className="h-full flex flex-col flex-1">
                {/* 顶部区域 */}
                <div className="h-[50px] border-b border-gray-300">
                    顶部内容
                </div>

                {/* 中间自适应区域：高度在300~500px之间可滚动 */}
                <div className="flex-1 overflow-auto border-b border-gray-300">
                    中间内容（自适应高度）
                </div>

                {/* 底部固定区域 */}
                <div className="h-[50px] shrink-0">
                    底部内容
                </div>
            </div>
        </div>
    </>)
}
export default chat;