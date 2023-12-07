import * as React from "react"
import Textfield from "../components/Textfield"
import GoogleButton from "../components/Button2"
import SubmitButton from "../components/Button"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios"
import { loggedIn } from "../src/App"
import Loggedin from "./Loggedin"

interface LoginSchema {
    email: string,
    password: string
}

const loginSchema = yup.object({
    email: yup.string().required("Please enter your email"),
    password: yup.string().required("Please enter your password")
})

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    })
    const handleLoginUser = React.useCallback(async (data: LoginSchema): Promise<void> => {
        try {
            
            const existUsers = localStorage.getItem("users")
            const parsedExistUsers = existUsers ? JSON.parse(existUsers) : null
            const existUser = parsedExistUsers.find(
                (user: typeof data) => user.email === data.email && user.password === data.password)
            if (existUser) {
                localStorage.setItem("login", "1")
                return location.assign("/")
            }
            else {
                return alert("gmail or password is not valid \n please try again")
            }
            
        }
        catch (err) {
            console.log(err)
        }
    }, [])
    if (!loggedIn){
        
    return (
        <div className="w-screen h-screen flex">
            <img src="\bg-pic.jpg" className="object-cover h-[100%] w-[60%]" alt="background picture" />
            <form className="w-[40%] bg-blue-200 px-[60px] pt-5" onSubmit={handleSubmit(handleLoginUser)}>
                <div className="flex justify-around mb-[30px]">
                    <h2 className="font-semibold text-4xl text-slate-800">Welcome back</h2>
                </div>

                <Textfield type="email" label="Email" placeholder="Example@email.com" validation={register("email")} helperText={<>{errors.email?.message ?? " "}</>} />
                <Textfield type="password" label="Password" placeholder="At least 8 words" validation={register("password")} helperText={<>{errors.password?.message ?? " "}</>} />
                <div className="flex items-center mt-10 gap-2">
                    <GoogleButton><img src="/google.png" alt="google icon" className="w-[30px]" /></GoogleButton>
                    <div className="h-[2px] w-[80px] bg-slate-400 rounded-3xl"></div>
                    <p className="font-semibold text-md text-slate-500">or</p>
                    <div className="h-[2px] w-[80px] bg-slate-400 rounded-3xl"></div>
                    <GoogleButton><img src="/facebook.png" alt="facebook icon" className="w-[30px]" /></GoogleButton>
                </div>
                <div className="flex justify-center mb-2 mt-6">
                    <p className="font-semibold text-sm  text-slate-700">
                        Don't you have an account yet?
                        <Link to="/auth/register" className="font-semibold text-sm underline text-blue-700 ml-1">
                            click here
                        </Link>
                    </p>
                </div>
                <SubmitButton>Login</SubmitButton>
            </form>

        </div>
    )
    }
    else{
        return <Loggedin/>
    }
}

export default Login

