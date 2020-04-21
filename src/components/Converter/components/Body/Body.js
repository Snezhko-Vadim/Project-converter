import React from "react"
import {SelectorOfCurrency} from "./components"
import {ListOfCurrency} from "./components"

export const Body = () => {
        return(
        <div className="body">
            <ListOfCurrency/>
            <SelectorOfCurrency/>
        </div>
        )
}