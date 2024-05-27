import { useState, InputHTMLAttributes, useEffect } from "react";

export const ColorPicker = ({ onChange, defaultColor, ...props }: Props) => {

    const colors = ['#000000', '#474747', '#BCBCBC', '#ECECEC', '#FFFFFF', '#FF4343', '#FF0579', '#FF00C3', '#8600FF', '#1000FF', '#00ABFF', '#00FFD5', '#3B9F34', '#3AFF00', '#FFE500', '#FF8800'];
    const [chosenColor, setChosenColor] = useState<string>(defaultColor ?? '');
    const [saveColor, setSaveColor] = useState<string>(defaultColor ?? '');
    const [openModalColorsStatus, setOpenModalColorsStatus] = useState<boolean>(false);

    const addColor = (color: string) => {
        setChosenColor(color);
        onChange && onChange(color);
    }

    const changeColors = (color: string) => {

        setChosenColor(color);

        setTimeout(() => {
            onChange && onChange(color);
        }, 500);
    }

    const saveColors = (color: string) => {
        setSaveColor(color);
        onChange && onChange(color);
        setOpenModalColorsStatus(false);
    }

    const cancelColors = (color: string) => {
        setChosenColor(color);
        onChange && onChange(color);
        setOpenModalColorsStatus(false);
    }

    const openModalColors = () => {
        setOpenModalColorsStatus(!openModalColorsStatus);
    }

    const openModalColorsBlur = (e: any) => {
        const currentTarget = e.currentTarget;
        requestAnimationFrame(() => {
            if (!currentTarget.contains(document.activeElement)) {
                setOpenModalColorsStatus(false);
                cancelColors(saveColor);
                setTimeout(() => {
                    onChange && onChange(saveColor);
                }, 500);
            }
        });
    }

    useEffect(() => {
        onChange && onChange(chosenColor);
    }, [onChange, chosenColor])


    return (
        <div className="relative" tabIndex={-1} onBlur={(e) => openModalColorsBlur(e)}>
            <input {...props} hidden readOnly value={saveColor} />
            <div onClick={() => openModalColors()} style={{ backgroundColor: chosenColor }} className="w-[35px] h-[35px] float-left border-[3px] border-color_1 rounded-[33px] cursor-pointer"></div>
            {openModalColorsStatus &&
                <div className="w-[310px] h-[210px] float-left border-[3px] border-color_2 rounded-[8px] bg-white absolute top-[-210px] z-20">
                    <div className="w-full float-left grid grid-cols-6 p-[15px] gap-[8px]">
                        {colors.map((item, index) =>
                            <div onClick={() => addColor(item)} key={index} className={`w-[35px] h-[35px] float-left  border-[3px] border-color_1 rounded-[33px] cursor-pointer`} style={{
                                backgroundColor: item
                            }}></div>
                        )}
                        <label className="float-left bg-plus bg-[length:18px_18px] bg-center bg-no-repeat cursor-pointer">
                            <input type={'color'} className="opacity-0 cursor-pointer" onChange={(e) => changeColors(e.target.value)} />
                        </label>
                    </div>
                    <div className="w-full float-left flex items-center justify-between px-[18px] pt-[10px] border-t-[1px] border-color_2">
                        <div onClick={() => cancelColors(saveColor)} className="float-left font-[montserratsemibold] text-[#BEBEBE] cursor-pointer">Cancelar</div>
                        <div onClick={() => saveColors(chosenColor)} className="w-[62px] h-[32px] float-left bg-color_3 rounded-[6px] text-[14px] text-[#FFFFFF] font-[montserratsemibold] hover:bg-color_4 flex items-center justify-center cursor-pointer">OK</div>
                    </div>
                </div>
            }
        </div>
    )
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    onChange?(value: any): void,
    defaultColor?: string
}