import css from './Main.scss'

export default ({ children }) => (
  <main className={css.Main}>
    {children}
  </main>
)