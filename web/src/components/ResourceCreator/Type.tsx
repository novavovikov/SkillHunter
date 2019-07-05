import React from 'react'
import * as s from './ResourceCreator.css'

const TYPES = [
  {
    value: 'article',
    label: 'Article',
  },
  {
    value: 'media',
    label: 'Media',
  },
  {
    value: 'book',
    label: 'Book',
  },
  {
    value: 'course',
    label: 'Course',
  },
]

interface Props {
  onSubmit: (type: string) => void
}

class Type extends React.Component<Props> {
  handleButton = (e: any) => {
    this.props.onSubmit(e.target.value)
  }

  render () {
    return (
      <div className={s.ResourceCreator__form}>
        <div>
          <div className={s.ResourceCreator__controls}>
            {TYPES.map(({ value, label }) => (
              <button
                key={value}
                className={s.ResourceCreator__control}
                value={value}
                onClick={this.handleButton}
              >
                {label}
              </button>
            ))}
          </div>

          <div className={s.ResourceCreator__desc}>
            Select source type
          </div>
        </div>
      </div>
    )
  }
}

export default Type
