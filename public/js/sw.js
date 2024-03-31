const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

const saveSubscription = async (subscription) => {
    const response = await fetch('https://server-tn6t.onrender.com/save-subscription', {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(subscription)
    })

    return response.json()
}

self.addEventListener("activate", async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BDyotF8mi37TNaFBxRwLGApQPs2rXNSfFFMFN3E-eC3yfXfUs3huJDN1NOH4iX5Or9JjvRT9wQYO4uOYaDj2lT8")
    })

    const response = await saveSubscription(subscription)
    console.log(response)
})

self.addEventListener("push", e => {
    self.registration.showNotification("Alert!", { body: e.data.text() })
})
