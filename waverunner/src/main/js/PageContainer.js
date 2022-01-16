import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Routes, Route, useLocation} from "react-router-dom";
import { bindActionCreators } from "redux";
import StocksContainer from "./stocks/stocks-container";
import CryptoContainer from "./crypto/crypto-container";
import DashboardContainer from "./dashboard/dashboard-container";

class PageContainer extends Component {
	constructor(props) {
		super(props);
	}

  render() {
   
      return (
        <Routes>
      		<Route exact path="/" element={<DashboardContainer />}/>
			<Route path="/stocks/*" element={<StocksContainer />}/>
			<Route path="/crypto/*" element={<CryptoContainer />}/>		
      	</Routes>
      );
  }
}

PageContainer.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    appMenus: state.appMenus,
    lang: state.lang,
    appPrefs: state.appPrefs,
    navigation: state.navigation,
    session:state.session
  };
}


export default connect(mapStateToProps)(PageContainer);
