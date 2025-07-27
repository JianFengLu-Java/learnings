"use client"

import {Link} from "@heroui/link";
import {Card, CardBody} from "@heroui/card";

import {Input} from "@heroui/input";
import {LXButton} from "@/components/LXButton";
import {Image} from "@heroui/image";
import {addToast, Avatar, Checkbox, Divider, Form, Tab} from "@heroui/react";
import {Tabs} from "@heroui/tabs";
import {useState} from "react";
import {LXQRCode} from "@/components/LXQrCode";
import {io} from "socket.io-client"
import {useRouter} from "next/navigation";
import axios from "axios";
import {signIn} from "next-auth/react";
import {useForm} from "react-hook-form";

export default function Home() {
    const [select, setSelect] = useState("access")
    const [loading, setLoading] = useState(false);

    const {register,formState:{errors},handleSubmit} = useForm()

    const router = useRouter()

    const submit = async (data) => {
        const res = await signIn("credentials", {
            name: data.name,
            password: data.password,
            redirect: false,
        });

        if (res.error) {
            addToast({ title: "Error", description: res.error });
        } else {
            router.replace("/dashboard");
        }

        setLoading(false);
    };

    // @ts-ignore
    return (
        <section className="flex flex-col h-screen items-center justify-center ">
            <Card className={'rounded-[30px]'}>
                <CardBody className="p-0 h-[600px]">

                    <div className={'flex h-full'}>
                        <div>
                            <Image draggable={false} className={'hidden md:block object-cover w-[400px] h-[600px]'}
                                   radius={"none"}
                                   src={"https://pbn-cdn-cf.lexinshengwen.com/vincent/starry-night.jpg"}/>
                        </div>
                        <Divider orientation={"vertical"}/>
                        <div className={'min-w-[450px] flex flex-col  '}>

                            <div className={'mt-8 ml-6 mb-2 md:mt-6 grid gap-2'}>
                                <p className={'text-3xl text-zinc-800 font-bold select-none opacity-80'}
                                   draggable={false}>Learnings插画管理平台</p>
                                <p className={'text-xs text-gray-400 font-medium'}>将平凡无趣的时间转化为有意义的时光</p>
                            </div>
                            <Divider/>

                            <div className={'p-8 pb-6 flex flex-col flex-1 space-y-6 mb-2'}>
                                <div className={'w-full justify-center flex h-fit'}>
                                    <Tabs selectedKey={select} onSelectionChange={setSelect}>
                                        <Tab key={'access'} title={'账号密码登录'}>

                                        </Tab>
                                        <Tab key={'qr'} title={'扫描飞书二维码'}>

                                        </Tab>


                                    </Tabs>
                                </div>
                                <div className={'w-full justify-center flex flex-col flex-1 h-full  '}>
                                    {select === "access" ? (
                                        <>

                                            <div className={'h-full w-full justify-center relative space-y-6'}>

                                                    <div className={'w-full justify-center flex mb-6'}>
                                                        <Avatar isBordered={true} size={'lg'} src={""} name={"LXER"}
                                                                className={"bg-amber-400 select-none"}/>
                                                    </div>
                                                <Form onSubmit={handleSubmit(submit)}>
                                                    <div className={'w-full h-[60px] mb-2'}>
                                                        <Input
                                                            label={'请输入账号'}
                                                            size={'sm'}
                                                            isClearable={true}
                                                            {...register('name',{
                                                                validate:(val)=>{
                                                                    if (val && val.length < 3 || val.length > 16) {
                                                                        return '错误：用户名不符合要求'
                                                                    }else if(!val){
                                                                        return '错误：用户名不能为空'
                                                                    }
                                                                    return true
                                                                }
                                                            })}
                                                            classNames={{
                                                                input: ["hover:bg-gray-100",
                                                                    "!text-zinc-700",
                                                                    "font-bold"
                                                                ],
                                                                inputWrapper: ["border",
                                                                    "bg-zinc-50",
                                                                    "data-[hover=true]:bg-zinc-100",
                                                                    "rounded-xl"
                                                                ],
                                                                label: ['peer-focus:text-blue-200', 'text-zinc-600'],

                                                            }}
                                                            className={'mb-1'}
                                                        />
                                                        {errors.name && (
                                                            <p className={`text-sm ${
                                                                errors.name.message.startsWith('错误')
                                                                    ?'text-red-500 text-[12px]'
                                                                    :errors.password.message.startsWith('警告')
                                                                        ?'text-green-400'
                                                                        :''
                                                            }`}>
                                                                {errors.name.message.split('：')[1]}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className={'w-full justify-center'}>
                                                        <Input
                                                            isClearable={true}
                                                            label={'请输入密码'}
                                                            size={'sm'}
                                                            type={'password'}
                                                            {...register('password',{
                                                                validate:(val)=>{
                                                                    if(!val){
                                                                        return '错误：密码不能为空'
                                                                    }
                                                                    if(val.length<3){
                                                                        return  '警告：密码长度小于3位'
                                                                    }
                                                                    return true
                                                                }
                                                            })}

                                                            classNames={{
                                                                input: ["hover:bg-gray-100"],
                                                                inputWrapper: ["border",
                                                                    "bg-zinc-50",
                                                                    "data-[hover=true]:bg-zinc-100",
                                                                    "rounded-xl"
                                                                ],
                                                            }}
                                                            className={'mb-1'}
                                                        />
                                                        {errors.password && (
                                                            <p className={`text-sm ${
                                                                errors.password.message.startsWith('错误')?'text-red-500 text-[12px]':errors.password.message.startsWith('警告')?'text-green-400':''
                                                            }`}>
                                                                {errors.password.message.split('：')[1]}
                                                            </p>
                                                        )}
                                                    </div>


                                                    <div
                                                        className={'grid grid-cols-1 w-full justify-center items-center gap-2 absolute bottom-3'}>
                                                        <div className={'w-full justify-between items-center flex p-2'}>
                                                            <Checkbox color={'warning'} name={'check'}>
                                                                <p className={'font-bold !text-sm !text-zinc-700'}>记住我</p>
                                                            </Checkbox>

                                                            <Link className={'cursor-help'}>
                                                                <p className={'font-bold !text-sm !text-zinc-700'}>忘记密码？</p>
                                                            </Link>
                                                        </div>

                                                        <LXButton  isBordered={true} size={'lg'} type={'submit'} isLoading={loading}>
                                                        立即登录</LXButton>
                                                        <LXButton className={'bg-zinc-100 w-full border-zinc-200'}
                                                                  isBordered={true}
                                                                  onPress={() => {
                                                                      router.replace('/register');
                                                                  }}
                                                        >现在注册</LXButton>

                                                    </div>

                                                </Form>

                                            </div>

                                        </>


                                    ) : (<div
                                            className={'w-full justify-center items-center flex flex-col flex-1 h-full '}>
                                            <LXQRCode/>
                                        </div>
                                    )}
                                </div>

                            </div>


                        </div>
                    </div>

                </CardBody>
            </Card>
        </section>
    )
        ;
}
