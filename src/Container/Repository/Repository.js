import React,{useState,useEffect} from 'react';
import './Repository.css';
import {useLocation, useHistory} from "react-router-dom";
import {Card, CardBody,Table, CardTitle} from 'reactstrap';
import {fetchRepo, fetchCommits, fetchContributors, fetchPulls} from '../../ApiUtils/ApiUtils';
import PDFProvider from '../../Component/pdf/pdfProvider';
import CSVReport from '../../Component/ExcelExport/ExcelExport';

const Repository = () =>{

    const [repsitory, setRepsitory] = useState({
        Contributors:0,
        Issues:0,
        commits:0,
        pullRequest:0
    })
   
    let location = useLocation();
    let history = useHistory();
    
    useEffect(() => {
       let data ={
            username:location.state.detail.userName,
            repo:location.state.detail.userRepo
        }
        let post;
        const getUserInfo = async(data) =>{
            const getRepoInfo = await fetchRepo(data);
            const getCommits = await fetchCommits(data);
            const getPulls = await fetchPulls(data);
            const getContributors = await fetchContributors(data);
            
            post = {
                Contributors:getContributors.data.length,
                Issues:getRepoInfo.data.open_issues_count,
                commits:getCommits.data.length,
                pullRequest:getPulls.data.length
            }
            return post;
        }
  
        const result = getUserInfo(data);
        result.then(response=>{
            setRepsitory({Contributors:response.Contributors,Issues:response.Issues,commits:response.commits,pullRequest:response.pullRequest})
        }).catch(err=>{
            console.log(err);
        })
    }, [location,history])
   
    const onClickBack = () =>{
        history.push({
            pathname: '/',
            state: { detail: location.state.detail.userName }
        })
    }

    let repoArray = [];
    for (const key in repsitory) {
        if (repsitory.hasOwnProperty(key)) {
            repoArray.push({"name":key,"count":repsitory[key]})
        }
    }
    
    let tableData = repoArray.map(el=>{
                    return(<tr key={el.name}>
                            <td>{el.name}</td>
                            <td>{el.count}</td>
                        </tr> )
                });

    return(
        <div>
            <button className="backButton" onClick={onClickBack}>Back to Search</button>
            <Card style={{ width: '18rem' }} className="ProfileCard">
                <CardBody className="ProfileBody">
                <CardTitle className="ProfileTitle">{location.state.detail.userName}</CardTitle>
                <CardTitle className="ProfileTitle">{location.state.detail.userRepo}</CardTitle>
                    <Table>
                        <tbody>
                            {tableData}
                        </tbody>
                    </Table>
                    <CSVReport data={repsitory}/>
                    <PDFProvider data={repsitory}/>
            </CardBody>
            </Card>
        </div>
    )
}

export default Repository;