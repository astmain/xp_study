import Content from './Content';
import Header from './Header';
import Menu from './Menu';
import { Layout as AntdLayout } from 'antd';


export default function Layout() {
    return <AntdLayout>
        <AntdLayout.Sider>
            <Menu></Menu>
        </AntdLayout.Sider>
        <AntdLayout>
            <Header></Header>
            <Content></Content>
        </AntdLayout>
    </AntdLayout>
}