import { TextareaHTMLAttributes } from "react"

export const TextAreaInput = ({ label, ...props }: Props) => {
    return (
        <label>
            <p className="w-full float-left text-[14px] text-color_3 font-[montserratsemibold] mb-[5px]">{label}</p>
            <textarea className="w-full h-[200px] border-[2px] border-color_2 rounded-[6px] pl-[11px] py-[11px] text-[14px] text-color_3 font-[montserratlight] placeholder:text-color_2" {...props} ></textarea>
        </label>
    )
}

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string,
}