import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { TextInput } from "../../components/Inputs/TextInput"
import { ButtonNormal } from "../../components/Button/ButtonNormal"
import { LoadingRing } from "../../components/Loading/LoadingRing";
import api from "../../Services/Api";
import { Warning } from "../../components/Warnings/Warning";
import ContextAuth from "../../Context/Auth";

export const Login = () => {

    const { user, setUser } = useContext(ContextAuth);
    const [loading, setLoading] = useState<Boolean>(false);
    const navigate = useNavigate();

    const [optionsWarning, setOptionsWarning] = useState<object>();

    const handleLogin = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        e.currentTarget.checkValidity();

        const [email, password] = [e.target.email.value, e.target.password.value];

        await api.post('/login', {
            email,
            password
        }).then(function (response) {
            localStorage.setItem('@App:user', JSON.stringify(response.data.user));
            localStorage.setItem('@App:token', response.data.access_token);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            setUser(response.data.user)
            setLoading(false);
        }).catch(function (error) {
            setLoading(false);
            setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
        });

    }

    useEffect(() => {
        user && navigate("/admin");
    }, [user, navigate])

    return (
        loading ?
            <div className="w-full h-[100vh] float-left flex justify-center items-center">
                <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
            </div>

            :

            <div className="w-full h-[100vh] float-left flex items-center justify-center flex-wrap">
                <div className="w-[316px] float-left">
                    <form onSubmit={handleLogin}>
                        <div className="w-full h-[50px] float-left bg-logo bg-no-repeat bg-center bg-[length:187px] mb-[40px]"></div>
                        <div className="w-full float-left flex flex-col space-y-[27px]">
                            <TextInput label="Login" type="text" name="email" placeholder="E-mail" required />
                            <TextInput label="Senha" type="password" name="password" placeholder="Senha" required />
                        </div>
                        <NavLink to={'/recuperar-senha'} className={'w-full float-left text-[12px] text-color_3 text-right font-[montserratsemibold] mt-[10px]'} >Esqueceu a senha?</NavLink>
                        <div className="w-full float-left flex justify-center mt-[48px]">
                            <ButtonNormal type={"submit"} label="ENTRAR" />
                        </div>
                    </form>
                </div>
                <Warning options={optionsWarning} closeWarning={() => setOptionsWarning(undefined)} />
            </div>
    )
}