import { InputHTMLAttributes } from "react"

export const ButtonOutLineNormal = ({ label, className, ...props }: Props) => {
    return (
        <input {...props} readOnly className={`${className ?? ''} w-[204px] h-[35px] float-left bg-white border-[2px] border-color_3 rounded-[6px] text-[14px] text-color_3 text-center font-[montserratsemibold] hover:bg-color_4 hover:text-[#FFFFFF] cursor-pointer focus:outline-none`} value={label && label} />
    )
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
}