const elements = document.querySelectorAll('[data-fade="true"]');

window.addEventListener('scroll', () => {
  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // 요소의 중간 지점이 화면의 상단 1/4 ~ 하단 1/4 사이에 있으면 밝기 조절
    if (rect.top < windowHeight * 3/4 && rect.bottom > windowHeight / 4) {
      element.style.filter = `brightness(1)`; 
    } else {
      element.style.filter = `brightness(0.6)`; 
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const event = new Event('scroll');
  window.dispatchEvent(event);
});