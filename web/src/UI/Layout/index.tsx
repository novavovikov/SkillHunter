import * as React from 'react'
import s from './Layout.css'

const Wrap: React.FC = ({ children }) => {
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

const Data: React.FC = ({ children }) => {
  return (
    <div className={s.Layout__data}>
      {children}
    </div>
  )
}

const Header: React.FC = ({ children }) => {
  return (
    <header className={s.Layout__header}>
      {children}
    </header>
  )
}

const Caption: React.FC = ({ children }) => {
  return (
    <div className={s.Layout__caption}>
      {children}
    </div>
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
  Wrap,
  Aside,
  Content,
  Data,
  Header,
  Caption,
  Container,
  Section,
}
