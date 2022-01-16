export default function appPrefReducer(state = {}, action) {
  let myState = {};
  switch(action.type) {
    case 'LOAD_INIT': {
    	if (action.responseJson != null && action.responseJson.params != null) {
    	    let myPrefForms = {};
    	    if (action.responseJson.params.prefFormFields != null) {
    	      const prefForms = action.responseJson.params.prefFormFields;
    	      for (let fieldKey in prefForms) {
    	        myPrefForms[fieldKey] = prefForms[fieldKey];
    	      }
    	    }
    	    let myPrefTexts = {};
    	    if (action.responseJson.params.prefTexts != null) {
    	      const prefTexts = action.responseJson.params.prefTexts;
    	      for (let textKey in prefTexts) {
    	        myPrefTexts[textKey] = prefTexts[textKey];
    	      }
    	    }
    	    let myPrefLabels = {};
    	    if (action.responseJson.params.prefLabels != null) {
    	      const prefLabels = action.responseJson.params.prefLabels;
    	      for (let labelKey in prefLabels) {
    	        myPrefLabels[labelKey] = prefLabels[labelKey];
    	      }
    	    }
    	    let myPrefOptions = {};
    	    if (action.responseJson.params.prefOptions != null) {
    	      const prefOptions = action.responseJson.params.prefOptions;
    	      for (let optionKey in prefOptions) {
    	        myPrefOptions[optionKey] = prefOptions[optionKey];
    	      }
    	    }
    	    let myPrefGlobal = {};
    	    let myLang = "en";
    	    if (action.responseJson.params.LANGUAGES != null) {
    	      myPrefGlobal.LANGUAGES = action.responseJson.params.LANGUAGES;
    	      const languages = action.responseJson.params.LANGUAGES;
    	      for (let i = 0; i < languages.length; i++) {
    	        if (languages[i].defaultLang) {
    	          myLang = languages[i].code;
    	        }
    	      }
    	    }
    	    return Object.assign({}, state, {
    	      prefForms: Object.assign({}, state.prefForms, myPrefForms),
    	      prefTexts: Object.assign({}, state.prefTexts, myPrefTexts),
    	      prefLabels: Object.assign({}, state.prefLabels, myPrefLabels),
    	      prefOptions: Object.assign({}, state.prefOptions, myPrefOptions),
    	      prefGlobal: Object.assign({}, state.prefGlobal, myPrefGlobal),
    	      lang:myLang
    	    });
    	  } else {
    	    return state;
    	  }
    }
    case 'SAVE_PREFTEXTS':
      return state.prefTexts;
    case 'SAVE_PREFLABELS':
      return state.prefLabels;
    case 'SAVE_PREFOPTIONS':
      return state.prefOptions;
    case 'SAVE_LANG':
      return state.lang;
    case 'SAVE_GLOBAL':
      return state.prefGlobal;
    default:
      return state;
  }
}
