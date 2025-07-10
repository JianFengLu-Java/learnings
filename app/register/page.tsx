"use client"
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import axios from "axios";
import {toast} from "@heroui/theme";
import {addToast, Form, useDisclosure} from "@heroui/react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {useState} from "react";
import {LXButton} from "@/components/LXButton";

export default function registerPage() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [modalTitle, setModalTitle] = useState("提示")
    const [modalBody, setModalBody] = useState("默认内容")
    const [submitted, setSubmitted] = useState<Record<string, FormDataEntryValue> | null>(null)

    const registerOnClick = async (e:any) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        setSubmitted(data)

        try{
            await axios.post('/api/register', {
                name:'hello',
                email:'hello@gmail.com',
                password:'123456',
            }).then((res)=>{
                console.log(res);
                addToast({
                    icon:'success',
                    title:'success',
                    description:`hello${res.data.name}`,
                })
                setModalTitle('成功')
                setModalBody(res.data)
                onOpen()
            })
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
            setModalBody(JSON.stringify(submitted))
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

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
                            <ModalBody className={'max-w-[400px] h-fit'}>
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
        </>
    )
}