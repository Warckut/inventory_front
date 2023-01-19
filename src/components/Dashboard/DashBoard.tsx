import React from 'react'
import Purchases from '../Purchases/Purchases'
// import Sidebar from './Sidebar';
// import OpenConversation from './OpenConversation';
// import { useConversations } from '../contexts/ConversationsProvider';

export default function Dashboard() {
//   const { selectedConversation } = useConversations()

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
        <Purchases />
      {/* <Sidebar id={id} />
      {selectedConversation && <OpenConversation />} */}
    </div>
  )
}