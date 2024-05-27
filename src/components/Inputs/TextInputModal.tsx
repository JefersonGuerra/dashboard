import { InputHTMLAttributes } from "react"

export const TextInputModal = ({ label, ...props }: Props) => {
    return (
        <div>
            <p className="w-full float-left text-[13px] text-color_3 font-[montserratsemibold]">{label}</p>
            <input className="w-full h-[53px] float-left border-[2px] border-color_1 rounded-[6px] pl-[11px] text-[14px] text-color_3 font-[montserratlight] placeholder:text-color_2" {...props} ></input>
        </div>
    )
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
}