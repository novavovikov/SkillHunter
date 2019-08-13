import cn from 'classnames'
import React, { Component } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import logo from './icons/logo.svg?inline'
import * as s from './Logo.css'

interface Params {
  skillset: string
}

interface Props extends RouteComponentProps<Params> {
  className?: string
}

class Logo extends Component<Props> {
  getBackUrl = (params: Params) => {
    const { skillset } = params

    if (skillset) {
      return `${ROUTES.SKILLSET}/${skillset}`
    }

    return ROUTES.HOME
  }

  render () {
    const { className, match } = this.props

    return (
      <Link
        to={this.getBackUrl(match.params)}
        className={cn(s.Logo, className)}
        dangerouslySetInnerHTML={{ __html: logo }}
      />
    )
  }
}

export default withRouter(Logo)
