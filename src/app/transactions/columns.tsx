"use client";

import { ColumnDef } from '@tanstack/react-table';

export type Transaction = {
    // id: string
    amount: number
    transaction_date: string
    // account_id: string
    // category_id: string
    memo?: string
}

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "transaction_date",
        header: 'Transaction Date'
    },
    {
        accessorKey: "bank",
        header: 'Bank'
    },
    {
        accessorKey: "account",
        header: 'Account'
    },
    {
        accessorKey: "category",
        header: 'Category'
    },
    {
        accessorKey: "amount",
        header: 'Amount'
    },
    {
        accessorKey: "memo",
        header: 'Memo'
    },
]