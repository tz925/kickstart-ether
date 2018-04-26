import React, {Component} from 'react'
import Layout from '../../component/Layout'
import Campaign from '../../ethereum/campaign'
import {Header,Segment,Card} from 'semantic-ui-react'
import web3 from '../../ethereum/web3'

export default class CampaignDetail extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address)

    const summary = await campaign.methods.getSummary().call()


    return {
      minimumContribution: summary[0],
      balance : summary[1],
      requestsCount: summary[2],
      backersCount: summary[3],
      manager: summary[4],
      title: summary[5],
      detail: summary[6],
      total: summary[7]
    }
  }

  render(){
    const {
      balance,manager,minimumContribution,requestsCount,backersCount,title,detail
    } = this.props
    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The manager created this campaign and can request to spend fund.',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'You should at least contribute this much to become a contributor.',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description: 'A request tries to spend money of the contract. Request must be approved by contributors to be finalized.',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: backersCount,
        meta: 'Number of Contributors',
        description: 'Number of people who have contributed to this campaign.',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'How much money this campaign has left to spend.',
        style: { overflowWrap: 'break-word'}
      },
      // {
      //   header: web3.utils.fromWei(total, 'ether'),
      //   meta: 'Total raised money',
      //   description: 'Total amount of money this campaign has raised.',
      //   style: { overflowWrap: 'break-word'}
      // },
    ]

    return (
      <Layout>
        <h3>Campaign detail</h3>
        <Header as='h2' attached='top'>
          {title}
        </Header>
        <Segment attached style={{marginBottom: '10px'}}>
          {detail}
        </Segment>
        <Card.Group items={items}></Card.Group>
      </Layout>
    )
  }
}
