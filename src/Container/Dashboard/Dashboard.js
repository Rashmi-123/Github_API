import React, { useState } from 'react';
import './Dashboard.css';
import {connect} from 'react-redux';
import Loader from '../../Component/UI/Loader/Loader';
import UserInfo from '../../Component/UserInfo/UserInfo';
import { Link } from 'react-router-dom';
import * as action from '../../Store/Action/index';
import { useEffect } from 'react';

const Example =(props) =>{
  const [searchUsername, setSearchUser] = useState(sessionStorage.getItem('name'));

  useEffect(() => {
    let data = sessionStorage.getItem('name');
    data && props.onsetUserInfo(data);
  }, [])

  //=========== After button on click searcg handler =================//
  const searchUser = () =>{
      let data=searchUsername;
      props.onsetUserInfo(data);
  }
  
//=========== get list of followers =================//
let followers = (props.userInfo.followers.length > 0) && 
                  <ul>
                    {props.userInfo.followers.map((el,index)=>{
                      return <li key={index}>{el}</li>
                    })}
                  </ul>;

//=========== get list of repository =================//
let repository = (props.userInfo.repository.length > 0) && 
                <ul>
                  {props.userInfo.repository.map((el,index)=>{
                    let user = {
                      userName : sessionStorage.getItem('name'),
                      userRepo : el
                    }
                    return <li key={index}><Link to={{     
                             pathname: `/repos`,
                             state: { detail: user }
                            }
                          }>{el}</Link></li>
                        })}
                </ul>;

 return (
    <div>
        <h1 className="">SEARCH USER IN GITHUB</h1>
        <input className="in-sty" type="text" value={searchUsername} onChange={e=>(setSearchUser(e.target.value))}/>
        <button className="btn" onClick={searchUser}>Search User</button>
        {props.error ? <p>{props.error}</p> : null}
        {props.loader && <Loader />}
        {props.userInfo.name &&
          <UserInfo userInfo={props.userInfo} followers={followers} repository={repository}/>
        }
    </div>
  );
}

const mapStateToProps = state => {
  return{
      userInfo : state.userProfile.userInfo,
      error : state.userProfile.error,
      loader : state.userProfile.loader
  }
}

const mapDispatchToProps = dispatch => {
  return{
      onsetUserInfo:(data) => dispatch(action.getUserInfo(data)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Example);