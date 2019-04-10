import css from './Page.scss'
import Head from '../Head'
import Header from '../Header'
import Main from '../Main'
import Footer from '../Footer'

export default ({ children, header }) => (
  <div className={css.Page}>
    <Head/>
    <Header {...header}/>

    <Main>
      {children}
    </Main>
    <Footer/>
  </div>
)