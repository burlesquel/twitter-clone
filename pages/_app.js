import Layout from '../components/layout/Layout'
import '../styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Context, { ContextProvider } from '../context'
import { useContext } from 'react'

function MyApp({ Component, pageProps }) {
  const context = useContext(Context)
  return (
    <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </ContextProvider>
  )
}

export default MyApp
