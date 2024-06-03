import React from 'react'
import Information from './Information/Information'
import OrdersList from './Orders/OrdersList'

function AccountSection(section: any) {
    if (!section.section) {
        return (
            <OrdersList />
        )
    } else {
        return (
            <Information />
        )
    }
}

export default AccountSection