import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xb4f45892E762AE66758FD43c66b4DB57174f9546'
)

export default instance
