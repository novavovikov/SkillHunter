import cn from 'classnames'
import css from './Button.scss'

export default (
  {
    children,
    theme,
    className,
    ...otherProps
  }) => (
  <button
    className={cn(css.Button, {
      [css['Button--' + theme]]: theme,
      [className]: className,
    })}
    {...otherProps}
  >
    {children}
  </button>
)