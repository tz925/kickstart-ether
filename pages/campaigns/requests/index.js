import React, {Component} from 'react'
import {Header,Segment,Grid,Button,Table} from 'semantic-ui-react'
import Layout from '../../../component/Layout'
import Campaign from '../../../ethereum/campaign'
// import web3 from '../../../ethereum/web3'
import { Link } from '../../../routes'
// import { conciseError} from '../../utils'
import RequestRow from '../../../component/RequestRow'

export default class RequestIndex extends Component {
  static async getInitialProps(props) {
    const address = props.query.address
    const campaign = Campaign(props.query.address)
    const requestsCount = await campaign.methods.getRequestsCount().call()
    const total = await campaign.methods.total().call()

    const requests = await Promise.all(
      Array(parseInt(requestsCount)).fill().map((element, index) => {
        return campaign.methods.requests(index).call()
      })
    )
    return { address, requests, requestsCount, total }
  }

  render(){
    return (
      <Layout>
        <Header as='h2' attached='top'>
          Requests of {this.props.address}
          <Link route={`/campaigns/${this.props.address}/requests/new`}>
            <a>
              <Button primary positive floated="right">
                Add Request
              </Button>
            </a>
          </Link>
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Recipient</Table.HeaderCell>
              <Table.HeaderCell>Approval Percentage</Table.HeaderCell>
              <Table.HeaderCell>Approve</Table.HeaderCell>
              <Table.HeaderCell>Finalize</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
              {this.props.requests.map((request, index) => (
                <RequestRow
                  key={index}
                  id={index}
                  request={request}
                  address={this.props.address}
                  total={this.props.total}
                />
              ))}
          </Table.Body>
        </Table>
        <Segment>Found {this.props.requestsCount} requests.</Segment>

      </Layout>
    )
  }
}
