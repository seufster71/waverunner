/**
 * 
 */
'use-strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as cryptoActions from './crypto-actions';
import CryptoView from "../crypto/view/crypto-view";

class CryptoContainer extends Component {
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
		this.props.actions.getCrypto(this.props.cryptoState.test_field);
	}
	
	
	render() {
		
		if (this.props.cryptoState != null) {
			return (
				<CryptoView
				itemState={this.props.cryptoState}
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

CryptoContainer.propTypes = {
		appPrefs: PropTypes.object,
		actions: PropTypes.object,
		stocksState: PropTypes.object,
		session: PropTypes.object
	};

function mapStateToProps(state, ownProps) {
	return { appPrefs:state.appPrefs, cryptoState:state.crypto, session:state.session };
}

function mapDispatchToProps(dispatch) {
	return { actions:bindActionCreators(cryptoActions,dispatch) };
}

export default connect(mapStateToProps,mapDispatchToProps)(CryptoContainer);