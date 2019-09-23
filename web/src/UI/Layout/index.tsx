import cn from 'classnames'
import React, { FC } from 'react'
import s from './Layout.css'

interface LayoutProps {
  className?: string
}

const Wrap: FC = ({ children }) => {
  return (
    <div className={s.Layout}>
      {children}
    </div>
  )
}

const Aside: FC<LayoutProps> = ({ children, className }) => {
  return (
    <aside className={cn(s.Layout__aside, className)}>
      {children}
    </aside>
  )
}

const Container: FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn(s.Layout__container, className)}>
      {children}
    </div>
  )
}

const Content: FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn(s.Layout__content, className)}>
      {children}
    </div>
  )
}

const Header: FC<LayoutProps> = ({ children, className }) => {
  return (
    <header className={cn(s.Layout__header, className)}>
      {children}
    </header>
  )
}

const Footer: FC = ({ children }) => {
  return (
    <footer className={s.Layout__footer}>
      {children}
    </footer>
  )
}

const Main: FC<LayoutProps> = ({ children, className }) => {
  return (
    <main className={cn(s.Layout__main, className)}>
      {children}
    </main>
  )
}

export {
  Wrap,
  Aside,
  Container,
  Content,
  Main,
  Header,
  Footer,
}
