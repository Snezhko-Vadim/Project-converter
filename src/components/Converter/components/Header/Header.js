import React from "react"
import {BtnBuys} from "./components"
import {BtnSells} from "./components"

export class Header extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
        <div className="header">
            <BtnBuys/>
            <BtnSells/>
        </div>
        )
    }
}