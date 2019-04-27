import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html>
        <Head>
          <meta
            name="google-site-verification"
            content="srVjcIPunpWU12xJNU6TItAeluJRAW2aADSdUnsfIuc"
          />
        </Head>
        <body className="custom_class">
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument
