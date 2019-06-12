import cookies from 'js-cookie'
import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Faq } from '../../components'
import { API } from '../../constants/api'
import { ROUTES } from '../../constants/routing'
import { getUserData } from '../../redux/actions/user'
import { UserState } from '../../redux/reducers/user'
import { H2, H4, Layout, Logo, Tip } from '../../UI'
import * as s from './Auth.css'
import facebookIcon from './icons/facebook-icon.svg'
import googleIcon from './icons/google-icon.svg'

interface Props {
  user: UserState,
  getUser: () => void
}

class Auth extends React.Component<Props> {
  componentDidMount (): void {
    const { getUser, user } = this.props
    const token = cookies.get('authToken')

    if (
      token &&
      !user.data
    ) {
      getUser()
    }
  }

  render () {
    const { user } = this.props

    if (user.data) {
      return <Redirect to={ROUTES.INTRODUCTION}/>
    }

    return (
      <div className={s.Auth}>
        <div className={s.Auth__login}>
          <Layout.Section>
            <Layout.Container>
              <div className={s.Auth__container}>
                <Logo className={s.Auth__logo}/>

                <H2>Регистрация или вход</H2>

                <div className={s.Auth__label}>
                  С помощью
                </div>

                <a
                  className={s.Auth__btn}
                  href={`${API.BASE_URL}${API.AUTH_GOOGLE}`}
                >
                  <i
                    className={s.Auth__btnIcon}
                    dangerouslySetInnerHTML={{ __html: googleIcon }}
                  />
                  <span>GOOGLE</span>
                </a>

                <div className={s.Auth__label}>
                  или
                </div>

                <a
                  className={s.Auth__btn}
                  href={`${API.BASE_URL}${API.AUTH_FACEBOOK}`}
                >
                  <i
                    className={s.Auth__btnIcon}
                    dangerouslySetInnerHTML={{ __html: facebookIcon }}
                  />
                  <span>FACEBOOK</span>
                </a>

                <div className={s.Auth__terms}>
                  Регистрируясь, вы соглашаетесь с нашими<br/>
                  <a href={'https://skillhunter.io/tos/'} target={'_blank'} className={s.Auth__link}>Terms of
                    Service</a> и <a href={'https://skillhunter.io/static/files/privacy_policy_en.pdf'}
                                     target={'_blank'}
                                     className={s.Auth__link}>Privacy
                  Policy.</a>
                </div>

                <Tip
                  icon={'lock'}
                  className={s.Auth__security}
                >
                  Не передаем информацию третьим лицам. Закрыть доступ к аккаунту можно всегда.
                </Tip>

                <div className={s.Auth__description}>
                  <H4>Нет аккаунта Google или Facebook?</H4>
                  <div>
                    Нет проблем! Вы можете создать аккаунт Google или Facebook с помощью вашего email. <br/>Gmail
                    аккаунты
                    не
                    поддерживаются.
                  </div>
                </div>
              </div>
            </Layout.Container>
          </Layout.Section>
        </div>

        <div className={s.Auth__faq}>
          <Layout.Section>
            <Layout.Container>
              <H2>Часто задаваемые вопросы</H2>

              <div className={s.Auth__faqRow}>
                <div className={s.Auth__faqCol}>
                  <Faq title={'Я могу создать аккаунт с помощью email и пароля?'}>
                    <>
                      <p>
                        Нет. Мы поддерживаем регистрацию и вход только через Google или Facebook, потому что мы считаем
                        что,
                        это
                        наилучший способ обеспечения безопасности ваших данных.
                      </p>
                      <p>
                        Использование email и паролей может показаться простым на первый взгляд, но здесь много
                        сложностей:
                        восстановление паролей, двухфакторная аутентификация, обнаружение мошенничества, обнаружение
                        атаки
                        методом
                        перебора и надежное хранение хешированных и паролей с секретом. Мы считаем, что предоставление
                        этих
                        задач
                        стороннему поставщику является правильным решением, и у нас остается больше времени, чтобы
                        сосредоточиться
                        на создании отличного впечатляющего опыта использования нашего продукта.
                      </p>
                    </>
                  </Faq>

                  <Faq title={'Вы сможете читать мои сообщения и письма или получите доступ к личной информации?'}>
                    <>
                      <p>
                        Нет, не сможем. И нам это не нужено. Мы просто запрашиваем основную информацию вашего профиля. У
                        нас
                        не
                        будет доступа к каким-либо другим данным, и мы не можем изменять какие-либо настройки или
                        получить
                        доступ к вашей учетной записи Google или Facebook.
                      </p>
                      <p>
                        При авторизации в SkillHunter Google и Facebook запросят у вас разрешение на досутп к этой
                        информации,
                        никакую другую информацию мы получить не сможем, по правилам безопсаности Google и Facebook.
                      </p>
                    </>
                  </Faq>
                </div>

                <div className={s.Auth__faqCol}>
                  <Faq title={'Что вы будете делать с моим Google или Facebook аккаунтом?'}>
                    <>
                      <p>
                        Мы запрашиваем доступ только к вашей основной информации профиля. Это включает в себя ваше имя,
                        фотографию профиля и ваш адрес электронной почты.
                      </p>
                      <p>
                        Мы не запрашиваем доступ к вашим контактам, электронным письмам, документам Google Диска или
                        чему-либо
                        еще, что не требуется для работы SkillHunter.
                      </p>
                    </>
                  </Faq>

                  <Faq
                    title={'Могу ли я использовать учетную запись Facebook, если я ранее использовал учетную запись' +
                    ' Google, или наоборот?'}>
                    <>
                      <p>
                        Да! Если вы используете учетную запись Google, адрес электронной почты которой совпадает с
                        адресом
                        вашей учетной записи Facebook, вы можете использовать оба способа для входа в одну и ту же
                        учетную
                        запись SkillHunter.
                      </p>
                      <p>
                        Если вы используете учетную запись Google, адрес электронной почты которой не совпадает с
                        адресом
                        вашей учетной записи Facebook, то чтобы использовать их для входа в одну учетную запись
                        SkillHunter
                        необходимо авторизоваться через учетную запись Google, перейти в настройки профиля и добавить
                        учетную
                        запись для входа.
                      </p>
                    </>
                  </Faq>

                  <Faq title={'У меня остались вопросы относительно авторизации и входа'}>
                    <>
                      Напиишите их нам. Наш email <a href={'mailto:help@skillhunter.io'}>help@skillhunter.io</a>.
                    </>
                  </Faq>
                </div>
              </div>
            </Layout.Container>
          </Layout.Section>
        </div>
      </div>
    )
  }
}

export default connect(
  (state: any) => ({
    user: state.user,
  }),
  {
    getUser: getUserData,
  },
)(Auth)
