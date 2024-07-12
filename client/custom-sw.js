//my-service-worker.js
importScripts('./ngsw-worker.js');
self.addEventListener("push", (event) => {
    let response = event.data && event.data.text();
    let title = JSON.parse(response).message;
    let body = JSON.parse(response).id;
    let icon = 'https://tickets.cochisweb.com/assets/images/qr.jpeg';
  
    event.waitUntil(
      self.registration.showNotification(title, { body, icon, data: { url: JSON.parse(response).url } })
    )
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  });

  self.addEventListener('push', (event) => {
    const options = {
      body: event.data.text(),
      // Otras opciones como icono, etc.
    };
    event.waitUntil(self.registration.showNotification('Título', options));
  });