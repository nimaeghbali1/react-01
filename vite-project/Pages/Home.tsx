import * as React from "react"
import LogoutButton from "../components/LogoutButton"
import { loggedIn } from "../src/App";
import Login from "./Login";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import axios from "axios";


const Home = () => {
    const getUsers = localStorage.getItem("users");
    const parseGetUsers = getUsers ? JSON.parse(getUsers) : "";

    const emailSchema = yup.object({
        email: yup.string().required("Please enter your email").email("Email is not valid! ")
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(emailSchema),
    });

    const handleRemoveUser = handleSubmit((Data) => {

        const getUsers = localStorage.getItem("users");
        const parseGrtUsers = getUsers ? JSON.parse(getUsers) : "";

        const existUser = parseGrtUsers.find((user: any) => user.email !== Data.email);
        if (existUser) {
            const deleteUser = parseGrtUsers.filter(
                (user: any) => user.email !== Data.email
            );


            const jsoneDeleteUser = deleteUser ? JSON.stringify(deleteUser) : "";

            localStorage.setItem("users", jsoneDeleteUser);
        }
        else {
            return alert("user is not exist");
        }
    });


    if (loggedIn) {
        return (<div className="w-screen h-screen ">
            <div className="w-screen h-screen bg-blue-200 px-[60px] pt-5">
                <div className="flex justify-end mb-4">
                    <LogoutButton onClick={() => {
                        localStorage.setItem("login", "0")
                        return location.assign("/auth/login")
                    }}>Logout</LogoutButton>
                </div>

                <div className="flex justify-around mb-[30px]">
                    <h2 className="font-semibold text-4xl text-slate-800">Here you can see all users</h2>
                </div>
                <div className="flex justify-around">
                    <div className="flex flex-col gap-1 h-[90px]" >
                        <p className="font-semibold text-md  text-slate-700">Enter the email to delete the user</p>
                        <div className="flex w-fit bg-slate-300 rounded-md overflow-hidden text-sm">
                            <form onSubmit={handleRemoveUser}>
                                <input
                                    {...register("email")}
                                    placeholder="Example:nima@gmail.com"
                                    className="bg-slate-50 w-[300px] outline-none px-3 border-none py-1"
                                    type="email"
                                />
                                <button
                                    className="text-sm font-semibold px-4 py-1 text-slate-50 bg-blue-500 shadow-md shadow-black hover:shadow-sm "
                                >
                                    Delete
                                </button>
                            </form>
                            
                            <button
                                    onClick={()=>{
                                        localStorage.removeItem("users")
                                        location.reload()
                                    }}
                                    className="text-sm font-semibold px-4 py-1 text-slate-50 bg-red-500 shadow-md shadow-black hover:shadow-sm "
                                >
                                    Delete all users
                                </button>
                                
                            
                        </div>
                        <p className="text-red-600 text-sm font-medium">{<>{errors.email?.message ?? ""}</>}</p>
                    </div>
                </div>
                <div className="flex gap-5 justify-around">
                    <div className=" h-[500px] flex flex-col gap-2 overflow-y-auto ">

                        {Boolean(parseGetUsers)
                            ? parseGetUsers?.map((user: any) => {
                                return (
                                    <div>
                                        <div className="px-20 py-1 border-2 border-blue-700 rounded-md flex bg-blue-500">
                                            <ul className="flex flex-col ">
                                                <li className="text-slate-50 font-semibold">
                                                    <h5>{"Name : " + user?.username}</h5>
                                                    <hr className="mb-1" />
                                                    <p>{"Gender : " + user?.gender}</p>
                                                    <hr className="mb-1" />
                                                    <p>{"Email : " + user?.email}</p>
                                                    <hr className="mb-1" />
                                                    <p>{"Phone Number : " + user?.tel}</p>
                                                    <hr className="mb-1" />
                                                    <p>{"Adress : " + user?.address}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })
                            :
                            <>
                                <div className="flex justify-around mt-[50px]">
                                    <h2 className="font-semibold text-2xl text-slate-600">There is no any signed up user!</h2>
                                </div>
                                <div className="flex justify-around ">
                                    <img src="/sad.png" alt="sad icon" className="w-[300px] h-[300px]" />
                                </div>
                            </>
                        }
                    </div>

                </div>

            </div>
        </div>



        )
    }
    else {
        return <Login />
    }
}
export default Home