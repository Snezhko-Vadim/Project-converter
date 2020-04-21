import React,{ useEffect ,useCallback} from "react"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import {changeBuysSells,setActiveBtn} from '../../../../../../actions'

const BtnSellsComponent=(props)=>{
    let className = undefined;
    if(props.activeBtn==="btnSells"){
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
        <button btn_type="Out" className={className} onClick={onClick}>
            Bank sells
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
            setActiveBtn:setActiveBtn
        },dispatch)
    }

    export const BtnSells = connect(mapStateToProps,matchDispatchToProps)(BtnSellsComponent);