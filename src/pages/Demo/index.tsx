import { FC, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { getDemoData } from '@/store/slice/demoSlice'
import { connect } from 'react-redux'

interface IProps {
  content?: string;
  getDemoData?: (data: string) => void;
}

const Demo: FC<IProps> = (data) => {
  // const [content, setContent] = useState()
  //
  // useEffect(() => {
  //   axios
  //     .post('/api/getDemoData', {
  //       content: '这是一个demo页面'
  //     })
  //     .then((res: any) => {
  //       setContent(res.data?.data?.content)
  //     })
  // }, [])

  return (
    <Fragment>
      <Helmet>
        <title>简易服务器渲染-demo</title>
        <meta name="description" content="服务器端渲染框架"/>
      </Helmet>
      <div>
        <h1>{ data.content }</h1>
        <button onClick={ () => {
          data.getDemoData && data.getDemoData('刷新后的数据')
        } }>
          刷新
        </button>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state: any) => ({ content: state.demo.content })

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDemoData: (data: string) => {
      dispatch(getDemoData(data))
    }
  }
}

const storeDemo: any = connect(mapStateToProps, mapDispatchToProps)(Demo)

storeDemo.getInitProps = (store: any, data?: string) => {
  return store.dispatch(getDemoData(data || '初始化demo'))
}

export default storeDemo