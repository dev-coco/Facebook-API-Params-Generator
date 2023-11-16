async function createDtsg (type) {
  if (!type) return require('DTSG').getToken()
  const token = await fetch('https://www.facebook.com/ajax/dtsg/?__a=true')
    .then(response => response.text())
    .then(text => JSON.parse(text.replace('for (;;);', '')).payload.token)
  return token
}
await createDtsg()
