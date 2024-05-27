import { InputHTMLAttributes, useState } from "react"

export const ButtonCheckCircle = ({ label, ...props }: Props) => {

    const [statusCheck, setStatusCheck] = useState<Boolean>();

    return (
        <label className="float-left flex items-center justify-center cursor-pointer">
            <input hidden {...props} type="checkbox" className="accent-color_3" onClick={(e) => setStatusCheck(e.currentTarget.checked)} ></input>
            <div className="w-[15px] h-[15px] border-[2px] border-color_2 float-left rounded-[16px]">
                <div className={`w-full h-full float-left bg-color_2 ${statusCheck ? '' : 'hidden'}`}></div>
            </div>
            <p className="float-left font-[montserratlight] text-[14px] text-color_3 ml-[4px]">{label}</p>
        </label>
    )
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
}