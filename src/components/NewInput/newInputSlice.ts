import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import mockAccounts from "src/data/mockAccounts"
import dayjs, { Dayjs } from 'dayjs';
import { RootState } from "src/app/store";

const mockBanks = Object.keys(mockAccounts)

type transactionType = {
  amount: string | null
  bank: string | null
  posted_date: string | null
  transaction_date: string | null
  account_name: string | null
  category: string | null
  transaction_memo: string | null
}

export interface NewInputState {
  dialogOpen: boolean
  banks: string[]
  bank: string
  accountList: string[]
  account: string
  transaction_date: Dayjs | null
  posted_date: Dayjs | null
  memo: string | null
}

const values: string[] = []
const initialState: NewInputState = {
  dialogOpen: false,
  banks: mockBanks,
  bank: "",
  accountList: [],
  account: "",
  transaction_date: null,
  posted_date: null,
  memo: null,
}

export const newInputSlice = createSlice({
  name: "newInput",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.dialogOpen = true
    },
    closeDialog: (state) => {
      state.dialogOpen = false
    },
    selectBank: (state, action) => {
      state.bank = action.payload
    },
    updateAccountList: (state, action) => {
      state.accountList = action.payload
    },
    selectAccount: (state, action) => {
      state.account = action.payload
    },
    clearInput: (state) => {
      state.banks = mockBanks,
      state.bank = ""
      state.account = "",
      state.accountList = []
    },
    selectTransationDate: (state, action) => {
      state.transaction_date = action.payload
    },
    selectPostedDate: (state, action) => {
      state.posted_date = action.payload
    },
    createMemo: (state, action) => {
      state.memo = action.payload
    }
  },
})

export const getDialogOpen = (state: RootState) => state.newInput.dialogOpen
export const getAccount = (state: RootState) => state.newInput.account
export const getBanks = (state: RootState) => state.newInput.banks
export const getBank = (state: RootState) => state.newInput.bank
export const getAccountList = (state: RootState) => state.newInput.accountList
export const getTransactionDate = (state: RootState) => state.newInput.transaction_date
export const getPostedDate = (state: RootState) => state.newInput.posted_date
export const getMemo = (state: RootState) => state.newInput.memo

export const {
  openDialog,
  closeDialog,
  selectBank,
  updateAccountList,
  selectAccount,
  clearInput,
  selectTransationDate,
  selectPostedDate,
  createMemo,
} = newInputSlice.actions

export default newInputSlice.reducer
