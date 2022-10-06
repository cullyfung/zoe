import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import router from '@/router'
import { Provider } from 'react-redux'
import { clientStore } from '@/store'

const Client = () => {
  return (
    <Provider store={ clientStore }>
      <BrowserRouter>
        <Routes>
          { router?.map((item, index) => {
            return <Route { ...item } key={ index }/>
          }) }
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

hydrateRoot(document.getElementById('root') as HTMLDivElement, <Client/>)