import React from 'react'
import PropTypes from 'prop-types'

import { withNamespaces } from '../i18n'
import Page from '../components/Page'
import Error from '../components/Error'

class ErrorPage extends React.Component {
  static defaultProps = {
    statusCode: 404,
  }

  static propTypes = {
    statusCode: PropTypes.number,
    t: PropTypes.func.isRequired,
  }

  static getInitialProps({ res, err }) {
    let statusCode = null
    if (res) {
      ({ statusCode } = res)
    } else if (err) {
      ({ statusCode } = err)
    }
    return {
      namespacesRequired: ['error'],
      statusCode,
    }
  }

  render() {
    const { statusCode, t } = this.props

    return (
      <Page>
        <Error statusCode={statusCode}/>
      </Page>
    )
  }
}

export default withNamespaces('common')(ErrorPage)
