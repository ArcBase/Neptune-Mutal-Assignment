import { combineReducers } from "redux"
import walletConnectReducer from './reducers/connectWeb3Reducer'
import modalStateController from './reducers/modalControlReducer'

const rootReducer = combineReducers({
  walletConnect: walletConnectReducer ,
// modalStateControl : modalStateController
})

export default rootReducer;