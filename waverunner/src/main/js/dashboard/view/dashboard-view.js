/**
 * 
 */
import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate, Link} from 'react-router-dom';
import moment from 'moment';

export default function DashboardView({itemState, appPrefs, inputChange, onClick}) {
	let value = "";
	if (itemState != null && itemState.test_field != null) {
		value = itemState.test_field;
	}
	const nav = useNavigate();
	const x = window.location.pathname;
	
	let marketOpen = "Closed";
	if (itemState != null && itemState.clock != null && itemState.clock.isOpen == true) {
		marketOpen = "Open";
	}
	
 	return (
    	<div> 
    		<div> Welcome </div>
    		<div> Market is currently: {marketOpen} </div>
			
			<nav
        		style={{
         		borderBottom: "solid 1px",
          		paddingBottom: "1rem"
        		}}
      		>
       			<Link to="/stocks">Stock</Link> |{" "}
        		<Link to="/crypto">Crypto</Link>
      		</nav>
		</div>
    );
}


DashboardView.propTypes = {
  itemState: PropTypes.object.isRequired,
  appPrefs: PropTypes.object,
  inputChange: PropTypes.func,
  onClick: PropTypes.func
};
    	