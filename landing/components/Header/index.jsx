import Link from 'next/link'
import Container from '../Container'
import Button from '../Button'
import {
  HOME_ROUTE,
  REGISTRATION_ROUTE,
} from '../../constants/routes'

import css from './Header.scss'

export default ({ withRegistration = true }) => (
  <header className={css.Header}>
    <Container>
      <div className={css.Header__content}>
        <Link href={HOME_ROUTE}>
          <a>
            <svg
              className={css.Header__logo}
              width="505"
              height="142"
              viewBox="0 0 505 142"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="1" width="182" height="41" rx="20.5" fill="white"/>
              <path
                className={css.Header__logoRow}
                d="M0 21.5C0 10.1782 9.17816 1 20.5 1H135V42H20.5C9.17816 42 0 32.8218 0 21.5Z"
                fill="#5086EC"
              />
              <path d="M0 21.5C0 10.1782 9.17816 1 20.5 1H135V42H20.5C9.17816 42 0 32.8218 0 21.5Z" stroke="black"/>
              <rect x="4" y="5" width="174" height="33" rx="16.5" stroke="#424242" strokeWidth="8"/>
              <rect y="51" width="182" height="41" rx="20.5" fill="white"/>
              <rect y="101" width="182" height="41" rx="20.5" fill="white"/>
              <path
                className={css.Header__logoRow}
                d="M0 71.5C0 60.1782 9.17816 51 20.5 51H85V92H20.5C9.17816 92 0 82.8218 0 71.5Z"
                fill="#F2BD42"
              />
              <path d="M0 71.5C0 60.1782 9.17816 51 20.5 51H85V92H20.5C9.17816 92 0 82.8218 0 71.5Z" stroke="black"/>
              <path
                className={css.Header__logoRow}
                d="M0 121.5C0 110.178 9.17816 101 20.5 101H113V142H20.5C9.17816 142 0 132.822 0 121.5Z"
                fill="#0AA13D"
              />
              <path d="M0 121.5C0 110.178 9.17816 101 20.5 101H113V142H20.5C9.17816 142 0 132.822 0 121.5Z" stroke="#58A55C"/>
              <rect x="4" y="105" width="174" height="33" rx="16.5" stroke="#424242" strokeWidth="8"/>
              <rect x="4" y="55" width="174" height="33" rx="16.5" stroke="#424242" strokeWidth="8"/>
              <path d="M246.264 18.208H233.496V13.312C233.496 12.8 233.304 12.352 232.92 11.968C232.6 11.584 232.184 11.392 231.672 11.392H226.392C225.88 11.392 225.432 11.584 225.048 11.968C224.728 12.352 224.568 12.8 224.568 13.312V24.352C224.568 24.864 224.728 25.312 225.048 25.696C225.432 26.08 225.88 26.272 226.392 26.272H235.032C242.968 26.4 246.936 30.624 246.936 38.944V52.288C246.936 60.736 242.968 64.96 235.032 64.96H223.704C215.768 64.96 211.8 60.736 211.8 52.288V45.856H224.568V52.768C224.568 53.28 224.728 53.728 225.048 54.112C225.432 54.496 225.88 54.688 226.392 54.688H232.344C232.856 54.688 233.272 54.496 233.592 54.112C233.976 53.728 234.168 53.28 234.168 52.768V40.576C234.168 40.064 233.976 39.616 233.592 39.232C233.272 38.848 232.856 38.656 232.344 38.656H223.704C215.768 38.656 211.8 34.432 211.8 25.984V13.6C211.8 5.152 215.768 0.927999 223.704 0.927999H234.36C242.296 0.927999 246.264 5.152 246.264 13.6V18.208ZM294.457 1.888L283.897 30.4L296.473 64H282.745L273.529 39.424H269.209V64H255.769V1.888H269.209V27.904H272.473L282.169 1.888H294.457ZM314.49 1.888V64H301.05V1.888H314.49ZM337.927 52.672H352.615V64H324.487V1.888H337.927V52.672ZM372.427 52.672H387.115V64H358.987V1.888H372.427V52.672Z"
                    fill="#424242"/>
              <path d="M225.24 116.616V141H211.8V78.888H225.24V104.904H235.896V78.888H249.336V141H235.896V116.616H225.24ZM281.132 78.888H294.572V129.288C294.572 137.736 290.604 141.96 282.668 141.96H270.764C262.828 141.96 258.86 137.736 258.86 129.288V78.888H272.3V130.44C272.3 130.952 272.46 131.4 272.78 131.784C273.164 132.168 273.612 132.36 274.124 132.36H279.308C279.82 132.36 280.236 132.168 280.556 131.784C280.94 131.4 281.132 130.952 281.132 130.44V78.888ZM339.385 141H325.945V89.448C325.945 88.936 325.753 88.488 325.369 88.104C325.049 87.72 324.633 87.528 324.121 87.528H318.937C318.425 87.528 317.977 87.72 317.593 88.104C317.273 88.488 317.113 88.936 317.113 89.448V141H303.673V90.6C303.673 82.152 307.641 77.928 315.577 77.928H327.481C335.417 77.928 339.385 82.152 339.385 90.6V141ZM344.842 90.312V78.888H378.442V90.312H368.362V141H354.922V90.312H344.842ZM398.021 129.864H412.901V141H384.581V78.888H412.901V89.832H398.021V104.424H411.941V114.984H398.021V129.864ZM434.115 115.56V141H420.675V78.888H444.579C452.515 78.888 456.483 83.112 456.483 91.56V98.76C456.483 103.88 454.659 107.144 451.011 108.552C454.211 109.704 455.811 112.328 455.811 116.424V141H442.371V117.48C442.371 116.2 441.763 115.56 440.547 115.56H434.115ZM434.115 88.008V106.152H441.219C441.731 106.152 442.147 105.96 442.467 105.576C442.851 105.192 443.043 104.744 443.043 104.232V89.928C443.043 89.416 442.851 88.968 442.467 88.584C442.147 88.2 441.731 88.008 441.219 88.008H434.115Z"
                    fill="#424242"/>
            </svg>
          </a>
        </Link>

        {withRegistration && (
          <Link href={REGISTRATION_ROUTE}>
            <a>
              <Button
                span
                className={css.Header__btn}
                theme="sm"
              >
                Начать
              </Button>
            </a>
          </Link>
        )}
      </div>
    </Container>
  </header>
)
