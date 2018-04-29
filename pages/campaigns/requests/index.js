import React, {Component} from 'react'
import {Header,Segment,Card,Grid,Button} from 'semantic-ui-react'
import Layout from '../../../component/Layout'
// import factory from '../../ethereum/factory'
// import web3 from '../../ethereum/web3'
import { Link } from '../../../routes'
// import { conciseError} from '../../utils'

export default class RequestIndex extends Component {
  static async getInitialProps(props) {
    const address = props.query.address
    // const campaign = Campaign(props.query.address)
    //
    // const summary = await campaign.methods.getSummary().call()


    return { address: address }
  }

  render(){
    return (
      <Layout>
        <Header as='h2' attached='top'>
          Requests
        </Header>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            New Request
          </a>
        </Link>
      </Layout>
    )
  }
}
