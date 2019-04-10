import Container from '../Container'
import css from './Block.scss'
import cn from 'classnames'

export default (
  {
    className,
    theme,
    img,
    title,
    text
  }
) => (
  <Container>
    <div
      className={cn(css.Block, {
        [css['Block--' + theme]]: theme,
        [className]: className,
      })}
    >
      <div className={css.Block__section}>
        <img
          className={css.Block__img}
          src={"/static/" + img}
          alt=""
        />
      </div>

      <div className={css.Block__section}>
        <div className={css.Block__content}>
          <h2>
            {title}
          </h2>

          <div className={css.Block__text}>
            {text}
          </div>
        </div>
      </div>
    </div>
  </Container>
)