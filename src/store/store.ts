import { configureStore } from "@reduxjs/toolkit";
import rootReducer from '../reducers/rootReducer';
import {useDispatch} from 'react-redux';

const store = configureStore({
	reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export default store;
export const useAppDispactch = () => useDispatch<AppDispatch>();
