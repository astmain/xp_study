import { Menu as AntdMenu } from 'antd';
// import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
// import {  MailOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router';
export default function Menu() {
    const navigate = useNavigate()
    const handleClick: MenuProps['onClick'] = (info) => {
        navigate(info.key)
    }

    const items = [
        {
            key: 'Home',
            label: 'Home',
            // icon: <MailOutlined />,
        },
        {
            key: 'About',
            label: 'About',
            // icon: <MailOutlined />,
        },


    ]



    // return <div>Menu</div>
    return <AntdMenu onClick={handleClick} style={{ height: "100vh" }} items={items}></AntdMenu>
}