import Field from '../Field'
import css from './Registration.scss'

export default (
  {
    title,
    text,
    field,
  },
) => (
  <>
    {title && (
      <div className={css.Registration__title}>
        {title}
      </div>
    )}

    <div className={css.Registration__text}>
      {text}
    </div>

    {field && <Field {...field}/>}
  </>
)
