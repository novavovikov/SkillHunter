import Container from '../Container'
import css from './Text.scss'

const Text = (
  {
    children,
    title,
    subtitle,
    text,
  },
) => (
  <Container>
    <div className={css.Text}>
      <div className={css.Text__caption}>
        <h1 className={css.Text__title}>{title}</h1>
        {subtitle && <h4 className={css.Text__subtitle}>{subtitle}</h4>}
      </div>

      <div className={css.Text__content}>{text}{children}</div>
    </div>
  </Container>
)

export default Text
