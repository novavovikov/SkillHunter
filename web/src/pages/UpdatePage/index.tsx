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
        <div className={s.UpdatePage__img}>
          <img src={updatePageImg} alt=""/>
        </div>
        <div className={s.UpdatePage__title}>
          We are updating <br/>our website
        </div>
      </div>
    )
  }
}

export default UpdatePage
