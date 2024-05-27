import { useEffect } from "react"

export const Modal = ({ content, statusModal, changeStatusModal, btnClose, className }: Props) => {

    useEffect(() => {
        statusModal ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
    }, [statusModal])


    return (
        <div className={`${className && className} w-full h-[100vh] fixed top-0 left-0 !mt-0 !mb-0 backdrop-blur-sm flex flex-wrap items-center justify-center z-[999] ${statusModal ? '' : '!hidden'}`}>
            {btnClose &&
                <div onClick={changeStatusModal} className="fixed top-[20px] right-[30px] text-[40px] text-white font-[montserratsemibold] cursor-pointer">X</div>
            }
            {content}
        </div>
    )
}

interface Props {
    content?: JSX.Element | undefined,
    statusModal?: boolean,
    btnClose?: boolean,
    changeStatusModal?(): void,
    className?: string
}