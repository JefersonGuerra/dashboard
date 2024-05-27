import { Modal } from "../Modal/Modal"

export const WarningConfirm = ({ text, confirm, cancel, statusModal }: Props) => {

    return (
        <Modal
            statusModal={statusModal}
            content={
                <div className="w-[500px] bg-[#FFFFFF] border-[1px] border-[#707070] p-[15px] relative">
                    <p className="w-full p-[20px] font-[montserratsemibold] text-color_3 text-[16px] text-center">{text}</p>
                    <div className="w-full float-left flex items-center justify-between px-[18px] pt-[15px] border-t-[1px] border-color_2">
                        <div onClick={cancel} className="float-left font-[montserratsemibold] text-[#BEBEBE] cursor-pointer">Cancelar</div>
                        <div onClick={confirm} className="w-[62px] h-[32px] float-left bg-color_3 rounded-[6px] text-[14px] text-[#FFFFFF] font-[montserratsemibold] hover:bg-color_4 flex items-center justify-center cursor-pointer">OK</div>
                    </div>
                </div>
            }
        />
    )
}

interface Props {
    text?: string,
    confirm?(): void,
    cancel?(): void,
    statusModal?: boolean
}