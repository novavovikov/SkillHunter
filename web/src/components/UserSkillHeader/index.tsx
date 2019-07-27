import cn from 'classnames'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { H4, Item, Menu } from '../../UI'
import * as s from './UserSkillHeader.css'

interface Props {
  className?: string
  link?: string | false
  name: string
  menu: {
    addResource: () => void
    removeSkill: () => void
  }
}

const UserSkillHeader: FC<Props> = (props) => {
  const {
    className,
    name,
    link,
    menu,
  } = props

  return (
    <div className={cn(s.UserSkillHeader, className)}>
      <H4 className={s.UserSkillHeader__title}>
        {link
          ? (
            <Link
              to={link}
              className={s.UserSkillHeader__link}
            >
              {name}
            </Link>
          )
          : name
        }
      </H4>

      <Menu
        className={s.UserSkillHeader__menu}
        position="left"
      >
        <Item onClick={menu.addResource}>
          Add resource
        </Item>
        <Item onClick={menu.removeSkill}>
          Delete skill
        </Item>
      </Menu>
    </div>
  )
}

export default UserSkillHeader
