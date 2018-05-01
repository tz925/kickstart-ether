import React, {Component} from 'react'
import {Table,Button} from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'

export default class RequestRow extends Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address)

    const accounts = await web3.eth.getAccounts()
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    })
  }

  onFinalize = async () => {
    const campaign = Campaign(this.props.address)

    const accounts = await web3.eth.getAccounts()
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    })
  }

  render(){
    const {request} = this.props
    const readyToFinalize = (request.approvalCount / this.props.total) > 0.5
    return (
      <Table.Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <Table.Cell>{this.props.id}</Table.Cell>
        <Table.Cell>{request.description}</Table.Cell>
        <Table.Cell>{request.value}</Table.Cell>
        <Table.Cell>{request.recipient}</Table.Cell>
        <Table.Cell>{request.approvalCount / this.props.total * 100} %</Table.Cell>
        <Table.Cell>
          {request.complete ? null : (
            <Button
              color="green"
              basic
              onClick={this.onApprove}>Approve</Button>
          )}
        </Table.Cell>
        <Table.Cell>
          {request.complete ? null : (
            <Button
              color="red"
              basic
              onClick={this.onFinalize}
              >Finalize</Button>
          )}
        </Table.Cell>
      </Table.Row>
    )
  }
}
