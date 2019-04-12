import cn from 'classnames'
import css from './Field.scss'

export default (
  {
    children,
    theme,
    type,
    className,
    error,
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

    {error && (
      <div className={css.Field__error}>
        {error}
      </div>
    )}
  </div>
)
