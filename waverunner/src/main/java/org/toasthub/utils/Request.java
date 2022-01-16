package org.toasthub.utils;

import java.util.HashMap;
import java.util.Map;


public class Request {

	private Map<String,Object> params;
	
	public Request(){
		setParams(new HashMap<String,Object>());
	}

	public Map<String,Object> getParams() {
		return params;
	}
	public void setParams(Map<String,Object> params) {
		this.params = params;
	}

	
	public Object getParam(String key){
		if (params != null && params.containsKey(key)){
			return params.get(key);
		}
		return null;
	}
	
	public void addParam(String key, Object value) {
		if (params == null) {
			params = new HashMap<String,Object>();
		}
		params.put(key, value);
	}
	
	public boolean containsParam(String key){
		if (params != null && params.containsKey(key)){
			return true;
		}
		return false;
	}
}
