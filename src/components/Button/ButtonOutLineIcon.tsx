import { ButtonHTMLAttributes, useState } from "react"
import { ButtonModal } from "./ButtonModal";

export const ButtonOutLineIcon = ({ label, icon, className, data, ...props }: Props) => {

    const [statusButtonModal, setStatusButtonModal] = useState<boolean>(false);

    const openModalButton = () => {
        setStatusButtonModal(!statusButtonModal);
    }

    const openModalButtonBlur = (e: any) => {

        const currentTarget = e.currentTarget;
        requestAnimationFrame(() => {
            if (!currentTarget.contains(document.activeElement)) {
                setStatusButtonModal(false);
            }
        });
    }

    return (
        <div className="relative" onBlur={(e) => openModalButtonBlur(e)}>
            <button className={`w-[167px] h-[35px] bg-[#FFFFFF] border-[1px] border-[#707070] rounded-[6px] text-[13px] text-[#363636] font-[montserratsemibold] ${className ?? ''}`} onClick={(e) => openModalButton()} {...props}>{label}<i className={`bg-no-repeat bg-center px-[6px] ml-[5px] ${icon}`}></i></button>
            {data &&
                <ButtonModal data={data} statusButtonModal={statusButtonModal} className={"bottom-[-72px] right-0"} />
            }
        </div>
    )
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string
    icon?: string,
    data?: {
        name: string,
        function?(): void
    }[],
}