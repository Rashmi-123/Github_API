import React,{useState,useEffect} from 'react';
import './Repository.css';
import {useLocation, useHistory} from "react-router-dom";
import {Card, CardBody, CardTitle, CardText} from 'reactstrap';
import {fetchRepo, fetchCommits} from '../../ApiUtils/ApiUtils';


const Repository = (props) =>{

    const [repsitory, setRepsitory] = useState({
        forks:0,
        Issues:0,
        commits:0
    })
   
    let location = useLocation();
    let history = useHistory();
    console.log(location);
    
    useEffect(() => {
       let data ={
            username:location.state.detail.userName,
            repo:location.state.detail.userRepo
        }
        fetchRepo(data).then(res=>{
            let totalCommit = 0;
            fetchCommits(data).then(commitsResponse=>{
                totalCommit = commitsResponse.data.length;
                setRepsitory({forks:res.data.forks,Issues:res.data.open_issues_count,commits:totalCommit})
            })
        }).catch(err=>{

        })
    }, [location,history])
   
    const onClickBack = () =>{
        history.push({
            pathname: '/',
            state: { detail: location.state.detail.userName }
        })
    }

    return(
        <div>
            <button className="backButton" onClick={onClickBack}>Back to Search</button>
            <Card style={{ width: '18rem' }} className="ProfileCard">
                <CardBody className="ProfileBody">
                <CardTitle className="ProfileTitle">{location.state.detail.userName}</CardTitle>
                <CardTitle className="ProfileTitle">{location.state.detail.userRepo}</CardTitle>
                
                    <CardText className='ProfileFollowers'>
                    Forks : {repsitory.forks}
                    </CardText>
                
                
                    <CardText className='ProfileFollowers'>
                    Issues : {repsitory.Issues}
                    </CardText>

                    <CardText className='ProfileFollowers'>
                    Commits : {repsitory.commits}
                    </CardText>
                
            </CardBody>
            </Card>
        </div>
    )
}

export default Repository;