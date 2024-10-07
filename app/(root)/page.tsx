import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalance from '@/components/TotalBalance';
import { NextPage } from 'next'
import React from 'react'

const Home: NextPage = () => {
  const loggedIn = { 
    $id: '001',
    userId: '001',
    dwollaCustomerUrl: '',
    dwollaCustomerId: '',
    address1: '',
    city: '',
    state: '',
    postalCode: '',
    dateOfBirth: '',
    ssn: '',
    firstName: 'FYT', lastName: 'FAN', email: 'fan@163.com' 
  };
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
        banks={[{
          $id: '',
          accountId: '',
          bankId: '',
          accessToken: '',
          fundingSourceUrl: '',
          userId: '',
          sharableId: '',
          id: '001',
          availableBalance: 100.00,
          officialName: '',
          mask: '',
          institutionId: '',
          name: '',
          type: '',
          subtype: '',
          appwriteItemId: '',
          currentBalance: 123.50,
        }, {
          $id: '',
          accountId: '',
          bankId: '',
          accessToken: '',
          fundingSourceUrl: '',
          userId: '',
          sharableId: '',
          id: '002',
          availableBalance: 100.00,
          officialName: '',
          mask: '',
          institutionId: '',
          name: '',
          type: '',
          subtype: '',
          appwriteItemId: '',
          currentBalance: 500.00
        }]}
      />
    </section>
  )
}

export default Home
