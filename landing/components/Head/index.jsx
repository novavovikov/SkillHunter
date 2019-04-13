import Head from 'next/head'
import '../../styles/global.scss'

export default ({ title }) => (
  <Head>
    <meta charSet="utf-8"/>
    <title>
        {title || 'SkillHunter | Платформа для развития профессиональных и личных навыков'}
    </title>
    <meta
      httpEquiv="x-ua-compatible"
      content="ie=edge"
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, minimal-ui"
    />
    <meta
      name="keywords"
      content="Skill Hunter самообучения саморазвитие курсы обучение развитие"
    />
    <meta
      name="description"
      content="Платформа для развития профессиональных и личных навыков"
    />
    <meta
      name="author"
      content="SkillHunter"
    />
    <meta
      property="og:type"
      content="website"
    />
    <meta
      property="og:title"
      content="Платформа для развития профессиональных и личных навыков"
    />
    <meta
      property="og:description"
      content="Новый легкий и лучший способ саморазвития"
    />
    <meta
      property="og:site_name"
      content="SkillHunter"
    />
    <meta
      property="og:url"
      content="//skillhunter.io"
    />
    <meta
      property="og:images"
      content="//skillhunter.io//static/undraw_investing_7u7.png"
    />
    <meta
      property="og:images:width"
      content="600"
    />
    <meta
      property="og:images:height"
      content="475"
    />
    <meta
      property="latitude"
      content="59.8311888"
    />
    <meta
      property="longitude"
      content="30.3681731"
    />
    <meta
      property="contact_data:street_address"
      content="Vitebskiy Prospekt, 97"/>
    <meta
      property="contact_data:locality"
      content="Sankt-Peterburg"/>
    <meta
      property="contact_data:postal_code"
      content="196233"/>
    <meta
      property="contact_data:country_name"
      content="Russia"
    />

    <meta
      name="robots"
      content="index, follow"
    />
    <meta
      name="language"
      content="English"
    />
    <meta
      name="msapplication-tooltip"
      content=""
    />
    <meta
      name="msapplication-starturl"
      content="//skillhunter.io/?pinned=true"/>
    <meta
      name="msapplication-tap-highlight"
      content="no"
    />

    <meta
      name="mobile-web-app-capable"
      content="yes"
    />
    <meta
      name="application-name"
      content="SkillHunter"
    />

    <meta
      name="apple-mobile-web-app-capable"
      content="yes"/>
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black"/>
    <meta
      name="apple-mobile-web-app-title"
      content="SkillHunter"
    />

    <link
      rel="manifest"
      href="/static/manifest.json"/>

    <meta
      name="msapplication-TileColor"
      content="#0aa13d"
    />
    <meta
      name="theme-color"
      content="#0aa13d"
    />

    <link
      rel="icon"
      type="image/x-icon"
      href="/static/favicon.ico"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600;subset=cyrillic-ext"
      rel="stylesheet"/>
  </Head>
)