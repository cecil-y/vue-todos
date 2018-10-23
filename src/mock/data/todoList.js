// 导入mockjs 模块
import Mock from 'mockjs';
// 定义我们需要的数据
let Todos = [];
// 定义我们需要的数量
const COUNT = [1, 2, 3, 4, 5];
for (let i = 1; i <= COUNT.length; i++) {
    // 根据数据模版生成模拟数据
    Todos.push(Mock.mock({
        // 随机id
        id: Mock.Random.guid(),
        // 随机标题
        title: Mock.Random.first(),
        // 是否删除
        isDelete: false,
        // 随机锁定
        locked: Mock.Random.boolean(),
        // 待办单项列表的数据
        record: COUNT.map(() => {
            return {
                // 随机内容
                text: Mock.Random.cparagraph(2),
                // 是否删除
                isDelete: false,
                // 是否完成
                checked: Mock.Random.boolean()
            }
        })
    }))
}
export {
    // 导出列表数据
    Todos
}