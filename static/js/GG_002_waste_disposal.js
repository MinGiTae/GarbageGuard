// static/js/GG_002_waste_disposal.js

// 📌 템플릿에서 주입된 전역 변수
// CURRENT_SITE_ID: 서버에서 내려준 현장 ID (문자열 혹은 빈 문자열)
// resultImgPath: 서버에서 내려준 분석 결과 이미지 경로 (예: "오페라하우스/오페라하우스_2025-04-30.jpg") 혹은 빈 문자열
// detectedCounts: 서버에서 내려준 탐지된 객체별 개수 객체 혹은 undefined
console.log('[WasteDisposal.js] 로드 완료:', {
  CURRENT_SITE_ID,
  resultImgPath,
  detectedCounts
});

// 전역 차트 변수
let wasteChart;
let carbonChart;

/**
 * 차트 초기화
 */
function initializeCharts() {
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
  carbonChart = new Chart(carbonCtx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: '월별 폐기물 탄소 배출량 (kg)',
        data: [],
        fill: false,
        tension: 0.3,
        pointBackgroundColor: 'white'
      }]
    },
    options: {
      plugins: {
        legend: { labels: { color: 'white' } },
        tooltip: { callbacks: { label: ctx => `${ctx.raw} kg` } }
      },
      scales: {
        x: { ticks: { color: 'white' }, grid: { display: false } },
        y: { ticks: { color: 'white' }, grid: { color: '#444' } }
      }
    }
  });
}

/**
 * 월별 통계 로드
 */
function loadMonthlyStats(siteId) {
  if (!siteId) {
    console.log('[loadMonthlyStats] siteId 없음 – 차트 로드 생략');
    return;
  }
  console.log('[loadMonthlyStats] siteId=', siteId);
  fetch(`/upload/monthly_stats?site_id=${siteId}`)
    .then(res => res.json())
    .then(data => {
      console.log('[loadMonthlyStats] 응답 데이터=', data);
      let labels = data.map(d => d.month);
      let values = data.map(d => d.total_emission);

      const current = new Date().toISOString().slice(0,7);
      if (!labels.includes(current)) {
        labels.push(current);
        values.push(0);
      }

      const sorted = labels
        .map((m,i) => ({ month: m, emission: values[i] }))
        .sort((a,b) => a.month.localeCompare(b.month));
      const sortedLabels = sorted.map(x => x.month);
      const sortedValues = sorted.map(x => x.emission);

      carbonChart.destroy();
      const ctx = document.getElementById('carbonChart').getContext('2d');
      carbonChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: sortedLabels,
          datasets: [{
            label: '월별 폐기물 탄소 배출량 (kg)',
            data: sortedValues,
            fill: false,
            tension: 0.3,
            pointBackgroundColor: 'white'
          }]
        },
        options: {
          plugins: {
            legend: { labels: { color: 'white' } },
            tooltip: { callbacks: { label: ctx => `${ctx.raw} kg` } }
          },
          scales: {
            x: { ticks: { color: 'white' }, grid: { display: false } },
            y: { ticks: { color: 'white' }, grid: { color: '#444' } }
          }
        }
      });
    })
    .catch(e => console.error('[loadMonthlyStats] 실패', e));
}

/**
 * 회사-현장 연동
 */
function bindCompanySite() {
  console.log('[bindCompanySite] 초기화');
  const c = document.getElementById('company-select');
  const s = document.getElementById('site-select');
  const disp = document.getElementById('site-name-display');

  c.addEventListener('change', () => {
    const cid = c.value;
    Array.from(s.options).forEach(opt => {
      if (!opt.value) return;
      opt.style.display = opt.getAttribute('data-company') === cid ? 'block' : 'none';
    });
    s.value = '';
    disp.innerText = '현장명 없음';
  });

  s.addEventListener('change', () => {
    const cname = c.selectedOptions[0]?.text || '';
    const sname = s.selectedOptions[0]?.text || '';
    disp.innerText = cname && sname ? `${cname} - ${sname}` : '현장명 없음';
  });
}

/**
 * Panzoom 바인딩
 */
function bindPanzoom() {
  console.log('[bindPanzoom] 초기화');
  const el = document.getElementById('zoom-container');
  if (el && window.panzoom) {
    const pz = panzoom(el, { maxZoom:5, minZoom:0.5, bounds:true, boundsPadding:0.1 });
    document.getElementById('resetZoom').addEventListener('click', () => {
      pz.moveTo(0,0);
      pz.zoomAbs(0,0,1);
    });
    document.getElementById('reuploadBtn').addEventListener('click', () => {
      document.getElementById('fileInput').click();
    });
  }
}

