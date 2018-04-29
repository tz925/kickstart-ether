import React, {Component} from 'react'
import {Form,Button,Input,Message} from 'semantic-ui-react'
import Layout from '../../component/Layout'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'
import { conciseError} from '../../utils'

export default class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    title: '',
    detail: '',
    error: '',
    loading: false,
  }

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({loading: true, error:''})
    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods.createCampaign(this.state.minimumContribution,this.state.title,this.state.detail)
        .send({
          from: accounts[0]
        })

      Router.pushRoute('/')
    } catch (e) {
      this.setState({ error:conciseError(e.message)})
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
            <label>Campaign Title</label>
            <Input
              value={this.state.title}
              onChange={event => this.setState({title:event.target.value})}
             />
          </Form.Field>
          <Form.Field>
            <label>Campaign Detail</label>
            <textarea
              value={this.state.detail}
              onChange={event => this.setState({detail:event.target.value})}
             />
          </Form.Field>
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
