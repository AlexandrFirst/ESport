"use client";

import { Table } from "@tanstack/react-table";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <></>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button
    //       variant="outlined"
    //       // size="sm"
    //       className="ml-auto hidden h-8 lg:flex"
    //     >
    //       <SlidersHorizontal className="mr-2 h-4 w-4" />
    //       View
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end" className="w-[150px]">
    //     <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
    //     <DropdownMenuSeparator />
    //     {table
    //       .getAllColumns()
    //       .filter(
    //         (column) =>
    //           typeof column.accessorFn !== "undefined" && column.getCanHide()
    //       )
    //       .map((column) => {
    //         return (
    //           <DropdownMenuCheckboxItem
    //             key={column.id}
    //             className="capitalize"
    //             checked={column.getIsVisible()}
    //             onCheckedChange={(value) => column.toggleVisibility(!!value)}
    //           >
    //             {column.id}
    //           </DropdownMenuCheckboxItem>
    //         );
    //       })}
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
}
