import React, { Component } from 'react'
import cn from 'classnames'
import linkImg from './images/link.png'
import importantImg from './images/important.png'
import focusImg from './images/focus.png'
import { Button, H2, H5 } from '../../UI'
import * as s from './Onboarding.css'

const CONTENT = [
  {
    id: 1,
    title: `Ссылки не теряются в истории чатов и закладках`,
    text: `Когда знакомые присылают мне полезную ссылку, книгу, медиа или курс, я сохраняю ее в Skillhunter и ссылка всегда под рукой и я не забваю этой проблемой свой мозг`,
    img: linkImg,
  },
  {
    id: 2,
    title: `Изучаешь только то, что важно сейчас`,
    text: `Когда я фокусируюсь на изучении одного навыка, полезные материалы на другую тематику, я сохраняю в скиллхантер и связываю их с навыками, которые они развивают, поэтому когда приходит время прокачивать этот навык ссылка всегда под рукой.`,
    img: importantImg,
  },
  {
    id: 3,
    title: `Фокус только на том, что еще не изучил`,
    text: `В свободное время, я леко нахожу материалы, которые еще не изучил, ориентируясь на статусы материалов.`,
    img: focusImg,
  },
]

interface Props {
  onSubmit: () => void
}

interface State {
  activeItem: number
}

class Onboarding extends Component<Props, State> {
  state = {
    activeItem: 1,
  }

  render () {
    const { onSubmit } = this.props
    const { activeItem } = this.state

    return (
      <div className={s.Onboarding}>
        <H2 className={s.Onboarding__caption}>
          How it works
        </H2>

        <div className={s.Onboarding__content}>
          <div className={s.Onboarding__description}>
            {CONTENT.map(({ id, title, text }) => (
              <div
                key={id}
                onMouseEnter={() => this.setState({
                  activeItem: id,
                })}
                className={cn(s.Onboarding__item, {
                  [s.Onboarding__item_active]: id === activeItem,
                })}
              >
                <H5 className={s.Onboarding__title}>
                  {title}
                </H5>
                <p>
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className={s.Onboarding__aside}>
            {CONTENT.map(({ id, img }) => (
              <div
                key={id}
                className={cn(s.Onboarding__img, {
                  [s.Onboarding__img_active]: id === activeItem,
                })}
              >
                <img
                  src={img}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className={s.Onboarding__footer}>
          <div className={s.Onboarding__aside}>
            <Button
              className={s.Onboarding__button}
              onClick={onSubmit}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Onboarding
