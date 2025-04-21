// Waste_disposalJS.js

// 마우스 따라다니는 캐릭터
const character = document.getElementById('character');
window.addEventListener('mousemove', e => {
  character.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

let wasteChart;

document.addEventListener('DOMContentLoaded', () => {
  const wasteCtx = document.getElementById('wasteChart').getContext('2d');
  wasteChart = new Chart(wasteCtx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: '개수',
        data: [],
        backgroundColor: '#ffff99',
        borderRadius: 10
      }]
    },
    options: {
      plugins: {
        tooltip: { callbacks: { label: ctx => `${ctx.raw}개` } },
        legend: { display: false }
      },
      scales: {
        x: { ticks: { color: 'white' }, grid: { display: false } },
        y: { ticks: { color: 'white' }, grid: { color: '#444' } }
      }
    }
  });

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
        tooltip: { callbacks: { label: ctx => `${ctx.raw} kg` } }
      },
      scales: {
        x: { ticks: { color: 'white' }, grid: { display: false }},
        y: { ticks: { color: 'white' }, grid: { color: '#444' } }
      }
    }
  });

  document.querySelector('.search-icon')?.addEventListener('click', () => {
    const value = document.getElementById('site-search').value.trim();
    if (value) {
      document.getElementById('site-name-display').innerText = value;
    }
  });

  document.querySelector('.date-icon')?.addEventListener('click', () => {
    document.getElementById('site-date').showPicker?.();
  });

  if (typeof detectedCounts !== "undefined") {
    updateStats(detectedCounts);
    updateWasteChart(detectedCounts);
    updateList(detectedCounts);
    updateCarbonTable(detectedCounts);
    document.getElementById('zoom-container').style.display = 'block';
    document.getElementById('placeholder').style.display = 'none';
  }

  const zoomEl = document.getElementById('zoom-container');
  const resetBtn = document.getElementById('resetZoom');
  if (zoomEl && window.panzoom) {
    const panzoomInstance = panzoom(zoomEl, {
      maxZoom: 5,
      minZoom: 0.5,
      bounds: true,
      boundsPadding: 0.1,
      zoomDoubleClickSpeed: 1
    });
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        panzoomInstance.moveTo(0, 0);
        panzoomInstance.zoomAbs(0, 0, 1);
      });
    }
  }

  document.getElementById('reuploadBtn')?.addEventListener('click', () => {
    document.getElementById('fileInput').click();
  });

  // 업로드 클릭 항상 가능하게 설정
  const uploadArea = document.getElementById('uploadArea');
  if (uploadArea) {
    uploadArea.addEventListener('click', () => {
      const fileInput = document.getElementById('fileInput');
      if (fileInput) fileInput.click();
    });
  }
});

function previewImage(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = ev => {
    const prev = document.getElementById('preview'),
          det = document.getElementById('detectionResult'),
          ph = document.getElementById('placeholder'),
          zoom = document.getElementById('zoom-container');

    if (prev) {
      prev.src = ev.target.result;
      prev.style.display = 'block';
    }
    if (det) det.style.display = 'none';
    if (ph) ph.style.display = 'none';
    if (zoom) zoom.style.display = 'none';

    // 👇 현장명과 날짜 값 hidden input에 복사
    document.getElementById('hidden-site-name').value = document.getElementById('site-search')?.value || 'default_site';
    document.getElementById('hidden-site-date').value = document.getElementById('site-date')?.value || 'uploaded_image';

    document.querySelector('form').submit();
  };
  reader.readAsDataURL(file);
}

function updateStats(counts) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  document.getElementById('totalObjects').innerText = total;
  document.getElementById('hazardousCount').innerText = counts['석면'] || 0;
  document.getElementById('recyclableCount').innerText = (counts['플라스틱'] || 0) + (counts['유리'] || 0);
  document.getElementById('carbonEmission').innerText = `${(total * 0.5).toFixed(1)} kg`;
}

function updateWasteChart(counts) {
  const labels = Object.keys(counts);
  const data = labels.map(k => counts[k]);
  wasteChart.data.labels = labels;
  wasteChart.data.datasets[0].data = data;
  wasteChart.update();
}

function updateList(counts) {
  const ul = document.querySelector('.object-list');
  ul.innerHTML = '';
  Object.entries(counts).forEach(([k, v], i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${k}</span><span>${v}개</span>`;
    li.style.background = i % 2 === 0 ? '#ffffcc' : '#ffff99';
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.padding = '6px';
    li.style.borderRadius = '6px';
    ul.appendChild(li);
  });
}

function updateCarbonTable(counts) {
  const tbody = document.querySelector('#carbonTable tbody');
  tbody.innerHTML = '';
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v], i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td style="text-align:center">${String(i + 1).padStart(2, '0')}</td><td>${k}</td><td style="text-align:center">${v}</td><td style="text-align:center">${(v * 0.5).toFixed(1)}</td>`;
      tbody.appendChild(tr);
    });
}