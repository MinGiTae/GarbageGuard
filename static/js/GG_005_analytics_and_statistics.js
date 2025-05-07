const ctx1 = document.getElementById('carbonChart').getContext('2d');
new Chart(ctx1, {
  type: 'doughnut',
  data: {
    labels: ['플라스틱', '벽돌', '목재', '콘크리트'],
    datasets: [{
      data: [25, 20, 30, 25],
      backgroundColor: [
        '#6366F1', '#FACC15', '#FB923C', '#22D3EE'
      ],
      borderWidth: 0
    }]
  },
  options: {
    cutout: '70%',
    plugins: {
      title: {
        display: true,
        text: '폐기물별 탄소 배출량',
        color: 'white',
        font: { size: 17, weight: 'bold' },
        align: 'start',
        padding: { bottom: 20 }
      },
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        labels: {
          color: 'white',
          boxWidth: 10,
          padding: 40,
          font: { size: 14 },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: '#333',
        bodyColor: '#fff',
        borderColor: '#555',
        borderWidth: 1
      }
    }
  }
});

const ctx2 = document.getElementById('wasteChart').getContext('2d');
new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['섬유', '플라스틱', '벽돌', '유리', '목재', '콘크리트'],
    datasets: [{
      label: '배출량',
      data: [10, 20, 30, 12, 25, 35],
      backgroundColor: '#FACC15',
      borderRadius: 20,
      barPercentage: 0.5,
      categoryPercentage: 0.5
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: '폐기물 종류별 배출량',
        color: 'white',
        font: { size: 24, weight: 'bold' },
        align: 'start',
        padding: { bottom: 30 }
      }
    },
    scales: {
      x: {
        ticks: { color: 'white', font: { size: 14 } },
        grid: { display: false }
      },
      y: {
        ticks: { color: 'white', font: { size: 14 }, stepSize: 10 },
        grid: { color: '#333' }
      }
    }
  }
});

const ctx3 = document.getElementById('monthlyCompareChart').getContext('2d');
new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: '폐기물 배출량',
        data: [30, 32, 35, 28, 40, 20],
        backgroundColor: '#fbbf24',
        borderRadius: 6
      },
      {
        label: '탄소 배출량',
        data: [28, 30, 33, 26, 38, 18],
        backgroundColor: '#3b82f6',
        borderRadius: 6
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: { color: 'white', font: { size: 14 } }
      },
      title: {
        display: true,
        text: '월별 탄소량과 폐기물량 비교',
        color: 'white',
        font: { size: 20, weight: 'bold' },
        padding: { bottom: 20 }
      }
    },
    scales: {
      x: {
        ticks: { color: 'white', font: { size: 14 } },
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        ticks: { color: 'white', font: { size: 14 } },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  }
});

