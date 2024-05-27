import { useState } from "react";
import { TextInput } from "../../components/Inputs/TextInput";
import { ButtonNormal } from "../../components/Button/ButtonNormal";
import { ButtonCheckCircle } from "../../components/Button/ButtonCheckCircle";
import { formatPhone, formatDate, formatCpf } from "../../components/Mask/Mask";

export const FormLandingPage = ({ handleSubmit }: Props) => {

    const [phoneMask, setPhonemask] = useState<string>('');
    const [dateMask, setDatemask] = useState<any>('');
    const [cpfMask, setCpfmask] = useState<string>('');

    return (
        <form onSubmit={handleSubmit} className="w-full float-left bg-white border-[3px] border-color_1 rounded-[16px] p-[25px] lg:p-[45px] grid gap-y-[16px] lg:gap-y-[32px]">
            <TextInput name="name" label="Nome" placeholder="Seu nome" required />
            <div className="w-full float-left grid grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <TextInput name="phone" label="Celular" type={'tel'} placeholder="Seu celular" required value={phoneMask} onChange={(e: any) => setPhonemask(formatPhone(e.target.value))} maxLength={15} />
                </div>
                <div className="mt-[25px] ml-[20px] flex items-center cursor-pointer">
                    <ButtonCheckCircle name="whatsapp" label="Whatsapp" />
                </div>
            </div>
            <TextInput name="email" label="E-mail" type={'email'} placeholder="Seu E-mail" required />
            <TextInput name="date" label="Data de Nascimento (opcional)" type={'tel'} placeholder="DD/MM/AAAA" value={dateMask} onChange={(e: any) => setDatemask(formatDate(e.target.value))} />
            <TextInput name="cpf" label="CPF (opcional)" type={'tel'} placeholder="Seu CPF" value={cpfMask} onChange={(e: any) => setCpfmask(formatCpf(e.target.value))} maxLength={14} />
            <ButtonNormal type={"submit"} className="!w-full" label="SOLICITAR ANÁLISE" />
        </form>
    )
}

interface Props {
    handleSubmit?(event: any): void
}