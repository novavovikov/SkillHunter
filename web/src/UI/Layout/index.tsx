import React, { Component, FC } from 'react'
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

const Footer: FC = ({ children }) => {
  return (
    <footer className={s.Layout__footer}>
      {children}
    </footer>
  )
}

class Data extends Component<{}, { hasError: boolean }> {
  state = {
    hasError: false,
  }

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo): void {
    console.log(123, error)
    console.log(31, errorInfo)
  }

  render () {
    if (this.state.hasError) {
      return null
    }

    return (
      <div className={s.Layout__data}>
        {this.props.children}
      </div>
    )
  }
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
  Footer,
}
