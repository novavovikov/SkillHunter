import css from './Content.scss'

export default ({ children }) => (
  <div className={css.Content}>
    {children}
  </div>
)