export function uint6ToB64(nUint6) {
    return nUint6 < 26 ?
    nUint6 + 65
  : nUint6 < 52 ?
    nUint6 + 71
  : nUint6 < 62 ?
    nUint6 - 4
  : nUint6 === 62 ?
    43
  : nUint6 === 63 ?
    47
  :
    65;
}