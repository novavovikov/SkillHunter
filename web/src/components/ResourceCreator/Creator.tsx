import * as React from 'react'
import { ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { addResourceSaga } from '../../redux/actions/resources'
import { ResourceSagaPayload } from '../../redux/interfaces/resources'
import { ResourceType } from '../../types'
import { Button } from '../../UI'
import { ajax } from '../../utils/ajax'
import { getUrl, getUrlFromClipboard } from '../../utils/url'
import * as s from './ResourceCreator.css'

interface Props {
  professionId: number
  skillId: number
  addResource: (data: ResourceSagaPayload) => void
  onClose: () => void
}

interface State {
  inputValue: string
}

class Creator extends React.Component<Props, State> {
  state = {
    inputValue: '',
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

  submitForm = async (e: any) => {
    e.preventDefault()
    const { skillId, professionId, addResource, onClose } = this.props
    const { inputValue } = this.state
    const url = getUrl(inputValue)

    if (url) {
      const resource = await ajax.post('resource', {
        link: url.href,
      }).then(({ data }) => data as ResourceType)

      addResource({
        professionId,
        skillId,
        resourceId: resource.id,
      })

      onClose()
    }
  }

  render () {
    const { inputValue } = this.state
    const url = getUrl(inputValue)

    return (
      <form
        className={s.ResourceCreator__form}
        onSubmit={this.submitForm}
      >
        <div>
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

        <Button
          theme="plus"
          disabled={!url}
        >
          Add source
        </Button>
      </form>
    )
  }
}

export default connect(
  null,
  {
    addResource: addResourceSaga,
  },
)(Creator)
