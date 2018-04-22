const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/CampaignFactory.json')
// mnemonic gives the account we will use
const MNEMONIC = 'canvas gorilla aunt harbor phone disease junk portion birth beach virtual soda'
const INFURA_LINK = 'https://rinkeby.infura.io/tQ7F4kzmD7DJNkv9tjf9'

const provider = new HDWalletProvider(
  MNEMONIC,
  INFURA_LINK
)
const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log(accounts);
  console.log('attempting to deploy from account ', accounts[0]);
  const contract = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' })
  console.log('contract deployed to ', contract.options.address);
}
deploy()
