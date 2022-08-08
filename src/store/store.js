import {configureStore} from '@reduxjs/toolkit';
import fetch_dataReducer from './fetchDataSlice';
import fetch_trainningReducer from './fetchTrainningSlice';

const store =configureStore({
    reducer:{
        fetch_data:fetch_dataReducer,
        fetch_trainning:fetch_trainningReducer
    }
});
export default store;