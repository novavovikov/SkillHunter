import css from './Page.scss'
import Head from '../Head'
import Header from '../Header'
import Footer from '../Footer'
import Cookie from '../Cookie'

export default (
  {
    children,
    head,
    header,
  },
) => (
  <>
    <div className={css.Page}>
      <Head {...head}/>
      <Header {...header}/>

      {children}

      <Footer/>
      <Cookie/>
    </div>
  </>
)
