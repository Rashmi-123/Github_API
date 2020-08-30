import axios from 'axios';

const API_BASE_URL = "https://api.github.com"

const request = options => {
    const head = {
        "Content-Type": "application/json"
    };

    const defaults = {headers: head};
    options = Object.assign({}, defaults, options);

    return axios(options.url, options).then(response => {
        return response;
    }).catch(error => {
        return Promise.reject(error.response);
});
};

export function fetchUser(data){
    return request({
        method: 'get',
        url: API_BASE_URL + "/users/"+data,
        header : {
            'Content-Type': 'application/json'
        }
    });
}

export function fetchRepo(data){
    return request({
        method: 'get',
        url: API_BASE_URL + "/repos/"+data.username+"/"+data.repo,
        header : {
            'Content-Type': 'application/json'
        }
    });
}

export function fetchCommits(data){
    return request({
        method: 'get',
        url: API_BASE_URL + "/repos/"+data.username+"/"+data.repo+"/commits",
        header : {
            'Content-Type': 'application/json'
        }
    });
}

export function getImage(loginrequest){
    return request({
        method: 'get',
        url: API_BASE_URL + "/users/"+loginrequest,
        header : {
            'Content-Type': 'application/json'
        }
    });
}

export function getFollowers(url){
    return request({
        method: 'get',
        url: url,
        header : {
            'Content-Type': 'application/json'
        }
    });
}

export function getRepository(url){
    return request({
        method: 'get',
        url: url,
        header : {
            'Content-Type': 'application/json'
        }
    });
}

