import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState  = {
  walletAddress: null,
};

const updateWalletAddress = (state: any, data: any) => {
  console.log("This is the actuon",data)
  return updateObject(state, {
    walletAddress : data
  });
};


const walletConnectReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case actionTypes.WALLLET_ADDRESS_SETUP:
      return updateWalletAddress(state, action.data);
    default:
      return state;
  }
};

export default walletConnectReducer;
