/**
 * 
 */
'use-strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as stocksActions from './stocks-actions';
import StocksView from "../stocks/view/stocks-view";

class StocksContainer extends Component {
	constructor(props) {
		super(props);
	}

	inputChange = (type,field,value,event) => {
		let val = "";
		if (value == null || value == "") {
				if (event != null) {
					if (event.target != null) {
						val = event.target.value;
					} else {
						val = event;
					}
				} else {
					val = value;
				}
		} else {
			val = value;
		}
		if (type === "DATE") {
			val = event.toISOString();
			this.props.actions.inputChange(field,val,type);
		} else if (type === "TEXT") {
			this.props.actions.inputChange(field,val,type);
		} else if (type === "SWITCH") {
			this.props.actions.inputChange(field,val,type);
		} else if (type === "SELECT") {
			this.props.actions.selectChange({field,"value":val});
		} else if (type === "SELECTCLICK") {
			this.props.actions.selectClick({field,value});
		} else if (type === "SELECTUPDATE") {
			this.props.actions.selectListUpdate({field,"value":val});
		}
	}
	
	onClick = () => {
		this.props.actions.getStocks(this.props.stocksState.test_field);
	}
	
	
	render() {
		
		if (this.props.stocksState != null) {
			return (
				<StocksView
				itemState={this.props.stocksState}
				appPrefs={this.props.appPrefs}
				inputChange={(e) => this.inputChange("TEXT",'test_field','',e)}
				onClick={this.onClick}
				/>
			);
		} else {
			return (<div> Loading... </div>);
		}

	}
	
}

StocksContainer.propTypes = {
		appPrefs: PropTypes.object,
		actions: PropTypes.object,
		stocksState: PropTypes.object,
		session: PropTypes.object
	};

function mapStateToProps(state, ownProps) {
	return { appPrefs:state.appPrefs, stocksState:state.stocks, session:state.session };
}

function mapDispatchToProps(dispatch) {
	return { actions:bindActionCreators(stocksActions,dispatch) };
}

export default connect(mapStateToProps,mapDispatchToProps)(StocksContainer);