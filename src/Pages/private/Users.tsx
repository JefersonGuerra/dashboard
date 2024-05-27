import { Fragment, useCallback, useContext, useState, useEffect } from "react";
import { TextInput } from "../../components/Inputs/TextInput";
import { ButtonNormal } from "../../components/Button/ButtonNormal";
import { TableList } from "../../components/Table/TableList";
import { ButtonDots } from "../../components/Button/ButtonDots";
import api from "../../Services/Api";
import ContextAuth from "../../Context/Auth";
import { Warning } from "../../components/Warnings/Warning";
import { WarningConfirm } from "../../components/Warnings/WarningConfirm";
import { LoadingRing } from "../../components/Loading/LoadingRing";
import { FileSelectImageRouded } from "../../components/Inputs/FileSelectImageRouded";

import { ListUsers } from "../../Types/ListUsers";
import ReactPaginate from 'react-paginate';


export const Users = () => {

    const { user } = useContext(ContextAuth);
    const [loading, setLoading] = useState<Boolean>(false);
    const [loadingTable, setLoadingTable] = useState<Boolean>(false);
    const [resetPagination, setResetPagination] = useState<Boolean>(false);

    const [optionsWarning, setOptionsWarning] = useState<object>();

    const [warningConfirm, setWarningConfirm] = useState<JSX.Element>();

    const [listUsers, setListUsers] = useState<ListUsers>();

    const [idUpdate, setIdUpdate] = useState<string>();
    const [updateName, setUpdateName] = useState<string>('');
    const [updateEmail, setUpdateEmail] = useState<string>('');
    const [updateImage, setUpdateImage] = useState<string>();

    const [numberPages, setNumberPages] = useState<number>();

    const handleUsers = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        e.currentTarget.checkValidity();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        if (data.password !== data.repeat_password) {
            setLoading(false);
            setOptionsWarning({ statusWarning: true, text: 'Senhas diferentes', type: 1 });
        } else {

            let formData = new FormData(e.currentTarget);

            Object.entries(data).map(([key, value]) => {
                formData.append(key, value);
            });

            if (idUpdate) { data["id"] = idUpdate };

            const method = idUpdate ? 'put' : 'post';
            formData.append('_method', method);

            const config = {
                headers: {
                    'Content-Type': `multipart/form-data`,
                }
            }

            await api.post(`/users`, formData, config).then(function (response) {
                setResetPagination(true);
                setOptionsWarning({ statusWarning: true, text: response?.data?.success, type: 0 });
                loadUsers();
                setUpdate('', '', '', undefined);
                e.target.reset();
            }).catch(function (error) {
                setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
            }).finally(() => {
                setLoading(false);
            })
        }
    }


    const loadUsers = useCallback(async (page?: number) => {
        setLoadingTable(true);
        if (!page) {
            page = 1;
        }

        await api.get('/users', {
            params: { page },
        }).then(function (response) {
            setListUsers(response.data.data);
            setNumberPages(response.data.last_page);
            setResetPagination(false);
            setLoadingTable(false);
        }).catch(function (error) {
            setLoadingTable(false);
            setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
        });

    }, [])

    const setUpdate = (id: string, name: string, email: string, image: string | undefined) => {
        setIdUpdate(id);
        setUpdateName(name);
        setUpdateEmail(email);
        setUpdateImage(image);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    const showWarningConfirm = (value: any) => {
        setWarningConfirm(<WarningConfirm confirm={() => deleteUsers(value)} cancel={() => setWarningConfirm(<WarningConfirm statusModal={false} />)} statusModal={true} text={'Você deseja realmente apagar esse usuário?'} />)
    }

    const deleteUsers = async (id: string) => {
        setWarningConfirm(<WarningConfirm statusModal={false} />);
        setLoadingTable(true);
        await api.delete(`/users`, {
            params: { id },
        }).then(function (response) {
            setLoading(false);
            setResetPagination(true);
            setOptionsWarning({ statusWarning: true, text: response.data.success, type: 0 });
            loadUsers();
        }).catch(function (error) {
            setLoading(false);
            setResetPagination(true);
            setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
        })
    }

    useEffect(() => {
        loadUsers();
    }, [loadUsers])

    return (
        <>
            <div className={`w-full h-[100vh] float-left flex justify-center items-center ${loading ? '' : 'hidden'}`}>
                <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
            </div>
            <div className={`${!loading ? '' : 'hidden'}`}>
                <div className="w-full float-left bg-color_3 rounded-b-[16px]">
                    <div className="float-left my-[40px] ml-[40px] flex items-center">
                        {user.image ?
                            <div className="w-[50px] h-[50px] float-left rounded-[50px] flex items-start justify-center overflow-hidden">
                                <img src={user.image} alt="imagem de perfil" className="min-h-[50px]" />
                            </div>
                            :
                            <div className="w-[50px] h-[50px] float-left bg-user bg-contain bg-no-repeat bg-center"></div>
                        }
                        <p className="float-left textt-[16px] text-[#FFFFFF] font-[montserratsemibold] ml-[18px]">{user.name}</p>
                    </div>
                </div>
                <div className="w-full float-left px-[50px] mt-[28px]">
                    <form className="w-full float-left" onSubmit={handleUsers}>
                        <div className="w-full float-left flex justify-center mb-[20px]">
                            {!loading && <FileSelectImageRouded name="image" imageUpdate={updateImage} />}
                        </div>
                        <div className="w-full float-left grid grid-cols-2 gap-x-[35px] gap-y-[6px]">
                            <TextInput name="name" type="text" label="Nome" placeholder="Seu nome" required value={updateName} onChange={(e) => setUpdateName(e.currentTarget.value)} />
                            <TextInput name="email" type="email" label="E-mail" placeholder="Seu E-mail" required value={updateEmail} onChange={(e) => setUpdateEmail(e.currentTarget.value)} />
                            <TextInput name="password" type="password" label="Senha" placeholder="Senha" required={!idUpdate && true} />
                            <TextInput name="repeat_password" type="password" label="Confirme sua Senha" placeholder="Senha" required={!idUpdate && true} />
                        </div>
                        <div className="float-right mt-[17px] flex-col space-x-[10px]">
                            <ButtonNormal type={"submit"} label="Salvar" />
                            {idUpdate &&
                                <ButtonNormal label="Cancelar" onClick={() => setUpdate('', '', '', undefined)} />
                            }
                        </div>
                    </form>
                </div>
                <div className="w-full float-left px-[50px] mt-[20px] mb-[45px]">
                    {loadingTable ?
                        <div className={`w-full float-left flex justify-center items-center`}>
                            <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
                        </div>
                        :
                        <TableList
                            headerList={['Usuário', 'E-mail', 'Ações']}
                            data={
                                listUsers && listUsers.map((item, index) =>
                                (
                                    <Fragment key={index}>
                                        <tr className="even:bg-[#FFFFFF] odd:bg-color_1 relative">
                                            <td className="text-[13px] text-center text-color_3 font-[montserratregular] px-[12px] py-[12px]">{item.name}</td>
                                            <td className="text-[13px] text-center text-color_3 font-[montserratregular] px-[12px] py-[12px]">{item.email}</td>
                                            <td className="text-[13px] text-color_3 font-[montserratregular] px-[12px] py-[12px]"><ButtonDots data={[{ name: 'Editar', function: () => setUpdate(item.id, item.name, item.email, item.image) }, { name: 'Excluir', function: () => showWarningConfirm(item.id) }]} /></td>
                                        </tr>
                                    </Fragment>
                                ))
                            }
                        />
                    }
                    {!resetPagination &&
                        <div className="w-full float-left mt-[20px] flex justify-center">
                            <ReactPaginate
                                className="paginate-library"
                                breakLabel="..."
                                nextLabel=""
                                onPageChange={(e) => { loadUsers(e.selected + 1) }}
                                pageRangeDisplayed={8}
                                pageCount={numberPages ?? 1}
                                previousLabel=""
                            />
                        </div>
                    }
                </div>
                <Warning options={optionsWarning} closeWarning={() => setOptionsWarning(undefined)} />
                {warningConfirm}
            </div>
        </>
    )
}