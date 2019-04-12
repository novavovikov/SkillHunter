import Container from '../Container'
import css from './Recommendation.scss'

const LINKS = [
  {
    label: 'Google',
    link: 'https://www.litres.ru/katerina-lengold/prosto-kosmos-praktikum-po-agile-zhizni-napolnennoy-smysl/',
  },
  {
    label: 'Google',
    link: 'https://books.google.ru/books?id=cdl2DwAAQBAJ&printsec=frontcover&dq=%D0%BF%D1%80%D0%BE%D1%81%D1%82%D0%BE+%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81&hl=ru&sa=X&redir_esc=y#v=onepage&q&f=false',
  },
  {
    label: 'Ozon',
    link: 'https://www.ozon.ru/context/detail/id/147656888/',
  },
  {
    label: 'Ozon',
    link: 'https://www.bookvoed.ru/book?id=9020449',
  },
]

export default () => (
  <div className={css.Recommendation}>
    <Container>
      <div className={css.Recommendation__content}>
        <div className={css.Recommendation__description}>
          <h3 className={css.Recommendation__text}>
            А пока вы ждете - наша первая рекомендация
          </h3>

          <div className={css.Recommendation__text}>
            Автор этой книги еще в юности научилась правильно распоряжаться
            временем и добиваться желаемого. <br/>
            В этой книге Катерина Ленгольд делится действенными способами
            достигать поставленных целей и все успевать. Рекомендации основаны
            на собственном опыте автора и методах, почерпнутых из исследований
            по нейрофизиологии.
            Вы узнаете, что полезность планирования – вовсе не в том, чтобы
            успевать решить множество задач в короткий срок. <br/>
            Взяв на вооружение методику автора, вы сможете шаг за шагом идти к
            поставленным целям, постоянно учиться чему-то полезному, формировать
            хорошие привычки и при этом находить время на себя!
          </div>

          <div className={css.Recommendation__links}>
            Найти: {LINKS.map((item, index) => (
            <span key={index}>
              <a

                className={css.Recommendation__link}
                href={item.link}
                target="_blank"
              >
                {item.label}
              </a> {index !== LINKS.length - 1 ? ' | ' : ''}
            </span>
          ))}
          </div>

        </div>
        <div className={css.Recommendation__preview}>
          <img
            className={css.Recommendation__img}
            src="/static/39147229-katerina-le.jpg"
            alt=""
          />

          <div className={css.Recommendation__previewText}>
            Просто космос. Практикум по Agile-жизни, наполненной смыслом и
            энергией
          </div>

          <div className={css.Recommendation__previewAuthor}>
            Катерина Ленгольд
          </div>
        </div>
      </div>
    </Container>
  </div>
)
