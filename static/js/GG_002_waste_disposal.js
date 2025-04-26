// static/js/Waste_disposalJS.js

// HTML 템플릿 최상단에 아래 스크립트를 추가하세요:
// <script>const CURRENT_SITE_ID = {{ site_id or 'null' }};</script>

// 마우스 따라다니는 캐릭터
const character = document.getElementById('character');
window.addEventListener('mousemove', e => {
  character.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

let wasteChart;
let carbonChart;
let resultImgPath = ''; // 분석된 이미지 경로 저장용 전역변수

document.addEventListener('DOMContentLoaded', () => {
  // —— 폐기물 종류 차트 (bar) 초기화 ——
  const wasteCtx = document.getElementById('wasteChart').getContext('2d');
  wasteChart = new Chart(wasteCtx, {
    type: 'bar',
    data: { labels: [], datasets: [{ label: '개수', data: [], backgroundColor: '#ffff99', borderRadius: 10 }] },
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

  // —— 월별 배출량 차트 (line) 컨텍스트만 가져두기 ——
  const carbonCtx = document.getElementById('carbonChart').getContext('2d');

  // —— 월별 통계 API 호출 & carbonChart 그리기 ——
  function loadMonthlyStats(siteId) {
    const url = '/api/monthly_stats' + (siteId ? `?site_id=${siteId}` : '');
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // 1) API 데이터에서 labels, values 추출
        let labels = data.map(d => d.month);
        let values = data.map(d => d.total_emission);

        // 2) 현재 월 문자열 (YYYY-MM)
        const thisMonth = new Date().toISOString().slice(0, 7);

        // 3) 현재 월이 없으면 추가 (값 0)
        if (!labels.includes(thisMonth)) {
          labels.push(thisMonth);
          values.push(0);
        }

        // 4) 월 순으로 정렬
        const combined = labels.map((m, i) => ({ month: m, emission: values[i] }));
        combined.sort((a, b) => a.month.localeCompare(b.month));
        const sortedLabels = combined.map(x => x.month);
        const sortedValues = combined.map(x => x.emission);

        // 5) 차트 갱신
        if (carbonChart) carbonChart.destroy();
        carbonChart = new Chart(carbonCtx, {
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
      .catch(err => console.error('월별 통계 로드 실패:', err));
  }

  // 페이지 로드 시 전체 또는 현장별 월별 통계 불러오기
  if (typeof CURRENT_SITE_ID !== 'undefined' && CURRENT_SITE_ID) {
    loadMonthlyStats(CURRENT_SITE_ID);
  } else {
    loadMonthlyStats('');
  }

  // — 탐지 결과 관련 UI 업데이트 핸들러 —
  document.querySelector('.search-icon')?.addEventListener('click', () => {
    const v = document.getElementById('site-search').value.trim();
    if (v) document.getElementById('site-name-display').innerText = v;
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

    const el = document.getElementById('detectionResult');
    if (el) resultImgPath = el.getAttribute('src');
  }

  // panzoom & 버튼
  const zoomEl = document.getElementById('zoom-container'),
        resetBtn = document.getElementById('resetZoom');
  if (zoomEl && window.panzoom) {
    const pz = panzoom(zoomEl, { maxZoom:5, minZoom:0.5, bounds:true, boundsPadding:0.1, zoomDoubleClickSpeed:1 });
    resetBtn?.addEventListener('click', () => {
      pz.moveTo(0,0);
      pz.zoomAbs(0,0,1);
    });
  }
  document.getElementById('reuploadBtn')?.addEventListener('click', () => {
    document.getElementById('fileInput')?.click();
  });

  // 저장 버튼 → /upload/save_result
  document.querySelector('.save-button')?.addEventListener('click', () => {
    if (!resultImgPath || typeof detectedCounts==='undefined') {
      alert("저장할 분석 결과가 없습니다.");
      return;
    }
    fetch('/upload/save_result', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({
        site_name: document.getElementById('site-search').value,
        site_date: document.getElementById('site-date').value,
        result_img: resultImgPath.replace('/result/',''),
        detected: detectedCounts
      })
    })
    .then(r=>r.json()).then(d=>alert(d.message))
    .catch(()=>alert("저장 실패. 다시 시도해주세요."));
  });

  // 업로드 영역 클릭
  document.getElementById('uploadArea')?.addEventListener('click', () => {
    document.getElementById('fileInput')?.click();
  });
});

// 이미지 미리보기 & 폼 자동 제출
function previewImage(e) {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = ev => {
    document.getElementById('preview').src = ev.target.result;
    document.getElementById('preview').style.display = 'block';
    document.getElementById('detectionResult').style.display = 'none';
    document.getElementById('placeholder').style.display = 'none';
    document.getElementById('zoom-container').style.display = 'none';
    document.getElementById('hidden-site-name').value =
      document.getElementById('site-search')?.value || 'default_site';
    document.getElementById('hidden-site-date').value =
      document.getElementById('site-date')?.value || 'uploaded_image';
    document.querySelector('form').submit();
  };
  r.readAsDataURL(f);
}

// 통계판 업데이트 함수들
function updateStats(counts) {
  const total = Object.values(counts).reduce((a,b)=>a+b,0);
  document.getElementById('totalObjects').innerText = total;
  document.getElementById('hazardousCount').innerText = counts['석면']||0;
  document.getElementById('recyclableCount').innerText = (counts['플라스틱']||0)+(counts['유리']||0);
  document.getElementById('carbonEmission').innerText = `${(total*0.5).toFixed(1)} kg`;
}

function updateWasteChart(counts) {
  const labels = Object.keys(counts), data = labels.map(k=>counts[k]);
  wasteChart.data.labels = labels;
  wasteChart.data.datasets[0].data = data;
  wasteChart.update();
}

function updateList(counts) {
  const ul = document.querySelector('.object-list'); ul.innerHTML='';
  Object.entries(counts).forEach(([k,v],i)=>{
    const li=document.createElement('li');
    li.innerHTML=`<span>${k}</span><span>${v}개</span>`;
    li.style.background = i%2===0?'#ffffcc':'#ffff99';
    li.style.display='flex'; li.style.justifyContent='space-between';
    li.style.padding='6px'; li.style.borderRadius='6px';
    ul.appendChild(li);
  });
}

function updateCarbonTable(counts) {
  const tbody=document.querySelector('#carbonTable tbody');
  tbody.innerHTML='';
  Object.entries(counts)
    .sort((a,b)=>b[1]-a[1])
    .forEach(([k,v],i)=>{
      const tr=document.createElement('tr');
      tr.innerHTML=
        `<td style="text-align:center">${String(i+1).padStart(2,'0')}</td>`+
        `<td>${k}</td>`+
        `<td style="text-align:center">${v}</td>`+
        `<td style="text-align:center">${(v*0.5).toFixed(1)}</td>`;
      tbody.appendChild(tr);
    });
}


//.