const ctx4 = document.getElementById('marchWasteChart').getContext('2d');
new Chart(ctx4, {
  type: 'bar',
  data: {
    labels: ['플라스틱', '콘크리트', '목재', '벽돌'],
    datasets: [{
      label: '배출량 (%)',
      data: [46, 17, 19, 29],
      backgroundColor: ['#f5a623', '#80deea', '#42a5f5', '#ce93d8'],
      borderRadius: 10,
      barThickness: 20
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: '3월 폐기물 배출량 순위',
        color: 'white',
        font: { size: 20, weight: 'bold' },
        align: 'start',
        padding: { bottom: 30 }
      },
      legend: { display: false },
      datalabels: {
        color: '#fff',
        backgroundColor: function(context) {
          const colors = [
            'rgba(245, 166, 35, 0.2)', 'rgba(128, 222, 234, 0.2)',
            'rgba(66, 165, 245, 0.2)', 'rgba(206, 147, 216, 0.2)'
          ];
          return colors[context.dataIndex];
        },
        borderColor: function(context) {
          const borderColors = ['#f5a623', '#80deea', '#42a5f5', '#ce93d8'];
          return borderColors[context.dataIndex];
        },
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        anchor: 'end',
        align: 'end',
        formatter: value => `${value}%`,
        font: { weight: 'bold', size: 12 },
        clamp: true
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.raw}%`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#ccc',
          callback: val => `${val}%`
        },
        grid: { color: 'rgba(255, 255, 255, 0.05)' }
      },
      y: {
        ticks: { color: 'white' },
        grid: { display: false }
      }
    }
  },
  plugins: [ChartDataLabels]
});

const ctx5 = document.getElementById('companyCarbonChart').getContext('2d');
new Chart(ctx5, {
  type: 'line',
  data: {
    labels: ['현대건설', 'GS건설', '태영건설', '한화건설', '대림건설'],
    datasets: [{
      label: '탄소 배출량 (톤)',
      data: [120, 95, 80, 70, 60],
      borderColor: '#4fc3f7',
      backgroundColor: 'rgba(79, 195, 247, 0.2)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#4fc3f7',
      pointBorderColor: '#fff',
      pointRadius: 6,
      pointHoverRadius: 8
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: '건설사별 탄소 배출량',
        color: 'white',
        font: { size: 20, weight: 'bold' },
        align: 'start',
        padding: { bottom: 30 }
      },
      legend: { labels: { color: 'white' } },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.raw}톤`
        }
      }
    },
    scales: {
      x: {
        ticks: { color: 'white', font: { size: 14 } },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        beginAtZero: true,
        ticks: { color: 'white', font: { size: 14 } },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  }
});
const ctx6 = document.getElementById('topCompanyChart').getContext('2d');
new Chart(ctx6, {
  type: 'doughnut',
  data: {
    labels: ['탄소 배출량', '나머지'],
    datasets: [{
      data: [70, 30],
      backgroundColor: ['#FACC15', '#222'],
      borderWidth: 0,
      cutout: '70%'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      title: {
        display: true,
        text: '미래건설 탄소 배출량',
        color: 'white',
        font: { size: 20, weight: 'bold' },
        padding: { top: 20, bottom: 20 }
      }
    }
  },
  plugins: [{
    id: 'centerText',
    beforeDraw(chart) {
      const { width, height, ctx } = chart;
      ctx.save();
      ctx.font = 'bold 30px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('70%', width / 2, height / 2 + 30);
      ctx.restore();
    }
  }]
});

const ctx7  = document.getElementById('siteCarbonChart').getContext('2d');
const gradient1 = ctx7.createLinearGradient(0, 0, 0, 300);
gradient1.addColorStop(0, 'rgba(34, 211, 238, 0.5)');
gradient1.addColorStop(1, 'rgba(34, 211, 238, 0.05)');

const gradient2 = ctx7.createLinearGradient(0, 0, 0, 300);
gradient2.addColorStop(0, 'rgba(236, 72, 153, 0.5)');
gradient2.addColorStop(1, 'rgba(236, 72, 153, 0.05)');

siteCarbonChart = new Chart(ctx7, {
  type: 'line',
  data: {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월'],
    datasets: [
      {
        label: '현장 A',
        data: [30, 25, 35, 28, 33, 30, 40, 38, 35, 50],
        fill: true,
        backgroundColor: gradient1,
        borderColor: '#22D3EE',
        tension: 0.4,
        pointBackgroundColor: '#22D3EE',
        pointBorderColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: '현장 B',
        data: [20, 18, 25, 22, 25, 24, 28, 27, 30, 40],
        fill: true,
        backgroundColor: gradient2,
        borderColor: '#EC4899',
        tension: 0.4,
        pointBackgroundColor: '#EC4899',
        pointBorderColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: '현장 탄소 배출량',
        color: 'white',
        font: { size: 18, weight: 'bold' },
        padding: { bottom: 20 }
      },
      legend: {
        labels: { color: 'white', font: { size: 14 } }
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.raw}톤`
        }
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        beginAtZero: true,
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    }
  }
});

const ctx8 = document.getElementById('wastePopularityChart').getContext('2d');
wastePopularityChart = new Chart(ctx8, {
  type: 'bar',
  data: {
    labels: ['플라스틱', '콘크리트', '목재', '벽돌'],
    datasets: [{
      label: '배출량 (%)',
      data: [46, 17, 19, 29],
      backgroundColor: ['#f5a623', '#80deea', '#42a5f5', '#ce93d8'],
      borderRadius: 10,
      barThickness: 20
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: '현장 폐기물 배출량 순위',
        color: 'white',
        font: { size: 20, weight: 'bold' },
        align: 'start',
        padding: { bottom: 30 }
      },
      legend: { display: false },
      datalabels: {
        color: '#fff',
        backgroundColor: function(context) {
          const colors = [
            'rgba(245, 166, 35, 0.2)', 'rgba(128, 222, 234, 0.2)',
            'rgba(66, 165, 245, 0.2)', 'rgba(206, 147, 216, 0.2)'
          ];
          return colors[context.dataIndex];
        },
        borderColor: function(context) {
          const borderColors = ['#f5a623', '#80deea', '#42a5f5', '#ce93d8'];
          return borderColors[context.dataIndex];
        },
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        anchor: 'end',
        align: 'end',
        formatter: value => `${value}%`,
        font: { weight: 'bold', size: 12 },
        clamp: true
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.raw}%`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#ccc',
          callback: val => `${val}%`
        },
        grid: { color: 'rgba(255, 255, 255, 0.05)' }
      },
      y: {
        ticks: { color: 'white' },
        grid: { display: false }
      }
    }
  },
  plugins: [ChartDataLabels]
});


