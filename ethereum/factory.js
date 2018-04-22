import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xa652eBFf219E8AAf45A41dA5C73F23Eb5C5E7fe3'
)

export default instance
