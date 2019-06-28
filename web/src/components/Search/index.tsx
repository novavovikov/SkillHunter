import React from 'react'
import * as s from './Search.css'

const Search: React.FC = () => {
  return (
    <form className={s.Search}>
      <input
        className={s.Search__input}
        type="text"
        placeholder="Search source"
      />
    </form>
  )
}

export default Search
