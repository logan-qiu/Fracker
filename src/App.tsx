import "./App.css"
import Header from "src/components/Navbar/Navbar"
import Dashboard from "./components/Dashboard/Dashboard"
import NewInput from "./components/NewInput/NewInput"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Header />
        <NewInput />
        <Dashboard />
      </div>
    </LocalizationProvider>
  )
}

export default App
