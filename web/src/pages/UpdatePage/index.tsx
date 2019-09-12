import React, { Component } from 'react'
import { analytics } from '../../utils/analytics'
import updatePageImg from './images/update-page.svg'
import * as s from './UpdatePage.css'

class UpdatePage extends Component {
  componentDidMount (): void {
    analytics({
      event: '500',
      category: 'error'
    })
  }

  render () {
    return (
      <div className={s.UpdatePage}>
        <img
          className={s.UpdatePage__img}
          src={updatePageImg}
          alt=""
        />

        <div className={s.UpdatePage__title}>
          SkillHunter is currently down
          for maintenance.
        </div>
        <div className={s.UpdatePage__subtitle}>
          Please check back soon.
        </div>
      </div>
    )
  }
}

export default UpdatePage
