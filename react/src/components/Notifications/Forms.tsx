import { Contract } from '@ethersproject/contracts'
import { formatEther } from '@ethersproject/units'
import { TransactionStatus, useContractCall, useContractFunction, useEtherBalance, useEthers } from '@usedapp/core'
import { utils } from 'ethers'
import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { TextBold } from '../../typography/Text'
import { ContentBlock } from '../base/base'
import { BorderRad, Colors } from '../../global/styles'
import { SpinnerIcon } from './Icons'

import { ethers } from "ethers";

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Anchor, Avatar, Badge, Box, Button, Card, Divider, Heading, Input, List, Text } from '@dracula/dracula-ui'

import NOTARIZETH_ABI from '../../abi/NotarizETH.json'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Dropzone, { useDropzone } from 'react-dropzone';

// CONSTANTS
const NOTARIZETH_ADDRESS = "0x908d02931EA40670EFe810E295936A5CA62050Bc"
const NOTARIZETH_ABI_INTERFACE = new utils.Interface(NOTARIZETH_ABI)

const NETWORK_ALLOWED_ID = 3
const NETWORK_ALLOWED_NAME = 'Ropsten'


// BASIC
interface TitlePropsBasic {
  title: string
}

const TitleBasic = ({ title }: TitlePropsBasic) => {
  return (
    <TitleRow>
      <Heading size="md">{title}</Heading>
    </TitleRow>
  )
}


// VERIFY
interface InputComponentPropsVerify {
  library: any
}

const InputComponentVerify = ({ library }: InputComponentPropsVerify) => {
  const { account } = useEthers()
  const [value, setValue] = useState('')

  const onClick = () => {
    let valuehash = value

    if (valuehash.length == 66 && valuehash.substring(0, 2) == '0x') {
      // Ok
    } else if (valuehash.length == 64) {
      // Add 0x at the start
      valuehash = '0x' + valuehash
    } else {
      // Input error
      console.log("Input Error", valuehash)
      document.getElementById('idHolderVerify')!.textContent = 'Input Error! Must be in 32 Byte Format (64 length)'
      return
    }

    if (typeof library !== 'undefined') {
      const contractEther = new ethers.Contract(NOTARIZETH_ADDRESS, NOTARIZETH_ABI_INTERFACE, library)
      contractEther.verifyFile(valuehash).then(
        function (res: boolean[]) { 
          console.log("VerifyFile", res),
          document.getElementById('idHolderVerify')!.innerHTML = ((res[0] == false) ? 'File hash ' + valuehash + ' not exist on the blockchain' : 'File hash ' + valuehash + ' exist on the blockchain:' + '<br>' + 'Owner: <a href="https://ropsten.etherscan.io/address/' + res[1] + '" target="_blank"  class="drac-anchor drac-text drac-text-cyan-green drac-text-yellow-pink--hover drac-mb-sm">' + res[1] + '</a>' + '<br>' + 'Timestamp: TODO'),
          document.getElementById('idHolderVerify')!.className = ((res[0] == false) ? 'drac-text drac-line-height drac-text-red' : 'drac-text drac-line-height drac-text-green')
        },
      );
    } else {
      document.getElementById('idHolderVerify')!.innerHTML = 'Library is undefined'
      document.getElementById('idHolderVerify')!.className = 'drac-text drac-line-height drac-text-red'
    }

    setValue('')
  }

  return (
    <section className="container">
      <InputRow>
        <Input
          id={`Input`}
          size="medium"
          color="white"
          placeholder="0xBYTES"
          type="text"
          maxLength={66}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <span>&nbsp;</span>
        <Button onClick={onClick}>
          Verify
        </Button>
      </InputRow>
      <br></br>
      <Text id="idHolderVerify"></Text>
    </section>
  )
}

interface TransactionFormVerify {
  title: string
  library: any
}

const TransactionFormVerify = ({ title, library, }: TransactionFormVerify) => {
  return (
    <Card color="pinkPurple" p="sm">
      <TitleBasic title={title} />
      <LabelRow>
        <Text>Verify the timestamp and owner of a file by uploading it or entering its Keccak256 hash.</Text>
      </LabelRow>
      <InputComponentVerify library={library} />
    </Card>
  )
}


