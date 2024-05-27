import { InputHTMLAttributes } from "react"

export const ButtonClose = ({ ...props }: Props) => {
    return (
        <input {...props} readOnly className="w-[13px] h-[13px] float-left bg-close cursor-pointer focus:outline-none" />
    )
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
}