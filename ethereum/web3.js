import Web3 from 'web3'

let web3

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // we are in the browser
  web3 = new Web3(window.web3.currentProvider)
} else {
  // we are on the server OR the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/tQ7F4kzmD7DJNkv9tjf9'
  )
  web3 = new Web3(provider)
}

// TODO: improvement for non-metamask users
export default web3
