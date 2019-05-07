import css from './Container.scss'
import cn from 'classnames'

export default ({ children, className }) => (
  <section
    className={cn(css.Container, {
      [className]: className,
    })}
  >
    {children}
  </section>
)