import { ButtonHTMLAttributes } from "react"

export const ButtonPlusCircle = ({ className, ...props }: Props) => {
    return (
        <button {...props} className={`${className ?? ''} w-[20px] h-[20px] float-left bg-plusCircle bg-contain bg-no-repeat bg-center`}></button>
    )
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {

}