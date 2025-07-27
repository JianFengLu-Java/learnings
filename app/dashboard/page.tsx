"use client"
import {LXButton} from "@/components/LXButton";
import {signOut, useSession} from "next-auth/react";



const Dashboard = () =>{
    const session = useSession();
    return (
        <>登录成功！{session?.data?.user?.name ?(<div>{session.data.user.name}</div>):null}

        </>
    )
}
export default Dashboard;