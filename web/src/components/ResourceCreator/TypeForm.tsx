import React from 'react'
import { EResourceTypes } from '../../types'
import * as s from './ResourceCreator.css'

const TYPES = [
  {
    value: EResourceTypes.Article,
    label: 'Article',
  },
  {
    value: EResourceTypes.Media,
    label: 'Media',
  },
  {
    value: EResourceTypes.Book,
    label: 'Book',
  },
  {
    value: EResourceTypes.Course,
    label: 'Course',
  },
]

interface Props {
  onSubmit: (type: string) => void
}

class TypeForm extends React.Component<Props> {
  handleButton = (e: any) => {
    this.props.onSubmit(e.target.value)
  }

  render () {
    return (
      <>
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
      </>
    )
  }
}

export default TypeForm
