// ✅ ChartDataLabels 플러그인 로드 필수 (HTML에 추가 필요!)
/*
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
*/

document.addEventListener("DOMContentLoaded", () => {
  // ✅ 1. 도넛 차트
  const ctx1 = document.getElementById('wasteChart').getContext('2d');
  const config = {
    type: 'doughnut',
    data: {
      labels: ['플라스틱', '벽돌', '목재', '콘크리트'],
      datasets: [{
        label: '탄소 배출량',
        data: [25, 25, 25, 25],
        backgroundColor: ['#3f51b5', '#ffeb3b', '#ff5722', '#00bcd4'],
        borderWidth: 0,
        cutout: '70%'
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => `${context.label}: ${context.raw}`
          }
        }
      }
    },
    plugins: [{
      id: 'centerText',
      beforeDraw(chart) {
        const { width, height } = chart;
        const ctx = chart.ctx;
        ctx.restore();
        ctx.font = 'bold 16px sans-serif';
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText('Total', width / 2, height / 2 - 10);
        ctx.fillText('100', width / 2, height / 2 + 15);
        ctx.save();
      }
    }]
  };
  new Chart(ctx1, config);

  // ✅ 2. 세로 막대 차트
  const ctx2 = document.getElementById('wasteTypeChart').getContext('2d');
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['철근', '플라스틱', '목재', '기타', '석면', '콘크리트'],
      datasets: [{
        label: '배출량 (kg)',
        data: [20, 40, 55, 25, 65, 75],
        backgroundColor: '#ffeb3b',
        borderRadius: 10,
        barThickness: 30
      }]
    },
    options: {
      responsive: true,
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
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => `${context.raw} kg`
          }
        }
      }
    }
  });

  // ✅ 3. 그룹형 막대 차트
  const ctx3 = document.getElementById('monthlyCompareChart').getContext('2d');
  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [
        {
          label: '폐기물 배출량',
          data: [30, 32, 35, 28, 40, 20],
          backgroundColor: '#ffeb3b'
        },
        {
          label: '탄소 배출량',
          data: [28, 30, 33, 26, 38, 18],
          backgroundColor: '#b388ff'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: 'white', font: { size: 14 } }
        },
        tooltip: {
          callbacks: {
            label: context => `${context.dataset.label}: ${context.raw}`
          }
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

  // ✅ 4. 순위 차트 (여기에 ✔️ ChartDataLabels 추가됨!)
  const ctx4 = document.getElementById('rankChart').getContext('2d');
  new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: ['플라스틱', '콘크리트', '목재', '벽돌'],
      datasets: [{
        label: '배출량 비율',
        data: [48, 17, 19, 29],
        backgroundColor: ['#fdd835', '#4dd0e1', '#29b6f6', '#ce93d8'],
        borderRadius: 10,
        barThickness: 16
      }]
    },
    plugins: [ChartDataLabels], // ✔️ 플러그인 등록

    options: {
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => `${context.raw}%`
          }
        },
        datalabels: { // ✔️ 퍼센트 박스 설정
          anchor: 'end',
          align: 'end',
          color: '#fff',
          backgroundColor: (ctx) => ctx.dataset.backgroundColor[ctx.dataIndex],
          borderRadius: 6,
          padding: 6,
          formatter: (value) => `${value}%`,
          font: { weight: 'bold' }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { color: 'white',display:false },
          grid: { display: false }
        },
        y: {
          ticks: { color: 'white', font: { size: 14 } },
          grid: { display: false }
        }
      }
    }
  });
  const ctx5 = document.getElementById('carbonLineChart').getContext('2d');

    new Chart(ctx5, {
      type: 'line',
      data: {
        labels: [2, 4, 5, 6, 9, 11, 12, 19, 20, 22, 23, 24, 26, 27],
        datasets: [{
          label: '탄소 배출량',
          data: [200, 150, 50, 90, 130, 180, 10, 300, 20, 70, 50, 180, 0, 20],
          backgroundColor: 'rgba(255, 255, 0, 0.3)',  // 반투명 배경
          borderColor: '#ffeb3b',                     // 노란 라인
          borderWidth: 2,
          fill: true,     // ✅ 아래 채우기
          tension: 0.3    // 부드러운 곡선
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { color: 'white' },
            grid: { color: 'rgba(255,255,255,0.05)' }
          },
          y: {
            ticks: {
              color: 'white',
              callback: value => `$${value}K`
            },
            grid: { color: 'rgba(255,255,255,0.1)' }
          }
        }
      }
    });
  const ctx6 = document.getElementById('progressChart').getContext('2d');

    new Chart(ctx6, {
      type: 'doughnut',
      data: {
        labels: ['사용량', '잔여'],
        datasets: [{
          data: [70, 30],
          backgroundColor: ['#ffc107', '#2e2e2e'],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%',
        rotation: -90,
        circumference: 270,  // 반원 느낌
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });
});
