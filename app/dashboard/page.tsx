"use client"
import {LXButton} from "@/components/LXButton";
import {signOut, useSession} from "next-auth/react";
import {Avatar} from "@heroui/react";



const Dashboard = () =>{
    const session = useSession();
    return (
        <>{session?.data?.user?.name ?(<div><p className={'font-bold text-xl'}>登录成功！欢迎你{session.data.user.name}</p></div>):null}
            <Avatar as={'button'} className={'hover:bg-default-400/20 active:bg-default-600/20 active:scale-95 bg-default-500/20 transition-all duration-75'} onClick={()=>console.log('hello')}>

            </Avatar>
        </>
    )
}
export default Dashboard;