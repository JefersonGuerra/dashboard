import { InputHTMLAttributes } from "react"

export const ButtonRadio = ({ label, ...props }: Props) => {
    return (
        <label className="float-left flex items-center justify-center">
            <input {...props} type="radio" className="w-[15px] h-[15px] accent-color_3" ></input>
            <p className="float-left font-[montserratlight] text-[14px] text-color_3 ml-[4px]">{label}</p>
        </label>
    )
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
}