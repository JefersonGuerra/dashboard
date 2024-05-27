import { Fragment, useCallback, useEffect, useState } from "react";
import { TableList } from "../../components/Table/TableList";
import { ButtonOutLineIcon } from "../../components/Button/ButtonOutLineIcon";
import { ButtonPlusCircle } from "../../components/Button/ButtonPlusCircle";
import api from "../../Services/Api";
import ReactPaginate from 'react-paginate';
import { ListLeads } from "../../Types/ListLeads";
import { Warning } from "../../components/Warnings/Warning";
import { LoadingRing } from "../../components/Loading/LoadingRing";
import FileDownload from 'js-file-download';

export const Leads = () => {

    const [listIndex, setListIndex] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);

    const [optionsWarning, setOptionsWarning] = useState<object>();

    const [listLeads, setListLeads] = useState<ListLeads>();

    const [nameLandingPage, setNameLandingPage] = useState<string>();
    const [totalLeadsLandingPage, setTotalLeadsLandingPage] = useState<number>();
    const [dateLandingPageInit, setDateLandingPageInit] = useState<string>();
    const [dateLandingPageEnd, setDateLandingPageEnd] = useState<string>();

    const [idLandingPage, setIdLandingPage] = useState<string>('');
    const [numberPages, setNumberPages] = useState<number>();

    const openDetails = (index: number) => {
        if (listIndex === index) {
            setListIndex(undefined);
        } else {
            setListIndex(index);
        }
    }

    const loadLeads = useCallback(async (id: string, page: number) => {
        page === 1 ? setLoading(true) : setLoadingTable(true);
        setIdLandingPage(id);
        await api.post(`/landingpage/{id}/list_leads`, {
            id,
            page
        }).then(function (response) {
            setListLeads(response.data.data.list.data)
            setNumberPages(response.data.data.list.last_page);
            setNameLandingPage(response.data.data.title)
            setTotalLeadsLandingPage(response.data.data.leads)
            setDateLandingPageInit(response.data.data.date_ini)
            setDateLandingPageEnd(response.data.data.date_end)
            setLoading(false);
            setLoadingTable(false);
        }).catch(function (error) {
            setLoading(false);
            setLoadingTable(false);
            setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
        });
    }, [])

    const exportAllReportFile = useCallback(async (id: string, tipo: string) => {
        setLoading(true);
        await api.get('landingpage/exportar', {
            params: { id, tipo },
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
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        id && loadLeads(id, 1);
    }, [loadLeads])


    return (
        <>
            <div className={`w-full h-[100vh] float-left flex justify-center items-center ${loading ? '' : 'hidden'}`}>
                <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
            </div>
            <div className={`${!loading ? '' : 'hidden'}`}>
                <div className="w-full float-left bg-color_3 rounded-b-[16px]">
                    <div className="float-left my-[40px] ml-[40px]">
                        <p className="w-full float-left font-[montserratsemibold] text-[30px] text-white">{nameLandingPage}</p>
                        <div className="w-full float-left flex items-baseline">
                            <p className="float-left font-[montserratsemibold] text-[30px] text-white">{totalLeadsLandingPage} <span className="text-[13px]"> {totalLeadsLandingPage === 1 ? 'LEAD' : 'LEADS'}</span></p>
                            <p className="float-left font-[montserratregular] text-[16px] text-white ml-[32px]">De {dateLandingPageInit} à {dateLandingPageEnd}</p>
                        </div>
                    </div>
                </div>
                <div className="float-right mt-[25px] mr-[47px]">
                    <ButtonOutLineIcon label="Exportar Relatório" icon="bg-download" data={[{ name: 'xls', function: () => exportAllReportFile(idLandingPage, 'xls') }, { name: 'csv', function: () => exportAllReportFile(idLandingPage, 'csv') }]} />
                </div>
                {loadingTable ?
                    <div className={`w-full float-left flex justify-center items-center`}>
                        <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
                    </div>

                    :

                    <div className="w-full float-left px-[50px] mt-[20px]">
                        <TableList
                            headerList={['Usuário', 'Telefone', 'Detalhes']}
                            data={
                                listLeads && listLeads.map((item, index) =>
                                (
                                    <Fragment key={index}>
                                        <tr className="even:bg-[#FFFFFF] odd:bg-color_1 relative">
                                            <td className="text-[13px] text-color_3 font-[montserratregular] px-[12px] py-[12px]">{item.name}</td>
                                            <td className="text-[13px] text-center text-color_3 font-[montserratregular] px-[12px] py-[12px]">{item.phone}</td>
                                            <td className="flex justify-center text-[13px] text-center text-color_3 font-[montserratregular] px-[12px] py-[12px]"><ButtonPlusCircle className={`${listIndex === index ? '!bg-negativeCircle' : ''}`} onClick={() => openDetails(index)} /></td>
                                        </tr>
                                        <tr></tr>
                                        <tr>
                                            <td className={`w-full ${listIndex === index ? '' : 'hidden'}`} colSpan={5}>
                                                <div className="w-full float-left border-[1px] border-color_2 rounded-[6px] mt-[-5px] mb-[-5px] relative z-10 bg-[#FFFFFF]">
                                                    <div className="w-full float-left grid grid-cols-2 px-[35px] py-[20px]">
                                                        <div className="w-full float-left">
                                                            <p className="w-full float-left text-[14px] text-color_3 font-[montserratregular]">E-mail</p>
                                                            <p className="w-full float-left text-[14px] text-color_3 font-[montserratlight]">{item.email}</p>
                                                        </div>
                                                        {/* <div className="w-full float-left">
                                                    <p className="w-full float-left text-[14px] text-color_3 font-[montserratregular]">Mensagem</p>
                                                    <p className="w-full float-left text-[14px] text-color_3 font-[montserratlight]">Lorem ipsum dolor sit amet. Quo veritatis vitae ut assumenda voluptatibus et enim dolorem qui repudiandae nostrum ut voluptas laudantium eos vero asperiores et galisum harum. Est consequuntur voluptatum eos autem quae est perspiciatis beatae eos fugiat eveniet sit incidunt iusto et recusandae minus.</p>
                                                </div> */}
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
            </div>
            <div className="w-full float-left mt-[20px] mb-[45px] flex justify-center">
                <ReactPaginate
                    className="paginate-library"
                    breakLabel="..."
                    nextLabel=""
                    onPageChange={(e) => { loadLeads(idLandingPage, e.selected + 1) }}
                    pageRangeDisplayed={8}
                    pageCount={numberPages ?? 1}
                    previousLabel=""
                />
            </div>
            <Warning options={optionsWarning} closeWarning={() => setOptionsWarning(undefined)} />
        </>
    )
}