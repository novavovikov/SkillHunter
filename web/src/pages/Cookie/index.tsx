import React, { FC } from 'react'
import { Page, Text } from '../../components'

const CONTENT = [
  {
    text: 'To make this site work properly, we sometimes place small data files called cookies on your device. Most websites do this too.\n\n',
  },
  {
    title: 'What are cookies?',
    text: 'Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.\n\nCookies set by the website owner (in this case, Elama Global PTE. LTD.) are called "first party cookies". Cookies set by parties other than the website owner are called "third party cookies". Third party cookies enable third party features or functionality to be provided on or through the website (e.g. like advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.\n\nUsing cookies is safe. It is impossible to extract personal information such as phone numbers or e-mail addresses by using cookies. Therefore, they are unsuitable for direct marketing techniques like telemarketing and email spam.',
  },
  {
    title: 'Why do we use cookies?',
    text: 'We use first party and third - party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies.\n\nFor instance, we use Google reCAPTCHA solution for preventing spam requests on our public contact forms.\n\nThis solution is provided by Google LLC, so that we could perform our contract with you. Its expiry is not set and it is used for sessions only.\n\nOther cookies also enable us to track and target the interests of our users to enhance the experience on our website.\n\nThe cookie - related information is not used to identify you personally and the pattern data is fully under our control. These cookies are not used for any purpose other than those described here.',
  },
  {
    title: 'How to control cookies?',
    text: 'You can control and/or delete cookies as you wish - for details, see http://www.aboutcookies.org. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.',
  },
  {
    title: 'Updates',
    text: 'We may update this Cookie Notice from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Notice regularly to stay informed about our use of cookies and related technologies.\n\nThis Cookie Notice will always include information on the effective date of the most recent version.',
  },
]

const Cookie: FC = () => {
  return (
    <Page
      search={false}
      sidebar={false}
    >
      <Text.Layout title="Cookie Notice">
        {CONTENT.map(({ text, title }: any, index) => (
          <Text.Content
            key={index}
            title={title}
            text={text}
          />
        ))}
      </Text.Layout>
    </Page>
  )
}

export default Cookie
