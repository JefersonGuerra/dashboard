import { useEffect, useState } from "react"

export const Warning = ({ options, closeWarning }: Props) => {

    const [container, setContainer] = useState<string>();
    const [textContainer, setTextContainer] = useState<string>();
    const [iconContainer, setIconContainer] = useState<string>();

    useEffect(() => {

        switch (options?.type) {
            case 0:
                setContainer('border-color_6 bg-[#D1E7DD]');
                setTextContainer('text-color_6');
                setIconContainer('bg-check');
                break;
            case 1:
                setContainer('border-color_7 bg-[#FFD4D4]');
                setTextContainer('text-color_7');
                setIconContainer('bg-warning');
                break;

            default:
                break;
        }

    }, [options?.type])

    useEffect(() => {
        if (options?.statusWarning) {
            setTimeout(() => {
                closeWarning && closeWarning();
            }, 5000);
        }
    }, [closeWarning, options?.statusWarning])

    return (
        <>
            <div className={`max-w-[475px] fixed top-0 p-[20px] border-[1px] ${container} rounded-[6px] flex items-center z-[9999] ${options?.statusWarning ? 'show_warning' : 'hide_warning'}`}>
                <div className={`w-[25px] h-[25px] float-left ${iconContainer} bg-contain bg-no-repeat bg-center mr-[23px]`}></div>
                <p className={`w-full float-left text-[14px] ${textContainer} font-[montserratmedium]`}>{options?.text}</p>
            </div>
        </>
    )
}

interface Props {
    options?: { statusWarning?: boolean, text?: string, type?: number },
    closeWarning?(): void
}