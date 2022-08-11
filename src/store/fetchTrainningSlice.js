import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import { SERVER_URL } from 'assets/server/server';
import axios from 'axios'

export const fetch_trainningMSE=createAsyncThunk('fetch_trainning',async (data)=>{
    var data = JSON.stringify({
        "file_name": data.file_name,
        "data_layers":data.layer_data
      });
      var config = {
        method: 'POST',
        url: SERVER_URL+'/trainnig_model',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
    return await axios(config).then((response)=>{
        // console.log(response)
        return response.data
    })

    });
const fetch_trainningSlice=createSlice({
    name:'fetch_trainning',
    initialState:{ 
        trainning_data:{loss:[],val_loss:[]},
        trainning_data_status:'',
        trainning_data_uid:'',
        trainning_data_error:null,
        prediction_data:[],
        loading:false
     },
     reducers:{
        get_trainning_data(state,action){
            // console.log("Get data")
            state.trainning_data.push(action.payload);
        }
     },
     extraReducers:{
        [fetch_trainningMSE.pending] :(state,action)=>{
            // console.log("Pending")
            state.trainning_data_status='loading';
            state.loading=true;
        },
        [fetch_trainningMSE.fulfilled]:(state,action)=>{
            // console.log("Fulfilled")
            state.trainning_data_status='success';
            state.trainning_data.loss=action.payload.train_data.loss;
            state.trainning_data.val_loss=action.payload.train_data.val_loss;
            state.prediction_data=action.payload.prediction_data;
            state.tomorrow_data=action.payload.tommorow_price;
            // console.log(action)
          //  state.trainning_data_uid=action.payload.file_name;
            state.loading=false;
        },
        [fetch_trainningMSE.rejected]:(state,action)=>{
            // console.log("Rejected")
            state.trainning_data_status='failed';
            state.loading=true;
        }
     }
})
export const {get_trainning_data}=fetch_trainningSlice.actions;
export default fetch_trainningSlice.reducer;