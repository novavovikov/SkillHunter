import React, { Component } from 'react'
import * as s from './ResourceHeader.css'

class ResourceHeader extends Component {
  render () {
    return (
      <div className={s.ResourceHeader}>
        <div className={s.ResourceHeader__item}>
          Backlog
        </div>
        <div className={s.ResourceHeader__item}>
          1000000
        </div>
        <div className={s.ResourceHeader__item}>
          Share
        </div>
        <div className={s.ResourceHeader__item}>
          2 skills
        </div>
        <div className={s.ResourceHeader__item}>
          More
        </div>
      </div>
    )
  }
}

export default ResourceHeader
