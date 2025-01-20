import { createContext,useState } from "react";
import {food_list} from '../assets/assets'

export const StoreContext = createContext();

const StoreContextProvider = ({children})=>{
    const [cartItems,setCartItems] = useState({})
    
    const addToCart=(itemId)=>{
        if(!cartItems[itemId])
            setCartItems({...cartItems,[itemId]:1})
        else
            setCartItems({...cartItems,[itemId]:cartItems[itemId]+1})
    }
    const removeFromCart=(itemId)=>{
        setCartItems({...cartItems,[itemId]:cartItems[itemId]-1})
    }
    const getTotalCartAmount=()=>{
        let total=0;
        for(let eltId in cartItems ){
            if(cartItems[eltId]>0){
                let itemInfo = food_list.find(food=>food._id==eltId)
                total+=itemInfo.price * cartItems[eltId]
            }
        }
        return total;
    }

    const contextValue={
        cartItems,
        setCartItems,
        food_list,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider