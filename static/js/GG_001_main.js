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
  const scrollThreshold = 950; // 원하는 위치(px)

  if (window.scrollY > scrollThreshold) {
    scrollImage2.style.opacity = 1;
  } else {
    scrollImage2.style.opacity = 0;
  }
});


const scrollThreshold = 1600;

window.addEventListener('scroll', function () {
  const scrollbutton1 = document.getElementById('Button3');
  if (window.scrollY > scrollThreshold) {
    scrollbutton1.style.opacity = '1';
    scrollbutton1.style.pointerEvents = 'auto';
    scrollbutton1.style.display = 'block'; // 또는 flex 등 원래값
  } else {
    scrollbutton1.style.opacity = '0';
    scrollbutton1.style.pointerEvents = 'none';
    scrollbutton1.style.display = 'none';
  }
});

window.addEventListener('scroll', function () {
  const scrollbutton2 = document.getElementById('Button4');
  if (window.scrollY > scrollThreshold) {
    scrollbutton2.style.opacity = '1';
    scrollbutton2.style.pointerEvents = 'auto';
    scrollbutton2.style.display = 'block';
  } else {
    scrollbutton2.style.opacity = '0';
    scrollbutton2.style.pointerEvents = 'none';
    scrollbutton2.style.display = 'none';
  }
});




window.addEventListener('scroll', function () {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    const button1 = document.getElementById('Button1');
    const button2 = document.getElementById('Button2');

    if (scrollY >= 950) {
      button1.style.opacity = '0';
      button1.style.pointerEvents = 'none';

      button2.style.opacity = '0';
      button2.style.pointerEvents = 'none';
    } else {
      button1.style.opacity = '1';
      button1.style.pointerEvents = 'auto';

      button2.style.opacity = '1';
      button2.style.pointerEvents = 'auto';
    }
});








window.addEventListener('DOMContentLoaded', () => {
  const images = [];
  const totalImages = 9;
  const startDelay = 1000; // 첫 이미지 딜레이
  const delayStep = 500; // 각 이미지 간의 딜레이 간격
  const triggerOffset = 950; // 스크롤 트리거 위치

  for (let i = 1; i <= totalImages; i++) {
    const id = i === 1 ? 'AnimationImage' : `AnimationImage${i}`;
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('hidden');
      images.push(el);
    }
  }

  function triggerAnimation() {
    const shouldShow = window.scrollY >= triggerOffset;

    images.forEach((img, index) => {
      setTimeout(() => {
        if (shouldShow) {
          img.classList.remove('hidden');
          img.classList.add('show');
        } else {
          img.classList.remove('show');
          img.classList.add('hidden');
        }
      }, startDelay + index * delayStep);
    });
  }

  window.addEventListener('scroll', triggerAnimation);
});