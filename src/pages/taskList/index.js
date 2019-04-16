import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Table, Divider } from 'antd';
import { getTaskList, getOneTask, addTask, updateTask, deleteTask } from "actions/taskList";

class taskList extends Component {

    render() {
        const { taskList=[] } = this.props.taskList;
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
            }, {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            }, {
                title: '创建人',
                dataIndex: 'person',
                key: 'person',
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button onClick={() => this.props.updateTask({
                            id: record.id,
                            name: '123',
                            status: 1,
                            description: '1',
                            createTime: '2019年4月15日',
                            person: 'zx1'
                        })}>修改</Button>
                        <Divider type="vertical" />
                        <Button onClick={() => this.props.deleteTask({ id: record.id })}>删除</Button>
                    </span>
                ),
            }
        ];
        console.log(taskList);
        return (
            <div>
                {/* <div>{taskList}</div> */}
                <Button onClick={() => this.props.getTaskList()}>请求列表信息</Button>
                <Button onClick={() => this.props.getOneTask(1)}>根据id查找</Button>
                <Button onClick={() => this.props.addTask({
                    name: 'task2',
                    status: 0,
                    description: '222',
                    createTime: '2019年4月16日',
                    person: 'zx'
                })}>添加任务</Button>
                <Table 
                    dataSource={taskList}
                    columns={columns}
                />
            </div>
        )
    }
}

export default connect((taskList) => taskList, { getTaskList, getOneTask, addTask, updateTask, deleteTask })(taskList);