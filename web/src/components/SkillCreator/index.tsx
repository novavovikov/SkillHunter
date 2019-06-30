import React, { FC } from 'react'
import { IconButton } from '../../UI'
import * as s from './SkillCreator.css'

const SkillCreator: FC = () => {
  return (
    <div className={s.SkillCreator}>
      <IconButton size="s">
        Add skill
      </IconButton>
    </div>
  )
}

export default SkillCreator
