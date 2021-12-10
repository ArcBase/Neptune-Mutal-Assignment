import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    accountDetailsModalState: null,
    connectWalletModalState: null
};


const updateAccountDetailsModal = (state: any, data: any) => {
    console.log("This is account details Modal data at reducer", data)
    return updateObject(state, {
        accountDetailsModalState: data
    });
}


const updateConnectWalletDetails = (state: any, data: any) => {
    console.log("This is connect wallet details Modal data at reducer", data)
    return updateObject(state, {
        connectWalletModalState: data
    });
}


const modalStateController = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.ACCOUNT_DETAILS_MODAL:
            return updateAccountDetailsModal(state, action.data);
        case actionTypes.CONNECT_WALLET_MODAL:
            return updateConnectWalletDetails(state, action.data);
        default:
            return state;
    }
};

export default modalStateController;
