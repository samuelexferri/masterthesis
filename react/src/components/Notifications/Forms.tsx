import { Contract } from '@ethersproject/contracts'
import { formatEther } from '@ethersproject/units'
import { TransactionStatus, useContractCall, useContractFunction, useEtherBalance, useEthers } from '@usedapp/core'
import { utils } from 'ethers'
import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { TextBold } from '../../typography/Text'
import { ContentBlock } from '../base/base'
//import { Button } from '../base/Button'
import WethAbi from '../../abi/Weth10.json'
import { BorderRad, Colors } from '../../global/styles'
import { BigNumber, Bytes } from 'ethers'
import { SpinnerIcon } from './Icons'

import { ethers } from "ethers";

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Anchor, Avatar, Badge, Box, Button, Card, Divider, Heading, Input, List, Text } from '@dracula/dracula-ui'

import NOTARIZETH_ABI from '../../abi/NotarizETH.json'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Dropzone
import Dropzone, { useDropzone } from 'react-dropzone';




const NOTARIZETH_ADDRESS = "0x908d02931EA40670EFe810E295936A5CA62050Bc"
const NOTARIZETH_ABI_INTERFACE = new utils.Interface(NOTARIZETH_ABI)

const NETWORK_ALLOWED_ID = 3
const NETWORK_ALLOWED_NAME = 'Ropsten'

// TODO
const wethInterface = new utils.Interface(WethAbi)

/*
// WETH
interface TitleProps {
  balance: BigNumber | undefined
  title: string
  ticker: string
}

const Title = ({ balance, title, ticker }: TitleProps) => {
  const formatter = new Intl.NumberFormat('en-us', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  })
  const formattedBalance = formatter.format(parseFloat(formatEther(balance ?? BigNumber.from('0'))))

  return (
    <TitleRow>
      <CellTitle>{title}</CellTitle>
      <BalanceWrapper>
        Your {ticker} balance: {formattedBalance}
      </BalanceWrapper>
    </TitleRow>
  )
}

interface InputComponentProps {
  send: (value: BigNumber) => void
  ticker: string
  transactionStatus: TransactionStatus['status']
}

const InputComponent = ({ ticker, transactionStatus, send }: InputComponentProps) => {
  const { account } = useEthers()
  const [value, setValue] = useState('0')
  const isMining = transactionStatus === 'Mining'
  const buttonContent = isMining ? (
    <IconContainer>
      <SpinnerIcon />
    </IconContainer>
  ) : (
    'Send'
  )
  const onClick = () => {
    send(utils.parseEther(value))
    setValue('0')
  }

  return (
    <InputRow>
      <Input
        id={`${ticker}Input`}
        type="number"
        step="0.01"
        min="0"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <FormTicker>{ticker}</FormTicker>
      <Button disabled={!account || isMining} onClick={onClick}>
        {buttonContent}
      </Button>
    </InputRow>
  )
}

interface ErrorRowProps {
  transaction: TransactionStatus
}

const ErrorMessage = ({ transaction }: ErrorRowProps) => {
  return <ErrorRow>{'errorMessage' in transaction && transaction.errorMessage}</ErrorRow>
}

interface TransactionFormProps {
  balance: BigNumber | undefined
  send: (value: BigNumber) => void
  title: string
  ticker: string
  transaction: TransactionStatus
}

const TransactionForm = ({ balance, send, title, ticker, transaction }: TransactionFormProps) => {
  return (
    <SmallContentBlock>
      <Title title={title} balance={balance} ticker={ticker} />
      <LabelRow>
        <Label htmlFor={`${ticker}Input`}>How much?</Label>
      </LabelRow>
      <InputComponent ticker={ticker} transactionStatus={transaction.status} send={send} />
      <ErrorMessage transaction={transaction} />
    </SmallContentBlock>
  )
}

export const DepositEth = () => {
  const { account, library } = useEthers()
  const etherBalance = useEtherBalance(account)
  const contract = new Contract('0xA243FEB70BaCF6cD77431269e68135cf470051b4', wethInterface, library?.getSigner())
  const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })

  return (
    <TransactionForm
      balance={etherBalance}
      send={(value: BigNumber) => send({ value })}
      title="Wrap Ether"
      ticker="ETH"
      transaction={state}
    />
  )
}

export const WithdrawEth = () => {
  const { account, library } = useEthers()
  const wethContractAddress = '0xA243FEB70BaCF6cD77431269e68135cf470051b4'
  const wethBalance = useContractCall(
    account && {
      abi: wethInterface,
      address: wethContractAddress,
      method: 'balanceOf',
      args: [account],
    }
  )
  const contract = new Contract(wethContractAddress, wethInterface, library?.getSigner())
  const { state, send } = useContractFunction(contract, 'withdraw', { transactionName: 'Unwrap' })

  return (
    <TransactionForm
      balance={wethBalance?.[0]}
      send={(value: BigNumber) => send(value)}
      title="Unwrap Ether"
      ticker="WETH"
      transaction={state}
    />
  )
}
*/

