import * as React from 'react'
import * as s from './Table.css'

const Table: React.FC = ({ children }) => {
  return (
    <div className={s.Table}>
      <table className={s.Table__table}>
        {children}
      </table>
    </div>
  )
}

const Head: React.FC = ({ children }) => {
  return (
    <thead>
      {children}
    </thead>
  )
}

const Body: React.FC = ({ children }) => {
  return (
    <tbody>
      {children}
    </tbody>
  )
}

const Tr: React.FC = ({ children }) => {
  return (
    <tr className={s.Table__tr}>
      {children}
    </tr>
  )
}

const Th: React.FC = ({ children }) => {
  return (
    <th className={s.Table__cell}>
      {children}
    </th>
  )
}


const Td: React.FC = ({ children }) => {
  return (
    <td className={s.Table__cell}>
      {children}
    </td>
  )
}

export {
  Table,
  Head,
  Body,
  Td,
  Tr,
  Th
}
