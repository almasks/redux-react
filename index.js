import  redux from "redux"
 import { legacy_createStore as createStore} from 'redux'
//  import { reduxlogger } from "redux-logger"
// const reduxlogger=require("redux-logger")
import logger from 'redux-logger'

const applyMiddleware=redux.applyMiddleware
const combineReducers=redux.combineReducers()

   const BUY_CAKE="BUY_CAKE"
   const BUY_ICECREAM="BUY_ICECREAM"
   function buyCake(){
    return{
        type:BUY_CAKE,
        info:"First redux store"
    }
   }
   function buyIceCream(){
    return{
        type:BUY_ICECREAM

    }    
   }
   const initialCakeState={
    numberOfCakes:10,
   
   }
   const initialIceCreamState={
    numberOfCakes:20,
   
   }
   const cakeReducer=(state=initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE:
            return{
                ...state,numberOfCakes:state.numberOfCakes-1
            }
        
        default :
        return state
   }
}
const iceCreamReducer=(state=initialIceCreamState,action)=>{
    switch(action.type){
        case BUY_ICECREAM:
            return{
                ...state,numberOfIceCream:state.numberOfIceCream-1
            }
        
        default :
        return state
   }
}
const rootReducer=combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})
const store=createStore(rootReducer,applyMiddleware(logger))
console.log("initialState",store.getState())
const unSubscribe=store.subscribe(()=>console.log('updatedstate',store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
unSubscribe()