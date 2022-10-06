import { configureStore } from '@reduxjs/toolkit'
import DemoSlice from '@/store/slice/demoSlice'
import thunk from 'redux-thunk'

const serverStore = configureStore({
  reducer: {
    demo: DemoSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
})

const clientStore = configureStore({
  reducer: {
    demo: DemoSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
})

export {
  serverStore,
  clientStore
}