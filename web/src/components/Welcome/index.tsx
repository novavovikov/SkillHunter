import React, { Component } from 'react'
import Title from './Title'
import welcomeImage from './images/welcome.png'
import * as s from './Welcome.css'
import { Mark } from '../../UI'

class Welcome extends Component {
  render () {
    return (
      <div className={s.Welcome}>
        <div className={s.Welcome__text}>
          <div className={s.Welcome__label}>
            Resource summary:
          </div>
          <p className={s.Welcome__paragraph}>
            Эта статья поможет тебе разобраться в сервисе и понять как Skillhunter пожет помочь в саморазвитии.
          </p>

          <div className={s.Welcome__image}>
            <img
              src={welcomeImage}
              alt=""
            />
          </div>
        </div>

        <div className={s.Welcome__text}>
          <Title icon="greeting">
            Привет
          </Title>
          <p className={s.Welcome__paragraph}>
            Вероятно, ты уже успел зарегистрироваться и добавить скиллсет и пару скиллов.
          </p>
          <p className={s.Welcome__paragraph}>
            Но давай начнем с нашей цели и миссии :)
          </p>
        </div>

        <div className={s.Welcome__text}>
          <Title icon="mission">
            Миссия
          </Title>
          <p className={s.Welcome__paragraph}>
            Мы хотим <Mark color="green">сделать обучение и развитие</Mark> более <Mark color="blue">социальным и
            доступным, лекгим и простым.</Mark>
          </p>
        </div>

        <div className={s.Welcome__text}>
          <Title icon="archive">
            База знаний
          </Title>
          <p className={s.Welcome__paragraph}>
            Нужна для составления планов развития, хранения полезных материалов и обогащения новыми актуальными знаниями
            через нашу систему рекомендаций.
          </p>
        </div>

        <div className={s.Welcome__text}>
          <Title icon="list">
            Оценка знаний и опыта
          </Title>
          <p className={s.Welcome__paragraph}>
            Потребуется на старте и после обучения. Фидбек важен, чтобы понять что улучшать и в какой
            последовательности.
          </p>
        </div>

        <div className={s.Welcome__text}>
          <Title icon="route">
            План обучения
          </Title>
          <p className={s.Welcome__paragraph}>
            Мы верим что обучение эффективно, когда есть структура и приоритеты и практика. Составить план можешь ты сам
            или обратиться к менторам.
          </p>
        </div>

        <div className={s.Welcome__text}>
          <Title>
            Ты - новичок
          </Title>
          <p className={s.Welcome__paragraph}>
            Для тех, кто только начал обучение Skillhunter поможет понять с чего начать, структуру обучения и как
            применить полученные знания.
          </p>
        </div>

        <div className={s.Welcome__text}>
          <Title>
            Ты - специалист
          </Title>
          <p className={s.Welcome__paragraph}>
            Для состоявшихся специалистов, которым важно постоянно расти, быть в тренде и быть востребованным на рынке.
          </p>
        </div>

        <div className={s.Welcome__text}>
          <Title>
            Для комьюнити
          </Title>
          <p className={s.Welcome__paragraph}>
            Также мы предусмотрели инструментарий для развития и обмена опытом в тематических и профессиональных
            комьюнити.
          </p>
        </div>

        <div className={s.Welcome__footer}>
          <a
            className={s.Welcome__button}
            href="123"
            target="_blank"
          >
            How
            <div className={s.Welcome__buttonLabel}>
              to start
            </div>
          </a>
        </div>
      </div>
    )
  }
}

export default Welcome
