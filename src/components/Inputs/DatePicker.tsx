import { useCallback, useEffect, useState } from 'react';
import { ptBR } from 'date-fns/locale'
import { DateRangePicker } from 'react-date-range';
import { Modal } from '../Modal/Modal';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export const DatePicker = ({ nameDateStart, nameDateEnd, defaultDateStart, defaultDateEnd }: Props) => {

    const [statusModal, setStatusModal] = useState<boolean>();
    const [initialDate, setInitialDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [totalDays, setTotalDays] = useState<number>();

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const stateDate = useCallback((item: any) => {
        setState([item.selection]);

        const diffInMs = Math.abs(new Date(item?.selection?.startDate).valueOf() - new Date(item?.selection?.endDate).valueOf());
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        setTotalDays(Math.trunc(diffInDays) + 1)
    }, [])

    const setFinalDate = (value: any) => {

        const itemStart = value.reduce((item: any) => item);
        const itemEnd = value.reduce((item: any) => item);

        const initialDay = `${itemStart.startDate.getDate()}`.length > 1 ? itemStart.startDate.getDate() : `0${itemStart.startDate.getDate()}`;
        const initialMonth = `${itemStart.startDate.getMonth() + 1}`.length > 1 ? `${itemStart.startDate.getMonth() + 1}` : `0${itemStart.startDate.getMonth() + 1}`;

        const initialDateFormat = `${initialDay}/${initialMonth}/${itemStart.startDate.getFullYear()}`;

        const endDay = `${itemStart.endDate.getDate()}`.length > 1 ? itemStart.endDate.getDate() : `0${itemStart.endDate.getDate()}`;
        const endMonth = `${itemStart.endDate.getMonth() + 1}`.length > 1 ? `${itemStart.endDate.getMonth() + 1}` : `0${itemStart.endDate.getMonth() + 1}`;

        const endDateFormat = `${endDay}/${endMonth}/${itemEnd.endDate.getFullYear()}`;

        setInitialDate(initialDateFormat);
        setEndDate(endDateFormat);
        changeStatusModal();
    }

    const changeStatusModal = async () => {
        await setStatusModal(!statusModal);
        translateDataPicker();
    }


    const translateDataPicker = () => {

        const translateP1 = window.document.getElementById('identify-date-picker')?.querySelectorAll('.rdrStaticRangeLabel');
        const translateP2 = window.document.getElementById('identify-date-picker')?.querySelectorAll('.rdrInputRange span');

        translateP1 && translateP1.forEach(element => {

            switch (element.textContent) {
                case 'Today':
                    element.innerHTML = 'Hoje';
                    break;

                case 'Yesterday':
                    element.innerHTML = 'Ontem';
                    break;

                case 'This Week':
                    element.innerHTML = 'Essa semana';
                    break;

                case 'Last Week':
                    element.innerHTML = 'Semana passada';
                    break;

                case 'This Month':
                    element.innerHTML = 'Este mês';
                    break;

                case 'Last Month':
                    element.innerHTML = 'Mês passado';
                    break;

                default:
                    break;
            }
        });

        translateP2 && translateP2.forEach(element => {

            switch (element.textContent) {
                case 'days up to today':
                    element.innerHTML = 'dias até hoje';
                    break;

                case 'days starting today':
                    element.innerHTML = 'dias a partir de hoje';
                    break;

                default:
                    break;
            }
        });
    }

    useEffect(() => {

        if (defaultDateStart && defaultDateEnd) {

            const arrayInitialDateDefault = defaultDateStart?.split('/');
            const initialDateDefaultFormat = arrayInitialDateDefault && `${arrayInitialDateDefault[2]}/${arrayInitialDateDefault[1]}/${arrayInitialDateDefault[0]}`;

            const arrayEndDateDefault = defaultDateEnd?.split('/');
            const endDateDefaultFormat = arrayEndDateDefault && `${arrayEndDateDefault[2]}/${arrayEndDateDefault[1]}/${arrayEndDateDefault[0]}`;

            setState([
                {
                    startDate: new Date(`${initialDateDefaultFormat}`),
                    endDate: new Date(`${endDateDefaultFormat}`),
                    key: 'selection'
                }
            ]);

            setInitialDate(defaultDateStart);
            setEndDate(defaultDateEnd);
            stateDate({ selection: { startDate: new Date(`${initialDateDefaultFormat}`), endDate: new Date(`${endDateDefaultFormat}`), key: "selection" } });
        }

    }, [defaultDateStart, defaultDateEnd, stateDate])


    return (
        <div id="identify-date-picker">
            <input name={nameDateStart} hidden defaultValue={initialDate} />
            <input name={nameDateEnd} hidden defaultValue={endDate} />
            <Modal
                changeStatusModal={changeStatusModal}
                statusModal={statusModal}
                content={
                    <div className='w-[1016px] float-left border-[3px] border-color_2 rounded-[8px] bg-white'>
                        <DateRangePicker
                            rangeColors={["#6A6C6A"]}
                            locale={ptBR}
                            onChange={(item: any) => stateDate(item)}
                            months={2}
                            ranges={state}
                            direction="horizontal"
                        />
                        <div className="w-full float-left flex items-center justify-between px-[18px] py-[10px] border-t-[1px] border-color_2">
                            <div onClick={() => changeStatusModal()} className="float-left font-[montserratsemibold] text-[#BEBEBE] cursor-pointer">Cancelar</div>
                            <p className='float-left font-[montserratregular] text-[13px] text-[#BEBEBE]'>Selecionado: <span className='font-[montserratsemibold] text-[#1D2634]'>{totalDays ? (totalDays === 1 ? `${totalDays} dia` : `${totalDays} dias`) : 0}</span></p>
                            <div onClick={() => setFinalDate(state)} className="w-[62px] h-[32px] float-left bg-color_3 rounded-[6px] text-[14px] text-[#FFFFFF] font-[montserratsemibold] hover:bg-color_4 flex items-center justify-center cursor-pointer">OK</div>
                        </div>
                    </div>
                }
            />
            <div onClick={() => changeStatusModal()} className='w-full h-[30px] float-left border-[2px] border-color_2 rounded-[6px] bg-calendar bg-[length:15px_12px] bg-no-repeat bg-[center_left_10px] flex items-center cursor-pointer'>
                <p className='float-left font-[montserratsemibold] text-[13px] text-color_3 ml-[33px]'>{initialDate} - {endDate}</p>
            </div>
        </div>
    )
}

interface Props {
    nameDateStart?: string
    nameDateEnd?: string,
    defaultDateStart?: string,
    defaultDateEnd?: string
}