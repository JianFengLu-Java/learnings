"use client"
import {LXButton} from "@/components/LXButton";
import {signOut} from "next-auth/react";

const Dashboard = ({username}:{username?:string}) =>{
    return (
        <>登录成功！
            <LXButton onPress={()=>{signOut().then(r => console.log(r))}} isBordered={true} key={'out'} color={'yellow'}>退出登录</LXButton>

        </>
    )
}
export default Dashboard;