import { useState, FormEvent, useEffect, useCallback } from "react";
import { ButtonModelLandingPage } from "../../components/Button/ButtonModelLandingPage";
import { TextInput } from "../../components/Inputs/TextInput";
import { TextAreaInput } from "../../components/Inputs/TextAreaInput";
import { VehicleInclude } from "../../components/Table/VehicleInclude";
import { ButtonRadio } from "../../components/Button/ButtonRadio";
import { ColorPicker } from "../../components/Inputs/ColorPicker";
import { FileSelect } from "../../components/Inputs/FileSelect";
import { DatePicker } from "../../components/Inputs/DatePicker";
import { ButtonNormal } from "../../components/Button/ButtonNormal";
import { ButtonOutLineNormal } from "../../components/Button/ButtonOutLineNormal";
import { ButtonRadioBgText } from "../../components/Button/ButtonRadioBgText";
import { ReactComponent as Logo } from "../../assets/img/logo_dynamics.svg";
import { Modal } from "../../components/Modal/Modal";
import { LandingPage } from "../open/LandingPage";
import api from "../../Services/Api";
import { Warning } from "../../components/Warnings/Warning";
import { LoadingRing } from "../../components/Loading/LoadingRing";
import { ListLandingPageUpdate } from "../../Types/ListLandingPageUpdate";

