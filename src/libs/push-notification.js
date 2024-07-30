import axios from '@axios'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function loadVersionBrowser() {
  if ('userAgentData' in navigator) {
    // navigator.userAgentData is not available in
    // Firefox and Safari
    const uaData = navigator.userAgentData
    // Outputs of navigator.userAgentData.brands[n].brand are e.g.
    // Chrome: 'Google Chrome'
    // Edge: 'Microsoft Edge'
    // Opera: 'Opera'
    let browsername
    let browserversion
    let chromeVersion = null
    for (let i = 0; i < uaData.brands.length; i++) {
      const { brand } = uaData.brands[i]
      browserversion = uaData.brands[i].version
      if (brand.match(/opera|chrome|edge|safari|firefox|msie|trident/i) !== null) {
        // If we have a chrome match, save the match, but try to find another match
        // E.g. Edge can also produce a false Chrome match.
        if (brand.match(/chrome/i) !== null) chromeVersion = browserversion
        // If this is not a chrome match return immediately
        else {
          browsername = brand.substr(brand.indexOf(' ') + 1)
          return {
            name: browsername,
            version: browserversion,
          }
        }
      }
    }
    // No non-Chrome match was found. If we have a chrome match, return it.
    if (chromeVersion !== null) {
      return {
        name: 'chrome',
        version: chromeVersion,
      }
    }
  }
  // If no userAgentData is not present, or if no match via userAgentData was found,
  // try to extract the browser name and version from userAgent
  const { userAgent } = navigator
  const ua = userAgent; let tem; let
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return { name: 'IE', version: (tem[1] || '') }
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/)
    if (tem != null) {
      return { name: 'Opera', version: tem[1] }
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1])
  }
  return {
    name: M[0],
    version: M[1],
  }
}

const applicationServerKey = 'BJalYDBUfw3MGi4tTT-neH7lJ_zsaSH4sZ15czeZaRFH6UfYNmNJBEWj1l7Snk9E0RYJDPwT77tjoCFUT4S9Gas'

function requestPOSTToServer(data) {
  axios
    .post('/notification/push/device/wns/', data)
    .catch(error => { console.log(error) })
}

// In your ready listener
if ('serviceWorker' in navigator) {
  // The service worker has to store in the root of the app
  // http://stackoverflow.com/questions/29874068/navigator-serviceworker-is-never-ready
  const browser = loadVersionBrowser()
  console.log('browser:', browser)
  navigator.serviceWorker.register('/navigatorPush.service.js?version=1.0.0').then(reg => {
    console.log('reg:', reg)
    reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(applicationServerKey),
    }).then(sub => {
      const endpointParts = sub.endpoint.split('/')
      const data = {
        browser: browser.name.toUpperCase(),
        p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))),
        auth: btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))),
        name: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        registration_id: endpointParts[endpointParts.length - 1],
      }
      requestPOSTToServer(data)
    }).catch(err => {
      console.log(':^(', err)
    })
  }).catch(err => {
    console.log(':^(', err)
  })
}
