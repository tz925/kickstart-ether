import React, {Component} from 'react'
import factory from '../ethereum/factory'
import {Card,Button} from 'semantic-ui-react'
import Layout from '../component/Layout'
import {Link} from '../routes'
// import web3 from '../ethereum/web3'
// import Campaign from '../ethereum/build/Campaign.json'

export default class Index extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()

    return {campaigns}
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      // const campaign = new web3.eth.Contract(
      //   JSON.parse(Campaign.interface),
      //   address
      // )
      // const title = await campaign.methods.getTitle().call()
      return {
        header: address,
        // meta: address,
        description: <Link route={`/campaigns/${address}`}><a>view campaign</a></Link>,
        fluid: true
      }
    })
    return <Card.Group items={items} />
  }

  render(){
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Link route='campaigns/new'>
            <a>
              <Button floated='right' content="Create Campaign" icon="add circle" positive primary />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    )
  }
}
