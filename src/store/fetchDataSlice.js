import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import { SERVER_URL } from 'assets/server/server';
import axios from 'axios'

export const  fetchPrices=createAsyncThunk('fetchPrices',async (dates)=>{
    var data = JSON.stringify({
        "start_date": dates.start_date,
        "end_date": dates.end_date,
        symbol:dates.symbol
      });
      var config = {
        method: 'POST',
        url: SERVER_URL+'/prices',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
    return await axios(config).then((response)=>{
        // console.log(response.data)
        return response.data
    })
})
const fetch_dataSlice=createSlice({
    name:'fetch_data',
    initialState:{
        prices:[],
        status:null,
        save_data:[],
        data_status:null,
        uid:''
    },
    reducers:{
        get_data(state,action){
            // console.log("Get data")
            state.save_data.push(action.payload);
        },
        save_data(state,action){
            // console.log("Save data")
            state.save_data.push(action.payload);
        }
    },
    extraReducers:{
        [fetchPrices.pending] :(state,action)=>{
            // console.log("Pending")
            state.status='loading';
        },
        [fetchPrices.fulfilled]:(state,action)=>{
            // console.log("Fulfilled")
            state.status='success';
            state.data_status="feteched"
            state.prices=action.payload.data;
            state.uid=action.payload.file_name;
        },
        [fetchPrices.rejected]:(state,action)=>{
            // console.log("Rejected")
            state.status='failed';
        }
    }
});
export const {get_data,save_data}=fetch_dataSlice.actions;
export default fetch_dataSlice.reducer;