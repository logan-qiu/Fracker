import React, { useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import mockTransactions from "src/data/mockTransactions.json"

type mockTransactionsType = {
  amount: number
  bank: string
  posted_date: string
  transaction_date: string
  account_name: string
  category: string
  transaction_memo: string
}

function Dashboard() {
  const [transactions, setTransactions] = useState(mockTransactions)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Transaction Table">
        <TableHead>
          <TableRow sx={{ "& .MuiTableCell-root": { fontWeight: "bold" } }}>
            <TableCell>Transaction Date</TableCell>
            <TableCell>Posted Date</TableCell>
            <TableCell>Bank</TableCell>
            <TableCell>Account Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Memo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, key) => {
            const {
              transaction_date,
              posted_date,
              bank,
              account_name,
              category,
              amount,
              transaction_memo,
            } = transaction
            return (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{transaction_date}</TableCell>
                <TableCell>{posted_date}</TableCell>
                <TableCell>{bank}</TableCell>
                <TableCell>{account_name}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{transaction_memo}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default Dashboard
