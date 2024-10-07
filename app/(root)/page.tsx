import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalance from '@/components/TotalBalance';
import { NextPage } from 'next'
import React from 'react'

const Home: NextPage = () => {
  const loggedIn = { firstName: 'LOVER', lastName: 'FAN', email: 'fan@163.com' };
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox type='greeting' title='Welcome' user={loggedIn.firstName || 'Guest'} subtext='Access and manage your account and transactions efficiently.' />
          <TotalBalance accounts={[]} totalBanks={1} totalCurrentBalance={1250.35} />
        </header>

        RECENT TRANSACTIONS
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 123.50}, {currentBalance: 500.00}]}
      />
    </section>
  )
}

export default Home
