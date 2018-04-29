import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xaB644664A99F03212D4771da76DB88b89B58Ed6C'
)

export default instance
