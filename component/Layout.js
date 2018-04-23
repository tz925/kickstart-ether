import React from 'react'
import Header from './Header'
import Head from 'next/head'
import {Container,Segment} from 'semantic-ui-react'

export default (props) => {
  return (
    <Container>
      <Head>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
      </Head>
      <Header />
      {props.children}
      <Segment >
        <p>*contributers get more voting power when contributing more coin</p>
        <p>2018 by Tunan Zhou</p>
      </Segment>
    </Container>
  )
}
