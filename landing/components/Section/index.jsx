import css from './Section.scss'

const Section = (
  {
    title,
    text,
  },
) => (
  <div className={css.Section}>
    <h6 className={css.Section__title}>{title}</h6>
    <div className={css.Section__text} dangerouslySetInnerHTML={{ __html: text }}/>
  </div>
)

export default Section
