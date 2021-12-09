import React from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "./actionTypes";


// import { io } from "socket.io-client";
export const saveWalletToProps = (publicAddress) => {
  return {
    type: actionTypes.WALLLET_ADDRESS_SETUP,
    data: publicAddress
  };
};


export const processWalletState = (publicAddress) => {
  return (dispatch) => {
    console.log("This is the Address to ", publicAddress) 
    dispatch(saveWalletToProps(publicAddress))
  }
}