// BASIC
interface TitlePropsBasic {
  title: string
  ticker: string
}

const TitleBasic = ({ title, ticker }: TitlePropsBasic) => {
  return (
    <TitleRow>
      <Heading size="md">{title}</Heading>
    </TitleRow>
  )
}

// RESET
interface InputComponentPropsReset {
  send: (value: string) => void
  ticker: string
  transactionStatus: TransactionStatus['status']
}

const InputComponentReset = ({ ticker, transactionStatus, send }: InputComponentPropsReset) => {
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

    // TODO Controls

    send(value)
    setValue('')
  }

  return (
    <InputRow>
      <Input
        id={`${ticker}Input`}
        size="medium"
        color="white"
        placeholder="0xBYTES"
        type="text"
        maxLength={66}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <FormTicker>{ticker}</FormTicker>
      <Button disabled={!account || isMining || chainId != NETWORK_ALLOWED_ID} onClick={onClick}>
        {buttonContent}
      </Button>
    </InputRow>
  )
}

interface TransactionFormReset {
  send: (value: string) => void
  title: string
  ticker: string
  transaction: TransactionStatus
}

const TransactionFormReset = ({ send, title, ticker, transaction }: TransactionFormReset) => {
  return (

    <Card color="pinkPurple" p="sm">
      <TitleBasic title={title} ticker={ticker} />
      <LabelRow>
        <Text>TODO FILE</Text>
      </LabelRow>
      <InputComponentReset ticker={ticker} transactionStatus={transaction.status} send={send} />
      <ErrorMessageReset transaction={transaction} />
    </Card>

  )
}

interface ErrorRowPropsReset {
  transaction: TransactionStatus
}

const ErrorMessageReset = ({ transaction }: ErrorRowPropsReset) => {
  // TODO Error (chainID, Verifiche, RPC MetaMask)
  const error_1 = 'cannot estimate gas; transaction may fail or may require manual gas limit'

  if (error_1 == ('errorMessage' in transaction && transaction.errorMessage)) {
    return <ErrorRow>{'It is possible that the file hash not exists on the blockchain! Full details: '} {'errorMessage' in transaction && transaction.errorMessage}</ErrorRow>
  } else {
    return <ErrorRow>{'errorMessage' in transaction && transaction.errorMessage}</ErrorRow>
  }
}

// CERTIFY

interface InputComponentPropsCertify {
  send: (value: string) => void
  ticker: string
  transactionStatus: TransactionStatus['status']
}

const InputComponentCertify = ({ ticker, transactionStatus, send }: InputComponentPropsCertify) => {
  const { account, chainId } = useEthers()
  const [copied, setCopied] = useState('Copy')
  const [value, setValue] = useState('')
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
    setCopied('Copy')
    // TODO Controls
    send(hashCertify)
    //send(value)
    setValue(hashCertify)
  }

  return (
    <div>
      <InputRow>
        <Input
          id={`${ticker}Input`}
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
      <FormTicker>{ticker}</FormTicker>
      <br></br>
      <center><Button disabled={!account || isMining || (chainId != NETWORK_ALLOWED_ID) || (hashCertify == '0x0')} onClick={onClick}>
        {buttonContent}
      </Button></center>
    </div>
  )
}

