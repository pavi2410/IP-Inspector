import { ErrorBoundary, Show, createMemo } from "solid-js"

import { IpV4Addr } from '@/domain/ip_addr'

export function IpTable(props) {

  const ipAddr = createMemo(() => new IpV4Addr(props.ip()))

  // TODO: show formula in latex

  function errorState(err, reset) {

    // hack to reset the error state
    // otherwise the error state will be shown forever even if the state changes
    setTimeout(() => {
      reset()
    })

    return '-'
  }

  return (
    <table class="[&_th]:text-right [&_td]:font-mono">
      <tbody>
        <tr>
          <th>Decimal dot notation</th>
          <td>{ipAddr().format('decimal')}</td>
        </tr>
        <tr>
          <th>Binary dot notation</th>
          <td>{ipAddr().format('binary')}</td>
        </tr>
        <tr>
          <th>Address Class</th>
          <td>{ipAddr().addrClass}</td>
        </tr>
        <tr>
          <th>Private Address</th>
          <td>{ipAddr().isPrivate ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <th>Loopback Address</th>
          <td>{ipAddr().isLoopback ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <th>Multicast</th>
          <td>{ipAddr().isMulticast ? 'Yes': 'No'}</td>
        </tr>
        <tr>
          <th>Network Mask</th>
          <td>
            <ErrorBoundary fallback={errorState}>
              {ipAddr().netMask.format()}
            </ErrorBoundary>
          </td>
        </tr>
        <tr>
          <th>Network Address / NID</th>
          <td>
            <ErrorBoundary fallback={errorState}>
              {ipAddr().netAddr.format()}
            </ErrorBoundary>
          </td>
        </tr>
        <tr>
          <th>Host Address / HID</th>
          <td>
            <ErrorBoundary fallback={errorState}>
              {ipAddr().hostAddr.format()}
            </ErrorBoundary>
          </td>
        </tr>
{/* 
        <tr>
          <th>Network Size</th>
          <td>{ipAddr().networkSize}</td>
        </tr>
        <tr>
          <th>Network Range</th>
          <td>{ipAddr().networkRange}</td>
        </tr>
        <tr>
          <th>Host Range</th>
          <td>{ipAddr().hostRange}</td>
        </tr>
*/}
      </tbody>
    </table>
  )
}