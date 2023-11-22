import React from "react"
import logoIcon from "/Fracker.svg"
import MenuIcon from "@mui/icons-material/Menu"
import "./navbar.css"

function Header() {
  return (
    <div className="nav-bar">
      <div className="nav-logo-wrapper">
        <MenuIcon onClick={() => alert("this will expand the sidebar")} />
        <img className="nav-logo" src={logoIcon} alt="logo icon" />
      </div>
      <div className="nav-btn">
        <div>Home</div>
        <div>Account</div>
        <div>About</div>
      </div>
    </div>
  )
}

export default Header
