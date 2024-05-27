import { useState, Fragment, useCallback, useEffect, useRef } from "react";
import { ButtonNormal } from "../Button/ButtonNormal";
import { Modal } from "../Modal/Modal";
import { SelecIcon } from "../Inputs/SelectIcon";
import { ButtonClose } from "../Button/ButtonClose";
import api from "../../Services/Api";
import { Warning } from "../Warnings/Warning";
import { ListVehicle } from "../../Types/ListVehicle";
import { WarningConfirm } from "../Warnings/WarningConfirm";

import noImg from "../../assets/img/em-breve-card.png";
import { LoadingRing } from "../Loading/LoadingRing";

export const VehicleInclude = ({ label, nameBtn, getValue, arrayVehicleUpdate }: Props) => {

    const refScroll = useRef<HTMLDivElement | null>(null);

    const [optionsWarning, setOptionsWarning] = useState<object>();

    const [arraySelectBrand, setArraySelectBrand] = useState<ListVehicle>();

    const [statusModal, setStatusModal] = useState<boolean>();
    const [countGroupSelect, setCountGroupSelect] = useState<number[]>([1]);

    const [loadingSelect, setLoadingSelect] = useState<boolean>(false);

    const [identifySelect, setIdentifySelect] = useState<number>();

    const [arrayVehicleSelected, setArrayVehicleSelected] = useState<any[]>([]);
    const [arrayVehicleConfirmed, setArrayVehicleConfirmed] = useState<any[]>([]);

    const [warningConfirm, setWarningConfirm] = useState<JSX.Element>();
    const [loading, setLoading] = useState<boolean>(false);

    const [arrayVehicleUpdateFilter, setArrayVehicleUpdateFilter] = useState<any[]>();

    const changeStatusModal = () => {
        setStatusModal(!statusModal);
    }

    const groupSelectChange = (itemArray?: number) => {
        if (itemArray) {
            if (countGroupSelect.length > 1) {
                const newArraySelects = countGroupSelect.filter(item => item !== itemArray);
                const newArrayVehicleSub = arrayVehicleSelected.filter(item => item.item !== itemArray);
                setCountGroupSelect(newArraySelects);
                setArrayVehicleSelected(newArrayVehicleSub);
            }
        } else {
            const lastElementArray = countGroupSelect.slice(-1).reduce(item => item);
            setCountGroupSelect([...countGroupSelect, lastElementArray + 1]);
            refScroll.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    let timer: NodeJS.Timeout;

    const onchangeSearch = async (value: any, identify: number) => {

        clearTimeout(timer);

        timer = setTimeout(async function validate() {
            if (value) {
                setLoadingSelect(true);
                await api.post('/vehicles/search/{vehicle}/{pag_ini}/{pag_end}', {
                    vehicle: value,
                    pag_ini: 1,
                    pag_end: 18
                }).then(function (response) {
                    setArraySelectBrand(response.data.veiculos);
                    setIdentifySelect(identify);
                }).catch(function (error) {
                    setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
                }).finally(() => {
                    setLoadingSelect(false);
                })
            }
        }, 2000);
    }

    const showWarningConfirm = (idLandinPage: number, idVehicle: number) => {
        setWarningConfirm(<WarningConfirm confirm={() => deleteVehicle(idLandinPage, idVehicle)} cancel={() => setWarningConfirm(<WarningConfirm statusModal={false} />)} statusModal={true} text={'Você deseja realmente apagar esse veículo?'} />)
    }

    const deleteVehicle = useCallback(async (idLandinPage: number, idVehicle: number) => {
        setLoading(true);
        setWarningConfirm(<WarningConfirm statusModal={false} />);

        await api.delete(`landingpage/${idLandinPage}/vehicle/${idVehicle}/desvincular`, {
        }).then(function (response) {

            const newArrayVehicleUpdate = arrayVehicleUpdateFilter?.filter(item => item.id !== idVehicle);
            setArrayVehicleUpdateFilter(newArrayVehicleUpdate);
            newArrayVehicleUpdate && newArrayVehicleUpdate?.length > 0 ? (getValue && getValue([...newArrayVehicleUpdate, ...arrayVehicleConfirmed])) : (getValue && getValue(arrayVehicleConfirmed));

            setLoading(false);
            setOptionsWarning({ statusWarning: true, text: response.data.success, type: 0 });

        }).catch(function (error) {
            setLoading(false);
            setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
        })

    }, [arrayVehicleUpdateFilter, arrayVehicleConfirmed, getValue])

    const onchangeSelectBrand = (item: number, value: any) => {
        const newArray = arrayVehicleSelected.filter(itemNewArray => itemNewArray.item !== item);
        setArrayVehicleSelected([...newArray, value])
    }

    const confirmSelectBrand = () => {
        setArrayVehicleConfirmed(arrayVehicleSelected);
        arrayVehicleUpdateFilter ? getValue && getValue([...arrayVehicleUpdateFilter, ...arrayVehicleSelected]) : getValue && getValue(arrayVehicleSelected);
        changeStatusModal();
    }

    useEffect(() => {
        arrayVehicleUpdate && setArrayVehicleUpdateFilter(arrayVehicleUpdate);
    }, [arrayVehicleUpdate])

    useEffect(() => {
        if (statusModal) {
            window.document.getElementById('btn_preview')?.setAttribute('disabled', 'true');
            window.document.getElementById('btn_submit')?.setAttribute('disabled', 'true');
        } else {
            window.document.getElementById('btn_preview')?.removeAttribute('disabled');
            window.document.getElementById('btn_submit')?.removeAttribute('disabled');
        }
    }, [statusModal])

    return (
        loading ?
            <div className={`w-full h-[100vh] float-left flex justify-center items-center`}>
                <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
            </div>

            :

            <div>
                <p className="w-full float-left text-[14px] text-color_3 font-[montserratsemibold] mb-[5px]">{label}</p>
                <div className="w-full float-left">
                    <ButtonNormal onClick={changeStatusModal} label={`${nameBtn}`} className="w-[135px] px-[12px] text-[12px] mb-[20px]" />
                </div>
                <div className={`w-full float-left border-[2px] border-color_2 rounded-[6px] text-[14px] text-color_3 font-[montserratlight] placeholder:text-color_2`}>
                    <div className="w-full float-left flex flex-wrap">
                        {arrayVehicleUpdateFilter && arrayVehicleUpdateFilter.map((item, index) =>
                            <div key={index} className="w-full float-left flex items-center p-[7px] bg-white">
                                <img className="w-[40px] h-[40px] float-left" src={item.foto !== "" ? item.foto : noImg} alt={`${item.vehicles}`} />
                                <div className="w-full flex justify-between">
                                    <p className="float-left text-[12px] text-[#363636] font-[montserratsemibold] ml-[15px] flex items-center">{item.vehicles}</p>
                                    <div onClick={() => showWarningConfirm(item.pivot.landingpage_id, item.pivot.vehicles_id)} className="float-left text-[18px] text-color_7 font-[montserratsemibold] px-[10px] cursor-pointer">X</div>
                                </div>
                            </div>
                        )}
                        {arrayVehicleSelected && arrayVehicleConfirmed.sort((a, b) => a.item - b.item).map((item) =>
                            <div key={item.item} className="w-full float-left flex items-center p-[7px] bg-white">
                                <img className="w-[40px] h-[40px] float-left" src={item.itemVehicle.foto ?? noImg} alt={`${item.itemVehicle.modelo_nome}`} />
                                <p className="float-left text-[12px] text-[#363636] font-[montserratsemibold] ml-[15px]">{item.itemVehicle.modelo_nome}</p>
                            </div>
                        )}
                    </div>
                    <Modal
                        statusModal={statusModal}
                        content={
                            <div className="w-[742px] bg-[#FFFFFF] border-[1px] border-[#707070] p-[15px] relative">
                                <div className="w-full float-left flex">
                                    <p className="w-full float-left text-[13px] text-color_3 font-[montserratsemibold] mb-[20px]">Selecione os veículos:</p>
                                    <ButtonNormal onClick={() => groupSelectChange()} label="adicionar veículo" />
                                </div>
                                <div className="w-full h-[269px] px-[5px] float-left grid grid-cols-10 gap-x-[26px] gap-y-[10px] overflow-y-auto">
                                    {countGroupSelect.map((item) => (
                                        <Fragment key={item}>
                                            <div className="col-span-9">
                                                <SelecIcon
                                                    loading={loadingSelect}
                                                    onChange={(e) => onchangeSelectBrand(item, e)}
                                                    statusSearch={true}
                                                    onChangeSearch={(e) => onchangeSearch(e, item)}
                                                    label="Veículo"
                                                    firstOption="Buscar"
                                                    option={
                                                        identifySelect === item ? arraySelectBrand?.map((itemVehicle) => (
                                                            {
                                                                labelOption: itemVehicle.modelo_nome,
                                                                icon: itemVehicle.foto,
                                                                value: { item: item, itemVehicle }
                                                            }
                                                        )) : []
                                                    }
                                                />
                                            </div>
                                            <div className="mt-[36.5px] ml-[10px]">
                                                <ButtonClose onClick={() => groupSelectChange(item)} />
                                            </div>

                                        </Fragment>
                                    ))}
                                    <div className="w-full h-[75px] float-left" ref={refScroll}></div>
                                </div>
                                <div className="w-full float-left flex items-center justify-between px-[18px] pt-[15px] border-t-[1px] border-color_2">
                                    <div onClick={changeStatusModal} className="float-left font-[montserratsemibold] text-[#BEBEBE] cursor-pointer">Cancelar</div>
                                    <div onClick={confirmSelectBrand} className="w-[62px] h-[32px] float-left bg-color_3 rounded-[6px] text-[14px] text-[#FFFFFF] font-[montserratsemibold] hover:bg-color_4 flex items-center justify-center cursor-pointer">OK</div>
                                </div>
                            </div>
                        }
                    />
                </div>
                {warningConfirm}
                <Warning options={optionsWarning} closeWarning={() => setOptionsWarning(undefined)} />
            </div>
    )
}

interface Props {
    label?: string
    nameBtn?: string,
    getValue?(value: any[]): void,
    arrayVehicleUpdate?: any[]
}