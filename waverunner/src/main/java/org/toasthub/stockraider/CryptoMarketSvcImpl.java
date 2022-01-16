package org.toasthub.stockraider;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.toasthub.utils.Request;
import org.toasthub.utils.Response;

import net.jacobpeterson.alpaca.AlpacaAPI;
import net.jacobpeterson.alpaca.model.endpoint.marketdata.common.historical.bar.enums.BarTimePeriod;
import net.jacobpeterson.alpaca.model.endpoint.marketdata.crypto.common.enums.Exchange;
import net.jacobpeterson.alpaca.model.endpoint.marketdata.crypto.historical.bar.CryptoBarsResponse;
import net.jacobpeterson.alpaca.model.endpoint.marketdata.crypto.historical.xbbo.XbboResponse;
import net.jacobpeterson.alpaca.rest.AlpacaClientException;

@Service("CryptoMarketSvc")
public class CryptoMarketSvcImpl implements CryptoMarketSvc {

	@Autowired
	protected AlpacaAPI alpacaAPI;
	
	// Constructors
	public CryptoMarketSvcImpl() {
	}
	
		
	@Override
	protected void finalize() throws Throwable {
		// TODO Auto-generated method stub
		super.finalize();
	}


	@Override
	public void getMarketData(Request request, Response response) {
		String cryptoName = (String) request.getParams().get("cryptoName"); //"BTCUSD"
		
		if ("".equals(cryptoName)) {
			response.addParam("error", "Crypto name is empty");
			return;
		}
		try {
			 CryptoBarsResponse btcBarsResponse = alpacaAPI.cryptoMarketData().getBars(
			            cryptoName,
			            Arrays.asList(Exchange.COINBASE),
			            ZonedDateTime.of(2021, 12, 18, 0, 0, 0, 0, ZoneId.of("America/New_York")),
			            50,
			            null,
			            1,
			            BarTimePeriod.HOUR);
		    response.addParam("CRYPTOBARS", btcBarsResponse.getBars());

		    // "ETHUSD"
		    XbboResponse etcXBBO = alpacaAPI.cryptoMarketData().getXBBO(
		    		cryptoName,
		            null);
		    response.addParam("XBBO", etcXBBO.getXbbo());
		    
		} catch (AlpacaClientException exception) {
		    exception.printStackTrace();
		}
	}
}
