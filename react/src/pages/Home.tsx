import React from 'react'

import { formatEther } from '@ethersproject/units'
import { useEtherBalance, useEthers } from '@usedapp/core'

import { Container, ContentRow, MainContent, MyBreakText, Section, SectionRow } from '../components/base/base'

import { Anchor, Avatar, Box, Card, Heading, Text } from '@dracula/dracula-ui'

import polyIMG from '../assets/images/poly.png'

import { NETWORK_ALLOWED_ID, NETWORK_ALLOWED_NAME, NOTARIZETH_ADDRESS } from '../Constants'

export function Home() {
  const { account, chainId } = useEthers()

  const userBalance = useEtherBalance(account)

  // Right/Wrong Network Alert
  let networkDisplay = (
    <Box rounded="lg" color="animated" p="md">
      <Text color="black">{'X'}</Text>
    </Box>
  )

  if (chainId == NETWORK_ALLOWED_ID && account != null) {
    networkDisplay = (
      <Box rounded="lg" color="animated" p="md">
        <Text color="black">{'MetaMask ' + NETWORK_ALLOWED_NAME + ' Network'}</Text>
      </Box>
    )
  } else if (chainId == NETWORK_ALLOWED_ID && account == null) {
    networkDisplay = (
      <Box rounded="lg" color="animated" p="md">
        <Text color="black">{'Infura ' + NETWORK_ALLOWED_NAME + ' Network (read-only), connect with MetaMask!'}</Text>
      </Box>
    )
  } else {
    networkDisplay = (
      <Box rounded="lg" color="red" p="md">
        <Text color="black">{'You need to be on ' + NETWORK_ALLOWED_NAME + ' Network, change the network!'}</Text>
      </Box>
    )
  }

  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Heading>Home</Heading>

            {account ? <Text>{account}</Text> : <Text></Text>}

            <Avatar title="Samuele Ferri" src={polyIMG} />
          </SectionRow>

          {networkDisplay}

          <Box p="sm"></Box>

          <Card color="pinkPurple" p="sm">
            {account && (
              <ContentRow>
                <Text color="black">Account:</Text> <Text>{account}</Text>
              </ContentRow>
            )}
            {userBalance && (
              <ContentRow>
                <Text color="black">Ether Balance:</Text> <Text>{formatEther(userBalance)}</Text> <Text>ETH</Text>
              </ContentRow>
            )}

            <ContentRow>
              <Text color="black">NotarizETH Contract Address:</Text>{' '}
              <Anchor
                href={'https://ropsten.etherscan.io/address/' + NOTARIZETH_ADDRESS}
                target="_blank"
                color="cyanGreen"
                hoverColor="yellowPink"
                mb="sm"
              >
                <MyBreakText>{NOTARIZETH_ADDRESS}</MyBreakText>
              </Anchor>
            </ContentRow>
          </Card>

          <Box p="sm"></Box>

          <Card color="pinkPurple" p="sm">
            <MyBreakText color="black">
              <Text>Certify your files on the Ethereum Blockchain!</Text>
              <br></br>
              <br></br>
              <Text color="orange">Tamper Evidence, Decentralization, Transparency...</Text>
              <br></br>
              <br></br>
              Notarize your document, certify it by writing a timestamped digital signature of your file into the
              Ethereum Blockchain to later prove its existence, its integrity over time and that you cryptographically
              signed it and had access to it.
              <br></br>
              <br></br>
              Privacy! No uploading of files, the Keccak256 hash is calculated locally, the entire document is not
              stored on the blockchain but only its hash.
              <br></br>
              <br></br>
              Try yourself going into{' '}
              <Anchor href={'./transactions'} color="cyanGreen" hoverColor="yellowPink" mb="sm">
                transactions
              </Anchor>{' '}
              section!
              <br></br>
              <br></br>
              See the{' '}
              <Anchor
                href={'https://github.com/samuelexferri/masterthesis'}
                target="_blank"
                color="cyanGreen"
                hoverColor="yellowPink"
                mb="sm"
              >
                project
              </Anchor>{' '}
              and the{' '}
              <Anchor
                href={'https://github.com/samuelexferri/masterthesis/tree/master/doc'}
                target="_blank"
                color="cyanGreen"
                hoverColor="yellowPink"
                mb="sm"
              >
                documentation
              </Anchor>
              .
            </MyBreakText>
          </Card>
        </Section>
      </Container>
    </MainContent>
  )
}
