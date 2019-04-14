import { withNamespaces } from '../../i18n'
import Container from '../Container'
import css from './Recommendation.scss'

const LINKS = [
  {
    label: 'litres',
    link: 'https://www.litres.ru/katerina-lengold/prosto-kosmos-praktikum-po-agile-zhizni-napolnennoy-smysl/',
  },
  {
    label: 'google',
    link: 'https://books.google.ru/books?id=cdl2DwAAQBAJ&printsec=frontcover&dq=%D0%BF%D1%80%D0%BE%D1%81%D1%82%D0%BE+%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81&hl=ru&sa=X&redir_esc=y#v=onepage&q&f=false',
  },
  {
    label: 'ozon',
    link: 'https://www.ozon.ru/context/detail/id/147656888/',
  },
  {
    label: 'bukvoed',
    link: 'https://www.bookvoed.ru/book?id=9020449',
  },
]

const Recommendation = ({ t }) => (
  <div className={css.Recommendation}>
    <Container>
      <div className={css.Recommendation__content}>
        <div className={css.Recommendation__description}>
          <h3 className={css.Recommendation__text}>
            {t('title')}
          </h3>

          <div className={css.Recommendation__text}>{t('description')}</div>

          <div className={css.Recommendation__links}>
            Найти: {LINKS.map((item, index) => (
            <span key={index}>
              <a

                className={css.Recommendation__link}
                href={item.link}
                target="_blank"
              >
                {t(`common:${item.label}`)}
              </a> {index !== LINKS.length - 1 ? ' | ' : ''}
            </span>
          ))}
          </div>

        </div>
        <div className={css.Recommendation__preview}>
          <img
            className={css.Recommendation__img}
            src="/static/images/39147229-katerina-le.jpg"
            alt=""
          />

          <div className={css.Recommendation__previewText}>
            {t('name')}
          </div>

          <div className={css.Recommendation__previewAuthor}>
            {t('author')}
          </div>
        </div>
      </div>
    </Container>
  </div>
)

export default withNamespaces('recommendation')(Recommendation)
