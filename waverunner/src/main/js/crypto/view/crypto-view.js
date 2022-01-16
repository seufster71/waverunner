/**
 * 
 */
import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';

export default function CryptoView({itemState, appPrefs, inputChange, onClick}) {
	let value = "";
	if (itemState != null && itemState.test_field != null) {
		value = itemState.test_field;
	}
	const nav = useNavigate();
	const x = window.location.pathname;
	
	let cryptoBarTableRows = [];
	// fill crypto bar table
	if (itemState != null && itemState.cryptoBars != null && itemState.cryptoBars.length > 0) {
		for (let i = 0; i < itemState.cryptoBars.length; i++) {
			let cells = [];
			let timeValue =new Intl.DateTimeFormat('en-US', {
		          year: 'numeric',
		          month: 'short',
		          day: 'numeric',
		          hour: 'numeric',
		          minute: 'numeric',
		          second: 'numeric',
		          timeZone: 'America/New_York'
	    		}).format(moment(itemState.cryptoBars[i].timestamp).toDate());
			cells.push(<td key="TIMESTAMP">{timeValue}</td>);
			cells.push(<td key="OPEN">{itemState.cryptoBars[i].open}</td>);
			cells.push(<td key="HIGH">{itemState.cryptoBars[i].high}</td>);
			cells.push(<td key="LOW">{itemState.cryptoBars[i].low}</td>);
			cells.push(<td key="CLOSE">{itemState.cryptoBars[i].close}</td>);
			cells.push(<td key="TRADECOUNT">{itemState.cryptoBars[i].tradecount}</td>);
			cells.push(<td key="VWAP">{itemState.cryptoBars[i].vwap}</td>);
			cells.push(<td key="VOLUME">{itemState.cryptoBars[i].volume}</td>);
			cryptoBarTableRows.push( <tr key={i} >{cells}</tr> );
		}
	} else {
		cryptoBarTableRows.push(<tr key="1"><td id="EMPTY">Empty</td></tr>);
	}
	let cryptoBarTableBody = <tbody>{cryptoBarTableRows}</tbody>;
	
	let xbboTableRows = [];
	// fill latest tradestable
	if (itemState != null && itemState.xbbo != null ) {
		let cells = [];
		let timeValue =new Intl.DateTimeFormat('en-US', {
	          year: 'numeric',
	          month: 'short',
	          day: 'numeric',
	          hour: 'numeric',
	          minute: 'numeric',
	          second: 'numeric',
	          timeZone: 'America/New_York'
    		}).format(moment(itemState.xbbo.timestamp).toDate());
		cells.push(<td key="TIMESTAMP">{timeValue}</td>);
		cells.push(<td key="PRICE">{itemState.xbbo.askExchange}</td>);
		cells.push(<td key="TRADEID">{itemState.xbbo.askPrice}</td>);
		cells.push(<td key="EXCHANGE">{itemState.xbbo.askSize}</td>);
		cells.push(<td key="SIZE">{itemState.xbbo.bidExchange}</td>);
		cells.push(<td key="CONDITIONS">{itemState.xbbo.bidPrice}</td>);
		cells.push(<td key="TAPE">{itemState.xbbo.bidSize}</td>);
		xbboTableRows.push( <tr key="TRADE" >{cells}</tr> );
	} else {
		xbboTableRows.push(<tr key="1"><td id="EMPTY">Empty</td></tr>);
	}
	let xbboTableBody = <tbody>{xbboTableRows}</tbody>;
	
 	return (
    	<div> 
    		<div> Crypto </div>
    		<div>
				<label htmlFor="TestField">Crypto Name</label>
				<input type="Text" id="TestField" name="TestField" className="form-control" autoComplete="new-password" 
				autoCapitalize="off" onChange={inputChange} value={value}/>
			</div>
			<div> 
				<input type="submit" name="TestButton" id="TestButton" className="form-control" value="Get Crypto" onClick={onClick}/>
			</div>
			<div> Crypto Bars</div>
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
				{cryptoBarTableBody}
			</table>
			
			<div> Best Bid</div>
			<table className="table table-striped">
				<thead>
	  				<tr>
	    				<th scope="col">TimeStamp</th>
	    				<th scope="col">Ask Exchange</th>
	    				<th scope="col">Ask Price</th>
						<th scope="col">Ask Size</th>
						<th scope="col">Bid Exchange</th>
						<th scope="col">Bid Price</th>
						<th scope="col">Bid Size</th>
	  				</tr>
  				</thead>
				{xbboTableBody}
			</table>
		</div>
    );
}


CryptoView.propTypes = {
  itemState: PropTypes.object.isRequired,
  appPrefs: PropTypes.object,
  inputChange: PropTypes.func,
  onClick: PropTypes.func
};
    	