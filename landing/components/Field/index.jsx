import cn from 'classnames'
import css from './Field.scss'

export default (
  {
    children,
    theme,
    type,
    className,
    error,
    warning,
    ...otherProps
  }) => (
  <div
    className={cn(css.Field, {
      [css['Field_' + theme]]: theme,
      [className]: className,
    })}
  >
    {type === 'textarea'
      ? (
        <textarea
          className={cn(css.Field__input, css.Field__input_textarea)}
          {...otherProps}
        />
      ) : (
        <input
          className={css.Field__input}
          type={type}
          {...otherProps}
        />
      )}
    <i className={cn(css.Field__indicator, {
      [css['Field__indicator_error']]: error
    })}/>

    {(error || warning) && (
      <div className={cn(css.Field__notification, {
        [css['Field__notification_error']]: error,
        [css['Field__notification_warning']]: warning,
      })}>
        {error || warning}
      </div>
    )}
  </div>
)
