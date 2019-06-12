import * as React from 'react'
import s from './Layout.css'

const Page: React.FC = ({ children }) => {
  return (
    <div className={s.Layout}>
      {children}
    </div>
  )
}

const Aside: React.FC = ({ children }) => {
  return (
    <aside className={s.Layout__aside}>
      {children}
    </aside>
  )
}

const Content: React.FC = ({ children }) => {
  return (
    <main className={s.Layout__content}>
      {children}
    </main>
  )
}

const Container: React.FC = ({ children }) => {
  return (
    <div className={s.Layout__container}>
      {children}
    </div>
  )
}

const Section: React.FC = ({ children }) => {
  return (
    <section className={s.Layout__section}>
      {children}
    </section>
  )
}

export {
  Page,
  Aside,
  Content,
  Section,
  Container,
}
