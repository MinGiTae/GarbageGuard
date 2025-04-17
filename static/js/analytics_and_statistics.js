document.addEventListener("DOMContentLoaded", () => {
  // 1. 도넛 차트
  const ctx1 = document.getElementById('wasteChart').getContext('2d');
  new Chart(ctx1, {
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
            label: ctx => `${ctx.label}: ${ctx.raw}`
          }
        }
      }
    },
    plugins: [{
      id: 'centerText',
      beforeDraw(chart) {
        const { width, height, ctx } = chart;
        ctx.restore();
        ctx.font = 'bold 16px sans-serif';
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText('Total', width / 2, height / 2 - 10);
        ctx.fillText('100',  width / 2, height / 2 + 15);
        ctx.save();
      }
    }]
  });

  // 2. 세로 막대 차트
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
            label: ctx => `${ctx.raw} kg`
          }
        }
      }
    }
  });

  // 3. 그룹형 막대 차트
  const ctx3 = document.getElementById('monthlyCompareChart').getContext('2d');
  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['Nov','Dec','Jan','Feb','Mar','Apr'],
      datasets: [
        {
          label: '폐기물 배출량',
          data: [30,32,35,28,40,20],
          backgroundColor: '#ffeb3b'
        },
        {
          label: '탄소 배출량',
          data: [28,30,33,26,38,18],
          backgroundColor: '#b388ff'
        }
      ]
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
        legend: {
          labels: { color: 'white', font: { size: 14 } }
        },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.raw}`
          }
        }
      }
    }
  });

  // 4. 순위 차트
  const ctx4 = document.getElementById('rankChart').getContext('2d');
  new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: ['플라스틱','콘크리트','목재','벽돌'],
      datasets: [{
        data: [48,17,19,29],
        backgroundColor: ['#fdd835','#4dd0e1','#29b6f6','#ce93d8'],
        borderRadius: 10,
        barThickness: 16
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.raw}%`
          }
        },
        datalabels: {
          anchor: 'end',
          align: 'end',
          color: '#fff',
          backgroundColor: ctx => ctx.dataset.backgroundColor[ctx.dataIndex],
          borderRadius: 6,
          padding: 6,
          formatter: v => `${v}%`,
          font: { weight: 'bold' }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { display: false },
          grid: { display: false }
        },
        y: {
          ticks: { color: 'white', font: { size: 14 } },
          grid: { display: false }
        }
      }
    },
    plugins: [ChartDataLabels]
  });

  // 5. 라인 차트
  const ctx5 = document.getElementById('carbonLineChart').getContext('2d');
  new Chart(ctx5, {
    type: 'line',
    data: {
      labels: [2,4,5,6,9,11,12,19,20,22,23,24,26,27],
      datasets: [{
        data: [200,150,50,90,130,180,10,300,20,70,50,180,0,20],
        borderColor: '#ffeb3b',
        backgroundColor: 'rgba(255,255,0,0.3)',
        borderWidth: 2,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: 'white', callback: v => `$${v}K` }, grid: { color: 'rgba(255,255,255,0.1)' } }
      }
    }
  });

  // 6. 반원 도넛 차트
  const ctx6 = document.getElementById('progressChart').getContext('2d');
  new Chart(ctx6, {
    type: 'doughnut',
    data: {
      labels: ['사용량','잔여'],
      datasets: [{ data: [70,30], backgroundColor: ['#ffc107','#2e2e2e'], borderWidth: 0 }]
    },
    options: {
      cutout: '70%',
      rotation: -90,
      circumference: 180,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });

  // 7. 그라데이션 라인 차트
  const ctx7 = document.getElementById('siteCarbonChart').getContext('2d');
  const gradMint = ctx7.createLinearGradient(0,0,0,300);
  gradMint.addColorStop(0, 'rgba(116,242,231,0.6)');
  gradMint.addColorStop(1, 'rgba(116,242,231,0)');
  const gradPink = ctx7.createLinearGradient(0,0,0,300);
  gradPink.addColorStop(0, 'rgba(241,143,248,0.6)');
  gradPink.addColorStop(1, 'rgba(241,143,248,0)');
  new Chart(ctx7, {
    type: 'line',
    data: {
      labels: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
      datasets: [
        { label: '탄소배출량', data: [420,380,400,390,410,395,430,420,370,360,450,480],
          borderColor: 'rgba(116,242,231,1)', backgroundColor: gradMint,
          tension: 0.4, fill: true, pointRadius: 5, pointBackgroundColor: 'rgba(116,242,231,1)'
        },
        { label: '폐기물량', data: [350,360,330,320,340,330,360,355,310,300,370,390],
          borderColor: 'rgba(241,143,248,1)', backgroundColor: gradPink,
          tension: 0.4, fill: true, pointRadius: 5, pointBackgroundColor: 'rgba(241,143,248,1)'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#ccc' } },
        y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#ccc' } }
      }
    }
  });
  const labels = ['01 플라스틱','02 목재','03 철근','04 벽돌'];
  const values = [46, 17, 19, 29];
  const max = 100;
  const ctx8 = document.getElementById('popularityChart').getContext('2d');

  new Chart(ctx8, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        // 1) 회색 트랙
        {
          data: Array(labels.length).fill(max),
          backgroundColor: '#333',
          barThickness: 12,
          borderRadius: 6,
          order: 1
        },
        // 2) 실제 값 + % 박스
        {
          data: values,
          backgroundColor: ['#FFC107','#4FC3F7','#2196F3','#CE93D8'],
          barThickness: 12,
          borderRadius: { topLeft:6, bottomLeft:6, topRight:6, bottomRight:6 },
          order: 2,
          datalabels: {
            display: true,
            anchor: 'end',
            align: 'end',
            offset: -4,
            backgroundColor: 'transparent',
            borderColor: ctx => ctx.dataset.backgroundColor[ctx.dataIndex],
            borderWidth: 2,
            borderRadius: 4,
            padding: 4,
            color: '#fff',
            formatter: v => v + '%',
            font: { weight: 'bold', size: 12 }
          }
        }
      ]
    },
    options: {
      indexAxis: 'y',
      maintainAspectRatio: false,
      scales: {
        x: {
          display: false,
          max
        },
        y: {
          display: true,
          grid: { display: false },
          ticks: { color: '#fff', font: { size: 14 } }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        datalabels: {}
      }
    },
    plugins: [ChartDataLabels]

});

});  // DOMContentLoaded 끝
