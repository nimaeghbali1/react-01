import React, { ReactNode , type FC, Children } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children : ReactNode
}
const SubmitButton : FC<ButtonProps> = ({children , ...restProps}) =>{
    return (
        <button {...restProps} className="w-full bg-blue-700 hover:bg-blue-800 active:shadow-none active:bg-blue-900 text-slate-50 text-lg font-semibold p-2 rounded-lg shadow-slate-600 shadow-md">{children}</button>
    )

}
export default SubmitButton