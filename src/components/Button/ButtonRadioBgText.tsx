import { InputHTMLAttributes } from "react"

export const ButtonRadioBgText = ({ label, ...props }: Props) => {
    return (
        <label className="w-full float-left flex items-center cursor-pointer">
            <input className="btn-radio-bg-text" {...props} type={"radio"} hidden />
            <div className="w-full h-full float-left bg-button-radio flex items-center">
                <p className="w-full float-left font-[montserratsemibold] text-[13px] text-color_3 text-center">{label}</p>
            </div>
        </label>
    )
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
}