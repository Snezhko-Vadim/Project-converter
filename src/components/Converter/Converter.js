import React from "react"
import {Header,Body} from "./components"

export class Converter extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className="converter">
            <Header/>
            <Body/>
            </div>
        )
    }
}