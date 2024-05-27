export const TableList = ({ headerList, data }: Props) => {
    return (
        <table className="w-full float-left">
            <thead>
                <tr>
                    {headerList?.map((item, index) =>
                        <th key={index} className="text-[14px] text-center text-color_3 font-[montserratsemibold]">{item}</th>
                    )}
                </tr>
            </thead>
            <tbody className="w-full shadow-[0_0_0_1px_#707070] rounded-[6px] mt-[5px]">
                {data}
            </tbody>
        </table>
    )
}

interface Props {
    headerList?: string[],
    data?: any[]
}