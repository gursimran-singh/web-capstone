import { createSlice } from "@reduxjs/toolkit";

export const cartSlice  = createSlice({
    name:"cart",
    initialState:{
        value:[],
    },
    reducers:{
        addDish:(state, action) =>{//action.payload should be an object
            if (state.value.length ===0){
                state.value.push(action.payload);
            }
            else{
                let existFlag =false;
                state.value.forEach((item, index)=>{
                    if(item.dishID === action.payload.dishID){
                        state.value[index].quantity += action.payload.quantity;
                        existFlag = true;
                    }
                });
                if (!existFlag){
                    state.value.push(action.payload);
                }
            }
          
        },
        changeCart: (state, action) =>{ //action.payload should be an updated cart list
           state.value=action.payload;
        },
    },
});

export const {addDish, changeCart} = cartSlice.actions;

export default cartSlice.reducer;