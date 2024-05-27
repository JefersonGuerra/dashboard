import { ButtonHTMLAttributes } from "react"

export const ButtonModal = ({ data, statusButtonModal, className }: Props) => {
    return (
        <div className={`w-[110px] float-left bg-[#FFFFFF] border-[1px] border-color_2 rounded-[6px] p-[10px] absolute z-50 ${statusButtonModal ? '' : 'hidden'} ${className ?? ''}`}>
            {data?.map((item, index) => (
                <button key={index} className="w-full float-left text-left" onClick={item.function}>{item.name}</button>
            ))}
        </div>
    )
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    statusButtonModal?: boolean,
    data?: {
        name: string,
        function?(): void
    }[],
}