interface TransactionFormCertify {
  send: (value: string) => void
  title: string
  ticker: string
  transaction: TransactionStatus
}

const TransactionFormCertify = ({ send, title, ticker, transaction }: TransactionFormCertify) => {
  const { account, chainId } = useEthers()

  return (
    <Card color="pinkPurple" p="sm">
      <TitleBasic title={title} ticker={ticker} />
      <LabelRow>
        <Text>TODO FILE</Text>
      </LabelRow>
 
        <Text hidden={account && (chainId == NETWORK_ALLOWED_ID)} color='yellow'>You must be connected with MetaMask on Ropsten Network to perform this operation</Text>
      <StyledDropzone />
      <br></br>
      <InputComponentCertify ticker={ticker} transactionStatus={transaction.status} send={send} />
      <ErrorMessageCertify transaction={transaction} />
    </Card>
  )
}

interface ErrorRowPropsCertify {
  transaction: TransactionStatus
}

const ErrorMessageCertify = ({ transaction }: ErrorRowPropsCertify) => {
  // TODO Error (chainID, Verifiche, RPC MetaMask)
  // Fare un verify se esiste già e dire di chi è
  const error_1 = 'cannot estimate gas; transaction may fail or may require manual gas limit'
  console.log("TTT", transaction)

  if (transaction.status == 'Success') {
    return <ErrorRow><Text color='green'>{'Successfull! Your file hash is stored in the blockchain, try to verify it!'}</Text></ErrorRow>
  }

  if (error_1 == ('errorMessage' in transaction && transaction.errorMessage)) {
    return <ErrorRow><Text color='red'>{'It is possible that the file hash already exists on the blockchain! Full details: '} {'errorMessage' in transaction && transaction.errorMessage}</Text></ErrorRow>
  } else if (('errorMessage' in transaction && transaction.errorMessage) != null) {
    return <ErrorRow><Text color='red'>{'errorMessage' in transaction && transaction.errorMessage}</Text></ErrorRow>
  }
}

// CryptoJS
var CryptoJS = require("crypto-js");

var hashCertify = '0x0'

// CryptoJS Helper
function arrayBufferToWordArray(arrayBuffer: ArrayBuffer | string | null) {
  if (arrayBuffer instanceof ArrayBuffer) {
    var i8a = new Uint8Array(arrayBuffer);
    var a = [];
    for (var i = 0; i < i8a.length; i += 4) {
      a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
    }
    return CryptoJS.lib.WordArray.create(a, i8a.length);
  } else {
    return
  }
}

// React Dropzone Helper
/*
const maxLength = 20;

function nameLengthValidator(file :) {
  if (file.name.length > maxLength) {
    return {
      code: "name-too-large",
      message: `Name is larger than ${maxLength} characters`
    };
  }

  return null
}
*/










function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


// Dropzone
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

