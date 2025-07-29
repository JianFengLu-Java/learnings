"use client"

import {Listbox, ListboxItem} from "@heroui/react";
import {Input, Textarea} from "@heroui/input";
import {User} from "@heroui/user";
import {Chip} from "@heroui/chip";
import {LXButton} from "@/components/LXButton";
import {IconAdFilled, IconChevronRight} from "@tabler/icons-react";
import {Badge} from "@heroui/badge";

const chat = ()=>{
    return (<>
        <div className={'w-full h-full flex '}>
            {/*好友列表+搜索栏*/}
            <div className={'justify-start w-fit min-w-[120px] border-r-1.5 px-2 py-1'}>
                <div className={'flex items-center gap-2'}>
                    <Input variant={'faded'} className={'flex-1'} placeholder={'Search friends'}/>
                    <LXButton className={' w-[fit]'} isBordered={true} isIconOnly><IconAdFilled size={18}/></LXButton>
                </div>
                <Listbox variant={'faded'}>

                    <ListboxItem className={'truncate overflow-hidden text-ellipsis'} endContent={<Chip color={"danger"} size={"sm"} className={'text-sm'}>678</Chip>} ><User name={'bob'} avatarProps={{src:'https://http.cat/200'}} description={'1390703178@qq.com'} /></ListboxItem>

                </Listbox>
            </div>
            <div className="h-full flex flex-col flex-1">
                {/* 顶部区域 */}
                <div className="h-[85px] border-b border-gray-300 px-2 py-1 flex items-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <span>
                                <p className={'font-bold text-xl'}>好友昵称</p>
                            </span>
                            <span>
                                <Chip variant={'dot'} size={'sm'} color={'success'}>在线</Chip>
                            </span>
                        </div>
                        <span>
                            <p className={'font-sans text-sm text-default-500'}>这个人很懒，没有留下签名</p>
                        </span>
                    </div>
                </div>

                {/* 中间自适应区域：高度在300~500px之间可滚动 */}
                <div className="flex-1 overflow-auto border-b border-gray-300">
                    中间内容（自适应高度）
                </div>

                {/* 底部固定区域 */}
                <div className="min-h-[200px] shrink-0 relative">
                    <div className={'px-4 py-2 h-full w-full'}>
                        <Textarea
                            minRows={4}
                            maxRows={4}
                            description="Enter a concise description of your project."
                            label="Description"
                            placeholder="Enter your description"
                            variant="faded"
                        />
                    </div>
                    <div className={'absolute bottom-4 right-4'}>
                        <LXButton isBordered={true}>send</LXButton>
                    </div>
                </div>

            </div>
        </div>
    </>)
}
export default chat;