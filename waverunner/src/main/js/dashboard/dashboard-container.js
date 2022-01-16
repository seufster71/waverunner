/**
 * 
 */
'use-strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { useLocation } from "react-router-dom";
import {bindActionCreators} from 'redux';
import * as dashboardActions from './dashboard-actions';
import DashboardView from "../dashboard/view/dashboard-view";

class DashboardContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.actions.getDashboard();
		
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
		this.props.actions.getDashboard(this.props.dashboardState.test_field);
	}
	
	
	render() {
		if (this.props.dashboardState != null) {
			return (
				<DashboardView
				itemState={this.props.dashboardState}
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

DashboardContainer.propTypes = {
		appPrefs: PropTypes.object,
		actions: PropTypes.object,
		stocksState: PropTypes.object,
		session: PropTypes.object
	};

function mapStateToProps(state, ownProps) {
	return { appPrefs:state.appPrefs, dashboardState:state.dashboard, session:state.session };
}

function mapDispatchToProps(dispatch) {
	return { actions:bindActionCreators(dashboardActions,dispatch) };
}

function nav(){
	const location = useLocation();
	return location.pathname;
}

export default connect(mapStateToProps,mapDispatchToProps)(DashboardContainer);