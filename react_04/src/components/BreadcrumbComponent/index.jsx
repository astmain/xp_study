import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router';

const routes = [
  {
    path: '/',
    breadcrumbName: 'Hooks'
  },
  {
    path: '/elements',
    breadcrumbName: '组件',
  }
]


function BreadcrumbComponent() {
  const location = useLocation();
  const breadcrumbNameMap = routes.reduce((obj, item) => {
    obj[item.path] = item.breadcrumbName;
    return obj;
  }, {});
  const url = location.pathname
  const breadcrumbItems = [
    {
      title: <Link to={location.pathname}>{breadcrumbNameMap[url]}</Link>
    }
  ]

  return <Breadcrumb style={{
    margin: '16px 0',
  }} items={breadcrumbItems} />;
}

export default BreadcrumbComponent
