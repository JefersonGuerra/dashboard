import { useCallback, useEffect, useState } from "react";
import { ReactComponent as Logo } from "../../assets/img/logo_dynamics.svg";
import { FormLandingPage } from "../Form/FormLandingPage";
import { Card } from "../Card/Card";
import { Footer } from "../Footer/Footer";
import { LoadingRing } from "../../components/Loading/LoadingRing";
import api from "../../Services/Api";
import { Warning } from "../Warnings/Warning";
import { publicIpv4 } from 'public-ip';
import { ButtonNormal } from "../Button/ButtonNormal";

export const LandingPageModel1 = ({ data, dataVehicles, preview, closePreview, imgBackgroundDb }: Props) => {

    const [loading, setLoading] = useState<Boolean>(false);
    const [imageBackground, setImageBackground] = useState<string>();
    const [iP, setIp] = useState<string>();

    const [optionsWarning, setOptionsWarning] = useState<object>();

    const handleSubmitFormLeads = useCallback(async (event: any) => {
        event.preventDefault();
        event.currentTarget.checkValidity();
        const dataForm = Object.fromEntries(new FormData(event.currentTarget));

        if (preview) return;

        setLoading(true);

        await api.post('/leads/create', {
            name: dataForm.name,
            phone: dataForm.phone,
            whatsapp: dataForm.whatsapp === "on" ? 1 : 0,
            email: dataForm.email,
            date: dataForm.date,
            cpf: dataForm.cpf,
            ip: iP,
            landingpage_id: data.id,
        }).then(function (response) {
            setLoading(false);
            setOptionsWarning({ statusWarning: true, text: 'Formulário enviado com sucesso!', type: 0 });
        }).catch(function (error) {
            setLoading(false);
            setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
        })

    }, [preview, iP, data])

    const getIp = useCallback(async () => {
        setIp(await publicIpv4())
    }, [])

    useEffect(() => {
        if (preview) {
            if (data?.imagem) {
                if (!imgBackgroundDb) {
                    setLoading(true);
                    const reader = new FileReader();

                    reader.onload = function (e: any) {
                        setImageBackground(`url(${e.target.result}) no-repeat center`);
                        setLoading(false);
                    }

                    reader.readAsDataURL(data?.imagem);
                } else {
                    setImageBackground(`url(${data?.imagem}) no-repeat center`);
                }
            } else {
                setImageBackground(data?.background);
            }
        } else {
            data?.imagem ? setImageBackground(`url(${data?.imagem}) no-repeat center`) : setImageBackground(`${data?.background}`);
        }
    }, [data, preview, imgBackgroundDb])

    useEffect(() => {
        !preview && getIp();
    }, [getIp, preview])


    return (
        loading ?
            <div className={`w-full h-[100vh] float-left flex justify-center items-center`}>
                <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
            </div>

            :

            <>
                <main>
                    <div className="w-full h-auto lg:h-[805px] float-left !bg-cover" style={{ background: `${imageBackground}` }}>
                        <div className="container-1360">
                            {preview &&
                                <div className="w-full float-left mt-[20px] mb-[20px] lg:mb-[40px] flex justify-center lg:justify-end lg:pr-[43px]">
                                    <ButtonNormal onClick={closePreview} label={'Clique aqui ou aperte ESC para voltar'} className={"!w-[320px]"} />
                                </div>
                            }
                            <div className={`w-full float-left px-[25px] lg:px-[77px] ${!preview && 'pt-[50px]'}`}>
                                <div className="w-full lg:w-1/2 float-left lg:pr-[52px] flex justify-center flex-wrap lg:block">
                                    <Logo className="w-[196px] h-[53px] lg:w-[239px] lg:h-[64px] float-left fill-[#6B6D6C]" style={{ fill: data?.corlogo }} />
                                    <p className="w-full float-left font-[montserratsemibold] text-[30px] lg:text-[36px] mt-[25px] lg:mt-[41px] leading-[37px]" style={{ color: data?.cortitulo }}>{data?.title}</p>
                                    <p className="w-full float-left font-[montserratregular] text-[16px] mt-[20px] xl:mt-[55px]" style={{ color: data?.cortexto }}>
                                        {data?.text}
                                    </p>
                                </div>
                                <div className="w-full lg:w-1/2 float-right mt-[30px] mb-[44px] lg:mt-0 lg:mb-0">
                                    <FormLandingPage handleSubmit={(event) => handleSubmitFormLeads(event)} />
                                </div>
                            </div>
                            <div className="w-full h-[38px] float-left bg-downArrow bg-center bg-[length:65px] bg-no-repeat mt-[47px] hidden lg:block"></div>
                        </div>
                    </div>
                    <div className="w-full float-left">
                        <div className="container-1360">
                            <div className="w-full float-left my-[50px] lg:my-[60px] px-[25px] lg:px-[77px] inline-grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-[26px] justify-items-center">
                                {dataVehicles && dataVehicles.map((item, index) =>
                                    <Card key={index} data={item} />
                                )}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
                {!preview &&
                    <Warning options={optionsWarning} closeWarning={() => setOptionsWarning(undefined)} />
                }
            </>
    )
}
interface Props {
    data?: any,
    dataVehicles?: any[],
    preview?: boolean,
    closePreview?(): void,
    imgBackgroundDb?: boolean
}