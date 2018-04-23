import React, {Component} from 'react'
import {Form,Button,Input,Message} from 'semantic-ui-react'
import Layout from '../../component/Layout'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'

export default class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    error: '',
    loading: false,
  }

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({loading: true, error:''})
    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods.createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        })
    } catch (e) {
      this.setState({ error: e.message})
      console.log(e);
    }
    this.setState({loading: false})
  }

  render() {
    return (
      <Layout>
        <h3>new campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.error}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition='right'
              value={this.state.minimumContribution}
              onChange={event => this.setState({minimumContribution:event.target.value})}
             />
          </Form.Field>
          <Message error header="Oops!" content={this.state.error}/>
          <Button positive primary loading={this.state.loading} >Create!</Button>
        </Form>
        {/* {(this.state.error !== '') && (<Message error header="Oops!" content={this.state.error}/>)} */}
      </Layout>

    )
  }
}
