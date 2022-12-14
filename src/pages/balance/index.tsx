import Head from 'next/head'
import { canSSRAuth } from '../../utils/canSSRAuth'
import Header from '../../components/header'
import BalanceContainer from '../../components/balance'
import History from '../../components/history'
import { setupAPIClient } from '../../services/api'

import styles from './styles.module.scss'
export default function Balance({ cashIn, cashOut }) {
  return (
    <div >

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.balanceContainer}>
    
        <BalanceContainer />
        <History cashIn={cashIn} cashOut={cashOut}/>
      </main>
    </div>
  )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get("/user/transactions")
  let { cashIn } = response.data
  let { cashOut } = response.data

  return {
    props: {
      cashIn,
      cashOut
    }

  }
})

