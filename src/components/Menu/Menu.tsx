import { useContext } from "react";
import { ButtonNormal } from "../Button/ButtonNormal"
import { useNavigate } from "react-router-dom"
import ContextAuth from "../../Context/Auth";

export const Menu = () => {

    const { user, setUser } = useContext(ContextAuth);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('@App:user');
        localStorage.removeItem('@App:token');
        setUser(undefined)
    }

    return (
        <div className="w-[268px] h-[100vh] float-left fixed top-0 left-0 border-r-[2px] border-color_1">
            <div className="w-full h-[50px] float-left bg-logo bg-contain bg-center bg-no-repeat mt-[60px]"></div>
            <div className="w-full float-left flex items-center justify-center flex-wrap flex-col space-y-[15px] mt-[85px]">
                <ButtonNormal label="DASHBOARD" onClick={() => navigate('/admin')} />
                <ButtonNormal label="LANDING PAGE" onClick={() => navigate('/admin/landing-page')} />
                <ButtonNormal label="USUÁRIOS" onClick={() => navigate('/admin/usuarios')} />
            </div>
            <div className="w-full h-[130px] float-left bg-color_3 absolute bottom-0 left-0 rounded-t-[16px]">
                <div className="float-left mt-[16px] ml-[22px] flex items-center">
                    {user.image ?
                        <div className="w-[50px] h-[50px] float-left rounded-[50px] flex items-start justify-center overflow-hidden">
                            <img src={user.image} alt="imagem de perfil" className="min-h-[50px]"/>
                        </div>
                        :
                        <div className="w-[50px] h-[50px] float-left bg-user bg-contain bg-no-repeat bg-center"></div>
                    }
                    <p className="float-left textt-[16px] text-[#FFFFFF] font-[montserratsemibold] ml-[18px]">{user.name}</p>
                </div>
                <p onClick={handleLogout} className="float-left text-[16px] text-[#FFFFFF] font-[montserratsemibold] absolute right-[25px] bottom-[15px] cursor-pointer">Sair</p>
            </div>
        </div>
    )
}