"use client"
import {Navbar, NavbarBrand} from "@heroui/navbar";

const UItest = ()=>{
    return(
        <>
            <div className="w-full max-w-none px-0">

            <Navbar isBordered className={'max-w-none justify-between'}>
                <NavbarBrand href="/" className={'border-gray-400'}>
                    <div className={'w-fit  h-fulls'}>hhhh</div>
                </NavbarBrand>

            </Navbar>
            <p>hello world</p>
            </div>
        </>
    );
}
export default UItest;