const siteLineCanvas = document.getElementById("siteLineChart");
if (siteLineCanvas) {
  siteLineCanvas.width = siteLineCanvas.offsetWidth;
  siteLineCanvas.height = 300;
  siteLineChart = new Chart(siteLineCanvas.getContext("2d"), {
    type: "line",
    data: {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월'],
      datasets: [{
        label: "탄소 배출량",
        data: [],
        borderColor: "#4fc3f7",
        backgroundColor: "rgba(79,195,247,0.2)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
        y: { beginAtZero: true, ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } }
      },
      plugins: {
        legend: { labels: { color: "#fff" } },
        title: {
          display: true,
          text: "월별 탄소 배출량",
          color: "#fff",
          font: { size: 18, weight: "bold" },
          padding: { bottom: 20 }
        }
      }
    }
  });
}

// ✅ SVG Hover로 지역별 현장 리스트 띄우기 추가


const siteData = {
  "Seoul": {
    "sites": ["Seoul 현장 1"],
    "carbonData": [22, 48, 22, 39, 40, 53, 39, 53, 52, 38],
    "wasteData": [37, 25, 10, 31]
  },
  "Busan": {
    "sites": ["Busan 현장 1"],
    "carbonData": [39, 26, 34, 60, 32, 55, 39, 25, 55, 38],
    "wasteData": [33, 26, 29, 26]
  },
  "Daegu": {
    "sites": ["Daegu 현장 1"],
    "carbonData": [44, 22, 49, 35, 56, 39, 58, 53, 27, 42],
    "wasteData": [33, 27, 40, 39]
  },
  "Incheon": {
    "sites": ["Incheon 현장 1", "Incheon 현장 2", "Incheon 현장 3"],
    "carbonData": [26, 33, 37, 40, 23, 60, 16, 29, 49, 56],
    "wasteData": [12, 13, 33, 26]
  },
  "Gwangju": {
    "sites": ["Gwangju 현장 1"],
    "carbonData": [39, 25, 47, 33, 17, 47, 53, 28, 17, 55],
    "wasteData": [30, 33, 16, 15]
  },
  "Daejeon": {
    "sites": ["Daejeon 현장 1", "Daejeon 현장 2"],
    "carbonData": [32, 35, 23, 45, 59, 30, 46, 49, 31, 60],
    "wasteData": [20, 15, 22, 16]
  },
  "Ulsan": {
    "sites": ["Ulsan 현장 1"],
    "carbonData": [20, 27, 31, 59, 18, 24, 27, 53, 59, 27],
    "wasteData": [34, 21, 16, 17]
  },
  "Sejong": {
    "sites": ["Sejong 현장 1", "Sejong 현장 2"],
    "carbonData": [45, 23, 47, 56, 43, 19, 43, 54, 30, 55],
    "wasteData": [18, 10, 33, 35]
  },
  "Gyeonggi": {
    "sites": ["Gyeonggi 현장 1"],
    "carbonData": [31, 31, 42, 33, 35, 34, 59, 23, 31, 37],
    "wasteData": [34, 36, 33, 17]
  },
  "Gangwon": {
    "sites": ["Gangwon 현장 1"],
    "carbonData": [17, 23, 45, 31, 16, 47, 47, 31, 59, 23],
    "wasteData": [30, 27, 37, 11]
  },
  "Chungbuk": {
    "sites": ["Chungbuk 현장 1", "Chungbuk 현장 2"],
    "carbonData": [54, 28, 27, 20, 39, 20, 58, 25, 29, 49],
    "wasteData": [35, 21, 30, 13]
  },
  "Chungnam": {
    "sites": ["Chungnam 현장 1", "Chungnam 현장 2", "Chungnam 현장 3"],
    "carbonData": [57, 51, 45, 28, 19, 53, 24, 32, 17, 23],
    "wasteData": [20, 37, 14, 27]
  },
  "Jeonbuk": {
    "sites": ["Jeonbuk 현장 1", "Jeonbuk 현장 2", "Jeonbuk 현장 3"],
    "carbonData": [58, 60, 57, 33, 53, 29, 45, 56, 50, 27],
    "wasteData": [18, 32, 11, 34]
  },
  "Jeonnam": {
    "sites": ["Jeonnam 현장 1", "Jeonnam 현장 2"],
    "carbonData": [50, 56, 58, 39, 50, 40, 24, 48, 49, 43],
    "wasteData": [26, 19, 22, 31]
  },
  "Gyeongbuk": {
    "sites": ["Gyeongbuk 현장 1", "Gyeongbuk 현장 2", "Gyeongbuk 현장 3"],
    "carbonData": [47, 39, 24, 15, 59, 48, 19, 33, 28, 54],
    "wasteData": [23, 21, 13, 34]
  },
  "Gyeongnam": {
    "sites": ["Gyeongnam 현장 1"],
    "carbonData": [33, 57, 49, 39, 23, 46, 23, 49, 42, 56],
    "wasteData": [33, 34, 38, 27]
  },
  "Jeju": {
    "sites": ["Jeju 현장 1", "Jeju 현장 2"],
    "carbonData": [47, 32, 60, 56, 23, 59, 17, 29, 53, 51],
    "wasteData": [21, 11, 15, 36]
  }
};





