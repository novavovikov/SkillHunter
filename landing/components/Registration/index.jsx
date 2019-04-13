import Router from 'next/router';
import { useState } from 'react'
import cn from 'classnames'
import Step from './Step'
import Progress from '../Progress'
import Button from '../Button'
import css from './Registration.scss'
import { FINAL_ROUTE } from '../../constants/routes'

const STEP_COUNT = 2

export default () => {
  const [step, setStep] = useState(1)
  const [profession, setProfession] = useState({
    value: '',
    error: null,
  })
  const [expectations, setExpectations] = useState({
    value: '',
    error: null,
  })
  const [email, setEmail] = useState({
    value: '',
    error: null,
  })

  const onCancel = () => {
    setStep(step - 1)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    switch (step) {
      case 1: {
        if (!profession.value) {
          return setProfession({
            ...profession,
            error: 'Поле не должно быть пустым',
          })
        }

        return setStep(step + 1)
      }
      case 2:
        return setStep(step + 1)
      default: {
        if (!email.value) {
          return setEmail({
            ...email,
            error: 'Поле не должно быть пустым',
          })
        }
        const data = {
          promession: profession.value,
          expectations: expectations.value,
          email: email.value
        }
        fetch('/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(() => Router.push(FINAL_ROUTE))
        .catch(err => console.log(err.message))
      }
    }
  }

  return (
    <form className={css.Registration} onSubmit={onSubmit}>
      <div className={css.Registration__header}>
        {step <= STEP_COUNT
          ? (
            <>
              <div className={css.Registration__title}>
                <img
                  className={css.Registration__icon}
                  src="/static/blank.svg"
                  alt=""
                />
                Регистрация
              </div>

              <div className={css.Registration__step}>
                {step}/{STEP_COUNT}
              </div>
            </>
          )
          : (
            <div className={cn(
              css.Registration__title,
              css.Registration__title_light,
            )}>
              Осталось чуть-чуть
            </div>
          )
        }
      </div>

      <Progress
        step={step - 1}
        count={STEP_COUNT}
      />

      <div className={css.Registration__body}>
        {step === 1 && (
          <Step
            title="Кто вы сейчас или кем хотите стать"
            text="Специальность, профессия или должность"
            field={{
              ...profession,
              placeholder: 'Например: продукт-менеджер',
              onChange: (e) => setProfession({
                value: e.target.value,
                error: null,
              }),
            }}
          />
        )}

        {step === 2 && (
          <Step
            title="Какие у вас ожидания от сервиса?"
            text="Как считаете чем сервис может помочь? С какими проблемами и сложностями в саморазвитии сталкиваетесь?"
            field={{
              ...expectations,
              type: 'textarea',
              placeholder: 'Введите ответ',
              onChange: (e) => setExpectations({
                value: e.target.value,
                error: null,
              }),
            }}
          />
        )}

        {step === 3 && (
          <Step
            text="На него придет приглашение"
            field={{
              ...email,
              placeholder: 'Ваш e-mail',
              onChange: (e) => setEmail({
                value: e.target.value,
                error: null,
              }),
            }}
          />
        )}
      </div>

      <div className={css.Registration__footer}>
        {step !== 1 && (
          <Button
            type="button"
            theme="gray"
            onClick={onCancel}
          >
            Назад
          </Button>
        )}

        <Button
          className={css.Registration__submit}
        >
          {step > STEP_COUNT
            ? 'Готово'
            : 'Далее'
          }
        </Button>
      </div>
    </form>
  )
}
