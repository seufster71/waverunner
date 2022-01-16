export default function sessionReducer(state = {}, action) {
	let myState = {};
	switch(action.type) {
	case 'LOAD_SESSION_CHECK': {
		if (action.responseJson != null && action.responseJson.status != null && action.responseJson.status === "SUCCESS") {
			myState.sessionActive = true;
			myState.user = action.responseJson.params.USER;
		} else {
			myState.sessionActive = false;
			myState.user = null;
		}
		return Object.assign({}, state, myState);
	}
	case 'SAVE_SESSION': {
		if (action.responseJson != null && action.responseJson.params != null && action.responseJson.params.USER != null) {
			return Object.assign({}, state, {sessionActive:true, status:'JUST_LOGGEDIN', user:action.responseJson.params.USER});
		} else {
			return state;
		}
	}
	case 'CLEAR_SESSION_LOGIN': {
		return Object.assign({}, state, {status:''});
	}
	case 'PROCESS_LOGOUT': {
		return Object.assign({}, state, {sessionActive:false, user:null, status:''});
	}
	case 'VIEW_PORT_CHANGE': {
		if (action.width <= 768) {
			return Object.assign({}, state, {viewPort:'small'});
		} else {
			return Object.assign({}, state, {viewPort:'large'});
		}
		
	}
	default:
		return state;
	}
}
