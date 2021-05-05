import React, { useCallback } from "react";

// UI
import { Body, Header, Image, Link } from "./components";
import logo from "./ethereumLogo.png";

// Dracula UI
import '@dracula/dracula-ui/styles/dracula-ui.css'
import { Button, Paragraph } from '@dracula/dracula-ui'

// Ethers.js
import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";

// Web3
import Web3 from "web3";
import useWeb3Modal from "./hooks/useWeb3Modal";

// Contracts
import { addresses, abis } from "@project/contracts";

// TODO Delete?
import { useQuery } from "@apollo/react-hooks";
import GET_TRANSFERS from "./graphql/subgraph";

// Dropzone
import Dropzone, { useDropzone } from 'react-dropzone';

// Infura Project ID
const INFURA_ID = "773217385b694a6ea60c4cea1a430a09";

// TODO Delete
async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = getDefaultProvider();
  // Create an instance of an ethers.js Contract
  // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
  const ceaErc20 = new Contract(addresses.ceaErc20, abis.erc20, defaultProvider);
  // A pre-defined address that owns some CEAERC20 tokens
  const tokenBalance = await ceaErc20.balanceOf("0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C");
  console.log({ tokenBalance: tokenBalance.toString() });
}

// Wallet Button
function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}

// App
function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  // Web3
  const web3 = new Web3("wss://ropsten.infura.io/ws/v3/" + INFURA_ID);

  // Accounts
  const accounts = web3.eth.getAccounts();

  // NotarizETHContract
  var NotarizETHContract = new web3.eth.Contract(abis.NotarizETH, addresses.NotarizETH);

  // CryptoJS
  var CryptoJS = require("crypto-js");
  console.log(CryptoJS.HmacSHA1("Message", "Key"));

  // CryptoJS Helper
  function arrayBufferToWordArray(arrayBuffer) {
    var i8a = new Uint8Array(arrayBuffer);
    var a = [];
    for (var i = 0; i < i8a.length; i += 4) {
      a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
    }
    return CryptoJS.lib.WordArray.create(a, i8a.length);
  }

  // React Dropzone
  function MyDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          // Do whatever you want with the file contents
          const arrayBuffer = reader.result
          console.log(arrayBufferToWordArray(arrayBuffer))
          console.log(CryptoJS.SHA3(arrayBufferToWordArray(arrayBuffer), { outputLength: 256 }).toString(CryptoJS.enc.Hex))
        }
        reader.readAsArrayBuffer(file)
      })
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    )
  }

  // Contract Functions
  function verifyFile() {
    // NotarizETHContract.methods.DEFAULT_ADMIN_ROLE().call().then(console.log);
    NotarizETHContract.methods.verifyFile('0x94dd1897a32b7e258e9401b83d6b9530dadfdb10e7d1f6696bd8c6954723526e').call().then(console.log)
  }

  function certifyFile() {
    // NotarizETHContract.methods.DEFAULT_ADMIN_ROLE().call().then(console.log);
    NotarizETHContract.methods.certifyFile().call().then(console.log)
  }


  // React
  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, error, data]);

  return (
    <div>
      <Header>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </Header>
      <Body>
        <Image src={logo} alt="react-logo" />
        <p>
          Edit <code>packages/react-app/src/App.js</code> and save to reload.
        </p>

        <Button onClick={() => verifyFile()}>
          verifyFile
        </Button>

        <Button onClick={() => certifyFile()}>
          certifyFile
        </Button>


        <MyDropzone />


        <Link href="https://ethereum.org/developers/#getting-started" style={{ marginTop: "8px" }}>
          Learn Ethereum
        </Link>
        <Link href="https://reactjs.org">Learn React</Link>
        <Link href="https://thegraph.com/docs/quick-start">Learn The Graph</Link>
        <Paragraph color="black">Hello Vampire</Paragraph>
      </Body>
    </div>
  );
}

export default App;
