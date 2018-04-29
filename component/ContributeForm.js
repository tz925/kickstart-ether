import React, {Component} from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'
import { Router } from '../routes'
import { conciseError} from '../utils'

class ContributeForm extends Component {
  state = {
    value: '',
    error: '',
    loading: false,
  }

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({loading: true})
    const campaign = Campaign(this.props.address)
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value, 'ether')
        })
      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (e) {
      this.setState({error:conciseError(e.message)})
    }
    this.setState({ loading:false, value: ''})
  }

  render(){
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.error}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
           />
        </Form.Field>
        <Button loading={this.state.loading} primary positive>Contribute!</Button>
        <Message error header={'Oops!'} content={this.state.error} />
      </Form>
    )
  }
}

export default ContributeForm