function StyledDropzone(props: any) {

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents



        var arrayBuffer = reader.result

        console.log("ArrayBuffer Plain", arrayBufferToWordArray(arrayBuffer))
        console.log("ArrayBuffer Hash", CryptoJS.SHA3(arrayBufferToWordArray(arrayBuffer), { outputLength: 256 }).toString(CryptoJS.enc.Hex))
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














// VERIFY
interface InputComponentPropsVerify {
  ticker: string
  library: any
}

const InputComponentVerify = ({ ticker, library }: InputComponentPropsVerify) => {
  const { account } = useEthers()
  const [value, setValue] = useState('')
  //0x1000000000000000000000000000000000000000000000000000000000000000

  const returnedValue = 'X'


  const onClick = () => {
    setValue('')

    // TODO Manual, Length...
    if (typeof library !== 'undefined' && value.length == 66) {
      var contractEther = new ethers.Contract(NOTARIZETH_ADDRESS, NOTARIZETH_ABI_INTERFACE, library)
      contractEther.verifyFile(value).then(
        function (value: (string | null)[]) { console.log("MANUAL ETHERS", value), alert(value[0]!.toString()), document.getElementById('idHolder')!.textContent = value[0], console.log(document.getElementById('idHolder')!.textContent) },
      );


      console.log("CE", contractEther)
      // TODO Estrarre il valore e stamparlo in qualche modo (Alert)
      // Inoltre ritornare true, mittente, timestamp, se è stato gia fatto...
    } else {
      // TODO Messaggio errore libreria no disponibile o lunghezza
    }
  }

  return (
    <section className="container">
      <InputRow>
        <Input
          id={`${ticker}Input`}
          size="medium"
          color="white"
          placeholder="0xBYTES"
          type="text"
          maxLength={66}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <FormTicker>{ticker}</FormTicker>
        <Button onClick={onClick}>
          Verify
      </Button>
      </InputRow>
      <span id="idHolder">X</span>
    </section>
  )
}

interface TransactionFormVerify {
  title: string
  ticker: string
  library: any
}

const TransactionFormVerify = ({ title, ticker, library, }: TransactionFormVerify) => {
  return (
    <Card color="pinkPurple" p="sm">
      <TitleBasic title={title} ticker={ticker} />
      <LabelRow>
        <Text>TODO FILE</Text>
      </LabelRow>
      <InputComponentVerify ticker={ticker} library={library} />
    </Card>
  )
}

// TODO ErrorsVerifiy
// Non essendoci una transazione, non ci sono errori ma sono da controllare in modo diverso


/*
function useVerifyFile(hash: string): Array | undefined {
  const result = useContractCall({
    abi: NOTARIZETH_ABI_INTERFACE,
    address: NOTARIZETH_ADDRESS,
    method: 'verifyFile',
    args: [hash],
  })
  return result
}

function refreshPage() {
  window.location.reload();
}
*/


// FUNCTIONS

// VERIFY
export const VerifyFile = () => {
  const { account, library } = useEthers()

  console.log("RELOAD")

  /*
    if (hash.length == '0x0000000000000000000000000000000000000000000000000000000000000000'.length) {
      var result_call = useContractCall( {
        abi: NOTARIZETH_ABI_INTERFACE,
        address: NOTARIZETH_ADDRESS,
        method: 'verifyFile',
        args: [hash],
      } )
    }
  
    if(typeof result_call !== "undefined" && hash !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
      result = result_call[1].toString()
    }
  */

  return (
    <TransactionFormVerify
      title="VerifyFile"
      ticker=""
      library={library}
    />
  )
}

// CERTIFY
export const CertifyFile = () => {
  const { account, library } = useEthers()

  const contract = new Contract(NOTARIZETH_ADDRESS, NOTARIZETH_ABI_INTERFACE, library?.getSigner())
  const { state, send } = useContractFunction(contract, 'certifyFile', { transactionName: 'certifyFile' })

  return (
    <TransactionFormCertify
      send={(value: string) => send(value)}
      title="CertifyFile"
      ticker=""
      transaction={state}
    />
  )
}

// RESET
export const ResetFile = () => {
  const { account, library, chainId } = useEthers()

  const contract = new Contract(NOTARIZETH_ADDRESS, NOTARIZETH_ABI_INTERFACE, library?.getSigner())
  const { state, send } = useContractFunction(contract, 'resetFile', { transactionName: 'resetFile' })

  return (
    <TransactionFormReset
      send={(value: string) => send(value)}
      title="ResetFile"
      ticker=""
      transaction={state}
    />
  )
}


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
/*
const Input = styled.input`
  height: 100%;
  width: 500px;
  padding: 0 0 0 24px;
  border: 0;
  border-radius: ${BorderRad.s};
  -moz-appearance: textfield;
  background-color: ${Colors.Pink};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: transparent auto 1px;
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 2px ${Colors.Black['900']};
  }
`
*/

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
