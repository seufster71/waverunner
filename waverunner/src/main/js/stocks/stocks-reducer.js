/**
 * 
 */
 export default function stocksReducer(state = {}, action) {
	let myState = {};
	switch(action.type) {
		case 'STOCK_INPUT_CHANGE': {
			if (action.params != null) {
				let clone = Object.assign({}, state);
				clone.test_field = action.params.value;
				return clone;
			} else {
        		return state;
    		}
    	}
		case 'STOCK_GET_LIST': {
			if (action.responseJson != null && action.responseJson.params != null) {
				let stockBars = [];
  				if (action.responseJson.params.STOCKBARS != null) {
    				stockBars = action.responseJson.params.STOCKBARS;
  				}
				let trades = [];
  				if (action.responseJson.params.TRADES != null) {
    				trades = action.responseJson.params.TRADES;
  				}
				let trade = {};
  				if (action.responseJson.params.TRADE != null) {
    				trade = action.responseJson.params.TRADE;
  				}
				return Object.assign({}, state, {
					stockBars: stockBars,
					trades: trades,
					trade: trade
				});
			
			} else {
        		return state;
    		}
		}
		default:
		return state;
	}
}