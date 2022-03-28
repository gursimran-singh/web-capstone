import { configureStore} from "@reduxjs/toolkit"
import cartReducer  from "./slices/cartSlice"
import authReducer from "./slices/authSlice";
import messageReducer from "./slices/messageSlice";



export default configureStore({
    reducer: {     
        cart: cartReducer,
        message: messageReducer,
        auth: authReducer,
    },
})