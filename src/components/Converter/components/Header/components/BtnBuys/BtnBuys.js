import React,{useCallback,useState} from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import {changeBuysSells,setActiveBtn} from '../../../../../../actions'

 const BtnBuysComponent=(props)=>{
    let className = undefined;
    if(props.activeBtn==="btnBuys"){
       className="btnsBuysSellsActive";
    }
    else{
       className="btnsBuysSellsNotActive";
    }
    const onClick = useCallback((event)=>{
        props.changeBuysSells(event.target.getAttribute("btn_type"));
        props.setActiveBtn(event.target.getAttribute("btn_type"));
    },[])
        return(
        <button btn_type="In" className={className} onClick={onClick}>
            Bank buys
        </button>
        )
    }

    const mapStateToProps = (state) =>{
        return{
            activeBtn: state.styles.activeBtn,
        }
    }

    const matchDispatchToProps =(dispatch)=>{
        return bindActionCreators({
            changeBuysSells:changeBuysSells,
            setActiveBtn:setActiveBtn,
        },dispatch)
    }

    export const BtnBuys = connect(mapStateToProps,matchDispatchToProps)(BtnBuysComponent);