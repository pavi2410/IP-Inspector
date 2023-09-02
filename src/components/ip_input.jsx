import { Switch, createEffect } from "solid-js"

export function DecimalIpv4Input(props) {

  const [ip, setIp] = props.ipSignal

  function getOctet(i) {
    return (ip() >> ((3 - i) * 8)) & 0xff
  }

  function setOctet(i, value) {
    setIp(ip => ip & ~(0xff << ((3 - i) * 8)) | (value << ((3 - i) * 8)))
  }

  return (
    <div class="flex">
      <For each={[0, 1, 2, 3]}>
        {octet => (
          <input
            type="text"
            value={getOctet(octet)}
            onInput={e => setOctet(octet, +e.target.value)}
          />
        )}
      </For>
    </div>
  )
}

export function BinaryIpv4Input(props) {

  const [ip, setIp] = props.ipSignal

  function getBit(i) {
    return (ip() >> i) & 1
  }

  function toggleBit(i) {
    setIp(ip => ip ^ (1 << i))
  }

  return (
    <div class="flex">
      <For each={Array.from({ length: 32 }).map((_, i) => 31 - i)}>
        {i => (
          <button
            class="[&:nth-child(4n)]:mr-2 [&:nth-child(8n)]:mr-3"
            onClick={e => toggleBit(i)}>
            {getBit(i)}
          </button>
        )}
      </For>
    </div>
  )
}