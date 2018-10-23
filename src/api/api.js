// 我们把所有需要调用的接口,全部写到一个文件里面，封装成一个一个的函数，需要使用的时候我们直接调用这个函数即可,这里写的话，逻辑就比较清晰，接口需要改动的时候也能快速定位，维护成本就降低了。
import axios from 'axios';

// 封装一个函数，名为getTodoList
export const getTodoList = params => {
    // 请求路径 '/todo/list'
    return axios.get('/todo/list', {
        params: params
    });
};
export const addTodo = params => {
    return axios.post('/todo/addTodo', params).then(res => res.data);
};

//新增一个请求查询待办单项列表的数据的接口函数
export const getTodo = params => {
    return axios.get('/todo/listId', {
        params: params
    })
}
//新增一个请求新增待办单的接口函数
export const addRecord = params => {
    return axios.post('/todo/addRecord', params).then(res => res.data);
}