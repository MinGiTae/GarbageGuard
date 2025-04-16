const character = document.getElementById('character');

window.addEventListener('mousemove', (e) => {
  character.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});




//폐기물 종류 비율을 그리는 함수


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