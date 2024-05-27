import { InputHTMLAttributes } from "react"

export const ButtonNormal = ({ label, className, ...props }: Props) => {
    return (
        <input {...props} readOnly className={`${className ?? ''} w-[204px] h-[35px] float-left bg-color_3 rounded-[6px] text-[14px] text-[#FFFFFF] text-center font-[montserratsemibold] hover:bg-color_4 cursor-pointer focus:outline-none`} value={label && label} />
    )
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
}