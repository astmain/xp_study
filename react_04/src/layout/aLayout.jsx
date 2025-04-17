import Content from './aMain'
import Header from './aHeader'
import Menu from './aSider'
import { Layout } from 'antd'

export default function aLayout() {
  return (
    <Layout>
      <Layout.Sider>
        <Menu></Menu>
      </Layout.Sider>
      <Layout>
        <Header></Header>
        <Content></Content>
      </Layout>
    </Layout>
  )
}
