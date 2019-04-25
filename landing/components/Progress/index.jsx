import css from './Progress.scss'

export default ({ step, count }) => (
  <div className={css.Progress}>
    <div
      className={css.Progress__status}
      style={{
        width: `${step / count * 100}%`
      }}
    />
  </div>
)