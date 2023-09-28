// import { useMemo, useState } from "react";

// type Props = {
//     initialData?: any
//     columnName: string
// };

// export const SortedData = (props: Props) => {
//     const [sortColumn, setSortColumn] = useState<any>(props.columnName);
//     const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

//     return useMemo(() => {
//         const dataCopy = [...props.initialData];
//         dataCopy.sort((a, b) => {
//             const valueA = a[sortColumn];
//             const valueB = b[sortColumn];

//             if (sortOrder === "asc") {
//                 return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
//             } else {
//                 return valueB < valueA ? -1 : valueB > valueA ? 1 : 0;
//             }
//         });
//         return dataCopy;
//     }, [sortColumn, sortOrder]);
// };

// export const handleSort = (column: keyof any) => {
//     if (column === sortColumn) {
//         setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//         setSortColumn(column);
//         setSortOrder("asc");
//     }
// };
const SortableGrid = () => {
  return (
    <div>SortableGrid</div>
  )
}

export default SortableGrid