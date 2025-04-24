const character = document.getElementById('character');

window.addEventListener('mousemove', (e) => {
  character.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});







const text = document.getElementById('scrollText1');
const text2 = document.getElementById('scrollText2');
const text3 = document.getElementById('scrollText3');
const scrollText = document.getElementById('scrollText4');
const scrollText2 = document.getElementById('scrollText5');
const scrollText3 = document.getElementById('scrollText6');
const scrollText4 = document.getElementById('scrollText7');


window.addEventListener('scroll', () => {
const scrollY = window.scrollY;

text.style.transform = `translate(calc(-50% - ${scrollY}px), -50%)`;
text.style.opacity = `${1 - scrollY / 500}`;

text2.style.transform = `translate(calc(-50% - ${scrollY}px), -50%)`;
text2.style.opacity = `${1 - scrollY / 500}`;

text3.style.transform = `translate(calc(-50% - ${scrollY}px), -50%)`;
text3.style.opacity = `${1 - scrollY / 500}`;
});








window.addEventListener('scroll', function () {
const scrollY = window.scrollY;
const windowHeight = window.innerHeight;
const triggerPoint = 500; // 텍스트가 등장할 지점 (적절히 조절)

if (scrollY > triggerPoint) {
  scrollText.style.transform = 'translateX(0)';
  scrollText.style.opacity = '1';
} else {
  scrollText.style.transform = 'translateX(-100%)';
  scrollText.style.opacity = '0';
}

if (scrollY > triggerPoint) {
  scrollText2.style.transform = 'translateX(0)';
  scrollText2.style.opacity = '1';
} else {
  scrollText2.style.transform = 'translateX(-100%)';
  scrollText2.style.opacity = '0';
}

if (scrollY > triggerPoint) {
  scrollText3.style.transform = 'translateX(0)';
  scrollText3.style.opacity = '1';
} else {
  scrollText3.style.transform = 'translateX(-100%)';
  scrollText3.style.opacity = '0';
}


if (scrollY > triggerPoint) {
  scrollText4.style.transform = 'translateX(0)';
  scrollText4.style.opacity = '1';
} else {
  scrollText4.style.transform = 'translateX(-100%)';
  scrollText4.style.opacity = '0';
}
});







window.addEventListener('scroll', function() {
  const scrollImage2 = document.getElementById('scrollImage2');
  const scrollThreshold = 1200; // 원하는 위치(px)

  if (window.scrollY > scrollThreshold) {
    scrollImage2.style.opacity = 1;
  } else {
    scrollImage2.style.opacity = 0;
  }
});


window.addEventListener('scroll', function() {
  const scrollbutton1 = document.getElementById('Button3');
  const scrollThreshold = 1200; // 원하는 위치(px)

  if (window.scrollY > scrollThreshold) {
    scrollbutton1.style.opacity = 1;
  } else {
    scrollbutton1.style.opacity = 0;
  }
});

window.addEventListener('scroll', function() {
  const scrollbutton2 = document.getElementById('Button4');
  const scrollThreshold = 1200; // 원하는 위치(px)

  if (window.scrollY > scrollThreshold) {
    scrollbutton2.style.opacity = 1;
  } else {
    scrollbutton2.style.opacity = 0;
  }
});