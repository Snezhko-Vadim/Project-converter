const getCourcesAction = (list) => ({
  type: 'GET_COURCES',
  payload: list,
});

const getErrorAction = () => ({
  type: 'GET_ERROR',
});

export const sendRequestAction = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("/api/kursExchange");
      const list = await response.json();

      dispatch(getCourcesAction(list));
    } catch (e) {
      dispatch(getErrorAction());
    }
  };
};

export const connectResponseToConverter = (response) => ({
  type: 'CONNECT_RESPONSE',
  payload: response,
})

export const changeBuysSells = (btnType) => ({
  type: 'CHANGE_BUYS_SELLS',
  payload: btnType,
});

export const addCurrency = (currencyId,optionWithActionName) => ({
  type: 'ADD_CURRENCY',
  payload: {
    currencyId: currencyId,
    optionWithActionName: optionWithActionName
  },
});

export const removeCurrency = (removingCurrencyId) => ({
  type: 'REMOVE_CURRENCY',
  payload: removingCurrencyId,
});

export const changingCurrencyValue = (changingCurrencyId,changingValue) => ({
  type: 'CHANGING_CURRENCY_VALUE',
  payload: {
    changingCurrencyId:changingCurrencyId ,
    changingValue:changingValue
  }
});

export const setActiveBtn = (btnType) => ({
  type: 'SET_ACTIVE_BTN',
  payload:btnType
});