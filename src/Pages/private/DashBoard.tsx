import { useState, Fragment, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonOutLineIcon } from "../../components/Button/ButtonOutLineIcon";
import { TableList } from "../../components/Table/TableList";
import { ButtonPlusCircle } from "../../components/Button/ButtonPlusCircle";
import { ButtonDots } from "../../components/Button/ButtonDots";
import { Warning } from "../../components/Warnings/Warning";
import ReactPaginate from 'react-paginate';
import { ListLandingPage } from "../../Types/ListLandingPage";
import { LoadingRing } from "../../components/Loading/LoadingRing";
import api from "../../Services/Api";
import { WarningConfirm } from "../../components/Warnings/WarningConfirm";
import { LandingPage } from "../open/LandingPage";
import { Modal } from "../../components/Modal/Modal";
import FileDownload from 'js-file-download';
import ImgTest from "../../assets/img/img_test.png";

export const DashBoard = () => {

    const [listIndex, setListIndex] = useState<number>();
    const [loadingTable, setLoadingTable] = useState<boolean>(false);

    const [optionsWarning, setOptionsWarning] = useState<object>();

    const [listLandingPage, setListLandingPage] = useState<ListLandingPage>();
    const [listLandingPageScoreLeads, setListLandingPageScoreLeads] = useState<ListLandingPage>();
    const [numberPages, setNumberPages] = useState<number>();
    const [resetPagination, setResetPagination] = useState<Boolean>(false);

    const [warningConfirm, setWarningConfirm] = useState<JSX.Element>();
    const [loading, setLoading] = useState<boolean>(false);

    const [modalPreview, setModalPreview] = useState<boolean>(false);
    const [dataPreview, setDataPreview] = useState<object>();
    const [arrayVeicles, setArrayVeicles] = useState<any[]>();
    const [modelLandingPage, setModelLandingPage] = useState<string>('1');

    const navigate = useNavigate();

    const openDetails = (index: number) => {
        if (listIndex === index) {
            setListIndex(undefined);
        } else {
            setListIndex(index);
        }
    }

    const loadLandingPage = useCallback(async (page?: number) => {

        setLoadingTable(true);

        if (!page) {
            page = 1;
        }

        await api.get(`/landingpage/all?page=${page}`, {
        }).then(function (response) {
            setListLandingPage(response.data.data);
            page === 1 && setListLandingPageScoreLeads(response.data.data);
            setNumberPages(response.data.last_page);
            setResetPagination(false);
            setLoadingTable(false);
        }).catch(function (error) {
            setLoadingTable(false);
            setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
        });

    }, [])

    const publishLandingPage = useCallback(async (id: number) => {
        setLoadingTable(true);
        await api.put(`landingpage/{id}/publish/{publi_id}/status`, {
            id,
            publi_id: 1
        }).then(function (response) {
            setResetPagination(true);
            setOptionsWarning({ statusWarning: true, text: response.data.success, type: 0 });
            loadLandingPage();
        }).catch(function (error) {
            setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
        }).finally(() => {
            setLoadingTable(false);
        })
    }, [loadLandingPage])

    const showWarningConfirm = (value: any) => {
        setWarningConfirm(<WarningConfirm confirm={() => deleteLandingPage(value)} cancel={() => setWarningConfirm(<WarningConfirm statusModal={false} />)} statusModal={true} text={'Você deseja realmente apagar essa landing page?'} />)
    }

    const deleteLandingPage = useCallback(async (id: number) => {
        setWarningConfirm(<WarningConfirm statusModal={false} />);
        setLoadingTable(true);
        setResetPagination(true);
        await api.delete(`/landingpage/${id}/delete`, {
        }).then(function (response) {
            setLoading(false);
            setOptionsWarning({ statusWarning: true, text: response.data.success, type: 0 });
            loadLandingPage();
        }).catch(function (error) {
            setLoading(false);
            setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
        })
    }, [loadLandingPage])

    const showPreview = (id: number) => {
        setModalPreview(true);
        const dataPreview = listLandingPage?.filter(item => item.id === id).reduce(item => item);
        const modelPreview = listLandingPage?.filter(item => item.id === id).map(item => item.theme);
        const arrayVeiclesPreview = listLandingPage?.filter(item => item.id === id).map(item => item.vehicle).reduce(item => item);
        setDataPreview(dataPreview);
        setModelLandingPage(`${modelPreview}`);
        setArrayVeicles(arrayVeiclesPreview);
    }

    const escFunction = useCallback((event: any) => {
        if (event.key === "Escape") {
            setModalPreview(false);
        }
    }, []);

    const exportAllReportFile = useCallback(async (tipo: string) => {
        setLoading(true);
        await api.get('landingpage/download', {
            params: { tipo },
            responseType: 'blob'
        }).then(function (response) {
            setLoading(false);
            FileDownload(response.data, `relatorio.${tipo}`);
            setOptionsWarning({ statusWarning: true, text: 'Relatório Exportado', type: 0 });
        }).catch(function (error) {
            setLoading(false);
            setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
        });
    }, [])

    useEffect(() => {
        if (modalPreview) {
            document.addEventListener("keydown", escFunction, false);
            return () => {
                document.removeEventListener("keydown", escFunction, false);
            };
        }
    }, [escFunction, modalPreview])

    useEffect(() => {
        loadLandingPage();
    }, [loadLandingPage])

    return (
        loading ?
            <div className={`w-full h-[100vh] float-left flex justify-center items-center`}>
                <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
            </div>

            :

            <>
                <div className="w-full float-left bg-color_3 rounded-b-[16px]">
                    <p className="w-full float-left text-[21px] text-[#FFFFFF] font-[montserratsemibold] pl-[50px] mt-[45px] mb-[20px]">LEADS DE MAIOR RESULTADO</p>
                    <div className="w-full float-left mb-[25px] flex justify-center flex-row space-x-[25px]">
                        {listLandingPageScoreLeads && listLandingPageScoreLeads.slice(0, 4).sort((a, b) => (b.leads - a.leads)).sort((a, b) => (b.publish - a.publish)).map((item, index) =>
                            <div key={index} className="w-[230px] float-left rounded-[16px] bg-[#FFFFFF]">
                                <p className="w-full float-left text-[13px] text-center text-color_3 font-[montserratsemibold] mt-[10px] px-[35px] whitespace-nowrap overflow-hidden text-ellipsis" title={item.title}>{item.title}</p>
                                <p className="w-full float-left text-[70px] text-center text-[#333333] font-[montserratsemibold] leading-[86px]">{item.leads}</p>
                                <p className="w-full float-left text-[13px] text-center text-color_3 font-[montserratsemibold] leading-[16px]">NOVOS LEADS</p>
                                <p className="w-full float-left text-[10px] text-center text-color_3 font-[montserratregular] leading-[10px] mt-[20px] mb-[10px]">De {item.date_ini} à {item.date_end}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="float-right mt-[25px] mr-[47px]">
                    <ButtonOutLineIcon label="Exportar Relatório" icon="bg-download" data={[{ name: 'xls', function: () => exportAllReportFile('xls') }, { name: 'csv', function: () => exportAllReportFile('csv') }]} />
                </div>
                {loadingTable ?
                    <div className={`w-full float-left flex justify-center items-center`}>
                        <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
                    </div>
                    :
                    <div className="w-full float-left px-[50px] mt-[20px]">
                        <TableList
                            headerList={['Nome da Campanha', 'Período da campanha', 'Leads', 'Detalhes', 'Ações']}
                            data={
                                listLandingPage && listLandingPage.map((item, index) =>
                                (
                                    <Fragment key={index}>
                                        <tr className="even:bg-[#FFFFFF] odd:bg-color_1 relative">
                                            <td className="text-[13px] text-color_3 font-[montserratregular] px-[12px] py-[12px]">{item.publish === 1 && <i className="w-[12px] bg-publish bg-contain bg-no-repeat bg-center px-[7px] mr-[12px]"></i>}{item.title}</td>
                                            <td className="text-[13px] text-center text-color_3 font-[montserratregular] px-[12px] py-[12px]">De {item.date_ini} à {item.date_end}</td>
                                            <td className="text-[13px] text-center text-color_3 font-[montserratregular] px-[12px] py-[12px]">{item.leads}</td>
                                            <td className="flex justify-center text-[13px] text-center text-color_3 font-[montserratregular] px-[12px] py-[12px]"><ButtonPlusCircle className={`${listIndex === index ? '!bg-negativeCircle' : ''}`} onClick={() => openDetails(index)} /></td>
                                            <td className="text-[13px] text-center text-color_3 font-[montserratregular] px-[12px] py-[12px]"><ButtonDots data={[{ name: 'Publicar', function: () => publishLandingPage(item.id) }, { name: 'Preview', function: () => showPreview(item.id) }, { name: 'Leads', function: () => navigate(`/admin/leads?id=${item.id}`) }, { name: 'Editar', function: () => navigate(`/admin/landing-page?id=${item.id}`) }, { name: 'Excluir', function: () => showWarningConfirm(item.id) }]} /></td>
                                        </tr>
                                        <tr></tr>
                                        <tr>
                                            <td className={`w-full ${listIndex === index ? '' : 'hidden'}`} colSpan={5}>
                                                <div className="w-full float-left border-[1px] border-color_2 rounded-[6px] mt-[-5px] mb-[-5px] relative z-10 bg-[#FFFFFF]">
                                                    <div className="w-full float-left grid grid-cols-2 px-[35px] py-[20px]">
                                                        <div className="w-full float-left grid grid-cols-2 col-span-2">
                                                            <div className="w-full float-left p-[10px]">
                                                                <p className="w-full float-left text-[14px] text-color_3 font-[montserratregular]">Título</p>
                                                                <p className="w-full float-left text-[14px] text-color_3 font-[montserratlight]">{item.title}</p>
                                                            </div>
                                                            <div className="w-full float-left p-[10px]">
                                                                <p className="w-full float-left text-[14px] text-color_3 font-[montserratregular]">Outras informações</p>
                                                                {item.vehicle.map((valueVehicle, indexVehicle) =>
                                                                    <p key={indexVehicle} className="w-full float-left text-[14px] text-color_3 font-[montserratlight]">{valueVehicle.vehicles}</p>
                                                                )}
                                                            </div>
                                                            <div className="w-full float-left p-[10px]">
                                                                <p className="w-full float-left text-[14px] text-color_3 font-[montserratregular]">{item.theme === "3" ? 'Texto / Imagem' : 'Texto'}</p>
                                                                {item.text ?
                                                                    <p className="w-full float-left text-[14px] text-color_3 font-[montserratlight]">{item.text}</p>
                                                                    :
                                                                    <img src={item.imgtexto !== "" ? item.imgtexto : ImgTest} alt={item.title} className="max-w-[500px]" />
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </Fragment>
                                ))
                            }
                        />
                    </div>
                }
                {!resetPagination &&
                    <div className="w-full float-left mt-[20px] mb-[45px] flex justify-center">
                        <ReactPaginate
                            className="paginate-library"
                            breakLabel="..."
                            nextLabel=""
                            onPageChange={(e) => { loadLandingPage(e.selected + 1) }}
                            pageRangeDisplayed={8}
                            pageCount={numberPages ?? 1}
                            previousLabel=""
                        />
                    </div>
                }
                <Modal
                    className={`overflow-y-auto ${modalPreview && '!block'} bg-white`}
                    statusModal={modalPreview}
                    content={
                        <LandingPage data={dataPreview} dataVehicles={arrayVeicles} model={modelLandingPage} preview={true} textOrImageDb={true} imgBackgroundDb={true} close={() => setModalPreview(false)} />
                    }
                />
                {warningConfirm}
                <Warning options={optionsWarning} closeWarning={() => setOptionsWarning(undefined)} />
            </>
    )
}