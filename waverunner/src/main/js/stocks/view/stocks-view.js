/**
 * 
 */
import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';

export default function StocksView({itemState, appPrefs, inputChange, onClick}) {
	let value = "";
	if (itemState != null && itemState.test_field != null) {
		value = itemState.test_field;
	}
	const nav = useNavigate();
	const x = window.location.pathname;
	
	let stockBarTableRows = [];
	// fill stock bar table
	if (itemState != null && itemState.stockBars != null && itemState.stockBars.length > 0) {
		for (let i = 0; i < itemState.stockBars.length; i++) {
			let cells = [];
			let timeValue =new Intl.DateTimeFormat('en-US', {
		          year: 'numeric',
		          month: 'short',
		          day: 'numeric',
		          hour: 'numeric',
		          minute: 'numeric',
		          second: 'numeric',
		          timeZone: 'America/New_York'
	    		}).format(moment(itemState.stockBars[i].timestamp).toDate());
			cells.push(<td key="TIMESTAMP">{timeValue}</td>);
			cells.push(<td key="OPEN">{itemState.stockBars[i].open}</td>);
			cells.push(<td key="HIGH">{itemState.stockBars[i].high}</td>);
			cells.push(<td key="LOW">{itemState.stockBars[i].low}</td>);
			cells.push(<td key="CLOSE">{itemState.stockBars[i].close}</td>);
			cells.push(<td key="TRADECOUNT">{itemState.stockBars[i].tradecount}</td>);
			cells.push(<td key="VWAP">{itemState.stockBars[i].vwap}</td>);
			cells.push(<td key="VOLUME">{itemState.stockBars[i].volume}</td>);
			stockBarTableRows.push( <tr key={i} >{cells}</tr> );
		}
	} else {
		stockBarTableRows.push(<tr key="1"><td id="EMPTY">Empty</td></tr>);
	}
	let stockBarTableBody = <tbody>{stockBarTableRows}</tbody>;
	
	
	let tradesTableRows = [];
	// fill tradestable
	if (itemState != null && itemState.trades != null && itemState.trades.length > 0) {
		for (let i = 0; i < itemState.trades.length; i++) {
			let cells = [];
			let timeValue =new Intl.DateTimeFormat('en-US', {
		          year: 'numeric',
		          month: 'short',
		          day: 'numeric',
		          hour: 'numeric',
		          minute: 'numeric',
		          second: 'numeric',
		          timeZone: 'America/New_York'
	    		}).format(moment(itemState.trades[i].timestamp).toDate());
			cells.push(<td key="TIMESTAMP">{timeValue}</td>);
			cells.push(<td key="PRICE">{itemState.trades[i].price}</td>);
			cells.push(<td key="TRADEID">{itemState.trades[i].tradeID}</td>);
			cells.push(<td key="EXCHANGE">{itemState.trades[i].exchange}</td>);
			cells.push(<td key="SIZE">{itemState.trades[i].size}</td>);
			cells.push(<td key="CONDITIONS">{itemState.trades[i].conditions}</td>);
			cells.push(<td key="TAPE">{itemState.trades[i].tape}</td>);
			tradesTableRows.push( <tr key={i} >{cells}</tr> );
		}
	} else {
		tradesTableRows.push(<tr key="1"><td id="EMPTY">Empty</td></tr>);
	}
	let tradesTableBody = <tbody>{tradesTableRows}</tbody>;
	
	let latestTradeTableRows = [];
	// fill latest tradestable
	if (itemState != null && itemState.trade != null ) {
		let cells = [];
		let timeValue =new Intl.DateTimeFormat('en-US', {
	          year: 'numeric',
	          month: 'short',
	          day: 'numeric',
	          hour: 'numeric',
	          minute: 'numeric',
	          second: 'numeric',
	          timeZone: 'America/New_York'
    		}).format(moment(itemState.trade.timestamp).toDate());
		cells.push(<td key="TIMESTAMP">{timeValue}</td>);
		cells.push(<td key="PRICE">{itemState.trade.price}</td>);
		cells.push(<td key="TRADEID">{itemState.trade.tradeID}</td>);
		cells.push(<td key="EXCHANGE">{itemState.trade.exchange}</td>);
		cells.push(<td key="SIZE">{itemState.trade.size}</td>);
		cells.push(<td key="CONDITIONS">{itemState.trade.conditions}</td>);
		cells.push(<td key="TAPE">{itemState.trade.tape}</td>);
		latestTradeTableRows.push( <tr key="TRADE" >{cells}</tr> );
	} else {
		latestTradeTableRows.push(<tr key="1"><td id="EMPTY">Empty</td></tr>);
	}
	let latestTradeTableBody = <tbody>{latestTradeTableRows}</tbody>;
	
 	return (
    	<div> 
    		<div> Stocks </div>
    		<div>
				<label htmlFor="TestField">Stock Name</label>
				<input type="Text" id="TestField" name="TestField" className="form-control" autoComplete="new-password" 
				autoCapitalize="off" onChange={inputChange} value={value}/>
			</div>
			<div> 
				<input type="submit" name="TestButton" id="TestButton" className="form-control" value="Get Stock" onClick={onClick}/>
			</div>
			<div> Stock Bars</div>
			<table className="table table-striped">
				<thead>
	  				<tr>
	    				<th scope="col">TimeStamp</th>
	    				<th scope="col">Open</th>
	    				<th scope="col">High</th>
						<th scope="col">Low</th>
						<th scope="col">Close</th>
						<th scope="col">Trade Count</th>
						<th scope="col">VWap</th>
						<th scope="col">Volume</th>
	  				</tr>
  				</thead>
				{stockBarTableBody}
			</table>
			<div> Trades</div>
			<table className="table table-striped">
				<thead>
	  				<tr>
	    				<th scope="col">TimeStamp</th>
	    				<th scope="col">Price</th>
	    				<th scope="col">TradeId</th>
						<th scope="col">Exchange</th>
						<th scope="col">Size</th>
						<th scope="col">Conditions</th>
						<th scope="col">Tape</th>
	  				</tr>
  				</thead>
				{tradesTableBody}
			</table>
			<div> Latest Trade</div>
			<table className="table table-striped">
				<thead>
	  				<tr>
	    				<th scope="col">TimeStamp</th>
	    				<th scope="col">Price</th>
	    				<th scope="col">TradeId</th>
						<th scope="col">Exchange</th>
						<th scope="col">Size</th>
						<th scope="col">Conditions</th>
						<th scope="col">Tape</th>
	  				</tr>
  				</thead>
				{latestTradeTableBody}
			</table>
		</div>
    );
}


StocksView.propTypes = {
  itemState: PropTypes.object.isRequired,
  appPrefs: PropTypes.object,
  inputChange: PropTypes.func,
  onClick: PropTypes.func
};
    	