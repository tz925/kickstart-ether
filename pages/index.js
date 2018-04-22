import React, {Component} from 'react'
import factory from '../ethereum/factory'

export default class Index extends Component {
  async componentDidMount(){
    const campaigns = await factory.methods.getDeployedCampaigns().call()

    console.log(campaigns);
  }

  render(){
    return <div>campaign index</div>
  }
}
