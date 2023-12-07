import React, { ReactNode , type FC, Children } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children : ReactNode
}
const GoogleButton : FC<ButtonProps> = ({children , ...restProps}) =>{
    return (
        <button {...restProps} className="w-[200px]  shadow-slate-600 shadow-md active:shadow-none flex justify-around items-center h-[40px] bg-slate-50 hover:bg-slate-200 active:bg-slate-300 text-slate-50 text-lg font-semibold p-2 rounded-lg">{children}</button>
    )

}
export default GoogleButton