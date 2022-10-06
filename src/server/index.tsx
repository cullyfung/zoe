import express from 'express'
import childProcess from 'child_process'
import { renderToString } from 'react-dom/server'
import path from 'path'
import router from '@/router'
import { matchRoutes, Route, RouteObject, Routes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { serverStore } from '@/store'

const app = express()

const bodyParser = require('body-parser')

// 请求body解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 启一个post服务
app.post('/api/getDemoData', (req, res) => {
  res.send({
    data: req.body,
    code: 200,
    message: 'success'
  })
})

app.use(express.static(path.resolve(process.cwd(), 'client_build')))

app.get('*', (req, res) => {
  const routeMap = new Map<string, () => Promise<any>>()
  router.forEach((item) => {
    if (item.path && item.loadData) {
      routeMap.set(item.path, item.loadData(serverStore))
    }
  })

  const matchedRoutes = matchRoutes(router as RouteObject[], req.path)

  const promises: Array<() => Promise<any>> = []
  matchedRoutes?.forEach(item => {
    if (routeMap.has(item.pathname)) {
      promises.push(routeMap.get(item.pathname) as () => Promise<any>)
    }
  })

  Promise.all(promises).then(data => {
    const content = renderToString(
      <Provider store={ serverStore }>
        <StaticRouter location={ req.path }>
          <Routes>
            { router?.map((item, index) => {
              return <Route { ...item } key={ index }/>
            }) }
          </Routes>
        </StaticRouter>
      </Provider>
    )
    const helmet = Helmet.renderStatic()
    res.send(`
    <html>
      <head>
        ${ helmet.title.toString() }
        ${ helmet.meta.toString() }
      </head>
      <body>
        <div id="root">${ content }</div>
        <script>
          window.context = {
            state: ${ JSON.stringify(serverStore.getState()) }
          }
        </script>
        <script src="/index.js"></script>
      </body>
    </html>
  `)
  })
})

const port = 5500

app.listen(port, () => {
  console.log('ssr-server listen on 5500')
})

childProcess.exec(`start http://127.0.0.1:${ port }`)