export const LandingPageAdm = () => {

    const [modelLandingPage, setModelLandingPage] = useState<string>('1');
    const [selectTypeBackground, setSelectTypeBackground] = useState<string>('cor');
    const [selectTypeLpBgText, setSelectTypeLpBgText] = useState<string>('texto');
    const [chooseColorLogo, setchooseColorLogo] = useState<string>();

    const [modalPreview, setModalPreview] = useState<boolean>(false);
    const [dataPreview, setDataPreview] = useState<object>();

    const [arrayVeicles, setArrayVeicles] = useState<any[]>([]);

    const [optionsWarning, setOptionsWarning] = useState<object>();

    const [loading, setLoading] = useState<boolean>(false);
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

    const [idUpdate, setIdUpdate] = useState<string | null>();
    const [arrayLandingPageUpdate, setArrayLandingPageUpdate] = useState<ListLandingPageUpdate>();
    const [arrayVehicleUpdate, setArrayVehicleUpdate] = useState<any[]>([]);
    const [imgBackgroundDb, setImgBackgroundDb] = useState<string>('');
    const [textOrImageDb, setTextOrImageDb] = useState<string>('');
    const [verifyImagePreviewBackground, setVerifyImagePreviewBackground] = useState<boolean>();
    const [verifyImagePreviewTextOrImage, setVerifyImagePreviewTextOrImage] = useState<boolean>();

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        e.currentTarget.checkValidity();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const arrayVehicleSend = arrayVeicles?.map(item => item.itemVehicle).filter(item => item !== undefined);

        if (modalPreview) {
            if (data.imagem instanceof File) {
                if (data.imagem.name !== '') {
                    setVerifyImagePreviewBackground(false)
                } else {
                    data.imagem = imgBackgroundDb;
                    setVerifyImagePreviewBackground(true);
                }
            }

            if (data.imgtexto instanceof File) {
                if (data.imgtexto.name !== '') {
                    setVerifyImagePreviewTextOrImage(false)
                } else {
                    data.imgtexto = textOrImageDb;
                    setVerifyImagePreviewTextOrImage(true);
                }
            }

            return setDataPreview(data)
        }

        setLoading(true);

        const config = {
            headers: {
                'Content-Type': `multipart/form-data`,
            }
        }

        const endPoint = idUpdate ? `landingpage/${idUpdate}/update` : 'landingpage/create';

        await api.post(endPoint, {
            title: data.title,
            text: data.text ?? null,
            background: data.background ?? null,
            imagem: data.imagem ?? 0,
            date_ini: data.date_ini,
            date_end: data.date_end,
            theme: data.theme,
            publish: 0,
            corlogo: data.corlogo,
            cortitulo: data.cortitulo,
            cortexto: data.cortexto,
            imgtexto: data.imgtexto ?? 0,
            vehicles_id: modelLandingPage !== '3' ? arrayVehicleSend : null,
        }, config).then(function (response) {
            setLoading(false);
            setOptionsWarning({ statusWarning: true, text: response.data.success, type: 0 });
        }).catch(function (error) {
            setLoading(false);
            setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
        })
    }, [modalPreview, arrayVeicles, idUpdate, imgBackgroundDb, textOrImageDb, modelLandingPage]);

    const setUpdateLandingPage = useCallback(async (id: string) => {
        setLoading(true);
        setLoadingUpdate(true);
        setIdUpdate(id);

        await api.get(`/landingpage/${id}/list_unico`, {
        }).then(function (response) {
            setArrayLandingPageUpdate(response.data.data);
            setArrayVehicleUpdate(response.data.data.vehicle);
            setArrayVeicles(response.data.data.vehicle);
            setModelLandingPage(response.data.data.theme);
            setImgBackgroundDb(response.data.data.imagem);
            setTextOrImageDb(response.data.data.imgtexto);
            response.data.data.imgtexto ? setSelectTypeLpBgText('imagem') : setSelectTypeLpBgText('texto');
            response.data.data.imagem ? setSelectTypeBackground('imagem') : setSelectTypeBackground('cor');
            setLoadingUpdate(false);
            setLoading(false);
        }).catch(function (error) {
            setLoadingUpdate(false);
            setLoading(false);
            setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
        });

    }, [])

    const escFunction = useCallback((event: any) => {
        if (event.key === "Escape") {
            setModalPreview(false);
        }
    }, []);

    useEffect(() => {
        if (modalPreview) {
            document.addEventListener("keydown", escFunction, false);
            return () => {
                document.removeEventListener("keydown", escFunction, false);
            };
        }
    }, [escFunction, modalPreview])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        id ? setUpdateLandingPage(id) : setIdUpdate(undefined);
    }, [setUpdateLandingPage])


    return (
        loadingUpdate ?

            <div className={`w-full h-[100vh] float-left flex justify-center items-center ${loading ? '' : 'hidden'}`}>
                <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
            </div>

            :

            <>
                <div className={`w-full h-[100vh] float-left flex justify-center items-center ${loading ? '' : 'hidden'}`}>
                    <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
                </div>
                <form onSubmit={handleSubmit} className={`${!loading ? '' : 'hidden'}`}>
                    <div className="w-full float-left bg-color_3 rounded-b-[16px] flex justify-center py-[60px]">
                        <div className="max-w-[665px] float-left">
                            <p className="w-full float-left text-[21px] text-[#FFFFFF] font-[montserratsemibold] mb-[8px]">MODELOS</p>
                            <div className="w-full float-left grid grid-cols-3 gap-x-[58px]">
                                <ButtonModelLandingPage onClick={(event) => setModelLandingPage(event.currentTarget.value)} defaultValue={1} name="theme" img={'bg-modelLandingPageNormal1'} imgActive={'bg-modelLandingPageActive1'} label="Imagem/Formulário/Texto" defaultChecked={arrayLandingPageUpdate?.theme ? (arrayLandingPageUpdate?.theme === '1' && true) : true} />
                                <ButtonModelLandingPage onClick={(event) => setModelLandingPage(event.currentTarget.value)} defaultValue={2} name="theme" img={'bg-modelLandingPageNormal2'} imgActive={'bg-modelLandingPageActive2'} label="Imagem/Formulário" defaultChecked={arrayLandingPageUpdate?.theme === '2' && true} />
                                <ButtonModelLandingPage onClick={(event) => setModelLandingPage(event.currentTarget.value)} defaultValue={3} name="theme" img={'bg-modelLandingPageNormal3'} imgActive={'bg-modelLandingPageActive3'} label="Texto/Formulário" defaultChecked={arrayLandingPageUpdate?.theme === '3' && true} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full float-left flex justify-center my-[40px]">
                        <div className="w-[569px] float-left flex flex-col space-y-[15px]">
                            <div className="w-full float-left flex justify-center py-[10px] rounded-[5px]" style={{ background: chooseColorLogo?.toLocaleLowerCase() === '#ffffff' ? '#6A6C6A' : '#FFFFFF' }}>
                                <Logo className={`w-[239px] h-[64px] float-left`} style={{ fill: chooseColorLogo }} />
                            </div>
                            <div className="w-full float-left">
                                <p className="w-full float-left font-[montserratsemibold] text-[14px] text-color_3 mb-[5px]">Cor da logo</p>
                                <ColorPicker defaultColor={arrayLandingPageUpdate?.corlogo ?? '#6B6D6C'} name="corlogo" onChange={(value) => setchooseColorLogo(value)} />
                            </div>
                            <TextInput required={!modalPreview} label="Título" name="title" defaultValue={arrayLandingPageUpdate?.title ?? ''} />
                            <div className="w-full float-left">
                                <p className="w-full float-left font-[montserratsemibold] text-[14px] text-color_3 mb-[5px]">Cor do Título</p>
                                <ColorPicker defaultColor={arrayLandingPageUpdate?.cortitulo ?? '#000000'} name="cortitulo" />
                            </div>
                            {modelLandingPage === '3' ?
                                selectTypeLpBgText === 'texto' &&
                                <>
                                    <TextAreaInput label="Texto" name="text" maxLength={650} defaultValue={arrayLandingPageUpdate?.text ?? ''} />
                                    <div className="w-full float-left">
                                        <p className="w-full float-left font-[montserratsemibold] text-[14px] text-color_3 mb-[5px]">Cor do Texto</p>
                                        <ColorPicker defaultColor={arrayLandingPageUpdate?.cortexto ?? '#000000'} name="cortexto" />
                                    </div>
                                </>
                                : modelLandingPage !== '2' &&
                                <>
                                    <TextAreaInput label="Texto" name="text" defaultValue={arrayLandingPageUpdate?.text ?? ''} />
                                    <div className="w-full float-left">
                                        <p className="w-full float-left font-[montserratsemibold] text-[14px] text-color_3 mb-[5px]">Cor do Texto</p>
                                        <ColorPicker defaultColor={arrayLandingPageUpdate?.cortexto ?? '#000000'} name="cortexto" />
                                    </div>
                                </>
                            }
                            {
                                modelLandingPage === '3' &&
                                <div className="w-full float-left">
                                    <div className="w-[200px] h-[35px] float-left border-[2px] border-[#707070] rounded-[6px] flex">
                                        <ButtonRadioBgText onClick={(event) => setSelectTypeLpBgText(event.currentTarget.value)} defaultValue={'texto'} name="text_or_image" label="Texto" defaultChecked={arrayLandingPageUpdate ? (selectTypeLpBgText === 'texto' ? true : false) : true} />
                                        <ButtonRadioBgText onClick={(event) => setSelectTypeLpBgText(event.currentTarget.value)} defaultValue={'imagem'} name="text_or_image" label="Imagem" defaultChecked={selectTypeLpBgText === 'imagem' ? true : false} />
                                    </div>
                                    {selectTypeLpBgText === 'imagem' &&
                                        <FileSelect name="imgtexto" label="Carregar Imagem (JPG)" accept="image/jpeg" className="ml-[16px]" />
                                    }
                                </div>
                            }
                            <div className={`${modelLandingPage !== '3' ? '' : 'hidden'}`}>
                                <VehicleInclude label="Veículo" nameBtn="Incluir Veículos" arrayVehicleUpdate={arrayVehicleUpdate} getValue={(value) => setArrayVeicles(value)} />
                            </div>
                            <div className="w-full float-left grid grid-cols-2">
                                <div className="w-full float-left">
                                    <p className="w-full float-left font-[montserratsemibold] text-[14px] text-color_3 ">Fundo</p>
                                    <div className="w-full float-left flex flex-wrap gap-x-[5px] mt-[10px]">
                                        <ButtonRadio onClick={(e) => setSelectTypeBackground(e.currentTarget.value)} name="fundo" label="Cor" value={'cor'} defaultChecked={arrayLandingPageUpdate ? (selectTypeBackground === 'cor' ? true : false) : true} />
                                        <ButtonRadio onClick={(e) => setSelectTypeBackground(e.currentTarget.value)} name="fundo" label="Imagem" value={'image'} defaultChecked={selectTypeBackground === 'imagem' ? true : false} />
                                        <div className="w-full float-left mt-[10px]">
                                            {selectTypeBackground === 'cor' ?
                                                <ColorPicker name="background" defaultColor={arrayLandingPageUpdate?.background} />
                                                :
                                                <FileSelect name="imagem" label="Carregar Imagem (JPG)" accept="image/jpeg" />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full float-left">
                                    <p className="w-full float-left font-[montserratsemibold] text-[14px] text-color_3 mb-[6px]">Período da Campanha</p>
                                    <DatePicker nameDateStart="date_ini" nameDateEnd="date_end" defaultDateStart={arrayLandingPageUpdate?.date_ini ?? undefined} defaultDateEnd={arrayLandingPageUpdate?.date_end ?? undefined} />
                                </div>
                            </div>
                            <div className="w-full float-left flex justify-center gap-x-[40px]">
                                <ButtonOutLineNormal label={"PREVIEW"} type={"submit"} onClick={() => { setModalPreview(true) }} id="btn_preview" />
                                <ButtonNormal label={idUpdate ? "ATUALIZAR" : "SALVAR"} type={"submit"} id="btn_submit" />
                            </div>
                        </div>
                    </div>
                </form>
                <Modal
                    className={`overflow-y-auto ${modalPreview && '!block'} bg-white`}
                    statusModal={modalPreview}
                    content={
                        <LandingPage data={dataPreview} dataVehicles={arrayVeicles} model={modelLandingPage} preview={true} textOrImageDb={verifyImagePreviewTextOrImage} imgBackgroundDb={verifyImagePreviewBackground} close={() => setModalPreview(false)} />
                    }
                />
                <Warning options={optionsWarning} closeWarning={() => setOptionsWarning(undefined)} />
            </>
    )
}