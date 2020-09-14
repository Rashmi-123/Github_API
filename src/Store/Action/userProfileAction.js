import * as actionTypes from './actionTypes';
import {fetchUser, getRepository, getFollowers} from '../../ApiUtils/ApiUtils';

export const setLoader = (data) =>{
    return{
        type:actionTypes.SET_LOADER,
        loader:data
    }
}

export const setUserInfo = (data) =>{
    return{
        type:actionTypes.SET_USERINFO,
        userInfo:data
    }
}

export const setError = (data) =>{
    return{
        type:actionTypes.SET_ERROR,
        error:data
    }
}

export const getUserInfo = (data) =>{
    return dispatch => {
        let post;
            let followersArray = [];
            dispatch(setLoader(true));
            dispatch(setUserInfo({name:'',avatar:'',starred:'5',followers:[],repository:[]}));

            async function getUserInfo(data){
                const userInfo = await fetchUser(data);
                let name;
                name = userInfo.data.name ? userInfo.data.name : userInfo.data.login;
                sessionStorage.setItem('name',userInfo.data.login)
                const getfollowers = await getFollowers(userInfo.data.followers_url);
                getfollowers.data.map(el=>{
                    return followersArray.push(el.login)
                })
                post = {
                    name:name,
                    avatar:userInfo.data.avatar_url,
                    starred:'5',
                    followers:followersArray,
                }
                const getRepo = await getRepository(userInfo.data.repos_url);
                return getRepo;
        }

        const result = getUserInfo(data);
        result.then(response=>{
            let repoArray = [];
            response.data.map(el=>{
            return repoArray.push(el.name);
            })
            post = {...post, repository:repoArray}
            
            dispatch(setLoader(false));
            dispatch(setUserInfo({name:post.name,avatar:post.avatar,starred:'5',followers:post.followers,repository:post.repository}))
        }).catch(error=>{
            dispatch(setLoader(false));
            console.log(error);
            
            if(error.status === 403){
                dispatch(setError('Network Issue!'));
            }else{
                dispatch(setError('User Not Found!'));
            }
            
        })
    }
}