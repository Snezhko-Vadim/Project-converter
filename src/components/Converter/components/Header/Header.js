import React from "react"
import {BtnBuys} from "./components"
import {BtnSells} from "./components"

export const Header = () => {
        return(
        <div className="header">
            <BtnBuys/>
            <BtnSells/>
        </div>
        )
    }