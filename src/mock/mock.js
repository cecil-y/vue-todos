// 此js文件的作用就是模拟ajax请求的接口，生成并返回模拟数据

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';
import {
    Todos
} from './data/todoList';

export default {
    /**
     * mock start
     */
    // 初始化函数
    start() {
        // 创建 MockAdapter 实例
        let mock = new MockAdapter(axios);
        //获取todo列表
        // config 指前台传过来的值
        mock.onGet('/todo/list').reply(config => {
            // 重组 Todos 数组，变成我们想要的数据
            let mockTodo = Todos.map(tode => {
                return {
                    id: tode.id,
                    title: tode.title,
                    count: tode.record.filter((data) => {
                        if (data.checked === false) return true;
                        return false;
                    }).length, //过滤到record 里面 'checked' 为 true的数据，因为它们已经被完成了
                    locked: Todos.locked,
                    isDelete: tode.isDelete
                };
            }).filter(tode => {
                // 过滤掉 'isDelete' 为true，因为已经被删除掉了
                if (tode.isDelete === true) return false;
                return true;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        // 返回状态为200，并且返回todos数据
                        todos: mockTodo
                    }]);
                }, 200);
            });
        });

        // 新增一条todo
        mock.onPost('/todo/addTodo').reply(config => {
            Todos.push({
                id: Mock.Random.guid(),
                title: 'newList',
                isDelete: false,
                locked: false,
                record: []
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200]);
                }, 200);
            })
        });

        mock.onGet('/todo/listId').reply(config => {
            let {
                id
            } = config.params;
            // id 是传进来的值
            // todo 是根据id和现有的 Todos数据匹配，找出id相等的数据，在进行返回
            let todo = Todos.find(todo => {
                return id && todo.id === id;
            });
            // todo.count (等待完成数目)等于 todo.record（待办事项列表下面违背选择的数据
            todo ? todo.count = todo ? todo.record.filter((data) => {
                return data.checked === false;
            }).length : null : false;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        todo: todo
                    }]);
                }, 200);
            })
        });

        //新增一条待办事项
        mock.onPost('/todo/addRecord').reply(config => {
            let { id, text } = JSON.parse(config.data);
            // id 是传进来的值唯一待办项的id，text 用户新增输入的数据
            Todos.some((t, index) => {
                if (t.id === id) {
                    t.record.push({
                        text: text,
                        isDelete: false,
                        checked: false
                    });
                    return true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200]);
                }, 200);
            })
        });

        // 修改标题
        mock.onPost('/todo/editTodo').reply(config => {
            let { todo } = JSON.parse(config.data);
            Todos.some((t, index) => {
                if (t.id === todo.id) {
                    t.title = todo.title;
                    t.locked = todo.locked;
                    t.isDelete = todo.isDelete;
                    return true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200]);
                }, 200);
            })
        });
        //修改标题
        mock.onPost('/todo/editRecord').reply(config => {
            let { id, record, index } = JSON.parse(config.data);
            Todos.some((t) => {
                if (t.id === id) {
                    t.record[index] = record;
                    return true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200])
                }, 200)
            })
        })
    }
}