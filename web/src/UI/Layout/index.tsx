import React, { Component, FC } from 'react'
import cn from 'classnames'
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
    <div className={s.Layout__content}>
      {children}
    </div>
  )
}

const Footer: FC = ({ children }) => {
  return (
    <footer className={s.Layout__footer}>
      {children}
    </footer>
  )
}

interface Props {
  className?: string
}

const Main: FC<Props> = ({ children, className }) => {
  return (
    <main className={cn(s.Layout__main, className)}>
      {children}
    </main>
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
  Main,
  Container,
  Section,
  Footer,
}
