import { useCallback, useEffect, useState, useRef } from "react"
import { TextInput } from "./TextInput";
import { LoadingRing } from "../../components/Loading/LoadingRing";
import noImg from "../../assets/img/em-breve-card.png";

export const SelecIcon = ({ label, option, name, firstOption, defaultValue, onChange, statusSearch, onChangeSearch, loading }: Props) => {


    const refFocus = useRef<HTMLInputElement | null>(null);

    const [statusSelectOpen, setStatusSelectOpen] = useState<boolean>(false);

    const [labelSelected, setLabelSelected] = useState<string>(firstOption);
    const [iconSelected, setIconSelected] = useState<string>();
    const [valueSelected, setValueSelected] = useState<any>();
    const [optionsSelect, setOptionsSelect] = useState<any>();

    const openSelect = useCallback((statusSelectOpenParam: boolean) => {
        setStatusSelectOpen(!statusSelectOpenParam);
    }, [])

    const openSelectBlur = (e: any) => {
        const currentTarget = e.currentTarget;
        requestAnimationFrame(() => {
            if (!currentTarget.contains(document.activeElement)) {
                setStatusSelectOpen(false);
            }
        });
    }

    const selectFunction = (labelOption: string, icon: string, value: any) => {
        setStatusSelectOpen(false);
        setLabelSelected(labelOption);
        setIconSelected(icon);
        setValueSelected(value);
    }

    const onChangeSelect = (e: any) => {
        onChange && onChange(e);
    }

    useEffect(() => {
        defaultValue && onChange && onChangeSelect(defaultValue);
        // eslint-disable-next-line
    }, [defaultValue])

    useEffect(() => {
        option && option?.length > 0 && setOptionsSelect(option);
    }, [option])

    useEffect(() => {
        if (statusSelectOpen && statusSearch) {
            refFocus.current?.focus();
        }
    }, [statusSelectOpen, statusSearch],)


    return (
        <div className="w-full float-left">
            <p className="w-full float-left text-[13px] text-color_3 font-[montserratsemibold]">{label}</p>
            <div className="w-full float-left cursor-pointer" onBlur={(e) => openSelectBlur(e)} tabIndex={-1}>
                <div onClick={() => openSelect(statusSelectOpen)} className="w-full h-[53px] float-left border-[2px] border-color_1 rounded-[6px] bg-arrowDown bg-[length:10px_10px] bg-no-repeat bg-[center_right_15px] flex items-center">
                    {
                        !valueSelected && defaultValue ? optionsSelect?.filter((item: any) => item.value === defaultValue).map((item: any, index: number) => (
                            <div key={index} className="w-full float-left  p-[10px] text-[12px] text-[#363636] font-[montserratsemibold] py-[6px] flex items-center text-left"><img className="w-[40px] h-[40px] float-left mr-[13px]" src={item.icon ?? noImg} alt="img" />{item.labelOption}</div>
                        ))
                            :
                            <div className="w-full float-left  p-[10px] text-[12px] text-[#363636] font-[montserratsemibold] py-[6px] flex items-center text-left"><img className="w-[40px] h-[40px] float-left mr-[13px]" src={iconSelected ?? noImg} alt="img" />{labelSelected}</div>
                    }
                </div>
                <div className={`w-full relative z-10 float-left ${statusSelectOpen ? '' : 'hidden'}`}>
                    <div className="w-full max-h-[180px] float-left absolute top-0 left-0 bg-white shadow-[0_0_5px_0_#000] rounded-[6px] p-[10px] overflow-y-auto">
                        {statusSearch &&
                            <div className="w-full float-left">
                                <TextInput onChange={(e) => onChangeSearch && onChangeSearch(e.target.value,)} reference={refFocus} placeholder="Buscar" />
                            </div>
                        }
                        {
                            loading ? <div className="w-full float-left flex justify-center my-[20px]"><LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" /></div> : optionsSelect && optionsSelect?.map((item: any, index: number) => (
                                <div key={index} className="w-full float-left text-[12px] text-[#363636] font-[montserratsemibold] py-[11px] flex items-center text-left" onClick={() => { selectFunction(item.labelOption, item.icon, item.value); onChange && onChangeSelect(item.value) }}><img className="w-[40px] h-[40px] float-left mr-[13px]" src={item.icon ?? noImg} alt="img test" />{item.labelOption}</div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <input defaultValue={valueSelected} name={name} hidden readOnly={true} />
        </div>
    )
}

interface Props {
    label?: string,
    option?: any[],
    name?: string,
    firstOption: string,
    defaultValue?: any,
    onChange?(value?: any): void
    statusSearch?: boolean
    onChangeSearch?(search?: string): void,
    loading?: boolean
}