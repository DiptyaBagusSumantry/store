const getTitle = function (title) {
  if (title === '') {
    title = 'TITLE DEFAULT'
  }
  return title
}
const getNotificationOptions = function (message, message_tag) {
  const options = {
    body: message,
    icon: '/logo.png',
    tag: message_tag,
    vibrate: [200, 100, 200, 100, 200, 100, 200],
  }
  return options
}

self.addEventListener('install', event => {
  self.skipWaiting()
})

self.addEventListener('push', event => {
  try {
    // Push is a JSON
    const response_json = event.data.json()
    var { title } = response_json
    var { message } = response_json
    var message_tag = response_json.tag
  } catch (err) {
    // Push is a simple text
    var title = ''
    var message = event.data.text()
    var message_tag = ''
  }
  self.registration.showNotification(getTitle(title), getNotificationOptions(message, message_tag))
  // Optional: Comunicating with our js application. Send a signal
  self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clients => {
    clients.forEach(client => {
      client.postMessage({
        data: message_tag,
        data_title: title,
        data_body: message,
      })
    })
  })
})

// Optional: Added to that the browser opens when you click on the notification push web.
self.addEventListener('notificationclick', event => {
  // Android doesn't close the notification when you click it
  // See http://crbug.com/463146
  event.notification.close()
  // Check if there's already a tab open with this URL.
  // If yes: focus on the tab.
  // If no: open a tab with the URL.
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
    for (let i = 0; i < windowClients.length; i++) {
      const client = windowClients[i]
      if ('focus' in client) {
        return client.focus()
      }
    }
  }))
})
