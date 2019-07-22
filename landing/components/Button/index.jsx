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
  const classNames = {
    [className]: className,
  }

  if (theme) {
    for (const theme of theme.split(' ')) {
      classNames[css['Button_' + theme]] = theme
    }
  }

  const props = {
    className: cn(css.Button, classNames),
    ...otherProps,
  }

  return span
    ? <span {...props}>{children}</span>
    : <button {...props}>{children}</button>
}
