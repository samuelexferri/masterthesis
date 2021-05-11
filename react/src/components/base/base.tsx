import styled from 'styled-components'
import { BorderRad, Colors, Shadows, Sizes } from '../../global/styles'

import { Text } from '@dracula/dracula-ui'

export const Page = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding-top: ${Sizes.headerHeight};
  height: 100%;
  min-height: 100vh;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 850px;
  height: 100%;
  margin: 0 auto;
  padding-left: 14px;
  padding-right: 14px;
`

export const HeaderContainer = styled(Container)`
  max-width: 1200px;
`

export const MainContent = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - ${Sizes.headerHeight});
  background: #282a36;
`

export const Section = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 24px;
  margin-bottom: 60px;
`

export const SectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
`

export const ContentRow = styled.div`
  display: block;

  & + & {
    margin-top: 16px;
  }
`

export const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${Colors.Foreground};
  border-radius: ${BorderRad.s};
  box-shadow: ${Shadows.main};
  padding: 32px 32px;
`

// MYBREAKTEXT
export const MyBreakText = styled(Text)`
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
`
