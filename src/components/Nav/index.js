import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

export default () => {
    
    let state = {
        current: 'index',
    }

    const handleClick = (e) => {
        console.log('click ', e);
        // this.setState({
        //     current: e.key,
        // });
        state.current = e.key;
    }
    return (
        <div>
            <Menu
                onClick={handleClick}
                selectedKeys={[state.current]}
                mode="horizontal"
            >
                <Menu.Item key="index">
                    <Link to="/">首页</Link>
                </Menu.Item>
                <Menu.Item key="page">
                    <Link to="/page">Page</Link>
                </Menu.Item>
                <Menu.Item key="counter">
                    <Link to="/counter">Counter</Link>
                </Menu.Item>
                <Menu.Item key="userinfo">
                    <Link to="/userinfo">UserInfo</Link>
                </Menu.Item>
                <Menu.Item key="taskList">
                    <Link to="/taskList">TaskList</Link>
                </Menu.Item>
            </Menu>
            {/* <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/page">Page</Link></li>
                <li><Link to="/counter">Counter</Link></li>
                <li><Link to="/userinfo">UserInfo</Link></li>
                <li><Link to="/taskList">TaskList</Link></li>
            </ul> */}
        </div>
    )
}