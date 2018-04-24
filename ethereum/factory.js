import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x226BFe3DF8414fc46a3Ba53e4a6f6eF0f256a546'
)

export default instance
