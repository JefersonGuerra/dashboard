import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ContextAuth from "../Context/Auth";
import { Menu } from "../components/Menu/Menu"
import { LoadingRing } from "../components/Loading/LoadingRing";

export const PrivateRoutes = () => {

    const { user } = useContext(ContextAuth)
    const navigate = useNavigate();

    useEffect(() => {
        !user && navigate('/login');
    }, [user, navigate])

    return (
        !user ?
            <div className="w-full h-[100vh] float-left flex justify-center items-center">
                <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
            </div>

            :

            <>
                <Menu />
                <div className="w-[calc(100%-268px)] float-right">
                    <Outlet />
                </div>
            </>
    );
};
