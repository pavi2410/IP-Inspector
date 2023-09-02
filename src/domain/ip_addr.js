export class IpV4Addr {
  constructor(addr) {
    this.addr = addr;
    this.octets = [
      this.addr >> 24 & 0xff,
      this.addr >> 16 & 0xff,
      this.addr >> 8 & 0xff,
      this.addr >> 0 & 0xff,
    ]
  }

  format(kind = 'decimal') {
    if (kind === 'binary') {
      return this.octets
        .map(octet => octet.toString(2).padStart(8, '0'))
        .join('.');
    }
    return this.octets.join('.');
  }

  get addrClass() {
    if (this.octets[0] >> 7 === 0) {
      return 'A';
    }
    if (this.octets[0] >> 6 === 0b10) {
      return 'B';
    }
    if (this.octets[0] >> 5 === 0b110) {
      return 'C';
    }
    if (this.octets[0] >> 4 === 0b1110) {
      return 'D';
    }
    return 'E';
  }

  // TODO: probably group private and loopback into one method
  get isPrivate() {
    if (this.addrClass === 'A') {
      return this.octets[0] === 10;
    }
    if (this.addrClass === 'B') {
      return this.octets[0] === 172 && this.octets[1] >= 16 && this.octets[1] <= 31;
    }
    if (this.addrClass === 'C') {
      return this.octets[0] === 192 && this.octets[1] === 168;
    }
    return false;
  }

  get isLoopback() {
    return this.octets[0] === 127;
  }

  get isMulticast() {
    return this.addrClass === 'D';
  }

  get netMask() {
    if (this.addrClass === 'A') {
      return new IpV4Addr(0xff000000); // 255.0.0.0
    }
    if (this.addrClass === 'B') {
      return new IpV4Addr(0xffff0000); // 255.255.0.0
    }
    if (this.addrClass === 'C') {
      return new IpV4Addr(0xffffff00); // 255.255.255.0
    }
    throw new Error('Invalid address class');
  }

  get netAddr() {
    return new IpV4Addr(this.addr & this.netMask.addr);
  }

  get hostAddr() {
    return new IpV4Addr(this.addr & ~this.netMask.addr);
  }
}