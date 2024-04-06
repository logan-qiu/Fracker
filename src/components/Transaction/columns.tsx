'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { categories, banks } from './columnsMeta';
import { DataTableColumnHeader } from '../DataTable/ColumnHeader';
import { DataTableRowActions } from './RowActions';
import { Transaction } from '../common/schema';

export const columns: ColumnDef<Transaction>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        // 为什么这里不用indeterminate property
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'transaction_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Transaction Date' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('transaction_date')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'posted_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Posted Date' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('posted_date')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'bank',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bank' />
    ),
    cell: ({ row }) => {
      const bank = banks.find((bank) => bank.value === row.getValue('bank'));
      if (!bank) return null;
      return (
        <div className='w-[120px]'>
          <Badge variant='outline'>{bank.label}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'account_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Account' />
    ),
    cell: ({ row }) => {
      return <div className='w-[60px]'>{row.getValue('account_name')}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => {
      const category = categories.find(
        (_cat) => _cat.value === row.getValue('category')
      );
      if (!category) return null;
      return (
        <div className='w-[60px]'>
          <Badge variant='outline'>{category.label}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'transaction_memo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Memo' />
    ),
    cell: ({ row }) => {
      return (
        <div className='w-[120px]'>{row.getValue('transaction_memo')}</div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
