import * as React from 'react'
import { Item, Menu } from '../../UI'

interface Props {
  link: string
}

class ShareMenu extends React.Component<Props> {
  render () {
    return (
      <Menu icon="share">
        <Item>
          Copy link
        </Item>
        <Item>
          Facebook
        </Item>
        <Item>
          Twitter
        </Item>
        <Item>
          LinkedIn
        </Item>
        <Item>
          Reddit
        </Item>
        <Item>
          VKontakte
        </Item>
      </Menu>
    )
  }
}

export default ShareMenu
