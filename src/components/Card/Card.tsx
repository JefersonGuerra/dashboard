import { ButtonNormal } from "../../components/Button/ButtonNormal";
import noImg from "../../assets/img/em-breve-card.png";

export const Card = ({ data, preview }: Props) => {

    return (
        <div className="w-[283px] float-left bg-white border-[3px] border-color_1 rounded-[16px] overflow-hidden">
            <div className="w-full float-left relative">
                {/* <div className="w-full h-[44px] float-left flex items-center bg-white absolute top-[calc(50%-22px)] border-[1px] border-color_2">
                    <p className="w-full float-left font-[montserratsemibold] text-[32px] text-color_4 text-center">VENDIDO</p>
                </div> */}
                <img className="w-full float-left h-[207px]" src={data?.itemVehicle ? (data?.itemVehicle?.foto ?? noImg) : (data?.foto !== '' ? data?.foto : noImg)} alt="img" />
            </div>
            <div className="w-full float-left flex items-center mt-[14px] mb-[10px]">
                <p className="w-full float-left font-[montserratsemibold] text-[11px] text-color_3 px-[15px]">{data?.itemVehicle ? data?.itemVehicle?.modelo_nome : data?.vehicles}</p>
            </div>
            <p className="w-full float-left font-[montserratregular] text-[10px] text-color_3 px-[15px]">Ano: {data?.itemVehicle ? data?.itemVehicle?.anofabricacao : data?.anofabricacao}/{data?.itemVehicle ? data?.itemVehicle?.anomodelo : data?.anomodelo} KM: {data?.itemVehicle ? data?.itemVehicle?.km : data?.km} km.</p>
            <p className="w-full float-left font-[montserratregular] text-[10px] text-color_3 px-[15px]">Potência: {data?.itemVehicle ? data?.itemVehicle?.potencia : data?.potencia} cv. Câmbio: {data?.itemVehicle ? data?.itemVehicle?.cambio_nome : data?.cambio_nome}.</p>
            <p className="w-full float-left font-[montserratregular] text-[10px] text-color_3 px-[15px]">Consumo: Urbano: {data?.itemVehicle ? data?.itemVehicle?.consumourbano : data?.consumourbano} Km/l - Rodovia: {data?.itemVehicle ? data?.itemVehicle?.consumorodoviario : data?.consumorodoviario} Km/l.</p>
            <p className="w-full float-left font-[montserratsemibold] text-[14px] text-color_3 text-center px-[15px] mt-[23px]"><span className="text-[9px]">R$</span> {parseFloat(data?.itemVehicle ? (data?.itemVehicle?.valorpromocao ?? data?.itemVehicle?.valorvenda) : (data?.valorpromocao !== '0.00' && data?.valorpromocao ? data?.valorpromocao : data?.valorvenda)).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
            <a className="w-full float-left flex justify-center my-[10px]" href={`${process.env.REACT_APP_LINK_VEHICLE}/${data?.itemVehicle ? data?.itemVehicle?.tipo_slug : data?.tipo_slug}/${data?.itemVehicle ? data?.itemVehicle?.marca_slug : data?.marca_slug}/${data?.itemVehicle ? data?.itemVehicle?.modelo_slug : data?.modelo_slug}/${data?.itemVehicle ? data?.itemVehicle?.anomodelo : data?.anomodelo}/${data?.itemVehicle ? data?.itemVehicle?.id : data?.id_autoconf}`} target="_blank" rel="noreferrer">
                <ButtonNormal label="SAIBA MAIS" className="!w-[173px]" />
            </a>
        </div>
    )
}

interface Props {
    data?: any,
    preview?: boolean
}