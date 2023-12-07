import React, { type FC } from "react"
import LogoutButton from "../components/LogoutButton"

const Loggedin: FC = () => {
    return (
        <div className="w-screen h-screen flex">
            <img src="\bg-pic.jpg" className="object-cover h-[100%] w-[60%]" alt="background picture" />
            <div className="w-[40%] bg-blue-200 px-[60px] pt-5">
                <div className="flex justify-end mb-4">
                    <LogoutButton onClick={() => {
                        localStorage.setItem("login", "0")
                        return location.assign("/auth/login")
                    }}>Logout</LogoutButton>
                </div>
                <div className="flex justify-around mb-[30px]">
                    <h2 className="font-semibold text-4xl text-slate-800">You are already Logged in</h2>
                </div>
                <div className="flex justify-around mb-[30px]">
                    <img src="\tick.png" className="object-cover h-[350px] w-[350px]" alt="background picture" />
                </div>
                <div className="flex justify-around">
                    <p className="font-semibold text-md  text-slate-700">
                        If you want to log out just
                        <a href="/auth/login" className="font-semibold text-md underline text-blue-700 ml-1" onClick={() => {
                            localStorage.setItem("login", "0")
                            location.assign("/auth/login")
                        }}>
                            click here
                        </a>
                    </p>
                </div>
                <div className="flex justify-around">
                    <p className="font-semibold text-md  text-slate-700">
                        If you want to visit home page
                        <a href="/auth/login" className="font-semibold text-md underline text-blue-700 ml-1" onClick={() => {
                            location.assign("/")
                        }}>
                            click here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Loggedin