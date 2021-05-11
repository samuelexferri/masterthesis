import { utils } from 'ethers'

import NOTARIZETH_ABI from './abi/NotarizETH.json'

// NETWORK ALLOWED
export const NETWORK_ALLOWED_ID = 3
export const NETWORK_ALLOWED_NAME = 'Ropsten'

// INFURA ID
export const INFURA_ID = '773217385b694a6ea60c4cea1a430a09'

// EXTERNAL CONTRACTS
export const NOTARIZETH_ADDRESS = '0x908d02931EA40670EFe810E295936A5CA62050Bc'
export const NOTARIZETH_ABI_INTERFACE = new utils.Interface(NOTARIZETH_ABI)