/**
 * 서버 전달 탐지 결과 표시
 */
function showDetection() {
  if (!resultImgPath || typeof detectedCounts !== 'object') {
    console.log('[showDetection] 탐지 결과 없음');
    return;
  }
  console.log('[showDetection] detectedCounts=', detectedCounts);

  updateStats(detectedCounts);
  updateWasteChart(detectedCounts);
  updateList(detectedCounts);
  updateCarbonTable(detectedCounts);

  document.getElementById('zoom-container').style.display = 'block';
  document.getElementById('placeholder').style.display = 'none';
}

/**
 * 저장 버튼 핸들러
 */
function bindSave() {
  console.log('[bindSave] 초기화');
  document.querySelector('.save-button').addEventListener('click', () => {
    if (!resultImgPath || typeof detectedCounts !== 'object') {
      alert('저장할 분석 결과가 없습니다.');
      return;
    }
    const payload = {
      company_id: document.getElementById('company-select').value,
      site_id: document.getElementById('site-select').value,
      site_name: document.getElementById('site-select').selectedOptions[0]?.text,
      site_date: document.getElementById('site-date').value,
      result_img: resultImgPath.replace('/result/',''),
      detected: detectedCounts
    };
    fetch('/upload/save_result', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(payload)
    })
    .then(r => r.json())
    .then(d => alert(d.message))
    .catch(e => { console.error('[bindSave] 저장 실패', e); alert('저장 실패'); });
  });
}

/**
 * 미리보기 & 자동 제출
 */
function previewImage(e) {
  const file = e.target.files[0];
  if (!file) return;

  document.getElementById('hidden-site-name').value = document.getElementById('site-select').selectedOptions[0]?.text || '';
  document.getElementById('hidden-site-date').value = document.getElementById('site-date').value || '';

  const reader = new FileReader();
  reader.onload = () => {
    const prev = document.getElementById('preview');
    prev.src = reader.result;
    prev.style.display = 'block';
    setTimeout(() => document.querySelector('form').submit(), 200);
  };
  reader.readAsDataURL(file);
}

/**
 * 숫자판 업데이트
 */
function updateStats(counts) {
  const total = Object.values(counts).reduce((sum,v) => sum + v, 0);
  document.getElementById('totalObjects').innerText   = total;
  document.getElementById('hazardousCount').innerText = counts['석면'] || 0;
  document.getElementById('recyclableCount').innerText = (counts['플라스틱']||0) + (counts['유리']||0);
  document.getElementById('carbonEmission').innerText = `${(total*0.5).toFixed(1)} kg`;
}

/**
 * 폐기물 비율 차트 업데이트
 */
function updateWasteChart(counts) {
  wasteChart.data.labels = Object.keys(counts);
  wasteChart.data.datasets[0].data = Object.values(counts);
  wasteChart.update();
}

/**
 * 탐지된 객체 리스트 생성
 */
function updateList(counts) {
  const ul = document.querySelector('.object-list');
  ul.innerHTML = '';
  Object.entries(counts).forEach(([name, cnt], idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${name}</span><span>${cnt}개</span>`;
    li.style.background = idx % 2 === 0 ? '#ffffcc' : '#ffff99';
    ul.appendChild(li);
  });
}

/**
 * Top Carbon 테이블 업데이트
 */
function updateCarbonTable(counts) {
  const tbody = document.querySelector('#carbonTable tbody');
  tbody.innerHTML = '';
  Object.entries(counts)
    .sort((a,b) => b[1] - a[1])
    .forEach(([name, cnt], idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="text-align:center">${String(idx+1).padStart(2,'0')}</td>
        <td>${name}</td>
        <td style="text-align:center">${cnt}</td>
        <td style="text-align:center">${(cnt*0.5).toFixed(1)}</td>
      `;
      tbody.appendChild(tr);
    });
}

// 모든 초기화 및 이벤트 바인딩
window.addEventListener('DOMContentLoaded', () => {
  initializeCharts();
  loadMonthlyStats(CURRENT_SITE_ID);
  bindCompanySite();
  bindPanzoom();
  showDetection();
  bindSave();
  document.getElementById('fileInput').addEventListener('change', previewImage);
});
