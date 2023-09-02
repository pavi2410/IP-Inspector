import { createSignal } from 'solid-js'

import { DecimalIpv4Input, BinaryIpv4Input } from '@/components/ip_input'
import { IpTable } from '@/components/ip_table'

function App() {
  const ipSignal = createSignal(0)
  const [ip, setIp] = ipSignal

  return (
    <>
      <h1>IP Inspector</h1>

      <DecimalIpv4Input ipSignal={ipSignal} />
      <BinaryIpv4Input ipSignal={ipSignal} />

      <IpTable ip={ip} />
    </>
  )
}

export default App
