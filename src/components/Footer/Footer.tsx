export const Footer = () => {
    return (
        <footer>
            <div className="w-full h-auto lg:h-[92px] float-left">
                <div className="w-[calc(100%-30px)] h-[2px] bg-color_2 float-left mx-[15px] hidden lg:block"></div>
                <div className="container-1360">
                    <div className="w-full float-left flex flex-wrap justify-between items-center px-[25px] lg:px-[75px] py-[23px]">
                        <p className="w-full lg:w-auto float-left font-[montserratregular] text-[11px] text-color_3 text-center order-4 lg:order-none mt-[15px] lg:mt-0">©</p>
                        <div className="w-full h-[2px] bg-color_2 float-left block lg:hidden order-3 lg:order-none mt-[10px]"></div>
                        <div className="w-[163px] h-[44px] float-left bg-logo bg-contain bg-no-repeat order-1 lg:order-none"></div>
                        <div className="w-[55px] float-left flex justify-between order-2 lg:order-none">
                            <a className="w-3/6 h-[20px] float-left bg-facebook bg-contain bg-center bg-no-repeat text-[0px]" href="https://www.facebook.com" target={"_blank"} rel="noreferrer">Facebook</a>
                            <a className="w-3/6 h-[20px] float-left bg-instagram bg-contain bg-center bg-no-repeat text-[0px]" href="https://www.instagram.com" target={"_blank"} rel="noreferrer">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}