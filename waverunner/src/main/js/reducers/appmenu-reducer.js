export default function appMenuReducer(state = {}, action) {
	let myState = {};
	switch(action.type) {
		case 'LOAD_INIT': {
			if (action.responseJson != null && action.responseJson.params != null && action.responseJson.params.MENUS != null) {
    		    let myState = {};
    		    const menus = action.responseJson.params.MENUS;
    		    for (let key in menus) {
    		      myState[key] = menus[key];
    		    }
    		    return Object.assign({}, state, myState);
			} else {
    		    return state;
			}
		}
		case 'MEMBER_INIT': {
			if (action.responseJson != null && action.responseJson.params != null && action.responseJson.params.MENUS != null) {
    		    let myState = {};
    		    const menus = action.responseJson.params.MENUS;
    		    for (let key in menus) {
    		      myState[key] = menus[key];
    		    }
    		    return Object.assign({}, state, myState);
			} else {
    		    return state;
			}
		}
		case 'TEST': {
			return state;
		}
		default: {
			return state;
		}
	}
}

