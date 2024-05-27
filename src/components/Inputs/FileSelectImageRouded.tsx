import { InputHTMLAttributes, useEffect, useRef, useState } from "react"
import imgPlaceholder from "../../assets/img/image-placeholder.png";

export const FileSelectImageRouded = ({ className, imageUpdate, ...props }: Props) => {

    const [imagePreview, setImagePreview] = useState<string>();
    const [imagePreviewUpdate, setImagePreviewUpdate] = useState<string | undefined>(imageUpdate);

    const refInputFile = useRef<HTMLInputElement>(null);

    const getValueFile = (e: any) => {
        setImagePreviewUpdate(undefined);
        if (e.target.value !== '') {
            const file = e.target.files[0]
            file.src = URL.createObjectURL(e.target.files[0]);
            setImagePreview(file.src);
        } else {
            setImagePreview(imgPlaceholder);
        }
    }

    useEffect(() => {
        setImagePreviewUpdate(imageUpdate);
        if(imageUpdate){
            setImagePreview(undefined);
            const node = refInputFile.current as any
            node.value = '';
        }
    }, [imageUpdate])


    return (
        <label className="w-[150px] h-[150px] float-left rounded-[150px] cursor-pointer flex items-start justify-center overflow-hidden relative hovSelectImage">
            <div className="w-full h-[150px] float-left backdrop-blur-sm bg-[#000000ba] absolute top-0 left-0 hidden items-center justify-center editPencilImage">
                <div className="w-[25px] h-[25px] float-left bg-pencil bg-no-repeat bg-contain"></div>
            </div>
            <img alt={"placeholder img"} src={imagePreviewUpdate ?? (imagePreview ?? imgPlaceholder)} className="min-h-[150px]" />
            <input onChange={(e) => getValueFile(e)} {...props} type={'file'} hidden ref={refInputFile} />
        </label>
    )
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    imageUpdate?: string | undefined
}