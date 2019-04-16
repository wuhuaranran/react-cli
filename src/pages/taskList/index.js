import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getTaskList, getOneTask, addTask, updateTask, deleteTask } from "actions/taskList";

class taskList extends Component {

    render() {
        const { taskList='' } = this.props.taskList;
        console.log(taskList);
        return (
            <div>
                {/* <div>{taskList}</div> */}
                <button onClick={() => this.props.getTaskList()}>请求列表信息</button>
                <button onClick={() => this.props.getOneTask(1)}>根据id查找</button>
                <button onClick={() => this.props.addTask({
                    name: 'task2',
                    status: 0,
                    description: '222',
                    createTime: '2019年4月16日',
                    person: 'zx'
                })}>添加任务</button>
                <button onClick={() => this.props.updateTask({
                    id: '2',
                    name: '123',
                    status: 1,
                    description: '1',
                    createTime: '2019年4月15日',
                    person: 'zx1'
                })}>修改任务</button>
                <button onClick={() => this.props.deleteTask({id:1})}>删除任务</button>
            </div>
        )
    }
}

export default connect((taskList) => taskList, { getTaskList, getOneTask, addTask, updateTask, deleteTask })(taskList);