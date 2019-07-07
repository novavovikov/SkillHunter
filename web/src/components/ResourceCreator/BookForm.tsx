import React, { ChangeEvent, FormEvent } from 'react'
import { Button } from '../../UI'
import * as s from './ResourceCreator.css'

interface SubmitData {
  author: string
  title: string
}

interface Props {
  onSubmit: (data: SubmitData) => void
}

interface State {
  author: string
  title: string
  disabled: boolean
}

class BookForm extends React.Component<Props, State> {
  state = {
    author: '',
    title: '',
    disabled: false,
  }

  onChangeAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      author: e.target.value,
    })
  }

  onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: e.target.value,
    })
  }

  submitForm = async (e: FormEvent) => {
    e.preventDefault()
    const { onSubmit } = this.props
    const { author, title } = this.state

    onSubmit({ author, title })

    this.setState({
      disabled: true,
    })
  }

  render () {
    const { author, title, disabled } = this.state
    const isDisabled = !author || !title || disabled

    return (
      <form onSubmit={this.submitForm}>
        <div className={s.ResourceCreator__field}>
          <div className={s.ResourceCreator__row}>
            <input
              type="text"
              className={s.ResourceCreator__input}
              onChange={this.onChangeTitle}
              value={title}
              placeholder="Add a book title"
              autoFocus
            />
          </div>

          <div className={s.ResourceCreator__row}>
            <input
              type="text"
              className={s.ResourceCreator__input}
              onChange={this.onChangeAuthor}
              value={author}
              placeholder="Add an author"
            />
          </div>

          <div className={s.ResourceCreator__desc}>
            Insert author
          </div>
        </div>

        <Button disabled={isDisabled}>
          Add
        </Button>
      </form>
    )
  }
}

export default BookForm
