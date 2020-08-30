import React from 'react';
import './UserInfo.css';
import {Card, CardBody, CardImg, CardTitle, CardText} from 'reactstrap';

const UserInfo = (props) =>{
    return(
        <>
            <Card style={{ width: '18rem' }} className="ProfileCard">
                <CardImg className="ProfileImage" variant="top" src={props.userInfo.avatar} />
                <CardBody className="ProfileBody">
                <CardTitle className="ProfileTitle">{props.userInfo.name}</CardTitle>
                {(props.userInfo.followers.length > 0) && 
                    <CardText className='ProfileFollowers'>
                    Followers : {props.followers}
                    </CardText>
                }
                {(props.userInfo.repository.length > 0) && 
                    <CardText className='ProfileFollowers'>
                    Repositories : {props.repository}
                    </CardText>
                }
            </CardBody>
            </Card>
        </>
    )
}

export default UserInfo;