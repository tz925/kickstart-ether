import React, {Component} from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import web3 from '../../../ethereum/web3'
import Campaign from '../../../ethereum/campaign'
import { Router, Link } from '../../../routes'
import { conciseError} from '../../../utils'
import Layout from '../../../component/Layout'

export default class RequestNew extends Component {
  state = {
    description: '',
    value: '',
    recipient: '',
    error: '',
    loading: false
  }
  static async getInitialProps(props) {
    const address = props.query.address

    return { address: address }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({loading: true})
    const campaign = Campaign(this.props.address)
    const { description, value, recipient } = this.state

    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({from: accounts[0]})
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
    } catch (e) {
      this.setState({error:conciseError(e.message)})
    }
    this.setState({ loading:false, value: ''})
  }

  render(){
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>
            Back
          </a>
        </Link>
        <h3>New Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.error}>
          <Form.Field>
            <label>Description</label>
            <Input value={this.state.description} onChange={event => this.setState({ description: event.target.value })} />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input value={this.state.value} onChange={event => this.setState({ value: event.target.value })} />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input value={this.state.recipient} onChange={event => this.setState({ recipient: event.target.value })} />
          </Form.Field>
          <Button loading={this.state.loading} primary positive>Create Request</Button>
          <Message error header={'Oops!'} content={this.state.error} />
        </Form>
      </Layout>
    )
  }
}
