package org.toasthub.stockraider;

import org.toasthub.utils.Request;
import org.toasthub.utils.Response;

public interface CryptoMarketSvc {
	public void getMarketData(Request request, Response response);
	
}
