import { useCallback, useEffect, useState } from "react";
import { LandingPageModel1 } from "../../components/LandingPage/LandingPageModel1";
import { LandingPageModel2 } from "../../components/LandingPage/LandingPageModel2";
import { LandingPageModel3 } from "../../components/LandingPage/LandingPageModel3";
import { LoadingRing } from "../../components/Loading/LoadingRing";
import { Warning } from "../../components/Warnings/Warning";
import api from "../../Services/Api";

export const LandingPage = ({ model, data, dataVehicles, close, preview, imgBackgroundDb, textOrImageDb }: Props) => {

    const [modelSelected, setModelSelected] = useState<JSX.Element>();
    const [loading, setLoading] = useState<boolean>(false);

    const [optionsWarning, setOptionsWarning] = useState<object>();

    const setPublishLandingPage = useCallback(async () => {
        setLoading(true);
        await api.get(`/landingpage/publicada`, {
        }).then(function (response) {

            const dataPublish = response.data.data.reduce((item: any) => item);
            const modelPublish = response.data.data.map((item: any) => item.theme).reduce((item: any) => item);
            const dataVehiclesPublish = response.data.data.map((item: any) => item.vehicle).reduce((item: any) => item);

            switch (modelPublish) {
                case '1':
                    setModelSelected(<LandingPageModel1 data={dataPublish} dataVehicles={dataVehiclesPublish} />);
                    break;

                case '2':
                    setModelSelected(<LandingPageModel2 data={dataPublish} dataVehicles={dataVehiclesPublish} />);
                    break;

                case '3':
                    setModelSelected(<LandingPageModel3 data={dataPublish} />);
                    break;

                default:
                    setModelSelected(<LandingPageModel1 data={dataPublish} dataVehicles={dataVehiclesPublish} />);
                    break;
            }

            setLoading(false);

        }).catch(function (error) {
            setLoading(false);
            setOptionsWarning({ statusWarning: true, text: error?.response?.data?.error ?? 'Erro de conexão', type: 1 });
        });
    }, [])

    useEffect(() => {

        if (preview) {
            switch (model) {
                case '1':
                    setModelSelected(<LandingPageModel1 data={data} dataVehicles={dataVehicles} closePreview={close} preview={preview} imgBackgroundDb={imgBackgroundDb} />);
                    break;

                case '2':
                    setModelSelected(<LandingPageModel2 data={data} dataVehicles={dataVehicles} closePreview={close} preview={preview} imgBackgroundDb={imgBackgroundDb} />);
                    break;

                case '3':
                    setModelSelected(<LandingPageModel3 data={data} closePreview={close} preview={preview} imgBackgroundDb={imgBackgroundDb} textOrImageDb={textOrImageDb} />);
                    break;

                default:
                    setModelSelected(<LandingPageModel1 data={data} dataVehicles={dataVehicles} closePreview={close} preview={preview} imgBackgroundDb={imgBackgroundDb} />);
                    break;
            }
        } else {
            setPublishLandingPage();
        }

    }, [model, preview, close, data, dataVehicles, setPublishLandingPage, imgBackgroundDb, textOrImageDb])


    return (
        loading ?
            <div className={`w-full h-[100vh] float-left flex justify-center items-center`}>
                <LoadingRing className="w-[50px] h-[50px] lds-ring" border="border-[5px] border-[#6A6C6A_transparent_transparent_transparent]" />
            </div>

            :

            <div>
                {modelSelected ?? <></>}
                {!preview && <Warning options={optionsWarning} closeWarning={() => setOptionsWarning(undefined)} />}
            </div>
    )
}

interface Props {
    data?: object,
    dataVehicles?: any[],
    model?: string,
    close?(): void,
    preview?: boolean,
    imgBackgroundDb?: boolean,
    textOrImageDb?: boolean
}