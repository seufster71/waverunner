/**
 * 
 */
 export default function dashboardReducer(state = {}, action) {
	let myState = {};
	switch(action.type) {
		case 'DASHBOARD_INPUT_CHANGE': {
			if (action.params != null) {
				let clone = Object.assign({}, state);
				clone.test_field = action.params.value;
				return clone;
			} else {
        		return state;
    		}
    	}
		case 'DASHBOARD_GET': {
			if (action.responseJson != null && action.responseJson.params != null) {
				let clock = {};
  				if (action.responseJson.params.CLOCK != null) {
    				clock = action.responseJson.params.CLOCK;
  				}
				let account = {};
  				if (action.responseJson.params.ACCOUNT != null) {
    				account = action.responseJson.params.ACCOUNT;
  				}
				return Object.assign({}, state, {
					clock: clock,
					account: account
				});
			
			} else {
        		return state;
    		}
		}
		default:
		return state;
	}
}