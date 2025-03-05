document.addEventListener("DOMContentLoaded", function () {
  let currentTab = 1; // 현재 선택된 탭
  const totalTabs = 3; // 총 탭 개수
  const intervalTime = 3000; // 자동 변경 시간 (ms)

  function changeTab() {
    currentTab++; // 다음 탭으로 이동
    if (currentTab > totalTabs) {
      currentTab = 1; // 마지막 탭이면 처음으로 돌아가기
    }
    document.getElementById(`tab${currentTab}`).checked = true; // 해당 탭 선택
  }

  setInterval(changeTab, intervalTime); // 일정 시간마다 changeTab 실행
});


const api_key = "KhMwNrzfaaiOCusKS29dHkZTKt0VylaAgePgxJpa"; // 🔹 본인 API 키 입력
const API_URL = `https://developer.nps.gov/api/v1/parks?limit=10&api_key=${api_key}`;

let imageUrls = [];
let currentIndex = 0;

// 🔹 API에서 공원 이미지 가져오기
async function fetchParkImages() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // 🔹 이미지가 있는 공원만 필터링
        imageUrls = data.data
            .flatMap(park => park.images.map(img => img.url))
            .filter(url => url);

        if (imageUrls.length > 0) {
            preloadImages(imageUrls); // 이미지를 미리 로드
            updateBackground(); // 첫 이미지 적용
            setInterval(updateBackground, 3000); // 3초마다 변경
        }
    } catch (error) {
        console.error("Error fetching park images:", error);
    }
}

// 🔹 이미지 미리 로드하기
function preloadImages(urls) {
    const promises = urls.map(url => {
        const img = new Image();
        img.src = url; // 이미지를 미리 로드
        return new Promise(resolve => {
            img.onload = resolve; // 로드가 완료되면 resolve
        });
    });

    return Promise.all(promises); // 모든 이미지가 로드될 때까지 기다림
}

// 🔹 배경 이미지 업데이트 함수
function updateBackground() {
    document.body.style.transition = "background-image 1s ease-in-out"; // 부드러운 전환 효과
    document.body.style.backgroundImage = `url(${imageUrls[currentIndex]})`;
    currentIndex = (currentIndex + 1) % imageUrls.length; // 인덱스 순환
}

// 🔹 API 호출 실행
fetchParkImages();



document.getElementById('findAnswerBtn').addEventListener('click', function() {
  window.location.href = 'temp-search-page.html'; // 원하는 URL로 변경
});

