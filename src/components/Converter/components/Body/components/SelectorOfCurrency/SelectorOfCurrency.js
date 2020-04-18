import React, {useEffect, useCallback} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {sendRequestAction,connectResponseToConverter,addCurrency} from "../../../../../../actions"

const SelectorOfCurrencyComponent = (props) => {
  useEffect(() => {
    props.sendRequestAction();
  },[]);
  useEffect(() => {
    if(!props.isLoading){
    props.connectResponseToConverter(props.response);
    }
  }, [props.isLoading]);

  const addCurrency = useCallback((event) => {
    props.addCurrency(event.target.selectedOptions[0].getAttribute("currency_id"), event.target.options[0]);
  }, []);

  if (props.isLoading) {
    return <h3 className="loadingMsg">Loading...</h3>
  } else if (props.isError) { <h3> Error! Data cannot be loaded </h3>
        }
        else{
        return(
            <select className="selectorOfCurrency" id="select" onChange={addCurrency}>
                <option>Please, select currency</option > {
      props.currenciesInSelector.map((currency) => <option currency_id={currency.id} key={currency.id}>{currency.name}</option>)
    } </select>
        )
        }
    }

    
const mapStateToProps = (state)=>{
    return{
        response: state.request.response,
        isLoading: state.request.isLoading,
        isError: state.request.isError,
        currenciesInSelector:state.converter.currenciesInSelector,
    };
}

const matchDispatchToProps =(dispatch)=>{
    return bindActionCreators({
        sendRequestAction:sendRequestAction,
        connectResponseToConverter:connectResponseToConverter,
        addCurrency:addCurrency,
    },dispatch)
}

export const SelectorOfCurrency = connect(mapStateToProps,matchDispatchToProps)(SelectorOfCurrencyComponent);