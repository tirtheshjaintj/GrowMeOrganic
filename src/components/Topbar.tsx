interface TopbarProps {
    page: number;
    setPage: (it: any) => void;
    totalPage: number;
    totalSelected: number;
}
export default function Topbar({ page, setPage, totalPage, totalSelected }: TopbarProps) {
    return (
        <div >
            <h1 className="text-center font-semibold text-2xl p-4">Tirthesh Jain GrowMeOrganic Assignment</h1>
            <h2 className="text-center p-4 flex justify-between flex-wrap gap-2 items-center"><span className="bg-blue-500 text-white p-2 rounded-lg"> Selected: {totalSelected}</span> <span className="bg-blue-500 text-white p-2 rounded-lg">Page: {page} / {totalPage}</span> </h2>
            <div className="sticky top-0 flex justify-between gap-2 m-3">
                <button
                    className="bg-gray-200 text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300"
                    onClick={() => setPage((prev: number) => (prev > 1) ? prev - 1 : 1)}
                    style={(page <= 1) ? { opacity: 0.5 } : {}}
                    disabled={(page <= 1)}
                >
                    ←
                </button>
                <button
                    className="bg-blue-500 text-white text-sm px-4 py-2 cursor-pointer rounded-md hover:bg-blue-600"
                    onClick={() => setPage((prev: number) => (prev < totalPage) ? prev + 1 : totalPage)}
                    style={(page >= totalPage) ? { opacity: 0.5 } : {}}
                    disabled={(page >= totalPage)}
                >
                    →
                </button>
            </div>
        </div>
    )
}
