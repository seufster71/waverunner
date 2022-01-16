/**
 * 
 */
 export default function cryptoReducer(state = {}, action) {
	let myState = {};
	switch(action.type) {
		case 'CRYPTO_INPUT_CHANGE': {
			if (action.params != null) {
				let clone = Object.assign({}, state);
				clone.test_field = action.params.value;
				return clone;
			} else {
        		return state;
    		}
    	}
		case 'CRYPTO_GET_LIST': {
			if (action.responseJson != null && action.responseJson.params != null) {
				let cryptoBars = [];
  				if (action.responseJson.params.CRYPTOBARS != null) {
    				cryptoBars = action.responseJson.params.CRYPTOBARS;
  				}
				let xbbo = {};
				if (action.responseJson.params.XBBO != null) {
    				xbbo = action.responseJson.params.XBBO;
  				}
				return Object.assign({}, state, {
					cryptoBars: cryptoBars,
					xbbo: xbbo
				});
			
			} else {
        		return state;
    		}
		}
		default:
		return state;
	}
}