package org.toasthub.api;


import org.toasthub.stockraider.CryptoMarketSvc;
import org.toasthub.stockraider.DashboardSvc;
import org.toasthub.stockraider.StockMarketSvc;
import org.toasthub.utils.Request;
import org.toasthub.utils.Response;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/public")
public class PublicWS {

	@Autowired
	StockMarketSvc stockMarketSvc;
	
	@Autowired
	CryptoMarketSvc cryptoMarketSvc;
	
	@Autowired
	DashboardSvc dashboardSvc;
	
	
	@RequestMapping(value = "callService", method = RequestMethod.POST)
	public Response service(@RequestBody Request request) {
		String action = (String) request.getParams().get("action");
		
		Response response = new Response();
		List<String> list = new ArrayList<String>();
		
		switch (action) {
		case "STOCK_LIST":
			stockMarketSvc.getMarketData(request, response);
			response.addParam("items", list);
			break;
		case "CRYPTO_LIST":
			cryptoMarketSvc.getMarketData(request, response);
			response.addParam("items", list);
			break;
		case "DASHBOARD":
			dashboardSvc.getData(request, response);
			break;
		case "TEST":
			
			break;
		
		default:
			break;
		}
		
		
		return response;
	}
	
	
}
