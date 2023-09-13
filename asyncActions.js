import axios from 'axios'
import redux from 'redux'
import { legacy_createStore as createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}
const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
    }
}
const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
       
        payload: error
    }
}
const initialState = {
    loading: false,
    users: [],
    error: ""
}
const reducer = (state = initialState, action)=>{
    switch (action.type) {
        case "FETCH_USERS_REQUEST":
            return {
                ...state,
                loading: true
            }
        case "FETCH_USERS_SUCCESS":
            return {
                
                loading: false,
                users: action.payload,
                error: ''

            }
        case "FETCH_USERS_FAILURE":
            return {
                
                loading: false,
                users: [],
                error: action.payload

            }
    }


}
const fetchUser=()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res=>{
            const users=res.data.map(user=>user.id)
            dispatch(fetchUsersSuccess(users))
        }).catch(error=>{
            dispatch(fetchUsersFailure(error.message))
        })
    }
}
const store=createStore(reducer,applyMiddleware(thunk.default))
store.subscribe(()=>{console.log("fetch",store.getState())})
store.dispatch(fetchUser())
