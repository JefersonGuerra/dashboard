import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonNormal } from "../../components/Button/ButtonNormal";
import { TextInput } from "../../components/Inputs/TextInput";
import { LoadingRing } from "../../components/Loading/LoadingRing";
import ContextAuth from "../../Context/Auth";

export const Forgotpassword = () => {

    const { user } = useContext(ContextAuth);
    const [loading, setLoading] = useState<Boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        user ? navigate("/admin") : setLoading(false);
    }, [user, navigate])

    return (
        loading ?
            <div className="w-full h-[100vh] float-left flex justify-center items-center">
                <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
            </div>

            :

            <div className="w-full h-[100vh] float-left flex items-center justify-center flex-wrap">
                <div className="w-[316px] float-left">
                    <form>
                        <div className="w-full h-[50px] float-left bg-logo bg-no-repeat bg-center bg-[length:187px] mb-[40px]"></div>
                        <div className="w-full float-left flex flex-col space-y-[27px]">
                            <TextInput label="Seu e-mail de acesso" type="email" name="email" placeholder="E-mail" required />
                        </div>
                        {/* <p className="w-full float-left font-[montserratmedium] text-[14px] text-color_3 text-center ">Você receberá uma senha temporária em seu e-mail, para acessar a plataforma.</p> */}
                        <div className="w-full float-left flex justify-center mt-[48px]">
                            <ButtonNormal type={"submit"} label="ENVIAR" />
                        </div>
                    </form>
                </div>
            </div>
    );
}