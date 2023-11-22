import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import {
  openDialog,
  closeDialog,
  selectBank,
  updateAccountList,
  selectAccount,
  clearInput,
  selectTransationDate,
  selectPostedDate,
  createMemo,
  setAmount,
  getDialogOpen,
  getBanks,
  getBank,
  getAccountList,
  getTransactionDate,
  getPostedDate,
  getMemo,
  getAccount,
  getAmount,
} from "./newInputSlice.ts"
import { useEffect, useState } from "react"
import mockAccounts from "src/data/mockAccounts.ts"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store.ts"
import dayjs, { Dayjs } from "dayjs"
import { NumericFormat } from "react-number-format"

const NewInput = () => {
  const dispatch = useDispatch()
  const style = {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    postion: "absolute" as const,
    width: "80%",
    bgcolor: "background.paper",
    border: "2px none #000",
    "& .MuiTextField-root": { m: 0.5 },
  }
  const dialogOpen = useSelector(getDialogOpen)
  const account = useSelector(getAccount)
  const amount = useSelector(getAmount)
  const banks = useSelector(getBanks)
  const bank = useSelector(getBank)
  const accountList = useSelector(getAccountList)
  const transaction_date = useSelector(getTransactionDate)
  const posted_date = useSelector(getPostedDate)
  const memo = useSelector(getMemo)
  // const { dialogOpen, setDialogOpen } = useDialog();
  const handleBankChange = (event: SelectChangeEvent) => {
    dispatch(selectBank(event.target.value as string))
  }
  const handleAccountChange = (event: SelectChangeEvent) => {
    dispatch(selectAccount(event.target.value as string))
  }
  const handleDialogClose = () => {
    dispatch(closeDialog())
    dispatch(clearInput())
  }
  const handleTransactionDateChange = (newValue: Dayjs | null) => {
    dispatch(selectTransationDate(newValue?.format("MM-DD-YYYY")))
  }
  const handlePostedDateChange = (newValue: Dayjs | null) => {
    dispatch(selectPostedDate(newValue?.format("MM-DD-YYYY")))
  }
  const handleMemoChange = (memo: string) => {
    dispatch(createMemo(memo))
  }
  const handleAmountChange = (amount: number) => {
    dispatch(setAmount(amount))
  }

  useEffect(() => {
    if (mockAccounts[bank]?.accounts) {
      dispatch(updateAccountList(mockAccounts[bank].accounts))
    }
  }, [bank])

  return (
    <>
      <Button
        sx={{ m: "2rem" }}
        onClick={() => dispatch(openDialog())}
        variant="contained"
      >
        Add An Expense
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="add-expense-modal"
        aria-describedby="add-expense-window"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DialogTitle>Add An Expense</DialogTitle>
        <Box className="form" sx={{ ...style }}>
          <Box className="input">
            <DatePicker
              label="Transaction Date"
              slotProps={{ textField: { fullWidth: true } }}
              aria-describedby="enter transaction date"
              value={transaction_date}
              maxDate={dayjs()}
              onChange={(newValue) => handleTransactionDateChange(newValue)}
            />
            <DatePicker
              label="Posted Date"
              slotProps={{ textField: { fullWidth: true } }}
              aria-describedby="enter posted date"
              value={posted_date}
              maxDate={dayjs()}
              onChange={(newValue) => handlePostedDateChange(newValue)}
            />
            <FormControl fullWidth sx={{ right: "-4px", mt: 0.2, mb: 0.6 }}>
              <InputLabel id="select-bank-label">Bank</InputLabel>
              <Select
                labelId="select-bank-label"
                id="select-bank"
                value={bank}
                label="Bank"
                onChange={handleBankChange}
              >
                {banks.map((bank, key) => {
                  return (
                    <MenuItem key={key} value={bank}>
                      {bank}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ right: "-4px" }}>
              <InputLabel id="select-account-label">Account</InputLabel>
              <Select
                labelId="select-account-label"
                id="select-account"
                value={account}
                label="Account"
                onChange={handleAccountChange}
              >
                {accountList?.map((account, key) => {
                  return (
                    <MenuItem key={key} value={account}>
                      {account}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <TextField
              id="new-input"
              label="Category"
              aria-describedby="select a category"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="new-input"
              label="Amount"
              aria-describedby="enter an amount"
              variant="outlined"
              fullWidth
              type="number"
              inputProps={{ step: 0.5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              onChange={(event) =>
                handleAmountChange(Number(event.target.value))
              }
            />
            <TextField
              id="new-input"
              label="Memo"
              aria-describedby="enter a memo"
              variant="outlined"
              fullWidth
              onChange={(event) => handleMemoChange(event.target.value)}
            />
          </Box>
          <DialogActions className="modal-btn">
            <Button variant="outlined" onClick={handleDialogClose}>
              Return
            </Button>
            <Button variant="contained">Create</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default NewInput
