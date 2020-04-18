import React from "react"
import {SelectorOfCurrency} from "./components"
import {ListOfCurrency} from "./components"

export class Body extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
        <div className="body">
            <ListOfCurrency/>
            <SelectorOfCurrency/>
        </div>
        )
    }
}