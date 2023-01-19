import useAuth from './useAuth';
import { Route, Switch, Link, Redirect, useLocation } from 'react-router-dom'
import { Layout, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import AuthForm from './components/Auth/AuthForm';
import './styles/style.less'
import ProtectedRoute from './components/ProtectedRoute';
import ProductsPage from './pages/ProductsPage';
import PurchasesPage from './pages/PurchasesPage';
import NewPurchasePage from './pages/NewPurchasesPage';
import { useState } from 'react';
import IssuesPage from './pages/IssuesPage';
import NewIssuesPage from './pages/NewIssuesPage';
import RegistrationForm from './components/Auth/RegistrationForm';

const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const Routing = () => {
  
    const {user, logout} = useAuth()
    const location = useLocation()

    const userMenu = (
      <Menu>
        <Menu.Item onClick={logout}>Выход</Menu.Item>
      </Menu>
    );
  
    const locations = new Map()
    locations.set('/', {item: 1, sub: 'sub1'})
    locations.set('/login', {item: 0, sub: ''})
    locations.set('/registration', {item: 0, sub: ''})
    locations.set('/products', {item: 1, sub: 'sub1'})
    locations.set('/purchases', {item: 2, sub: 'sub2'})
    locations.set('/new-purchase', {item: 3, sub: 'sub2'})
    locations.set('/issues', {item: 4, sub: 'sub3'})
    locations.set('/new-issue', {item: 5, sub: 'sub3'})

    const currSelectedAndOpenKeys = locations.get(location.pathname)
      
    return (
      <Layout>
        {user? <Sider style={{minHeight: '100vh'}}  width='25rem'>
          <a href="/"><div className='logo'>МойСклад</div></a>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[`${currSelectedAndOpenKeys.item}`]}
            defaultOpenKeys={[`${currSelectedAndOpenKeys.sub}`]}
            style={{ borderRight: 0 }}
          >
            <SubMenu key="sub1" title="Товары">
              <Menu.Item key="1"><Link to="/products">Остатки</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="Закупки">
              <Menu.Item key="2"><Link to="/purchases">Заказы поставщикам</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/new-purchase">Добавить заказ</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title="Продажи">
              <Menu.Item key="4"><Link to="/issues">Заказы покупателей</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/new-issue">Новая продажа</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>: null}
        <div className='aaa'></div>
        <Layout data-theme="light">
          {user? <Header
            style={{ 
                display: "flex", 
                justifyContent: 'flex-end', 
                background: 'white'
              }}>
          <Dropdown overlay={userMenu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              {user?.email} <DownOutlined />
            </a>
          </Dropdown>
          </Header>: null}
          <Content>
            <Switch>
              <Route path="/login">
                <AuthForm/>
              </Route>
              <Route path="/registration">
                <RegistrationForm/>
              </Route>
              <ProtectedRoute path="/products" >
                <ProductsPage/>
              </ProtectedRoute>
              <ProtectedRoute path="/purchases" >
                <PurchasesPage/>
              </ProtectedRoute>
              <ProtectedRoute path="/new-purchase" >
                <NewPurchasePage/>
              </ProtectedRoute>
              <ProtectedRoute path="/issues" >
                <IssuesPage/>
              </ProtectedRoute>
              <ProtectedRoute path="/new-issue" >
                <NewIssuesPage/>
              </ProtectedRoute>
              <Route exact path="/">
                <Redirect to="/products"/>
              </Route>
            </Switch>
          </Content>
          
          {/* <Footer style={{height: '5rem'}}>footer</Footer> */}
        </Layout>
      </Layout>
    )    
}

export default Routing