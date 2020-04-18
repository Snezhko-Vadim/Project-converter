export const request = (state = {
  response: [],
  isLoading: true,
  isError: false,
}, action) => {
  switch (action.type) {
    case 'GET_COURCES': {
      return {
        ...state,
        isLoading: false,
        response: action.payload,
      };
    }

    case 'GET_ERROR': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    default: {
      return state;
    }
  }
};


export const converter = (state = {
  currenciesInSelector: [],
  listOfDisplayedCurrencies: [],
  listOfCurrencies: [],
  availableCurrencies: [
    {name: "USD"},{name: "EUR"},{name: "RUB"},{name: "GBP"},{name: "CAD"},{name: "PLN"},{name: "UAH"},{name: "SEK"},
    {name: "CHF"},{name: "JPY"},{name: "CNY"}
  ],
  initialDisplayedCurrencies: [{name: "BYR"},{name: "USD"},{name: "RUB"}
  ],
  coefficient: 0,
  sellsBuysSellector: "factorIn",
  changingCurrencyId: undefined,
  changingValue: undefined,
}, action) => {
  switch (action.type) {
    case 'CONNECT_RESPONSE':
      let listOfCurrencies = [];
      let idOfCurrency = 0;
      let bestCourceIn = undefined;
      let bestCourceOut = undefined;

      listOfCurrencies = state.availableCurrencies.map((currency) => {
        idOfCurrency++;
        bestCourceIn = action.payload.find((bank)=>bank[currency.name + "_in"]!=0)[currency.name + "_in"];
        action.payload.forEach((bank) => {
          if (bank[currency.name + "_in"] > bestCourceIn) {
            bestCourceIn = bank[currency.name + "_in"];
          }
        })

        bestCourceOut = action.payload.find((bank)=>bank[currency.name + "_out"]!=0)[currency.name + "_out"];
        action.payload.forEach((bank) => {
          if (bank[currency.name + "_out"] < bestCourceOut && bank[currency.name + "_out"] != 0) {
            bestCourceOut = bank[currency.name + "_out"];
          }
        })

        switch (currency.name) {
          case ('RUB' || 'UAH' || 'JPY' || 'CZK'):
            return ({
              name: currency.name,
              id: idOfCurrency,
              factorIn: bestCourceIn/100,
              factorOut: bestCourceOut/100,
              input: 0,
            })
          case ('SEK' || 'CHF' || 'CNY' || 'NOK'):
            return ({
              name: currency.name,
              id: idOfCurrency,
              factorIn: bestCourceIn/10,
              factorOut: bestCourceOut/10,
              input: 0,
            })
          default:
            return ({
              name: currency.name,
              id: idOfCurrency,
              factorIn: bestCourceIn,
              factorOut: bestCourceOut,
              input:0,
            })
        }
      })

      listOfCurrencies.unshift({
        name: "BYR",
        id: 0,
        factorIn: 1,
        factorOut: 1,
        input: 0,
      });

      let initialCurrencies=[];
      state.initialDisplayedCurrencies.forEach((initialCurrency) => {
        initialCurrencies.push(listOfCurrencies.find((currency) => initialCurrency.name == currency.name))
      });

      let currenciesInSelector=[...listOfCurrencies];
      initialCurrencies.forEach((initialCurrency)=>{
        currenciesInSelector.splice(currenciesInSelector.findIndex((currency)=>currency.name==initialCurrency.name),1)
      })

      return {
        ...state,
        listOfCurrencies: listOfCurrencies,
        currenciesInSelector: currenciesInSelector,
        listOfDisplayedCurrencies: initialCurrencies
      };

    case 'ADD_CURRENCY':
      let itemToAdd = state.listOfCurrencies.find((currency) => currency.id == action.payload.currencyId);
      const currentFactor = itemToAdd[state.sellsBuysSellector];
      let input = Number((state.coefficient / currentFactor).toFixed(4));
      action.payload.optionWithActionName.selected = 'selected';
      const newCurrenciesInSelector = state.currenciesInSelector.filter((currency) => currency.id != itemToAdd.id);

      return {
        ...state,
        currenciesInSelector: newCurrenciesInSelector,
        listOfDisplayedCurrencies: [...state.listOfDisplayedCurrencies,
            {
              name: itemToAdd.name,
              id: itemToAdd.id,
              factorIn: itemToAdd.factorIn,
              factorOut: itemToAdd.factorOut,
              input: input,
            }
          ],
      }

      case 'CHANGING_CURRENCY_VALUE':
        if(isNaN(Number(action.payload.changingValue))){
          return{
            ...state
          }
        }

        let calculatedInput=undefined;
        const futureCoefficient = action.payload.changingValue * state.listOfDisplayedCurrencies.find((curr) => curr.id == action.payload.changingCurrencyId)[state.sellsBuysSellector];
        const listOfCurrWithUpdatedInputs = state.listOfDisplayedCurrencies.map(function (item) {
          calculatedInput = (item.id==action.payload.changingCurrencyId) ? action.payload.changingValue
          :Number((futureCoefficient / item[state.sellsBuysSellector]).toFixed(4));
          return ({
            name: item.name,
            id: item.id,
            factorIn: item.factorIn,
            factorOut: item.factorOut,
            input: calculatedInput
          })
        })
        return {
          ...state,
          coefficient: futureCoefficient,
            changingCurrencyId: action.payload.changingCurrencyId,
            changingValue: action.payload.changingValue,
            listOfDisplayedCurrencies: listOfCurrWithUpdatedInputs,
        }

        case 'REMOVE_CURRENCY': {
          const newListOfDisplayedCurrencies = state.listOfDisplayedCurrencies.filter((curr) => curr.id != action.payload);
          const newCurrenciesInSelector = [...state.currenciesInSelector,state.listOfCurrencies.find((currency) => currency.id == action.payload)];
          return {
            ...state,
            currenciesInSelector: newCurrenciesInSelector,
            listOfDisplayedCurrencies: newListOfDisplayedCurrencies,
          }
        }

        case 'CHANGE_BUYS_SELLS': {
          if(state.changingValue != undefined && state.changingCurrencyId != undefined){
          const futureSellsBuysSellector = 'factor' + action.payload;
          const futureCoefficient = state.changingValue * state.listOfCurrencies.find((curr) => curr.id == state.changingCurrencyId)[futureSellsBuysSellector];
          const listOfCurrWithUpdatedInputs = state.listOfDisplayedCurrencies.map(function (item) {
            return ({
              name: item.name,
              id: item.id,
              factorIn: item.factorIn,
              factorOut: item.factorOut,
              input: Number((futureCoefficient / item[futureSellsBuysSellector]).toFixed(4))
            })
          })
          return {
            ...state,
            sellsBuysSellector: futureSellsBuysSellector,
            listOfDisplayedCurrencies: listOfCurrWithUpdatedInputs,
            coefficient: futureCoefficient,
          }
          }
          else{
            return{...state}
          }
        }

        default: {
          return state;
        }
  }
};

export const styles = (state = {
  activeBtn:"btnBuys",
}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_BTN':
      const activeBtn = (action.payload=='In') ? "btnBuys" : "btnSells";
      return{
        ...state,
        activeBtn:activeBtn,
      }
      default:
        return{
          ...state
        }
  }
}