const idToRegionName = {
  "KR-11": "Seoul",
  "KR-26": "Busan",
  "KR-27": "Daegu",
  "KR-28": "Incheon",
  "KR-29": "Gwangju",
  "KR-30": "Daejeon",     // 대전광역시
  "KR-31": "Ulsan",       // 울산광역시
  "KR-41": "Gyeonggi",    // 경기도
  "KR-42": "Gangwon",     // 강원도
  "KR-43": "Chungbuk",    // 충청북도
  "KR-44": "Chungnam",    // 충청남도
  "KR-45": "Jeonbuk",     // 전라북도
  "KR-46": "Jeonnam",     // 전라남도
  "KR-47": "Gyeongbuk",   // 경상북도
  "KR-48": "Gyeongnam",   // 경상남도
  "KR-49": "Jeju",        // 제주특별자치도
  "KR-50": "Sejong"
};

const regionEmission = {};
for (const region in siteData) {
  const carbonList = siteData[region].carbonData || [];
  const totalCarbon = carbonList.reduce((a, b) => a + b, 0);
  regionEmission[region] = totalCarbon;
}

const getStep = (value) => {
  if (value > 300) return 3;
  if (value > 150) return 2;
  return 1;
};

const getColorByStep = (step) => {
  if (step === 3) return "#d73027";  // 빨강
  if (step === 2) return "#fc8d59";  // 주황
  return "#fee08b";                  // 노랑
};

document.querySelectorAll("#korea-map path").forEach(region => {
  const regionId = region.getAttribute("id");
  const regionName = idToRegionName[regionId];
  const emission = regionEmission[regionName];

  console.log(regionId, regionName, emission);

  if (emission !== undefined) {
    const step = getStep(emission);
    region.style.fill = getColorByStep(step);
  }
});














document.querySelectorAll("#korea-map path").forEach(region => {
  region.addEventListener("click", (e) => {
    const regionId = region.getAttribute("id");
    const regionName = idToRegionName[regionId];
    const regionData = siteData[regionName];
    const sites =  regionData?.sites || [];

    const popup = document.getElementById("construction-list");


    let siteListHTML = `
   <div class="popup-header">
    <h3>${regionName} 건설현장</h3>
    <span class="popup-close" onclick="closePopup()">✕</span>
  </div>
  <ul>
 `;
  sites.forEach(site => {
  siteListHTML += `<li>${site}</li>`;
});


    siteListHTML += "</ul>";
    popup.innerHTML = siteListHTML;
    popup.classList.add("active");

    // 마우스 위치 기준으로 팝업 위치 조정
    popup.style.left = `${e.pageX + 15}px`;
    popup.style.top = `${e.pageY - 50}px`;

    if (regionData) {
    siteCarbonChart.data.datasets[0].data = regionData.carbonData;
    siteCarbonChart.update();

    wastePopularityChart.data.datasets[0].data = regionData.wasteData;
    wastePopularityChart.update();
}










  });
});

document.addEventListener("click", (e) => {
  const popup = document.getElementById("construction-list");
  const isMapPath = e.target.closest("#korea-map path");
  const isPopup = e.target.closest("#construction-list");

  // 지도나 팝업 내부가 아닌 다른 영역 클릭 시 닫기
  if (!isMapPath && !isPopup) {
    popup.classList.remove("active");
  }
});
// 🔽 이 아래에 추가
function closePopup() {
  const popup = document.getElementById("construction-list");
  popup.classList.remove("active");
}
