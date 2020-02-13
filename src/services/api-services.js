import axios from 'axios';

// ------------------Members APIs request handle here-----------------------
export const getMembers = async () => {

    let res = await axios({
        method: 'get',
        url: "http://library.ap-southeast-1.elasticbeanstalk.com/api/v1/members",
    })

    return res
}

export const addMembers = async (data) => {

    let res = await axios({
        method: 'post',
        url: "http://library.ap-southeast-1.elasticbeanstalk.com/api/v1/members",
        data: data
    })

    return res
}

export const removeMembers = async (id) => {

    let res = await axios({
        method: 'delete',
        url: `http://library.ap-southeast-1.elasticbeanstalk.com/api/v1/members/delete/${id}`,
    })

    return res
}

// ------------------Books APIs request handle here-----------------------
export const getBooks = async () => {

    let res = await axios({
        method: 'get',
        url: "http://library.ap-southeast-1.elasticbeanstalk.com/api/v1/books",
    })

    return res
}

export const addBooks = async (data) => {

    let res = await axios({
        method: 'post',
        url: "http://library.ap-southeast-1.elasticbeanstalk.com/api/v1/books",
        data: data
    })

    return res
}

export const removeBooks = async (id) => {

    let res = await axios({
        method: 'delete',
        url: `http://library.ap-southeast-1.elasticbeanstalk.com/api/v1/books/delete/${id}`,
    })

    return res
}
