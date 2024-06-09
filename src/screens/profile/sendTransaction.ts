import {
  fetchPublicKey,
  createKeyPair,
  sign,
  verify,
} from '../../../modules/expo-enclave'

import { RpcProvider, Contract, Account } from 'starknet' // Import hash from starknet.js
import { ABI } from '@utils/SignerConstants'
import { EnclaveSigner } from '@utils/p256Signer'

const RPC_ENDPOINT = 'https://4fc9-189-120-76-5.ngrok-free.app'
// 1. Connect to StarkNet
const provider = new RpcProvider({
  nodeUrl: RPC_ENDPOINT,
})
let pvt_key: any = '0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a'

let account_address = '0x000916036bf40e8715e83d41b50ce4221e0274d17e79b98e34da18c10ab0d277'
let contract_address =
  '0x0400a92d5d009bca893d4699a3c06a389201a83ba56970b74ad8dfabfcb0d2e0'
export async function createAndSignTransaction(): Promise<void> {
  try {
    console.log('step 1')
    const enclaveSigner = new EnclaveSigner(pvt_key)
    console.log('step 2')

    // 1. Create Account with EnclaveSigner
    const account = new Account(provider, account_address, enclaveSigner)
    console.log('step 3')

    // Connect the new contract instance :
    const myTestContract = new Contract(ABI, contract_address, account)
    console.log('myTestContract', myTestContract)

    // 4. Interaction with the contract read
    const count = await myTestContract.get()
    console.log('Initial count =', count)

    // 5. Execute contract call
    const res = await myTestContract.set(10000000)

    console.log(res.transaction_hash)

    await provider.waitForTransaction(res.transaction_hash)

    const count2 = await myTestContract.get()
    console.log('Final count =', count2)
  } catch (error) {
    console.error('Transaction error:', error)
  }
}
