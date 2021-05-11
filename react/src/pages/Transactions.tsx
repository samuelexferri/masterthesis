import React from 'react'
import { useEthers } from '@usedapp/core'
import styled from 'styled-components'
import { Container, MainContent, Section, SectionRow } from '../components/base/base'
//import { Button } from '../components/base/Button'
import { CertifyFile, ResetFile, VerifyFile } from '../components/Notifications/Forms'
import { NotificationsList, TransactionsList } from '../components/Notifications/History'

import polyIMG from '../assets/images/poly.png'

const NETWORK_ALLOWED_ID = 3
const NETWORK_ALLOWED_NAME = 'Ropsten'

import { Avatar, Badge, Box, Button, Card, Divider, Heading, Text } from '@dracula/dracula-ui'

export function Transactions() {
  const { activateBrowserWallet, deactivate, account, library, chainId, active } = useEthers()

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
            <Heading>Transactions</Heading>

            {account ? <Text>{account}</Text> : <Text></Text>}

            <Avatar title="Samuele Ferri" src={polyIMG} />
          </SectionRow>

          {networkDisplay}

          <Box p="sm"></Box>

          <TableGrid>
            <TransactionsList />
            <NotificationsList />
          </TableGrid>
          <TableGridSingle>
            <VerifyFile />
            <CertifyFile />
            <ResetFile />
          </TableGridSingle>
        </Section>
      </Container>
    </MainContent>
  )
}

const TableGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 5px 0px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`
const TableGridSingle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  padding: 5px 0px;
`
