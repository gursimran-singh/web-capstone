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
        initDishList: (state, action) =>{
            const dishList = state.dishList;
            const val = localStorage.getItem('dishList');
            if(val){
                const arr = JSON.parse(val);
                if(arr instanceof Array){
                    state.dishList = arr;
                }
            }
        },
        addDishToCart: (state, action) =>{
            
            const dishList = state.dishList;
            const newDish = action.payload;
            let currentDish = dishList.find(e=>e.item_id === newDish.item_id);
            if(currentDish){
                currentDish.quantity += newDish.quantity;
            }else{
                dishList.push(newDish);
            }
            localStorage.setItem('dishList', JSON.stringify(dishList));
        },
        removeDishFromCart: (state, action) =>{
            const dishList = state.dishList;
            const item_id = action.payload;
            let index = dishList.findIndex(e=>e.item_id === item_id);
            dishList.splice(index, 1);
            localStorage.setItem('dishList', JSON.stringify(dishList));
        },
        dishAdd: (state, action) =>{
            const dishList = state.dishList;
            const item_id = action.payload;
            let currentDish = dishList.find(e=>e.item_id === item_id);
            if(currentDish.quantity < 999){
                currentDish.quantity ++;
            }
            localStorage.setItem('dishList', JSON.stringify(dishList));
        },
        dishRemove: (state, action) =>{
            const dishList = state.dishList;
            const item_id = action.payload;
            let currentDish = dishList.find(e=>e.item_id === item_id);
            if(currentDish.quantity > 0){
                currentDish.quantity --;
            }
            localStorage.setItem('dishList', JSON.stringify(dishList));
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
            localStorage.setItem('dishList', JSON.stringify(dishList));
        },
        resetCart: (state, action)=>{
            state.dishList=[];
            localStorage.setItem('dishList', JSON.stringify([]));
        },
    },
});

export const {
    initDishList,
    addDishToCart,
    removeDishFromCart,
    dishChange,
    dishAdd,
    dishRemove,
    resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;