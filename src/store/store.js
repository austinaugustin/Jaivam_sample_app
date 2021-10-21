import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import { persistReducer, persistStore, } from 'redux-persist'

import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import wishList from './reducers'
import userReducer from "./reducers/userReducer";

const appReducer = combineReducers({
  wishList,userReducer
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet
}

const store = createStore(
  persistReducer(rootPersistConfig, rootReducer),
  compose(applyMiddleware(thunk, logger))
)

const persistor = persistStore(store)

export { store, persistor }