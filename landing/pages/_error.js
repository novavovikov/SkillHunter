import React from 'react'
import PropTypes from 'prop-types'
import Page from '../components/Page'
import Error from '../components/Error'

class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  static defaultProps = {
    statusCode: 404,
  }

  static propTypes = {
    statusCode: PropTypes.number,
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
