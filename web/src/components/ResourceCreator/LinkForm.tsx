import React, { ChangeEvent, FormEvent } from 'react'
import { IconButton, Button } from '../../UI'
import { getUrl, getUrlFromClipboard } from '../../utils/url'
import * as s from './ResourceCreator.css'

interface Props {
  onSubmit: (link: string) => void
}

interface State {
  inputValue: string
  disabled: boolean
}

class LinkForm extends React.Component<Props, State> {
  state = {
    inputValue: '',
    disabled: false
  }

  async componentDidMount () {
    const url: URL | null = await getUrlFromClipboard()

    if (url) {
      this.setState({
        inputValue: url.href,
      })
    }
  }

  onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  submitForm = async (e: FormEvent) => {
    e.preventDefault()
    const { onSubmit } = this.props
    const { inputValue } = this.state

    onSubmit(inputValue)
    this.setState({
      disabled: true
    })
  }

  render () {
    const { inputValue, disabled } = this.state
    const url = getUrl(inputValue)

    return (
      <form onSubmit={this.submitForm}>
        <div className={s.ResourceCreator__field}>
          <input
            type="text"
            className={s.ResourceCreator__input}
            onChange={this.onChangeInput}
            value={inputValue}
            autoFocus
          />

          <div className={s.ResourceCreator__desc}>
            {url
              ? 'Press "Enter"'
              : 'Insert link and press "Enter"'
            }
          </div>
        </div>

        <Button disabled={!url || disabled}>
          Add
        </Button>
      </form>
    )
  }
}

export default LinkForm
