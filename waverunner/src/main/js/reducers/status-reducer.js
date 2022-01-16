export default function statusReducer(state = {}, action) {
	switch(action.type) {
    	case 'SHOW_STATUS': {
    		let myState = {};
    		if(action.info != null) {
    			myState.info = action.info;
    		} else if (action.warn != null) {
    			myState.warn = action.warn;
    		} else if (action.error != null) {
    			myState.error = action.error;
    		}
    		return Object.assign({}, state, myState);
    	}
    	case 'CLEAR_STATUS': {
    		let myState = {};
    		myState.info = null;
    		myState.warn = null;
    		myState.error = null;
    		return Object.assign({}, state, myState);
    	}
    	case 'SHOW_STATUS_ERROR': {
    		let myState = {};
    		if(action.error != null) {
    			myState.error = action.error;
    			myState.info = null;
    			myState.warn = null;
    		}
    		return Object.assign({}, state, myState);
    	}
    	case 'SAVE_AUTHENTICATION': {
    		let myState = updateStatus(action);
    		return Object.assign({}, state, myState);
    	}
    	default:
    		return state;
	}
}

const updateStatus = ( action) => {
	let myState = {};
	if (action.responseJson != null && action.responseJson.params != null && action.responseJson.params.status != null) {
		if (action.responseJson.params.status.info != null) {
			myState.info = action.responseJson.params.status.info;
		} else {
			myState.info = null;
		}
		if (action.responseJson.params.status.warn != null) {
			myState.warn = action.responseJson.params.status.warn;
		} else {
			myState.warn = null;
		}
		if (action.responseJson.params.status.error != null) {
			myState.error = action.responseJson.params.status.error;
		} else {
			myState.error = null;
		}
	} else {
		myState.error = null;
		myState.info = null;
		myState.warn = null;
	}
	return myState;
};
