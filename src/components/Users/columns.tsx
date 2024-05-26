'use client';

import { ColumnDef } from '@tanstack/react-table';
// import { DataTableColumnHeader } from '../DataTable/ColumnHeader.jsx';
import { User } from '../common/schema';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'user_name',
    header: 'Username',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];