// CERTIFY
interface InputComponentPropsCertify {
  send: (value: string) => void
  transactionStatus: TransactionStatus['status']
}

const InputComponentCertify = ({ send, transactionStatus }: InputComponentPropsCertify) => {
  const { account, chainId } = useEthers()

  const [value, setValue] = useState('')
  const [copied, setCopied] = useState('Copy')

  const isMining = transactionStatus === 'Mining'
  const isSuccess = transactionStatus === 'Success'

  const buttonContent = isMining ? (
    <IconContainer>
      <SpinnerIcon />
    </IconContainer>
  ) : (
    'Certify'
  )

  const onClick = () => {
    setCopied('Copy') // Reset Copy Button Name
    setValue(hashCertify) // Set Input Hash
    send(hashCertify) // Send Web3 Transaction
  }

  return (
    <div>
      <InputRow>
        <Input
          id={`Input`}
          size="medium"
          color="white"
          placeholder="0xBYTES"
          type="text"
          maxLength={66}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          disabled={true}
        />
        <span>&nbsp;</span>
        <CopyToClipboard text={value}
          onCopy={() => setCopied('Copied')}>
          <Button disabled={(value == '') || !isSuccess}>{copied}</Button>
        </CopyToClipboard>
      </InputRow>
      <br></br>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Button disabled={!account || isMining || (chainId != NETWORK_ALLOWED_ID)} onClick={onClick}>
          {buttonContent}
        </Button>
      </div>
    </div>
  )
}

interface TransactionFormCertify {
  send: (value: string) => void
  title: string
  transaction: TransactionStatus
}

const TransactionFormCertify = ({ send, title, transaction }: TransactionFormCertify) => {
  const { account, chainId } = useEthers()

  return (
    <Card color="pinkPurple" p="sm">
      <TitleBasic title={title} />
      <LabelRow>
        <Text>Certify your file on the Ethereum blockchain and save the Keccak256 hash as proof.</Text>
      </LabelRow>
      <Text hidden={(account != null) && (chainId === NETWORK_ALLOWED_ID)} color='yellow'>You must be connected with MetaMask on Ropsten Network to perform this operation!</Text>
      <StyledDropzoneCertify />
      <br></br>
      <InputComponentCertify transactionStatus={transaction.status} send={send} />
      <ErrorMessageCertify transaction={transaction} />
    </Card>
  )
}

interface ErrorRowPropsCertify {
  transaction: TransactionStatus
}

const ErrorMessageCertify = ({ transaction }: ErrorRowPropsCertify) => {
  const { library } = useEthers()

  const error_1 = 'hex data is odd-length'
  const error_2 = 'cannot estimate gas; transaction may fail or may require manual gas limit'

  // Success
  if (transaction.status == 'Success') {
    return <ErrorRow><Text color='green'>{'Successfull! Your file hash is stored on the blockchain!'}</Text></ErrorRow>
  }

  const error_temp = ('errorMessage' in transaction && transaction.errorMessage)

  // Exception
  if (error_temp == error_1) {
    return <ErrorRow><Text color='yellow'>{'Upload your file before! Full details: '} {'errorMessage' in transaction && transaction.errorMessage}</Text></ErrorRow>
  } else if (error_temp == error_2) {
    const contractEther = new ethers.Contract(NOTARIZETH_ADDRESS, NOTARIZETH_ABI_INTERFACE, library)
      contractEther.verifyFile(hashCertify).then(
        function (res: boolean[]) { 
          console.log("CertifyErrorVerifyFile", res),
          // General error or already exist on the blockchain
          document.getElementById('idHolderCertify')!.innerHTML = ((res[0] == false) ? 'General Error!' : 'File hash already exists on the Ethereum blockchain!' + '<br>' + 'Owner: <a href="https://ropsten.etherscan.io/address/' + res[1] + '" target="_blank"  class="drac-anchor drac-text drac-text-cyan-green drac-text-yellow-pink--hover drac-mb-sm">' + res[1] + '</a>' + '<br>' + 'Timestamp: TODO'),
          document.getElementById('idHolderCertify')!.className = 'drac-text drac-line-height drac-text-red'
        },
      );
    
    return <ErrorRow><Text color='red' id='idHolderCertify'></Text></ErrorRow>
  }
  
  // Other error
  return <ErrorRow><Text color='red'>{'errorMessage' in transaction && transaction.errorMessage}</Text></ErrorRow>
}


