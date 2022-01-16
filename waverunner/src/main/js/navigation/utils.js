/**
 * 
 */
import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

export default function withNavigate() {
	const nav = useNavigate();
 	return nav;
}


withNavigate.propTypes = {
 
};
    	