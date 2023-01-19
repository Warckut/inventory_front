import { combineReducers } from '@reduxjs/toolkit';
import commonReducer from './commonReducer';
import productsReducer from './productsReducer';
import purchasesReducer from './purchasesReducer';
import issuesReducer from './IssuesReducer';

const rootReducer = combineReducers({
    productsReducer,
    purchasesReducer,
    issuesReducer,
    commonReducer
})

export default rootReducer;

// export default persistReducer(persistConfig, rootReducer);