// RESET
interface InputComponentPropsReset {
  send: (value: string) => void
  transactionStatus: TransactionStatus['status']
}

const InputComponentReset = ({ send, transactionStatus }: InputComponentPropsReset) => {
  const { account, chainId } = useEthers()

  const [value, setValue] = useState('')

  const isMining = transactionStatus === 'Mining'

  const buttonContent = isMining ? (
    <IconContainer>
      <SpinnerIcon />
    </IconContainer>
  ) : (
    'Reset'
  )
  const onClick = () => {
    setValue(hashVerify) // Set Input Hash
    send(hashVerify) // Send Web3 Transaction
  }

  return (
    <div>
      <InputRow>
        <Input  
          id={`Input`}
          size="medium"
          color="white"
          placeholder="0xBYTES"
          type="text"
          maxLength={66}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          disabled={true}
        />
      </InputRow>
      <br></br>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Button disabled={!account || isMining || chainId != NETWORK_ALLOWED_ID} onClick={onClick}>
          {buttonContent}
        </Button>
      </div>
    </div>
  )
}

interface TransactionFormReset {
  send: (value: string) => void
  title: string
  transaction: TransactionStatus
}

const TransactionFormReset = ({ send, title, transaction }: TransactionFormReset) => {
  const { account, chainId } = useEthers()

  return (
    <Card color="pinkPurple" p="sm">
      <TitleBasic title={title} />
      <LabelRow>
        <Text>If you are the owner of a file, you can remove it from the Ethereum blockchain if you want.</Text>
      </LabelRow>
      <Text hidden={(account != null) && (chainId === NETWORK_ALLOWED_ID)} color='yellow'>You must be connected with MetaMask on Ropsten Network to perform this operation!</Text>
      <StyledDropzoneVerify />
      <br></br>
      <InputComponentReset transactionStatus={transaction.status} send={send} />
      <ErrorMessageReset transaction={transaction} />
    </Card>
  )
}

interface ErrorRowPropsReset {
  transaction: TransactionStatus
}

const ErrorMessageReset = ({ transaction }: ErrorRowPropsReset) => {
  const error_1 = 'hex data is odd-length'
  const error_2 = 'cannot estimate gas; transaction may fail or may require manual gas limit'

  // Success
  if (transaction.status == 'Success') {
    return <ErrorRow><Text color='green'>{'Successfull! Your file hash is removed from the blockchain!'}</Text></ErrorRow>
  }

  const error_temp = ('errorMessage' in transaction && transaction.errorMessage)

  // Exception
  if (error_temp == error_1) {
    return <ErrorRow><Text color='yellow'>{'Upload your file before! Full details: '} {'errorMessage' in transaction && transaction.errorMessage}</Text></ErrorRow>
  } else if (error_temp == error_2) {
    // TODO You are not the owner, the owner is...

    // TODO Not exist on the blockchain
    // TODO Verify e stampare le variabili
    return <ErrorRow><Text color='red'>{'It is possible that the file hash not exists on the blockchain! Full details: '} {'errorMessage' in transaction && transaction.errorMessage}</Text></ErrorRow>
  }
  
  // Other Error
  return <ErrorRow><Text color='red'>{'errorMessage' in transaction && transaction.errorMessage}</Text></ErrorRow>
}


// CRYPTOJS
const CryptoJS = require("crypto-js");
var hashCertify = '0x0'
var hashVerify = '0x0'


// HELPER
function arrayBufferToWordArray(arrayBuffer: ArrayBuffer | string | null) {
  if (arrayBuffer instanceof ArrayBuffer) {
    const i8a = new Uint8Array(arrayBuffer);
    const a = [];
    for (let i = 0; i < i8a.length; i += 4) {
      a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
    }
    return CryptoJS.lib.WordArray.create(a, i8a.length);
  } else {
    return
  }
}


// HELPER
function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


