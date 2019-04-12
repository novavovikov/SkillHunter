import css from './Final.scss'
import Container from '../Container'

export default () => (
  <div className={css.Final}>
    <Container>
      <img
        className={css.Final__img}
        src="/static/undraw_a_whole_year_.png"
        alt=""
      />

      <div className={css.Final__title}>
        Спасибо за ранний интерес к сервису
      </div>
      <div className={css.Final__text}>
        Вы помогаете нам двигаться в нужном направлении. <br/>
        Мы делаем все возможное, чтобы запустить сервис как можно скорее. Вы узнаете об этом по email.
      </div>
    </Container>
  </div>
)
