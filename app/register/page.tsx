"use client"
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import axios from "axios";
import {toast} from "@heroui/theme";
import {
    addToast,
    Form,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure
} from "@heroui/react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {useEffect, useState} from "react";
import {LXButton} from "@/components/LXButton";
import {Card, CardBody} from "@heroui/card";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Bar, BarChart} from "recharts";

export default function registerPage() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [submitted, setSubmitted] = useState<Record<string, FormDataEntryValue> | null>(null)
    const [modalTitle, setModalTitle] = useState("提示")
    const [modalBody, setModalBody] = useState("默认内容")

    const data =[
        {
            day:"one",
            desktop:22,
            mobile:4,
        },
        {
            day:"2",
            desktop:22,
            mobile:455,
        },
        {
            day:"3",
            desktop:922,
            mobile:454,
        },
        {
            day:"4",
            desktop:522,
            mobile:644,
        },
        {
            day:"5",
            desktop:422,
            mobile:434,
        },
        {
            day:"5",
            desktop:922,
            mobile:484,
        },
    ]

    const chartsConfig = {
        desktop:{
            label:'桌面',
            color:'#008967',
        },
        mobile:{
            label: '移动',
            color:'#00AEB4',
        }
    } satisfies ChartConfig




    const registerOnClick = async (e:any) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        setSubmitted(data)

        try{
            const res = await axios.post('/api/register', {
                name:data.name,
                email:data.email,
                password:data.password,
            })
            if(res.data.code === 200){
                setModalTitle('成功')
                setModalBody(JSON.stringify(res.data.data.name)+"注册成功");
                onOpen()
                addToast({
                    title:'ok',
                    description:'register success',
                    variant:'bordered',
                    radius:'full'
                })

            }
            else{
                setModalTitle('注册失败')
                setModalBody(res.data.message);
                onOpen()
            }
        }catch(err){
            console.log("hello",err);
            addToast({
                icon:'error',
                title:'error',
                description:err.message,
                color:'danger',
                variant:'bordered',
                timeout:1000
            })
            setModalTitle("失败")
            setModalBody(JSON.stringify(data)+`${err.message}`)
            onOpen()
        }

    }
    return (
        <>
            欢迎注册
            <Form onSubmit={registerOnClick}>
                <Input label={'输入用户名'} name={'name'}/>
                <Input label={'输入密码'} type={'password'} name={'password'} />
                <Input label={'重复密码'} type={'password'} name={'password_confirmation'}/>
                <Input label={'邮箱'} type={'email'} name={'email'}/>
                <Button type={'submit'}>注册</Button>
            </Form>
            <Table>
                <TableHeader>
                    <TableColumn>hello</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key={'1'}>
                        <TableCell>name</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                <ModalContent className="overflow-x-hidden break-all">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
                            <ModalBody>
                                <p>
                                    {modalBody}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <LXButton isBordered={true}  onPress={onClose}>
                                    OK
                                </LXButton>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Card shadow={'sm'}>
                <CardBody>
                    <ChartContainer config={chartsConfig} className={'w-full min-h-[200px]'}>
                        <BarChart data={data}>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent/>}/>

                            <Bar dataKey={'desktop'} radius={5} fill={'var(--color-desktop)'}/>
                            <Bar dataKey={'mobile'} radius={5} fill={'var(--color-mobile)'}/>
                        </BarChart>

                    </ChartContainer>
                </CardBody>
            </Card>
        </>
    )
}