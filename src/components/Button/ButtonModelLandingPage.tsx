import { InputHTMLAttributes } from "react"

export const ButtonModelLandingPage = ({ label, img, imgActive, ...props }: Props) => {

    return (
        <label className="w-[182px] float-left cursor-pointer model-item">
            <input {...props} type="radio" className="w-[182px] float-left hidden" />
            <div className={`w-full h-[112px] float-left ${img} bg-contain bg-no-repeat bg-center model-item-normal`}></div>
            <div className={`w-full h-[112px] float-left ${imgActive} bg-contain bg-no-repeat bg-center model-item-active hidden`}>
                <div className="w-[25px] h-[30px] float-right bg-publish bg-contain bg-no-repeat mt-[6px] mr-[6px]"></div>
            </div>
            <p className="w-full float-left text-[10px] text-[#FFFFFF] font-[montserratregular] text-left mt-[5px]">{label}</p>
        </label>
    )
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    img?: string,
    imgActive?: string,
}