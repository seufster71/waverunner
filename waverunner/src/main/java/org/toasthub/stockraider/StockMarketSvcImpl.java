package org.toasthub.stockraider;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.toasthub.utils.Request;
import org.toasthub.utils.Response;

import net.jacobpeterson.alpaca.AlpacaAPI;
import net.jacobpeterson.alpaca.model.endpoint.clock.Clock;
import net.jacobpeterson.alpaca.model.endpoint.common.enums.SortDirection;
import net.jacobpeterson.alpaca.model.endpoint.marketdata.common.historical.bar.enums.BarTimePeriod;
import net.jacobpeterson.alpaca.model.endpoint.marketdata.common.historical.trade.Trade;
import net.jacobpeterson.alpaca.model.endpoint.marketdata.stock.historical.bar.StockBar;
import net.jacobpeterson.alpaca.model.endpoint.marketdata.stock.historical.bar.StockBarsResponse;
import net.jacobpeterson.alpaca.model.endpoint.marketdata.stock.historical.bar.enums.BarAdjustment;
import net.jacobpeterson.alpaca.model.endpoint.marketdata.stock.historical.bar.enums.BarFeed;
import net.jacobpeterson.alpaca.model.endpoint.marketdata.stock.historical.trade.StockTrade;
import net.jacobpeterson.alpaca.model.endpoint.marketdata.stock.historical.trade.StockTradesResponse;
import net.jacobpeterson.alpaca.model.endpoint.orders.Order;
import net.jacobpeterson.alpaca.model.endpoint.orders.enums.CurrentOrderStatus;
import net.jacobpeterson.alpaca.rest.AlpacaClientException;

@Service("StockMarketSvc")
public class StockMarketSvcImpl implements StockMarketSvc {

	@Autowired
	protected AlpacaAPI alpacaAPI = null;
	
	// Constructors
	public StockMarketSvcImpl() {
	}
	
		
	@Override
	protected void finalize() throws Throwable {
		// TODO Auto-generated method stub
		super.finalize();
	}


	@Override
	public void getMarketData(Request request, Response response) {
		String stockName = (String) request.getParams().get("stockName");
		
		if ("".equals(stockName)) {
			response.addParam("error", "Stock name is empty");
			return;
		}
		try {    
		    // Get AAPL one hour, split-adjusted bars from 7/6/2021 market open
		    // to 7/8/2021 market close from the SIP feed and print them out
		    StockBarsResponse aaplBarsResponse = alpacaAPI.stockMarketData().getBars(
		            stockName,
		            ZonedDateTime.of(2021, 7, 6, 9, 30, 0, 0, ZoneId.of("America/New_York")),
		            ZonedDateTime.of(2021, 7, 8, 12 + 4, 0, 0, 0, ZoneId.of("America/New_York")),
		            null,
		            null,
		            1,
		            BarTimePeriod.HOUR,
		            BarAdjustment.SPLIT,
		            BarFeed.SIP);
		    List<StockBar> stockBars = aaplBarsResponse.getBars();
		    response.addParam("STOCKBARS", stockBars);
		    //.forEach(System.out::println);
	
		    // Get AAPL first 10 trades on 7/8/2021 at market open and print them out
		    StockTradesResponse aaplTradesResponse = alpacaAPI.stockMarketData().getTrades(
		            stockName,
		            ZonedDateTime.of(2021, 7, 8, 9, 30, 0, 0, ZoneId.of("America/New_York")),
		            ZonedDateTime.of(2021, 7, 8, 9, 31, 0, 0, ZoneId.of("America/New_York")),
		            10,
		            null);
		    List<StockTrade> stockTrades = aaplTradesResponse.getTrades();
		    response.addParam("TRADES", stockTrades);
		    // .forEach(System.out::println);
	
		    // Print out latest AAPL trade
		    Trade latestTrade = alpacaAPI.stockMarketData().getLatestTrade(stockName).getTrade();
		    response.addParam("TRADE", latestTrade);

	
		    // Print out snapshot of AAPL, GME, and TSLA
		  // Map<String, Snapshot> snapshots = alpacaAPI.stockMarketData().getSnapshots(Arrays.asList(stockName, "GME", "TSLA"));
		   // snapshots.forEach((symbol, snapshot) -> System.out.printf("Symbol: %s\nSnapshot: %s\n\n", symbol, snapshot));
		    
		} catch (AlpacaClientException exception) {
		    exception.printStackTrace();
		}
	}
}
