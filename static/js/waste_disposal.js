document.addEventListener("DOMContentLoaded", () => {
      drawMonthlyBarChart();
      drawMonthlyLineChart();
//      drawPopularitySalesChart();
      drawWasteChart();
    });

    function drawMonthlyBarChart() {
      const monthlyData = [
        { month: "1월", value: 120 },
        { month: "2월", value: 140 },
        { month: "3월", value: 100 },
        { month: "4월", value: 180 },
        { month: "5월", value: 160 },
        { month: "6월", value: 200 }
      ];
      const container = document.getElementById("monthly-bar-container");
      container.innerHTML = "";

      monthlyData.forEach(item => {
        const barWrap = document.createElement("div");
        barWrap.style.display = "flex";
        barWrap.style.flexDirection = "column";
        barWrap.style.alignItems = "center";

        barWrap.innerHTML = `
          <div class="month-bar" style="height: ${item.value}px;"><span>${item.value}</span></div>
          <div class="month-label">${item.month}</div>
        `;
        container.appendChild(barWrap);
      });
    }

    function drawMonthlyLineChart() {
      const ctx = document.getElementById("monthly-line-chart").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
          datasets: [
            {
              label: "예상 폐기물량",
              data: [120, 140, 110, 150, 130, 160],
              borderColor: "#ffd54f",
              backgroundColor: "rgba(255, 213, 79, 0.2)",
              fill: true,
              tension: 0.3,
            },
            {
              label: "실제 폐기물량",
              data: [100, 130, 95, 180, 145, 155],
              borderColor: "#4caf50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              fill: true,
              tension: 0.3,
            },
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "폐기물량 (kg)"
              }
            }
          }
        }
      });
    }


<script>
  document.addEventListener('DOMContentLoaded', () => {
    const wasteCtx = document.getElementById('wasteChart').getContext('2d');

    new Chart(wasteCtx, {
      type: 'bar',
      data: {
        labels: ['콘크리트', '철근/금속', '목재', '유리', '플라스틱', '석면'],
        datasets: [{
          label: '비율',
          data: [180000, 200000, 220000, 243000, 210000, 100000],
          backgroundColor: '#ffff99',
          borderRadius: 10,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.raw;
                return `${(value / 1000).toFixed(0)}K`;
              }
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'white',
              font: { size: 12 }
            },
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              color: 'white',
              callback: function(value) {
                return value / 1000 + 'K';
              }
            },
            grid: {
              color: '#444'
            }
          }
        }
      }
    });
  });




    function drawPopularitySalesChart() {
      const ctx = document.getElementById('carbon-rank-canvas').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['플라스틱', '석고', '섬유', '유리'],
          datasets: [
            {
              label: 'Popularity',
              data: [100, 65, 60, 35],
              backgroundColor: '#f9a825'
            },
            {
              label: 'Sales (%)',
              data: [46, 17, 19, 29],
              backgroundColor: '#26c6da'
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#fff'
              }
            },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.dataset.label}: ${ctx.raw}`
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: { color: '#fff' },
              grid: { color: '#444' }
            },
            y: {
              ticks: { color: '#fff' },
              grid: { color: '#444' }
            }
          }
        }
      });
    }

// 샘플 데이터: AI에서 인식한 객체 리스트 (종류, 수량)
//const detectedObjects = [
//  { name: "목재", count: 3 },
//  { name: "철근", count: 5 },
//  { name: "벽돌", count: 2 },
//  { name: "섬유", count: 4 },
//  { name: "플라스틱", count: 3 },
//  { name: "유리", count: 6 }
//];
//
//// DOMContentLoaded 이벤트로 렌더링 보장
//document.addEventListener("DOMContentLoaded", () => {
//  const listContainer = document.getElementById("detected-list");
//  listContainer.innerHTML = ""; // 기존 내용 초기화
//
//  detectedObjects.forEach(obj => {
//    const item = document.createElement("div");
//    item.className = "detected-item";
//    item.innerHTML = `
//      <span>${obj.name}</span>
//      <span>${obj.count}개</span>
//    `;
//    listContainer.appendChild(item);
//  });
//});

const detectedObjects = {
  "목재": 1,
  "철근": 1,
  "벽돌": 1,
  "섬유": 1,
  "플라스틱": 1,
  "유리": 1
};

document.addEventListener("DOMContentLoaded", () => {
   const objectList = document.getElementById('objectList');

   if (!objectList) {
    console.error("❌ objectList 요소를 찾을 수 없습니다!");
    return;
   }

    const mockDetectedObjects = ['목재', '철근', '벽돌', '섬유', '플라스틱', '유리'];
    let index = 0;

    function addDetectedObject(name) {
    const item = document.createElement("li");
    item.textContent = `🔍 ${name}`;
    objectList.appendChild(item);
  }

    setInterval(() => {
    if (index < mockDetectedObjects.length) {
      const name = mockDetectedObjects[index++];
      addDetectedObject(name);
    }
  }, 2000);

});



document.addEventListener("DOMContentLoaded", () => {
  const objectList = document.getElementById("objectList");

  const detectedObjects = ["목재", "철근", "벽돌", "섬유", "플라스틱", "유리"];

  objectList.innerHTML = ""; // 기존 항목 제거

  detectedObjects.forEach((name, index) => {
    const li = document.createElement("li");
    li.className = `object-item ${index % 2 === 0 ? "light" : "yellow"}`;
    li.textContent = `🔹 ${name}`;
    objectList.appendChild(li);
  });
});































//function displayObjectList(data) {
//  const objectList = document.getElementById("objectList");
//  if (!listElement) {
//  console.warn("🔍 objectList 요소를 찾지 못했습니다.");
//  return;
//  }
//
//  listElement.innerHTML = ''; // 초기화
//  for (const [object, count] of Object.entries(data)) {
//    const listItem = document.createElement("li");
//    listItem.textContent = `${object}: ${count}개`;
//    listElement.appendChild(li);
//  }
//}
//
//
//document.addEventListener("DOMContentLoaded", () => {
//  const objectList = document.getElementById('objectList');
//
//  if (!objectList) {
//    console.error("❌ objectList 요소를 찾을 수 없습니다!");
//    return;
//  }
//
//  const mockDetectedObjects = ['목재', '철근', '벽돌', '섬유', '플라스틱', '유리'];
//  let index = 0;
//
//  function addDetectedObject(name) {
//    const item = document.createElement("li");
//    item.textContent = `🔍 ${name}`;
//    objectList.appendChild(item);
//  }
//
//  setInterval(() => {
//    if (index < mockDetectedObjects.length) {
//      const name = mockDetectedObjects[index++];
//      addDetectedObject(name);
//    }
//  }, 2000);
//});
//
//

