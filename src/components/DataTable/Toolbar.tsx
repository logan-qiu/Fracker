"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { DataTableViewOptions } from "@/app/(app)/examples/tasks/components/data-table-view-options"

import { FilterCols } from "../Transaction/columnsMeta";
import { DataTableFacetedFilter } from "./Faceted-filter";
// import { User } from "../common/schema";

interface FilterGroupProps {
  name: string;
  options: FilterCols[];
}
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterCol: string;
  filterGroup: FilterGroupProps[];
}

export function DataTableToolbar<TData>({
  table,
  filterCol,
  filterGroup,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  // TODO: more reusable, there might be several components using this component

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter values..."
          value={(table.getColumn(filterCol)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterCol)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {filterGroup.map(
          ({ name, options }) =>
            table.getColumn(name) && (
              <DataTableFacetedFilter
                key={name}
                column={table.getColumn(name)}
                title={name}
                options={options}
              />
            )
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* view options */}
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
