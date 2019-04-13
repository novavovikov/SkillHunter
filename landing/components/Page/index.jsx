import css from './Page.scss'
import Head from '../Head'
import Header from '../Header'
import Main from '../Main'
import Footer from '../Footer'
import Banner from '../Banner'
import Content from '../Content'
import Promo from '../Promo'
import Recommendation from '../Recommendation'
import Cookie from '../Cookie'

export default (
  {
    children,
    banner,
    promo,
    recommendation,
    head,
    header,
  },
) => (
  <div className={css.Page}>
    <Head {...head}/>
    <Header {...header}/>

    <Main>
      {banner && <Banner/>}

      <Content>
        {children}
      </Content>

      {promo && <Promo/>}
      {recommendation && <Recommendation/>}
    </Main>
    <Footer/>
    <Cookie/>
  </div>
)
