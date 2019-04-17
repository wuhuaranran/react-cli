import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Table, Divider, Card, Input, Modal, Form, Row, Col, message } from 'antd';
import { getTaskList, getOneTask, addTask, updateTask, deleteTask } from "actions/taskList";
import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;
class taskList extends Component {
    state = {
        name: '',
        visible: false,
        modalType: 'add'
    }
    init = () => {
        this.props.getTaskList()
    }
    add = () => {
        this.setState({ visible: true, modalType: 'add' });
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            name: '',
            description: ''
        });
    }
    search = () => {
        const { name } = this.state;
        this.props.getOneTask({ name });
    }
    handleInputChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    /* 保存 */
    handleOk = () => {
        this.props.form.validateFieldsAndScroll(['name', 'description'], (err, values) => {
            if (!err) {
                let params = { ...values };
                if (this.state.modalType === 'edit') {
                    const { id, createTime, status, person } = this.state.record;
                    params.id = id;
                    params.createTime = createTime;
                    params.person = person;
                    params.status = status;
                    this.props.updateTask(params, (res) => {
                        this.setState({ visible: false });
                        message.success("编辑成功!");
                        this.init();
                    })
                } else if (this.state.modalType === 'add') {
                    params.createTime = moment().format('YYYY-MM-DD');
                    params.person = 'zx';
                    params.status = 0;
                    this.props.addTask(params, (res) => {
                        this.setState({ visible: false });
                        message.success("新增成功!");
                        this.init();
                    });
                }
            }
        });
    }
    /* 取消 关闭model */
    handleCancel = () => {
        this.setState({ visible: false });
    }
    update = (record) => {
        this.setState({ visible: true, modalType: 'edit', record: record });
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            name: record.name,
            description: record.description
        });
    }
    delete = (id) => {
        this.props.deleteTask({ id },()=>{
            message.success('删除成功');
            this.init();
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(this.props);
        const { taskList = [] } = this.props.taskList;
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
            // }, {
            //     title: '状态',
            //     dataIndex: 'status',
            //     key: 'status',
            }, {
                title: '创建人',
                dataIndex: 'person',
                key: 'person',
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button onClick={this.update.bind(this, record)}>修改</Button>
                        <Divider type="vertical" />
                        <Button onClick={this.delete.bind(this, record.id)}>删除</Button>
                    </span>
                ),
            }
        ];
        const { visible } = this.state;
        return (
            <div>
                <Card className={styles.toolbar}>
                    {/* <Button type='primary' onClick={this.init}>全部</Button> */}
                    <Input placeholder="name" style={{ width: '100px' }} onChange={this.handleInputChange} />
                    <Button type='primary' onClick={this.search}>查询</Button>
                    <Button type='primary' onClick={this.add}>新增</Button>
                </Card>
                <Table
                    dataSource={taskList}
                    columns={columns}
                // rowKey={record.id}
                />
                <Modal
                    visible={visible}
                    title={'编辑'}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    // destroyOnClose={true}
                >
                    <Form>
                        <div>
                            <Row>
                                <Col span={24}>
                                    <FormItem label="名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                                        {getFieldDecorator('name', {
                                            rules: [{
                                                required: true,
                                                message: '请输入名称'
                                            }]
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem label="描述" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                                        {getFieldDecorator('description', {
                                            rules: [{
                                                required: true,
                                                message: '请输入详细描述'
                                            }]
                                        })(
                                            <TextArea />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={styles.modalButton}>     
                                <Button onClick={this.handleCancel} >取消</Button>
                                <Button onClick={this.handleOk} type="primary" >保存</Button>
                            </Row>
                        </div>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default connect((taskList) => taskList, { getTaskList, getOneTask, addTask, updateTask, deleteTask })((Form.create()(taskList)));