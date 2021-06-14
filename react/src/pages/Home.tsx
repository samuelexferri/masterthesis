import React from 'react'

import { formatEther } from '@ethersproject/units'
import { useEtherBalance, useEthers } from '@usedapp/core'

import { Container, ContentRow, MainContent, MyBreakText, Section, SectionRow } from '../components/base/base'

import { Anchor, Avatar, Box, Card, Heading, Text } from '@dracula/dracula-ui'

import polyIMG from '../assets/images/poly.png'

import { NETWORK_ALLOWED_ID, NETWORK_ALLOWED_NAME, NOTARIZETH_ADDRESS } from '../Constants'
import styled from 'styled-components'

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

            {account ? <MyBreakText>{account}</MyBreakText> : <Text></Text>}

            <Avatar title="Samuele Ferri" src={polyIMG} />
          </SectionRow>

          {networkDisplay}

          <Box p="sm"></Box>

          <Card color="pinkPurple" p="sm">
            {account && (
              <ContentRow>
                <Text color="black" weight="semibold">
                  Account:
                </Text>{' '}
                <MyBreakText color="black">{account}</MyBreakText>
              </ContentRow>
            )}
            {userBalance && (
              <ContentRow>
                <Text color="black" weight="semibold">
                  Ether Balance:
                </Text>{' '}
                <Text color="black">{formatEther(userBalance)} ETH</Text>
              </ContentRow>
            )}

            <ContentRow>
              <Text color="black" weight="semibold">
                NotarizETH Contract Address:
              </Text>{' '}
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
              <LabelRow>
                <Text color="black" weight="semibold" align="center">
                  Certify your files on the Ethereum Blockchain!
                </Text>
              </LabelRow>
              <LabelRow>
                <Text color="black" align="center">
                  <i>Tamper-Proof, Decentralization, Transparency</i>
                </Text>
              </LabelRow>
              Notarize your document by writing its Keccak256 hash in the smart contract mapping hosted on the Ethereum
              blockchain to later prove its existence and its integrity over time.
              <br></br>
              <br></br>
              Privacy! Your files are not uploaded, the Keccak256 hash is calculated locally, the entire document is not
              stored on the blockchain but only its Keccak256 hash.
              <br></br>
              <br></br>
              Try yourself going into the{' '}
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

const LabelRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0 24px 0;
`
