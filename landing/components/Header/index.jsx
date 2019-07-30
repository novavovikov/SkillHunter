import Link from 'next/link'
import Container from '../Container'
import Button from '../Button'
import { HOME_ROUTE, APP_ROUTE } from '../../constants/routes'

import css from './Header.scss'
import { analytics } from '../SkillsetForm/utils/analytics'

const Header = () => (
  <header className={css.Header}>
    <Container>
      <div className={css.Header__content}>
        <Link href={HOME_ROUTE}>
          <a>
            <svg width="128" height="25" viewBox="0 0 128 25" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M48.126 16.3721C48.126 16.0615 47.9707 15.8184 47.6602 15.6426C47.3555 15.4609 46.8633 15.2998 46.1836 15.1592C43.9219 14.6846 42.791 13.7236 42.791 12.2764C42.791 11.4326 43.1396 10.7295 43.8369 10.167C44.54 9.59863 45.457 9.31445 46.5879 9.31445C47.7949 9.31445 48.7588 9.59863 49.4795 10.167C50.2061 10.7354 50.5693 11.4736 50.5693 12.3818H48.0293C48.0293 12.0186 47.9121 11.7197 47.6777 11.4854C47.4434 11.2451 47.0771 11.125 46.5791 11.125C46.1514 11.125 45.8203 11.2217 45.5859 11.415C45.3516 11.6084 45.2344 11.8545 45.2344 12.1533C45.2344 12.4346 45.3662 12.6631 45.6299 12.8389C45.8994 13.0088 46.3506 13.1582 46.9834 13.2871C47.6162 13.4102 48.1494 13.5508 48.583 13.709C49.9248 14.2012 50.5957 15.0537 50.5957 16.2666C50.5957 17.1338 50.2236 17.8369 49.4795 18.376C48.7354 18.9092 47.7744 19.1758 46.5967 19.1758C45.7998 19.1758 45.0908 19.0352 44.4697 18.7539C43.8545 18.4668 43.3711 18.0771 43.0195 17.585C42.668 17.0869 42.4922 16.5508 42.4922 15.9766H44.9004C44.9238 16.4277 45.0908 16.7734 45.4014 17.0137C45.7119 17.2539 46.1279 17.374 46.6494 17.374C47.1357 17.374 47.502 17.2832 47.748 17.1016C48 16.9141 48.126 16.6709 48.126 16.3721ZM55.6934 15.1855L54.7793 16.0996V19H52.2393V5.5H54.7793V12.9795L55.2715 12.3467L57.7061 9.49023H60.7559L57.3193 13.4541L61.0547 19H58.1367L55.6934 15.1855ZM64.5352 19H61.9863V9.49023H64.5352V19ZM61.8369 7.0293C61.8369 6.64844 61.9629 6.33496 62.2148 6.08887C62.4727 5.84277 62.8213 5.71973 63.2607 5.71973C63.6943 5.71973 64.04 5.84277 64.2979 6.08887C64.5557 6.33496 64.6846 6.64844 64.6846 7.0293C64.6846 7.41602 64.5527 7.73242 64.2891 7.97852C64.0312 8.22461 63.6885 8.34766 63.2607 8.34766C62.833 8.34766 62.4873 8.22461 62.2236 7.97852C61.9658 7.73242 61.8369 7.41602 61.8369 7.0293ZM69.3164 19H66.7676V5.5H69.3164V19ZM74.0977 19H71.5488V5.5H74.0977V19ZM78.6768 10.5273C79.3506 9.71875 80.1973 9.31445 81.2168 9.31445C83.2793 9.31445 84.3252 10.5127 84.3545 12.9092V19H81.8145V12.9795C81.8145 12.4346 81.6973 12.0332 81.4629 11.7754C81.2285 11.5117 80.8389 11.3799 80.2939 11.3799C79.5498 11.3799 79.0107 11.667 78.6768 12.2412V19H76.1367V5.5H78.6768V10.5273ZM91.9658 18.0332C91.3389 18.7949 90.4717 19.1758 89.3643 19.1758C88.3447 19.1758 87.5654 18.8828 87.0264 18.2969C86.4932 17.7109 86.2207 16.8525 86.209 15.7217V9.49023H88.749V15.6338C88.749 16.624 89.2002 17.1191 90.1025 17.1191C90.9639 17.1191 91.5557 16.8203 91.8779 16.2227V9.49023H94.4268V19H92.0361L91.9658 18.0332ZM98.6807 9.49023L98.7598 10.5889C99.4395 9.73926 100.351 9.31445 101.493 9.31445C102.501 9.31445 103.251 9.61035 103.743 10.2021C104.235 10.7939 104.487 11.6787 104.499 12.8564V19H101.959V12.918C101.959 12.3789 101.842 11.9893 101.607 11.749C101.373 11.5029 100.983 11.3799 100.438 11.3799C99.7236 11.3799 99.1875 11.6846 98.8301 12.2939V19H96.29V9.49023H98.6807ZM109.474 7.15234V9.49023H111.1V11.3535H109.474V16.0996C109.474 16.4512 109.541 16.7031 109.676 16.8555C109.811 17.0078 110.068 17.084 110.449 17.084C110.73 17.084 110.979 17.0635 111.196 17.0225V18.9473C110.698 19.0996 110.186 19.1758 109.658 19.1758C107.877 19.1758 106.969 18.2764 106.934 16.4775V11.3535H105.545V9.49023H106.934V7.15234H109.474ZM116.892 19.1758C115.497 19.1758 114.36 18.748 113.481 17.8926C112.608 17.0371 112.172 15.8975 112.172 14.4736V14.2275C112.172 13.2725 112.356 12.4199 112.726 11.6699C113.095 10.9141 113.616 10.334 114.29 9.92969C114.97 9.51953 115.743 9.31445 116.61 9.31445C117.911 9.31445 118.934 9.72461 119.678 10.5449C120.428 11.3652 120.803 12.5283 120.803 14.0342V15.0713H114.747C114.829 15.6924 115.075 16.1904 115.485 16.5654C115.901 16.9404 116.426 17.1279 117.059 17.1279C118.037 17.1279 118.802 16.7734 119.353 16.0645L120.601 17.4619C120.22 18.001 119.704 18.4229 119.054 18.7275C118.403 19.0264 117.683 19.1758 116.892 19.1758ZM116.602 11.3711C116.098 11.3711 115.688 11.541 115.371 11.8809C115.061 12.2207 114.861 12.707 114.773 13.3398H118.307V13.1377C118.295 12.5752 118.143 12.1416 117.85 11.8369C117.557 11.5264 117.141 11.3711 116.602 11.3711ZM127.597 11.8721C127.251 11.8252 126.946 11.8018 126.683 11.8018C125.722 11.8018 125.092 12.127 124.793 12.7773V19H122.253V9.49023H124.652L124.723 10.624C125.232 9.75098 125.938 9.31445 126.841 9.31445C127.122 9.31445 127.386 9.35254 127.632 9.42871L127.597 11.8721Z"
                fill="#424242"/>
              <rect width="32.8442" height="7.21244" rx="3.60622" fill="#5086EC"
                    fillOpacity="0.5"/>
              <path
                d="M0 3.60622C0 1.61456 1.61456 0 3.60622 0H24.3625V7.21244H3.60622C1.61456 7.21244 0 5.59788 0 3.60622Z"
                fill="#5086EC"/>
              <path
                d="M0 3.60622C0 1.61456 1.61456 0 3.60622 0H24.3625V7.21244H3.60622C1.61456 7.21244 0 5.59788 0 3.60622Z"/>
              <rect y="8.79565" width="32.8442" height="7.21244" rx="3.60622"
                    fill="#F2BD42" fillOpacity="0.5"/>
              <path
                d="M0 12.4019C0 10.4102 1.61456 8.79567 3.60622 8.79567H15.3393V16.0081H3.60622C1.61456 16.0081 0 14.3936 0 12.4019Z"
                fill="#F2BD42"/>
              <path
                d="M0 12.4019C0 10.4102 1.61456 8.79567 3.60622 8.79567H15.3393V16.0081H3.60622C1.61456 16.0081 0 14.3936 0 12.4019Z"/>
              <rect y="17.5913" width="32.8442" height="7.21244" rx="3.60622"
                    fill="#0AA13D" fillOpacity="0.5"/>
              <path
                d="M0 21.1975C0 19.2059 1.61456 17.5913 3.60622 17.5913H20.3923V24.8038H3.60622C1.61456 24.8038 0 23.1892 0 21.1975Z"
                fill="#0AA13D"/>
            </svg>
          </a>
        </Link>

        <div>
          <Link href={APP_ROUTE}>
            <a>
              <Button
                span
                className={css.Header__btn}
                theme="transparent"
                onClick={() =>  analytics({ event: 'click_signin_btn' })}
              >
                Sign in
              </Button>
            </a>
          </Link>

          <Link href={APP_ROUTE}>
            <a>
              <Button
                span
                onClick={() =>  analytics({ event: 'click_signup_btn' })}
              >
                Sign up
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </Container>
  </header>
)

export default Header
