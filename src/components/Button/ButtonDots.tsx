import { ButtonHTMLAttributes, useState } from "react"
import { ButtonModal } from "./ButtonModal"

export const ButtonDots = ({ data, ...props }: Props) => {

    const [statusButtonModalDots, setStatusButtonModalDots] = useState<boolean>(false);

    const openModalButtonDots = () => {
        setStatusButtonModalDots(!statusButtonModalDots);
    }

    const openModalButtonBlurDots = (e: any) => {

        const currentTarget = e.currentTarget;
        requestAnimationFrame(() => {
            if (!currentTarget.contains(document.activeElement)) {
                setStatusButtonModalDots(false);
            }
        });
    }
    return (
        <div className="w-full relative" onBlur={(e) => openModalButtonBlurDots(e)}>
            <button {...props} className="w-full h-[20px] float-left bg-dots bg-contain bg-center bg-no-repeat" onClick={() => openModalButtonDots()}></button>
            {
                data &&
                <ButtonModal statusButtonModal={statusButtonModalDots} data={data} className={"top-[20px] left-[calc(50%-55px)]"} />
            }
        </div>
    )
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    index?: any,
    data?: {
        name: string,
        function?(): void
    }[],
}