import { InputHTMLAttributes, useState } from "react"

export const FileSelect = ({ label, className, ...props }: Props) => {

    const [path, setPath] = useState<string>();

    const getValueFile = (e: any) => {
        if (e.target.value !== '') {
            setPath(e.target.value.match(/[^\\/]*$/)[0]);
        } else {
            setPath(label);
        }
    }

    return (
        <label className={`${className ?? ''} w-[195px] h-[35px] float-left bg-color_3 rounded-[6px] text-[14px] text-[#FFFFFF] font-[montserratsemibold] hover:bg-color_4 flex items-center justify-center cursor-pointer`}>
            <p className="whitespace-nowrap overflow-hidden text-ellipsis px-[12px]">{path ?? label}</p>
            <input onChange={(e) => getValueFile(e)} {...props} type={'file'} hidden />
        </label>
    )
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
}