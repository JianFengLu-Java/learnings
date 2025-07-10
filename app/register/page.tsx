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
    const [submitted, setSubmitted] = useState<Record<string, FormDataEntryValue> | null>(null)
    const [modalTitle, setModalTitle] = useState("提示")
    const [modalBody, setModalBody] = useState("默认内容")


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
        </>
    )
}