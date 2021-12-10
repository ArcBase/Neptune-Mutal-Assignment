import React from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "./actionTypes";

export const saveAccountDetailsToggleToProps = (currentState) => {
    return {
        type: actionTypes.ACCOUNT_DETAILS_MODAL,
        data: currentState
    };
};

export const saveConnectWalletModalToggleToProps = (currentState) => {
    return {
        type: actionTypes.CONNECT_WALLET_MODAL,
        data: currentState
    };
};

export const toggleAccountDetailsModalState = (currentState) => {
    return (dispatch) => {
        dispatch(saveAccountDetailsToggleToProps(currentState))
    }
}

export const toggleConnectWalletModalState = (currentState) => {
    return (dispatch) => {
        dispatch(saveConnectWalletModalToggleToProps(currentState))
    }
}