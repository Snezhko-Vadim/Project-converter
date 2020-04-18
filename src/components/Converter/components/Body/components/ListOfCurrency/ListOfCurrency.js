import React, {useCallback} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {changingCurrencyValue, removeCurrency} from "../../../../../../actions"

const ListOfCurrencyComponent = (props) => {

  const changingValue = useCallback((event) => {
    props.changingCurrencyValue(event.target.parentNode.getAttribute('currency_id'),event.target.value)
  }, [props.listOfCurr]);

  const removeCurrency = useCallback((event) => {
    props.removeCurrency(event.target.parentNode.getAttribute('currency_id'))
  }, []);

  let visibilityOfBtnClose={};
  
  return (
    <ul className="listOfCurrencies">
      {
      props.listOfDisplayedCurrencies.map((currency) => {
        visibilityOfBtnClose=(props.initialDisplayedCurrencies.find((initialCurrency)=>currency.name == initialCurrency.name)!=undefined)?{visibility:"hidden"}:{visibility:"visible"};
        return (
              <li className="itemOfCurrenciesList" key={currency.id} currency_id={currency.id}>
                <span>
                  {currency.name}
                </span>
                <input value={String(currency.input)} onChange={changingValue}/>
                <span className="btnClose" style={visibilityOfBtnClose} onClick={removeCurrency}><style></style></span>
              </li>
              )
        })
      }
    </ul>
  )

}

const mapStateToProps = (state) => {
  return {listOfDisplayedCurrencies: state.converter.listOfDisplayedCurrencies,
    initialDisplayedCurrencies:state.converter.initialDisplayedCurrencies};
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    changingCurrencyValue: changingCurrencyValue,
    removeCurrency: removeCurrency
  }, dispatch);
};

export const ListOfCurrency = connect(mapStateToProps, matchDispatchToProps)(ListOfCurrencyComponent);