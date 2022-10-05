import { useNavigate } from 'react-router-dom'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet'

const Home = () => {
  const navigate = useNavigate()
  return (
    <Fragment>
      <Helmet>
        <title>简易的服务器端渲染 - HOME</title>
        <meta name="description" content="服务器端渲染"/>
      </Helmet>
      <h1>hello-ssr</h1>
      <button
        onClick={ () => {
          alert('hello-ssr')
        } }
      >
        alert
      </button>
      <br/>
      <a href="http://127.0.0.1:5500/demo">服务端渲染路由跳转</a>
      <br/>
      <button onClick={ () => {
        navigate('/demo')
      } }>
        客户端渲染路由跳转
      </button>
    </Fragment>
  )
}

export default Home