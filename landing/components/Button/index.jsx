import cn from 'classnames'
import css from './Button.scss'

export default (
  {
    span,
    children,
    theme,
    className,
    ...otherProps
  }) => {
  const props = {
    className: cn(css.Button, {
      [css['Button_' + theme]]: theme,
      [className]: className,
    }),
    ...otherProps,
  }

  return span ? <span {...props}>{children}</span> : <button {...props}>{children}</button>
}
