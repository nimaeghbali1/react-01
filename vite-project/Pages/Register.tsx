import * as React from "react"
import Textfield from "../components/Textfield"
import SubmitButton from "../components/Button"
import LogoutButton from "../components/LogoutButton"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios"
import { loggedIn } from "../src/App"
import Loggedin from "./Loggedin"

const registerSchema = yup.object({
    email: yup.string().required("Please enter your email").email("Email is not valid! "),
    password: yup.string().required('Password is required').min(8),
    repassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
    username: yup.string().required("Please enter your name").min(3),
    address: yup.string().required("Please enter your address"),
    tel: yup.number().required("Please enter your number").typeError('Please enter number not characters!'),
    gender: yup.string().required("Please enter your number")
});


interface RegisterSchema {
    email: string,
    password: string,
    username: string,
    address: string,
    tel: number,
    gender: string

}


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    })
    const handleRegisterUser = React.useCallback(async (data: RegisterSchema): Promise<void> => {


        const existUsers = localStorage.getItem("users")
        const parsedExistUsers = existUsers ? JSON.parse(existUsers) : null
        if (parsedExistUsers) {
            const existUser = parsedExistUsers.find(
                (user: typeof data) => user.email === data.email)
            if (existUser) {
                return alert("user already exists! \n try to login")
            }

            parsedExistUsers.push(data)
            const regesterFormJson = JSON.stringify(parsedExistUsers)

            localStorage.setItem("login", "1")
            localStorage.setItem("users", regesterFormJson)
            return location.assign("/")
        }
        else {
            const regesterFormJson = JSON.stringify([data])
            localStorage.setItem("users", regesterFormJson)
        }
    }, [])

    if (!loggedIn) {
        return (
            <div className="w-screen h-screen flex">
                <img src="\bg-pic.jpg" className="object-cover h-[100%] w-[60%]" alt="background picture" />
                <form className="w-[40%] bg-blue-200 px-[60px] pt-5" onSubmit={handleSubmit(handleRegisterUser)}>
                    <div className="flex justify-around mb-[30px]">
                        <h2 className="font-semibold text-4xl text-slate-800">Let's get started now</h2>
                    </div>

                    <Textfield type="text" label="Username" placeholder="Your first name" validation={register("username")} helperText={<>{errors.username?.message ?? " "}</>} />
                    <Textfield type="email" label="Email" placeholder="Example: something@email.com" validation={register("email")} helperText={<>{errors.email?.message ?? " "}</>} />
                    <Textfield type="text" label="Adress" placeholder="Like your home" validation={register("address")} helperText={<>{errors.address?.message ?? " "}</>} />
                    <Textfield type="tel" label="Phone" placeholder="Example : 091012345678" validation={register("tel")} helperText={<>{errors.tel?.message ?? " "}</>} />
                    <Textfield type="password" label="Password" placeholder="At least 8 words" validation={register("password")} helperText={<>{errors.password?.message ?? " "}</>} />
                    <Textfield type="password" label="Re-Enter Password" placeholder="At least 8 words" validation={register("repassword")} helperText={<>{errors.repassword?.message ?? " "}</>} />
                    <Textfield label="Gender" placeholder="male or female" type="text" validation={register("gender")} />
                    <div className="flex justify-center mb-2 mt-3">
                        <p className="font-semibold text-sm  text-slate-700">
                            You already have an account?
                            <Link to="/auth/login" className="font-semibold text-sm underline text-blue-700 ml-1">
                                click here
                            </Link>
                        </p>
                    </div>
                    <SubmitButton>Create account</SubmitButton>
                </form>

            </div>
        )
    }
    else {
        return (<Loggedin />)
    }
}

export default Register