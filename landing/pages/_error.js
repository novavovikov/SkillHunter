import React from 'react'
import PropTypes from 'prop-types'
import Page from '../components/Page'
import Error from '../components/Error'

class ErrorPage extends React.Component {
  static defaultProps = {
    statusCode: 404,
  }

  static propTypes = {
    statusCode: PropTypes.number,
  }

  static getInitialProps({ res, err }) {
    let statusCode = null
    if (res) {
      ({ statusCode } = res)
    } else if (err) {
      ({ statusCode } = err)
    }
    return {
      statusCode,
    }
  }

  render() {
    const { statusCode } = this.props

    return (
      <Page>
        <Error statusCode={statusCode}/>
      </Page>
    )
  }
}

export default ErrorPage