// DROPZONE CSS
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 3,
  borderRadius: 10,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: 'trasparent',
  color: '#eeeeee',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


// DROPZONE CERTIFY
function StyledDropzoneCertify(props: any) {

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents

        const arrayBuffer = reader.result
        console.log("ArrayBufferToWordArray", arrayBufferToWordArray(arrayBuffer))

        hashCertify = '0x' + CryptoJS.SHA3(arrayBufferToWordArray(arrayBuffer), { outputLength: 256 }).toString(CryptoJS.enc.Hex)
        console.log("Hash", hashCertify)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    // accept: 'image/*',
    maxFiles: 1,
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      "{file.path}" - {formatBytes(file.size)}
    </li>
  ));

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div className="container">
      <br></br>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop one file here, or click to select file</p>
      </div>
      <br></br>
      <div>
        <Text>File accepted:</Text>
        <List>
          <li className="drac-text drac-text-white">{files}</li>
        </List>
      </div>
    </div>
  );
}


// DROPZONE VERIFY
function StyledDropzoneVerify(props: any) {

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents

        const arrayBuffer = reader.result
        console.log("ArrayBufferToWordArray", arrayBufferToWordArray(arrayBuffer))

        hashVerify = '0x' + CryptoJS.SHA3(arrayBufferToWordArray(arrayBuffer), { outputLength: 256 }).toString(CryptoJS.enc.Hex)
        console.log("Hash", hashVerify)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    // accept: 'image/*',
    maxFiles: 1,
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      "{file.path}" - {formatBytes(file.size)}
    </li>
  ));

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div className="container">
      <br></br>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop one file here, or click to select file</p>
      </div>
      <br></br>
      <div>
        <Text>File accepted:</Text>
        <List>
          <li className="drac-text drac-text-white">{files}</li>
        </List>
      </div>
    </div>
  );
}


// FUNCTIONS
export const VerifyFile = () => {
  const { library } = useEthers()

  return (
    <TransactionFormVerify
      title="VerifyFile"
      library={library}
    />
  )
}

export const CertifyFile = () => {
  const { library } = useEthers()

  const contract = new Contract(NOTARIZETH_ADDRESS, NOTARIZETH_ABI_INTERFACE, library?.getSigner())
  const { state, send } = useContractFunction(contract, 'certifyFile', { transactionName: 'certifyFile' })

  return (
    <TransactionFormCertify
      send={(value: string) => send(value)}
      title="CertifyFile"
      transaction={state}
    />
  )
}

export const ResetFile = () => {
  const { library } = useEthers()

  const contract = new Contract(NOTARIZETH_ADDRESS, NOTARIZETH_ABI_INTERFACE, library?.getSigner())
  const { state, send } = useContractFunction(contract, 'resetFile', { transactionName: 'resetFile' })

  return (
    <TransactionFormReset
      send={(value: string) => send(value)}
      title="ResetFile"
      transaction={state}
    />
  )
}


// CSS
const SmallButton = styled(Button)`
  display: flex;
  justify-content: center;
  min-width: 95px;
  height: unset;
  padding: 8px 24px;

  &:disabled {
    color: ${Colors.Gray['600']};
    cursor: unset;
  }

  &:disabled:hover,
  &:disabled:focus {
    background-color: unset;
    color: unset;
  }
`

const CellTitle = styled(TextBold)`
  font-size: 18px;
`

const InputRow = styled.div`
  display: flex;
  margin: 0 auso;
  align-items: center;
  border-radius: ${BorderRad.s};
  overflow: hidden;
`

const FormTicker = styled.div`
  padding: 0 16px;
`

const LabelRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0 24px 0;
`

const Label = styled.label`
  font-weight: 700;
`

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: ${Colors.Gray['300']} 1px solid;
  padding: 16px;
`

const BalanceWrapper = styled.div`
  color: ${Colors.Gray['600']};
  font-size: 14px;
`

const SmallContentBlock = styled(ContentBlock)`
  padding: 0;
`

const IconContainer = styled.div`
  height: 24px;
  width: 24px;
`

const ErrorRow = styled.div`
  height: 20px;
  font-size: 14px;
  margin: 8px auto 32px auto;
`
