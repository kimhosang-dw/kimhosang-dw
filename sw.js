// 캐시 이름 정의
const CACHE_NAME = 'schedule-app-cache-v1';
// 앱의 기본 골격을 이루는 캐싱할 파일 목록
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // 참고: CDN을 통해 불러오는 외부 파일(Tailwind, FontAwesome 등)은
  // 이 기본 설정에서는 캐싱되지 않습니다.
];

// 서비스 워커 설치 이벤트
self.addEventListener('install', event => {
  // waitUntil() 안의 코드가 끝날 때까지 설치가 완료되지 않음
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('캐시가 열렸습니다.');
        return cache.addAll(urlsToCache);
      })
  );
});

// 네트워크 요청 감지 이벤트
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에 파일이 있으면 그것을 반환
        if (response) {
          return response;
        }
        // 캐시에 없으면 네트워크로 요청해서 가져옴
        return fetch(event.request);
      })
  );
});
