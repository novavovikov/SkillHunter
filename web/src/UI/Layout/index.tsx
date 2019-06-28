import React, { FC } from 'react'
import s from './Layout.css'

const Wrap: FC = ({ children }) => {
  return (
    <div className={s.Layout}>
      {children}
    </div>
  )
}

const Aside: FC = ({ children }) => {
  return (
    <aside className={s.Layout__aside}>
      {children}
    </aside>
  )
}

const Content: FC = ({ children }) => {
  return (
    <main className={s.Layout__content}>
      {children}
    </main>
  )
}

const Data: FC = ({ children }) => {
  return (
    <div className={s.Layout__data}>
      {children}
    </div>
  )
}

const Caption: FC = ({ children }) => {
  return (
    <div className={s.Layout__caption}>
      {children}
    </div>
  )
}

const Container: FC = ({ children }) => {
  return (
    <div className={s.Layout__container}>
      {children}
    </div>
  )
}

const Section: FC = ({ children }) => {
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
  Caption,
  Container,
  Section,
}
