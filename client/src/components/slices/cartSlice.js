import {
    createSlice
} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        dishList: [],
    },
    reducers: {
        // new actions
        addDishToCart: (state, action) =>{
            const dishList = state.dishList;
            const newDish = action.payload;
            let currentDish = dishList.find(e=>e.item_id === newDish.item_id);
            if(currentDish){
                currentDish.quantity += newDish.quantity;
            }else{
                dishList.push(newDish);
            }
        },
        removeDishFromCart: (state, action) =>{
            const dishList = state.dishList;
            const item_id = action.payload;
            let index = dishList.findIndex(e=>e.item_id === item_id);
            dishList.splice(index, 1);
        },
        dishAdd: (state, action) =>{
            const dishList = state.dishList;
            const item_id = action.payload;
            let currentDish = dishList.find(e=>e.item_id === item_id);
            if(currentDish.quantity < 999){
                currentDish.quantity ++;
            }
        },
        dishRemove: (state, action) =>{
            const dishList = state.dishList;
            const item_id = action.payload;
            let currentDish = dishList.find(e=>e.item_id === item_id);
            if(currentDish.quantity > 0){
                currentDish.quantity --;
            }
        },
        dishChange: (state, action) =>{
            const dishList = state.dishList;
            let {item_id, quantity} = action.payload;//action.payload should be an object
            let currentDish = dishList.find(e=>e.item_id === item_id);
            if(quantity < 0){
                quantity = 0;
            }
            if(quantity > 999){
                quantity = 999;
            }
            currentDish.quantity = quantity;
        },
    },
});

export const {
    addDishToCart,
    removeDishFromCart,
    dishChange,
    dishAdd,
    dishRemove,
} = cartSlice.actions;

export default cartSlice.reducer;