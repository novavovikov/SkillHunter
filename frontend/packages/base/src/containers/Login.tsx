import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { Container, H1, H2, LoginButton } from '../components'
import { System } from '../enum/system'

const s = require('react-native-style-tachyons').styles

const Login: FC = () => {
  return (
    <Container>
      <View style={[s.aic, s.pv5]}>
        <Image
          source={{ uri: '/static/logo.svg' }}
          style={[
            s.mb5,
            {
              width: 150,
              height: 42,
            },
          ]}
        />

        <H1>Регистрация или вход</H1>
        <Text style={[s.lightGray, s.mb3]}>С помощью</Text>

        <LoginButton system={System.google}>
          GOOGLE
        </LoginButton>
        <Text style={[s.lightGray, s.mv2]}>или</Text>
        <LoginButton system={System.facebook}>
          FACEBOOK
        </LoginButton>

        <Text style={[
          s.midGray,
          s.mv4,
          s.tc,
          {
            maxWidth: 300,
          },
        ]}>
          Регистрируясь, вы соглашаетесь с нашими
          Terms of Service и Privacy Policy.
        </Text>

        <Text style={[
          s.aic,
          s.jcc,
          s.silver,
        ]}>
          <Image
            source={{ uri: `/static/lock.svg` }}
            style={{
              width: 12,
              height: 14,
              marginRight: 6,
            }}
          />
          Не передаем информацию третьим лицам. Закрыть доступ к аккаунту можно
          всегда.
        </Text>

        <View style={[s.aic, s.mt6]}>
          <H2>Нет аккаунта Google или Facebook?</H2>
          <Text style={[s.midGray, s.tc]}>
            Нет проблем! Вы можете создать аккаунт Google или Facebook с помощью
            вашего email. {'\n'}Gmail аккаунты не поддерживаются.
          </Text>
        </View>
      </View>
    </Container>
  )
}

export default Login
