import { withNamespaces } from '../../i18n'
import Router from 'next/router';
import { useState } from 'react'
import cn from 'classnames'
import Step from './Step'
import Progress from '../Progress'
import Button from '../Button'
import css from './Registration.scss'
import { FINAL_ROUTE } from '../../constants/routes'

const STEP_COUNT = 2
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const Registration = ({ t }) => {
  const [step, setStep] = useState(1)
  const [profession, setProfession] = useState({
    value: '',
    error: null,
    warning: null
  })
  const [expectations, setExpectations] = useState({
    value: '',
    error: null,
    warning: null
  })
  const [email, setEmail] = useState({
    value: '',
    error: null,
    warning: null
  })

  const validateEmail = () => {
    if (!email.value) {
      return setEmail({
        ...email,
        error: t('field.empty'),
      })
    }

    if (!email.value.match(EMAIL_REGEX)) {
      return setEmail({
        ...email,
        warning: t('field.email'),
      })
    }

    const data = {
      profession: profession.value,
      expectations: expectations.value,
      email: email.value
    }
    fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(() => Router.push(FINAL_ROUTE))
    .catch(err => {
      console.warn(err.message)
      setEmail({
        ...email,
        error: t('field.unknown'),
      })
    })
  }

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
            error: t('field.empty'),
          })
        }

        return setStep(step + 1)
      }
      case 2:
        return setStep(step + 1)
      default: validateEmail()
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
                  src="/static/images/blank.svg"
                  alt=""
                />
                {t('title')}
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
              {t('email.title')}
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
            title={t('profession.title')}
            text={t('profession.description')}
            field={{
              ...profession,
              placeholder: t('profession.placeholder'),
              onChange: (e) => setProfession({
                value: e.target.value,
                error: null,
                warning: null,
              }),
            }}
          />
        )}

        {step === 2 && (
          <Step
            title={t('expectations.title')}
            text={t('expectations.description')}
            field={{
              ...expectations,
              placeholder: t('expectations.placeholder'),
              onChange: (e) => setExpectations({
                value: e.target.value,
                error: null,
                warning: null,
              }),
            }}
          />
        )}

        {step === 3 && (
          <Step
            text={t('email.description')}
            field={{
              ...email,
              placeholder: t('email.placeholder'),
              onChange: (e) => setEmail({
                value: e.target.value,
                error: null,
                warning: null,
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
            {t('common:back')}
          </Button>
        )}

        <Button
          className={css.Registration__submit}
        >
          {step > STEP_COUNT
            ? t('common:done')
            : t('common:further')
          }
        </Button>
      </div>
    </form>
  )
}

export default withNamespaces('registration')(Registration)
