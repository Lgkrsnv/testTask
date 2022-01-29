import { combineReducers } from "@reduxjs/toolkit";
import photos from "./photosReducer";

const rootReducer = combineReducers({
	photos,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;