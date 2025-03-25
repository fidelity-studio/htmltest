const elements = document.querySelectorAll('[data-fade="true"]');

window.addEventListener('scroll', () => {
  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const screenQuarter = windowHeight / 4;
    const elementStart = rect.top;
    const elementEnd = rect.bottom;
    if (elementStart < screenQuarter && elementEnd > screenQuarter) {
      element.style.filter = `brightness(1)`; 
    } else {
      element.style.filter = `brightness(0.5)`; 
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const event = new Event('scroll');
  window.dispatchEvent(event);
});
