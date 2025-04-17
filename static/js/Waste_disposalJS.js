// static/js/Waste_disposalJS.js

// 1) 캐릭터 따라다니기
const character = document.getElementById('character');
window.addEventListener('mousemove', e => {
  character.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

let wasteChart;

document.addEventListener('DOMContentLoaded', () => {
  // 폐기물 종류 비율 바 차트
  const wasteCtx = document.getElementById('wasteChart').getContext('2d');
  wasteChart = new Chart(wasteCtx, {
    type: 'bar',
    data: { labels: [], datasets: [{ label: '개수', data: [], backgroundColor: '#ffff99', borderRadius: 10 }]},
    options: {
      plugins: { tooltip: { callbacks: { label: ctx => `${ctx.raw}개` }}, legend: { display: false }},
      scales: {
        x: { ticks: { color: 'white' }, grid: { display: false }},
        y: { ticks: { color: 'white' }, grid: { color: '#444' }}
      }
    }
  });

  // 월별 탄소 배출량 선 그래프
  const carbonCtx = document.getElementById('carbonChart').getContext('2d');
  new Chart(carbonCtx, {
    type: 'line',
    data: {
      labels: ['1월','2월','3월','4월','5월','6월'],
      datasets: [{
        label: '월별 배출량',
        data: [30000,40000,35000,42000,39000,45000],
        fill: false,
        borderColor: '#00d09c',
        tension: 0.3,
        pointBackgroundColor: 'white'
      }]
    },
    options: {
      plugins: {
        legend: { labels: { color: 'white' }},
        tooltip: { callbacks: { label: ctx => `${ctx.raw} kg` }}
      },
      scales: {
        x: { ticks: { color: 'white' }, grid: { display: false }},
        y: { ticks: { color: 'white' }, grid: { color: '#444' }}
      }
    }
  });

  // 달력 및 검색 아이콘 핸들러
  document.querySelector('.date-icon')?.addEventListener('click', () => {
    document.getElementById('site-date').showPicker?.();
  });
  document.querySelector('.search-icon')?.addEventListener('click', () => {
    const v = document.getElementById('site-search').value.trim();
    document.getElementById('searchDisplay').textContent = `🔍 검색어 결과: ${v || '없음'}`;
    if (v) document.getElementById('site-name-display').innerText = v;
  });
});

// 이미지 미리보기 및 탐지 호출
function previewImage(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const prev = document.getElementById('preview'),
          det = document.getElementById('detectionResult'),
          ph = document.getElementById('placeholder');
    prev.src = ev.target.result;
    prev.style.display = 'block';
    det.style.display = 'none';
    ph.style.display = 'none';
    detectWaste(file);
  };
  reader.readAsDataURL(file);
}

// 탐지 API 호출 및 UI 업데이트
function detectWaste(file) {
  const fd = new FormData();
  fd.append('image', file);
  fetch('/detect', { method: 'POST', body: fd })
    .then(r => r.json())
    .then(data => {
      if (data.result_url) {
        const img = document.getElementById('detectionResult');
        img.src = data.result_url;
        img.style.display = 'block';
      }
      if (data.counts) {
        updateStats(data.counts);
        updateWasteChart(data.counts);
        updateList(data.counts);
        updateCarbonTable(data.counts);
      }
    })
    .catch(console.error);
}

// 통계·차트·리스트·테이블 업데이트
function updateStats(c) {
  const total = Object.values(c).reduce((a,b)=>a+b,0);
  document.getElementById('totalObjects').innerText = total;
  document.getElementById('hazardousCount').innerText = c['석면']||0;
  document.getElementById('recyclableCount').innerText = (c['플라스틱']||0)+(c['유리']||0);
  document.getElementById('carbonEmission').innerText = `${(total*0.5).toFixed(1)} kg`;
}
function updateWasteChart(c) {
  const labels = Object.keys(c), data = labels.map(k=>c[k]);
  wasteChart.data.labels = labels;
  wasteChart.data.datasets[0].data = data;
  wasteChart.update();
}
function updateList(c) {
  const ul = document.querySelector('.object-list');
  ul.innerHTML = '';
  Object.entries(c).forEach(([k,v],i)=>{
    const li = document.createElement('li');
    li.className = i%2?'yellow':'light';
    li.innerHTML = `<span>${k}</span><span>${v}개</span>`;
    ul.appendChild(li);
  });
}
function updateCarbonTable(c) {
  const tbody = document.querySelector('#carbonTable tbody');
  tbody.innerHTML = '';
  Object.entries(c)
    .sort((a,b)=>b[1]-a[1])
    .forEach(([k,v],i)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${String(i+1).padStart(2,'0')}</td><td>${k}</td><td>${v}</td><td>${(v*0.5).toFixed(1)}</td>`;
      tbody.appendChild(tr);
    });
}
