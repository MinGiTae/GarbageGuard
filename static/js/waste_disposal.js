document.addEventListener("DOMContentLoaded", () => {
  // 📌 1. 자원별 폐기물 그래프
  const wasteData = [
    { type: "콘크리트", value: 3200 },
    { type: "철근/금속", value: 4500 },
    { type: "목재", value: 2800 },
    { type: "유리", value: 5100 },
    { type: "플라스틱", value: 3900 },
    { type: "석면", value: 1200 }
  ];

  const maxWaste = Math.max(...wasteData.map(d => d.value));
  const barContainer = document.getElementById("bar-chart-container");
  barContainer.innerHTML = "";

  wasteData.forEach(item => {
    const itemBox = document.createElement("div");
    itemBox.className = "bar-item";

    itemBox.innerHTML = `
      <div class="bar" style="height: ${(item.value / maxWaste) * 100}%" data-value="${item.value}"></div>
      <span class="label">${item.type}</span>
    `;

    barContainer.appendChild(itemBox);
  });

  // 📌 2. 탐지된 객체 리스트
  const detected = ["목재", "철근", "벽돌", "섬유", "플라스틱", "유리"];
  const detectedContainer = document.getElementById("detected-list-container");
  detected.forEach(obj => {
    const item = document.createElement("div");
    item.className = "detected-item";
    item.innerHTML = `<span>📌 ${obj}</span><span class="badge"></span>`;
    detectedContainer.appendChild(item);
  });

  // 📌 3. 탄소 배출 순위
  const carbonData = [
    { label: '콘크리트', value: 1200 },
    { label: '플라스틱', value: 950 },
    { label: '유리', value: 700 },
    { label: '목재', value: 530 },
    { label: '철근', value: 310 },
    { label: '석면', value: 180 }
  ];
  carbonData.sort((a, b) => b.value - a.value);
  const maxCarbon = carbonData[0].value;

  const carbonChart = document.getElementById("carbon-rank-chart");
  carbonChart.innerHTML = "";

  carbonData.forEach(item => {
    const itemBox = document.createElement("div");
    itemBox.className = "carbon-bar-item";

    itemBox.innerHTML = `
      <span class="carbon-label">${item.label}</span>
      <div class="carbon-bar" style="width: ${(item.value / maxCarbon) * 100}%;"><span>${item.value}g</span></div>
    `;

    carbonChart.appendChild(itemBox);
  });

  // 📌 4. 월별 폐기물 그래프
  const monthlyData = [
    { month: "1월", value: 120 },
    { month: "2월", value: 140 },
    { month: "3월", value: 100 },
    { month: "4월", value: 180 },
    { month: "5월", value: 160 },
    { month: "6월", value: 200 }
  ];
  const monthlyChart = document.getElementById("monthly-bar-container");
  monthlyChart.innerHTML = "";

  monthlyData.forEach(item => {
    const barWrap = document.createElement("div");
    barWrap.style.display = "flex";
    barWrap.style.flexDirection = "column";
    barWrap.style.alignItems = "center";

    barWrap.innerHTML = `
      <div class="month-bar" style="height: ${item.value}px;"><span>${item.value}</span></div>
      <div class="month-label">${item.month}</div>
    `;

    monthlyChart.appendChild(barWrap);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("monthly-line-chart").getContext("2d");

  const chart = new Chart(ctx, {
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
});


const carbonData = [
  { name: '플라스틱', value: 460 },
  { name: '석면', value: 170 },
  { name: '콘크리트', value: 190 },
  { name: '유리', value: 280 }
];

const maxValue = Math.max(...carbonData.map(d => d.value));
const tbody = document.getElementById("carbon-table-body");

carbonData.forEach((item, index) => {
  const percent = ((item.value / maxValue) * 100).toFixed(0);
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>0${index + 1}</td>
    <td>${item.name}</td>
    <td>
      <div class="bar-container">
        <div class="carbon-bar" style="width: ${percent}%; background-color: ${getColor(index)};"></div>
      </div>
    </td>
    <td><span class="badge" style="background-color: ${getColor(index)};">${percent}%</span></td>
  `;

  tbody.appendChild(row);
});

function getColor(index) {
  const colors = ["#ff9800", "#80deea", "#42a5f5", "#ce93d8"];
  return colors[index % colors.length];
}




function renderCarbonChart() {
  const ctx = document.getElementById("carbon-rank-canvas").getContext("2d");

  const carbonData = {
    labels: ['콘크리트', '플라스틱', '유리', '목재', '철근', '석면'],
    datasets: [{
      label: '탄소 배출량 (g)',
      data: [1200, 950, 700, 530, 310, 180],
      backgroundColor: [
        '#ff9800', '#4caf50', '#2196f3',
        '#9c27b0', '#f44336', '#607d8b'
      ],
      borderRadius: 8,
    }]
  };

  const config = {
    type: 'bar',
    data: carbonData,
    options: {
      indexAxis: 'y', // 수평 바 차트
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => `${context.raw}g`
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { color: '#fff' },
          title: {
            display: true,
            text: 'g',
            color: '#ccc'
          },
          grid: { color: '#444' }
        },
        y: {
          ticks: { color: '#fff' },
          grid: { color: '#444' }
        }
      }
    }
  };

  new Chart(ctx, config);
}

