import { combineReducers } from "redux"
import walletConnectReducer from './reducers/connectWeb3Reducer'

const rootReducer = combineReducers({
  walletConnect: walletConnectReducer
})

export default rootReducer;