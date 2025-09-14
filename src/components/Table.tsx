import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import type { Artwork } from "../App";
import { useRef } from "react";

interface TableProps {
    data: Artwork[];
    rows: number;
    page: number;
    selectedRows: Artwork[];
    setSelectedRows: (it: Artwork[]) => void;
    totalRecords: number;
    onPageChange: (e: any) => void; // useful for API pagination
    selectCount: number;
    setSelectCount: (e: any) => void;
}

export default function Table({
    data,
    rows,
    page,
    selectedRows,
    setSelectedRows,
    totalRecords,
    onPageChange,
    selectCount,
    setSelectCount
}: TableProps) {
    const overlayRef = useRef<OverlayPanel>(null);
    const first = (page - 1) * rows;

    const onSelectionChange = (newSelected: any) => {
        const currentPageIds = data.map((item) => item.id);
        const updatedSelection = [
            ...selectedRows.filter((item) => !currentPageIds.includes(item.id)),
            ...newSelected.filter((item: any) => currentPageIds.includes(item.id)),
        ];
        setSelectedRows(updatedSelection);
    };


    return (
        <DataTable
            value={data}
            selectionMode="checkbox"
            selection={selectedRows.filter((item: any) => data.some((d) => d.id === item.id))}
            stripedRows
            onSelectionChange={(e: any) => onSelectionChange(e.value)}
            dataKey="id"
            rows={rows}
            lazy
            paginator
            totalRecords={totalRecords}
            onPage={(e) => onPageChange(e)}
            first={first}
            tableStyle={{ minWidth: "60rem" }}
        >
            <Column
                selectionMode="multiple"
                header={() => (
                    <div className="flex items-center justify-between gap-1">
                        <span></span>
                        <button
                            type="button"
                            className="bg-gray-200 px-2 py-1 m-1 rounded hover:bg-gray-300 text-xs"
                            onClick={(e) => overlayRef.current?.toggle(e)}
                        >
                            #
                        </button>
                        <OverlayPanel ref={overlayRef} dismissable>
                            <div className="p-2 w-48">
                                <label className="block text-sm text-gray-700 mb-1">Select count:</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={data.length}
                                    value={selectCount}
                                    onChange={(e) => setSelectCount(Number(e.target.value))}
                                    className="w-full p-1 border rounded text-sm mb-2"
                                />
                                <button
                                    className="w-full bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                    onClick={(e) => {
                                        onSelectionChange(data.slice(0, selectCount));
                                        overlayRef.current?.toggle(e);
                                    }}
                                >
                                    Select
                                </button>
                            </div>
                        </OverlayPanel>
                    </div>
                )}
                headerStyle={{ width: "4rem" }}
            />
            <Column field="title" header="Title" filter />
            <Column field="place_of_origin" header="Origin" filter />
            <Column field="artist_display" header="Artist" filter />
            <Column field="inscriptions" header="Inscriptions" filter />
            <Column field="date_start" header="Start Date" filter />
            <Column field="date_end" header="End Date" filter />
        </DataTable>
    );
}
