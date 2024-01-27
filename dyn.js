function createDyn (type) {
  if (!type) return require('ServerJSDefine').getLoadedModuleHash()
  const arr = []
  const count = Math.floor(Math.random() * (265 - 115 + 1)) + 115
  const allNumbers = Array.from({ length: 7331 - 7 + 1 }, (_, i) => i + 7)
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * allNumbers.length)
    const randomNumber = allNumbers[randomIndex]
    arr.push(randomNumber)
    allNumbers.splice(randomIndex, 1)
  }
  // 二进制转换文本
  function convertToBinaryString (num) {
    const binaryString = num.toString(2)
    const padding = '0'.repeat(binaryString.length - 1)
    return padding + binaryString
  }
  // 二进制转换base64
  function convertToBase64String (binaryString) {
    const list = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'
    const sixBitChunks = (binaryString + '00000').match(/[01]{6}/g)
    let base64String = ''
    for (let i = 0; i < sixBitChunks.length; i++) {
      base64String += list[parseInt(sixBitChunks[i], 2)]
    }
    return base64String
  }
  // 压缩字符串
  function toCompressedString () {
    const bitMap = []
    for (const item in arr) {
      bitMap[arr[item]] = 1
    }
    if (bitMap.length === 0) return ''
    const compressedBits = []
    let count = 1
    let currentBit = bitMap[0] || 0
    const currentBitString = currentBit.toString(2)
    for (let i = 1; i < bitMap.length; i++) {
      const nextBit = bitMap[i] || 0
      if (nextBit === currentBit) {
        count++
      } else {
        compressedBits.push(convertToBinaryString(count))
        currentBit = nextBit
        count = 1
      }
    }
    if (count) compressedBits.push(convertToBinaryString(count))
    return convertToBase64String(currentBitString + compressedBits.join(''))
  }
  return toCompressedString()
}
createDyn()
