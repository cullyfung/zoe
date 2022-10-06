import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit'
import axios from 'axios'

const getDemoData = createAsyncThunk('demo/getData', async (initData: string) => {
  const res = await axios.post(`/api/getDemoData`, {
    content: initData
  })
  return res.data.data.content
})

const demoSlice: Slice = createSlice({
  name: 'demo',
  initialState: typeof window !== 'undefined' ?
    (window as any)?.context?.state?.demo :
    {
      content: '默认demo数据'
    },
  reducers: {},
  extraReducers(build) {
    build.addCase(getDemoData.fulfilled, (state: any, action) => {
      state.content = action.payload
    })
  }
})

export {
  getDemoData
}

// @ts-ignore
export default demoSlice