// GOAT TOPUP Safe Service Worker (No Cache Blocking)

self.addEventListener('install', (event) => {
    // দ্রুত ইন্সটল করার জন্য
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // সর্বদা সরাসরি নেটওয়ার্ক থেকে ফাইল লোড করবে। 
    // ফলে আগের মতো ওয়েবসাইট লোড না হওয়ার কোনো সমস্যা থাকবে না।
    event.respondWith(
        fetch(event.request).catch((error) => {
            console.error('Fetch failed:', error);
            // ইন্টারনেট না থাকলে ক্যাশ থেকে দেখানোর চেষ্টা করবে
            return caches.match(event.request);
        })
    );
});