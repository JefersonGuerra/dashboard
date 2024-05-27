import { useCallback, useEffect, useState } from "react";
import { ReactComponent as Logo } from "../../assets/img/logo_dynamics.svg";
import { FormLandingPage } from "../../components/Form/FormLandingPage";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper";
import { Card } from "../../components/Card/Card";
import { Footer } from "../../components/Footer/Footer";
import { LoadingRing } from "../../components/Loading/LoadingRing";
import api from "../../Services/Api";
import { publicIpv4 } from "public-ip";
import { Warning } from "../Warnings/Warning";
import { ButtonNormal } from "../Button/ButtonNormal";

import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";


export const LandingPageModel2 = ({ data, dataVehicles, preview, closePreview, imgBackgroundDb }: Props) => {

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
        !preview && getIp();
    }, [getIp, preview])

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

    return (
        loading ?
            <div className={`w-full h-[100vh] float-left flex justify-center items-center`}>
                <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
            </div>

            :

            <>
                <main className="h-[calc(100vh-92px)]">
                    <div className={`w-full h-[470px] float-left !bg-cover ${!preview && 'pt-[50px]'}`} style={{ background: `${imageBackground}` }}>
                        <div className="container-1360">
                            {preview &&
                                <div className="w-full float-left mt-[20px] mb-[20px] lg:mb-[40px] flex justify-center lg:justify-end lg:pr-[43px]">
                                    <ButtonNormal onClick={closePreview} label={'Clique aqui ou aperte ESC para voltar'} className={"!w-[320px]"} />
                                </div>
                            }
                            <div className="w-full float-left flex justify-center mb-[40px]">
                                <Logo className="w-[196px] h-[53px] lg:w-[239px] lg:h-[64px] float-left fill-[#6B6D6C]" style={{ fill: data?.corlogo }} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full float-left mt-[-315px] lg:mt-[-275px] mb-[50px]">
                        <div className="container-1360">
                            <div className="w-full float-left px-[25px] lg:px-[77px]">
                                <div className="w-full lg:w-1/2 float-left flex flex-wrap justify-center">
                                    <p className="w-full float-left font-[montserratsemibold] text-[30px] lg:text-[36px] text-center lg:text-left text-[#000000] lg:mt-[41px] mb-[33px] leading-[44px]" style={{ color: data?.cortitulo }}>{data?.title}</p>
                                    <div className="w-[283px] xl:w-full float-left swiper-landingpage mb-[20px] lg:mb-0">
                                        <Swiper
                                            spaceBetween={0}
                                            slidesPerView={1}
                                            slidesPerGroup={1}
                                            loop={true}
                                            navigation={true}
                                            modules={[Navigation, Pagination]}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            breakpoints={{
                                                1340: {
                                                    spaceBetween: 25,
                                                    slidesPerView: 2,
                                                    slidesPerGroup: 2,
                                                },
                                                1280: {
                                                    spaceBetween: 0,
                                                    slidesPerView: 2,
                                                    slidesPerGroup: 2,
                                                }
                                            }}
                                        >
                                            {dataVehicles && dataVehicles.map((item, index) =>
                                                <SwiperSlide key={index} className="mb-[58px]"><Card data={item} preview={preview} /></SwiperSlide>
                                            )}

                                        </Swiper>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 lg:max-w-[496px] float-right">
                                    <FormLandingPage handleSubmit={(event) => handleSubmitFormLeads(event)} />
                                </div>
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
    imgBackgroundDb?: boolean,
    closePreview?(): void
}