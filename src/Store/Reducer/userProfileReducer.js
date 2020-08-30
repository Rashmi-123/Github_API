
import * as actionTypes from '../Action/actionTypes';
import {updateObject} from '../utility';

//======= Intial state =================//
const initialstate = {
    userInfo : {name:'',avatar:'',starred:4,followers:[],repository:[]},
    error:null,
    loader:false,
}

//======= set Error =================//
const setError = (state,action) =>{
            return updateObject(state,{error:action.error});
}

//======= set Loader =================//
const setLoader = (state,action) =>{
    return updateObject(state,{loader:action.loader});
}

//======= set User Data =================//
const setUserInfo = (state,action) =>{
    const updateState = {
        ...state,
        userInfo:{
            name:action.userInfo.name,
            avatar:action.userInfo.avatar,
            starred:4,
            followers:action.userInfo.followers,
            repository:action.userInfo.repository,
        }
    }
    return updateObject(state,updateState);
}

//=============== Reducer =================//
const userProfileReducer = (state=initialstate, action) => {
    switch (action.type) {
        case actionTypes.SET_ERROR:return setError(state, action)
        case actionTypes.SET_LOADER:return setLoader(state, action)
        case actionTypes.SET_USERINFO:return setUserInfo(state, action)
        default:return state;
    }
}

export default userProfileReducer;

