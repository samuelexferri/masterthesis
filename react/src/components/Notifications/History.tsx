import React, { ReactElement, ReactNode } from 'react'

import type { TransactionResponse } from '@ethersproject/providers'
import {
  getExplorerTransactionLink,
  Notification,
  StoredTransaction,
  useNotifications,
  useTransactions,
} from '@usedapp/core'
import { AnimatePresence, motion } from 'framer-motion'

import styled from 'styled-components'
import { Colors } from '../../global/styles'
import { CheckIcon, ClockIcon, ExclamationIcon, ShareIcon, UnwrapIcon, WalletIcon, WrapIcon } from './Icons'

import { Card, Heading, Table, Text } from '@dracula/dracula-ui'

// TABLE WRAPPER
interface TableWrapperProps {
  children: ReactNode
  title: string
}

const TableWrapper = ({ children, title }: TableWrapperProps) => (
  <Card color="pinkPurple" p="sm">
    <TitleRow>
      <Heading size="md">{title}</Heading>
    </TitleRow>
    <MyTable>{children}</MyTable>
  </Card>
)

// TRANSACTIONS
interface DateProps {
  date: number
  className?: string
}

const DateCell = ({ date, className }: DateProps) => {
  const dateObject = new Date(date)
  const formattedDate = dateObject.toLocaleDateString()
  const formattedTime = dateObject.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  return (
    <DateRow className={className}>
      <DateDisplay>{formattedDate}</DateDisplay>
      <HourDisplay>{formattedTime}</HourDisplay>
    </DateRow>
  )
}

interface TransactionNameProps {
  transactionName: string | undefined
}

const TransactionName = ({ transactionName }: TransactionNameProps) => {
  const Icon = transactionName === 'Unwrap' ? UnwrapIcon : WrapIcon

  return (
    <IconRow>
      <IconContainer>
        <Icon />
      </IconContainer>
      <Text color="black">{transactionName}</Text>
    </IconRow>
  )
}

interface TransactionProps {
  transaction: StoredTransaction
}

const Transaction = ({ transaction }: TransactionProps) => {
  return (
    <TransactionDetailsWrapper layout initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
      <TransactionName transactionName={transaction.transactionName} />
      <DateCell date={transaction.submittedAt} />
    </TransactionDetailsWrapper>
  )
}

export const TransactionsList = () => {
  const { transactions } = useTransactions()

  return (
    <TableWrapper title="Transactions history">
      <AnimatePresence initial={false}>
        {transactions.map((transaction) => (
          <Transaction transaction={transaction} key={transaction.transaction.hash} />
        ))}
      </AnimatePresence>
    </TableWrapper>
  )
}

// NOTIFICATIONS
const notificationContent: { [key in Notification['type']]: { title: string; icon: ReactElement } } = {
  transactionFailed: { title: 'Transaction failed', icon: <ExclamationIcon /> },
  transactionStarted: { title: 'Transaction started', icon: <ClockIcon /> },
  transactionSucceed: { title: 'Transaction succeed', icon: <CheckIcon /> },
  walletConnected: { title: 'Wallet connected', icon: <WalletIcon /> },
}

interface NotificationLinkProps {
  transaction: TransactionResponse | undefined
}

const NotificationLink = ({ transaction }: NotificationLinkProps) => (
  <>
    {transaction && (
      <Link
        href={getExplorerTransactionLink(transaction.hash, transaction.chainId)}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on Etherscan
        <LinkIconWrapper>
          <ShareIcon />
        </LinkIconWrapper>
      </Link>
    )}
  </>
)

interface NotificationPanelProps {
  type: Notification['type']
  transaction?: TransactionResponse
}

const NotificationPanel = ({ transaction, type }: NotificationPanelProps) => {
  const notificationDate = Date.now()

  return (
    <NotificationWrapper layout initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <NotificationIconContainer>{notificationContent[type].icon}</NotificationIconContainer>
      <NotificationDetailsWrapper>
        <Text color="black">{notificationContent[type].title}</Text>
        <NotificationLink transaction={transaction} />
      </NotificationDetailsWrapper>
      <NotificationDate date={notificationDate} />
    </NotificationWrapper>
  )
}

interface NotificationItemProps {
  notification: Notification
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  if ('transaction' in notification) {
    return <NotificationPanel type={notification.type} transaction={notification.transaction} />
  } else {
    return <NotificationPanel type={notification.type} />
  }
}

export const NotificationsList = () => {
  const { notifications } = useNotifications()

  return (
    <TableWrapper title="Notifications history">
      <AnimatePresence initial={false}>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </AnimatePresence>
    </TableWrapper>
  )
}

// CSS
const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  padding: 12px;
`

const NotificationIconContainer = styled(IconContainer)`
  padding: 14px 16px 14px 12px;
`

const TransactionDetailsWrapper = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`

const NotificationWrapper = styled(motion.div)`
  display: flex;
  justify-content: space-between;
`

const NotificationDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 4px 0;
`

const MyTable = styled(Table)`
  height: 300px;
  overflow: scroll;
  padding: 12px;

  & > * + * {
    margin-top: 12px;
  }
`

const LinkIconWrapper = styled.div`
  width: 12px;
  height: 12px;
  margin-left: 8px;
`

const Link = styled.a`
  display: flex;
  font-size: 12px;
  text-decoration: underline;
`

const TitleRow = styled(Text)`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: ${Colors.Foreground} 2px solid;
  padding: 16px;
  font-size: 18px;
`

const IconRow = styled.div`
  display: flex;
  align-items: center;
`

const DateRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: end;
  padding: 8px;
`

const NotificationDate = styled(DateCell)`
  margin-left: auto;
`

const DateDisplay = styled.div`
  font-size: 14px;
`
const HourDisplay = styled.div`
  font-size: 12px;
`
