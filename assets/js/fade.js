const elements = document.querySelectorAll('[data-fade="true"]');

window.addEventListener('scroll', () => {
  elements.forEach(element => {
    const rect = element.getBoundingClientRect(); 
    const windowWidth = window.innerWidth; 
    const windowHeight = window.innerHeight; 


    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;


    const screenCenterX = windowWidth / 2;
    const screenCenterY = windowHeight / 2;


    const distanceX = Math.abs(screenCenterX - elementCenterX); 
    const distanceY = Math.abs(screenCenterY - elementCenterY); 

    const maxDistance = Math.sqrt(Math.pow(windowWidth / 2, 2) + Math.pow(windowHeight / 2, 2)); 
    const distanceFromCenter = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)); 

    const brightness = Math.max(1 - Math.pow(distanceFromCenter / maxDistance, 5), 0.45); 

    element.style.filter = `brightness(${brightness})`;
  });
});

window.addEventListener('DOMContentLoaded', updateBrightness);

window.addEventListener('scroll', updateBrightness);