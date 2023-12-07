import React, { ReactNode, type FC } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}
const LogoutButton: FC<ButtonProps> = ({ children, ...restProps }) => {
    return (
        <button {...restProps} className="w-[100px] hover:shadow-sm hover:shadow-slate-600 shadow-slate-600 shadow-md active:shadow-none flex justify-around items-center h-[30px] bg-blue-500 hover:bg-blue-500 active:bg-blue-500 text-slate-50 text-lg font-semibold p-2 rounded-lg">{children}</button>
    )

}
export default LogoutButton