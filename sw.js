const CACHE_NAME = 'haruy-cache-v8';
const ASSETS =  [
    './',
    './index.html',
    './aula12.html',
    './manifest.json',
    './img/logo.png',
    './img/logopwa.png',
    './img/logo512.png',
    './img/banner.png',
    './img/whatsapp.png'
];

// Instala o Service worker e coloca os arquivos no Cache 
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Fatiando o Sushi no Cache ! 🍣');
            return cache.addAll(ASSETS);
        })
    );
});

//Faz as requisições olharem pro cache primeiro
self.addEventListener('fetch', (event) => {
event.respondWith(
caches.match(event.request).then((response) => {
return response || fetch(event.request);
        })
    );
});

//Remove caches antigos quando atualizar
self.addEventListener('activate', (event) => {
event.waitUntill(
caches.keys().then((keys) => {
return Promise.all(
keys.filter(key => key !== CACHE_NAME).map
(key => caches.delete(key))
            );
        })
    );
});

