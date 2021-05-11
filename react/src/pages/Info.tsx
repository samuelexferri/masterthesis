import React from 'react'

import { useEthers } from '@usedapp/core'

import { Container, MainContent, MyBreakText, Section, SectionRow } from '../components/Base/Base'

import { Avatar, Box, Card, Heading, Text } from '@dracula/dracula-ui'

import polyIMG from '../assets/images/poly.png'

import { NETWORK_ALLOWED_ID, NETWORK_ALLOWED_NAME } from '../Constants'

export function Info() {
  const { account, chainId } = useEthers()

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
            <Heading>Info</Heading>

            {account ? <Text>{account}</Text> : <Text></Text>}

            <Avatar title="Samuele Ferri" src={polyIMG} />
          </SectionRow>

          {networkDisplay}

          <Box p="sm"></Box>

          <Card color="pinkPurple" p="sm">
            <MyBreakText>TODO</MyBreakText>
          </Card>

          <Box p="sm"></Box>

          <Card color="pinkPurple" p="sm">
            <MyBreakText>TODO</MyBreakText>
          </Card>
        </Section>
      </Container>
    </MainContent>
  )
}
