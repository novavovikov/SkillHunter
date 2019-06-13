import cn from 'classnames'
import * as React from 'react'
import favicon from './icons/faviicon-freecodecamp.png'
import * as s from './Resource.css'

const Resource: React.FC = () => {
  return (
    <div
      className={cn(s.Resource, {
        [s.Resource_article]: true,
      })}
    >
      <div className={s.Resource__content}>
        <div className={s.Resource__header}>
          <h4 className={s.Resource__title}>
            How To Overcome Digital Addiction and Have More Willpower long title How To Overcome Digital Addiction and
            Have More Willpower long title
          </h4>

          <button
            className={cn(
              s.Resource__status,
              s.Resource__status_backlog,
            )}
          >
            Backlog
          </button>
        </div>

        <a
          href="#"
          className={s.Resource__site}
          target="_blank"
        >
          <span className={s.Resource__favicon}>
            <img
              src={favicon}
              alt=""
            />
          </span>
          freecodecamp.org
        </a>
      </div>
    </div>
  )
}

export default Resource
