import { utils } from 'ethers'

import NOTARIZETH_ABI from './abi/NotarizETH.json'

// NETWORK ALLOWED
export const NETWORK_ALLOWED_ID = 3
export const NETWORK_ALLOWED_NAME = 'Ropsten'

// INFURA ID
export const INFURA_ID = '773217385b694a6ea60c4cea1a430a09'

// EXTERNAL CONTRACTS
export const NOTARIZETH_ADDRESS = '0x39B1704688cBBE66A9bdd88A06eaf3A496d132F6'
export const NOTARIZETH_ABI_INTERFACE = new utils.Interface(NOTARIZETH_ABI)
