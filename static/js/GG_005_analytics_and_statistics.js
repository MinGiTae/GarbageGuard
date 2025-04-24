////// analytics_and_statistics.js
////
////function getEmissionColor(emission) {
////  if (emission > 22000) return "#e53935";   // 빨강
////  if (emission > 18000) return "#fb8c00";   // 주황
////  if (emission > 14000) return "#fdd835";   // 노랑
////  if (emission > 10000) return "#43a047";   // 초록
////  return "#1e88e5";                         // 파랑
////}
////
////Chart.defaults.maintainAspectRatio = false;
////Chart.register(ChartDataLabels);
////
////let siteCarbonChart;
////
////document.addEventListener("DOMContentLoaded", () => {
////  // 1. 도넛 차트
////  new Chart(
////    document.getElementById("wasteChart").getContext("2d"),
////    {
////      type: "doughnut",
////      data: {
////        labels: ["플라스틱", "벽돌", "목재", "콘크리트"],
////        datasets: [{
////          data: [25,25,25,25],
////          backgroundColor: ["#3f51b5","#ffeb3b","#ff5722","#00bcd4"],
////          cutout: "70%",
////          borderWidth: 0
////        }]
////      },
////      options: {
////        plugins: {
////          legend: { display:false },
////          tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}` } }
////        }
////      },
////      plugins: [{
////        id: "centerText",
////        beforeDraw(chart) {
////          const { width, height, ctx } = chart;
////          ctx.restore();
////          ctx.font = "bold 16px sans-serif";
////          ctx.fillStyle = "#fff";
////          ctx.textAlign = "center";
////          ctx.textBaseline = "middle";
////          ctx.fillText("Total", width/2, height/2 - 10);
////          ctx.fillText("100",   width/2, height/2 + 15);
////          ctx.save();
////        }
////      }]
////    }
////  );
////
////  // 2. 세로 막대 차트
////  new Chart(
////    document.getElementById("wasteTypeChart").getContext("2d"),
////    {
////      type: "bar",
////      data: {
////        labels: ["철근","플라스틱","목재","기타","석면","콘크리트"],
////        datasets: [{
////          data: [20,40,55,25,65,75],
////          backgroundColor: "#ffeb3b",
////          borderRadius: 10,
////          barThickness: 30
////        }]
////      },
////      options: {
////        scales: {
////          x: { ticks:{ color:"#fff" }, grid:{ display:false } },
////          y: { beginAtZero:true, ticks:{ color:"#fff" }, grid:{ color:"rgba(255,255,255,0.1)" } }
////        },
////        plugins: {
////          legend:{ display:false },
////          tooltip:{ callbacks:{ label: ctx=>`${ctx.raw} kg` } }
////        }
////      }
////    }
////  );
////
////  // ✅ 🔧 수정된 부분 (닫는 대괄호, 중괄호 빠졌던 거 추가함)
////  const ctx = document.getElementById("carbonLineChart").getContext("2d");
////
////  const data = {
////    labels: ['계룡건설', '태영건설', '한화건설', 'GS건설', '현대건설'],
////    datasets: [{
////      label: '탄소 배출량 (톤)',
////      data: [120, 95, 80, 60, 40],
////      backgroundColor: ['#ff9800', '#4caf50', '#2196f3', '#9c27b0', '#f44336'],
////      borderRadius: 8
////    }]
////  }; // ← 닫는 중괄호 추가
////
////  const config = {
////    type: 'bar',
////    data: data,
////    options: {
////      indexAxis: 'y',
////      plugins: {
////        legend: { display: false },
////        tooltip: {
////          callbacks: {
////            label: context => `${context.raw}톤`
////          }
////        }
////      },
////      scales: {
////        x: {
////          beginAtZero: true
////        }
////      }
////    }
////  };
////
////  new Chart(ctx, config);
////
//// const ctx2 = document.getElementById('rankChart').getContext('2d');
////
//// new Chart(ctx2, {
////  type: 'bar',
////  data: {
////    labels: ['플라스틱', '콘크리트', '목재', '벽돌'],
////    datasets: [{
////      label: '배출량 (%)',
////      data: [48, 17, 19, 26],
////      backgroundColor: ['#ffa726', '#80deea', '#42a5f5', '#ce93d8'], // 각 항목 색
////      borderRadius: 10,
////      barThickness: 20
////    }]
////  },
////  options: {
////    indexAxis: 'y', // 수평 막대
////    responsive: true,
////    maintainAspectRatio: false,
////    scales: {
////      x: {
////        beginAtZero: true,
////        max: 100, // 퍼센트 기준
////        ticks: { color: "#fff", callback: val => `${val}%` },
////        grid: { color: "rgba(255,255,255,0.1)" }
////      },
////      y: {
////        ticks: { color: "#fff" },
////        grid: { display: false }
////      }
////    },
////    plugins: {
////      legend: { display: false },
////      tooltip: {
////        callbacks: {
////          label: context => `${context.label}: ${context.raw}%`
////        }
////      },
////      datalabels: {
////        anchor: 'end',
////        align: 'right',
////        color: '#fff',
////        formatter: value => `${value}%`
////      }
////    }
////  },
////  plugins: [ChartDataLabels]
////});
////
//// const ctx3 = document.getElementById('progressChart').getContext('2d');
////
//// new Chart(ctx3, {
////  type: 'doughnut',
////  data: {
////    labels: ['탄소 배출량'],
////    datasets: [{
////      data: [70, 30], // 70% 차트, 나머지 30은 빈 공간
////      backgroundColor: ['#ffcc00', '#222'], // 채운 부분, 나머지 회색
////      borderWidth: 0,
////      cutout: '75%' // 도넛 두께
////    }]
////  },
////  options: {
////    plugins: {
////      legend: { display: false },
////      tooltip: { enabled: false }
////    }
////  },
////  plugins: [{
////    id: 'centerText',
////    beforeDraw(chart) {
////      const { width, height, ctx } = chart;
////      ctx.save();
////      ctx.font = 'bold 24px sans-serif';
////      ctx.fillStyle = '#fff';
////      ctx.textAlign = 'center';
////      ctx.textBaseline = 'middle';
////      ctx.fillText('70%', width / 2, height / 2);
////    }
////  }]
////});
////
////
////
////  // 3. 월별 비교 그룹형 막대
////  new Chart(
////    document.getElementById("monthlyCompareChart").getContext("2d"),
////    {
////      type: "bar",
////      data: {
////        labels: ["Nov","Dec","Jan","Feb","Mar","Apr"],
////        datasets: [
////          { label:"폐기물 배출량", data:[30,32,35,28,40,20], backgroundColor:"#ffeb3b" },
////          { label:"탄소 배출량",   data:[28,30,33,26,38,18], backgroundColor:"#b388ff" }
////        ]
////      },
////      options: {
////        scales: {
////          x: { ticks:{ color:"#fff" }, grid:{ display:false } },
////          y: { beginAtZero:true, ticks:{ color:"#fff" }, grid:{ color:"rgba(255,255,255,0.1)" } }
////        },
////        plugins: {
////          legend:{ labels:{ color:"#fff" } },
////          tooltip:{ callbacks:{ label: ctx=>`${ctx.dataset.label}: ${ctx.raw}` } }
////        }
////      }
////    }
////  );
////const ctx4 = document.getElementById("popularityChart").getContext("2d");
////
////new Chart(ctx4, {
////  type: 'bar',
////  data: {
////    labels: ['플라스틱', '목재', '철근', '벽돌'],
////    datasets: [{
////      label: '퍼센트',
////      data: [48, 17, 19, 29],
////      backgroundColor: [
////        '#f5a623', // 플라스틱 (주황)
////        '#a3e6dc', // 목재 (민트)
////        '#3a9bd9', // 철근 (파랑)
////        '#d5a3e6'  // 벽돌 (보라)
////      ],
////      borderRadius: 8,
////      barThickness: 14
////    }]
////  },
////  options: {
////    indexAxis: 'y', // 👉 수평 막대 그래프
////    plugins: {
////      legend: { display: false },
////      tooltip: {
////        callbacks: {
////          label: ctx => `${ctx.raw}%`
////        }
////      }
////    },
////    scales: {
////      x: {
////        beginAtZero: true,
////        max: 100,
////        ticks: { color: "#ccc" },
////        grid: { color: "rgba(255,255,255,0.05)" }
////      },
////      y: {
////        ticks: { color: "#fff" },
////        grid: { display: false }
////      }
////    }
////  }
////});
////
////
////
////  // ✅ 지역별 차트 초기화 (빈 차트 생성)
////  const siteCarbonCanvas = document.getElementById("siteCarbonChart");
////  siteCarbonCanvas.width = siteCarbonCanvas.offsetWidth;
////  siteCarbonCanvas.height = 300;
////
////  siteCarbonChart = new Chart(
////    siteCarbonCanvas.getContext("2d"),
////    {
////      type: "bar",
////      data: {
////        labels: [],
////        datasets: [{
////          label: "폐기물 비율",
////          data: [],
////          backgroundColor: "#4caf50"
////        }]
////      },
////      options: {
////        responsive: true,
////        maintainAspectRatio: false,
////        scales: {
////          x: { ticks:{ color:"#fff" }, grid:{ display:false } },
////          y: { beginAtZero:true, ticks:{ color:"#fff" }, grid:{ color:"rgba(255,255,255,0.1)" } }
////        },
////        plugins: {
////          legend:{ display:false },
////          tooltip:{ callbacks:{ label: ctx=>`${ctx.raw} kg` } }
////        }
////      }
////    }
////  );
////  const siteData = {
////  "KR-11": [
////    { name: "현장A", address: "서울 강남구" },
////    { name: "현장B", address: "서울 마포구" },
////  ],
////  "KR-26": [
////    { name: "부산현장1", address: "부산 해운대구" },
////  ],
////  // 나머지도 필요 시 추가
////};
////
////  const regionData = {
////    "KR-11": { name: "서울특별시", emission: 25000, ranks: ["폐콘크리트", "폐목재"] },
////    "KR-26": { name: "부산광역시", emission: 18000, ranks: ["혼합건설폐기물", "폐금속류"] },
////    "KR-27": { name: "대구광역시", emission: 15000, ranks: ["폐목재", "석면"] },
////    "KR-28": { name: "인천광역시", emission: 22000, ranks: ["플라스틱", "유리"] },
////    "KR-29": { name: "광주광역시", emission: 12000, ranks: ["폐콘크리트", "기타"] },
////    "KR-30": { name: "대전광역시", emission: 14000, ranks: ["금속", "벽돌"] },
////    "KR-41": { name: "경기도", emission: 19000, ranks: ["폐콘크리트", "폐유리"] },
////    "KR-42": { name: "강원도", emission: 9000, ranks: ["플라스틱", "벽돌"] },
////    "KR-43": { name: "충청북도", emission: 16000, ranks: ["목재", "기타"] },
////    "KR-44": { name: "충청남도", emission: 13000, ranks: ["석면", "철근"] },
////    "KR-45": { name: "전라북도", emission: 11000, ranks: ["금속", "유리"] },
////    "KR-46": { name: "전라남도", emission: 8000, ranks: ["벽돌", "기타"] },
////    "KR-47": { name: "경상북도", emission: 17000, ranks: ["콘크리트", "목재"] },
////    "KR-48": { name: "경상남도", emission: 14500, ranks: ["폐콘크리트", "플라스틱"] },
////    "KR-49": { name: "제주특별자치도", emission: 9500, ranks: ["혼합폐기물", "기타"] },
////    "KR-50": { name: "세종특별자치시",emission: 7200, ranks: ["건축폐기물", "유리"] },
////    "KR-31": { name: "울산광역시", emission: 6800, ranks: ["금속", "플라스틱"]}
////
////  };
////
////  document.querySelectorAll("#korea-map path").forEach(region => {
////    const id = region.id;
////    const data = regionData[id];
////    if (data) {
////      region.setAttribute("fill", getEmissionColor(data.emission));
////    }
////  });
////
////
////  document.querySelectorAll("#korea-map path").forEach(region => {
////    region.addEventListener("click", () => {
////      const id = region.id;
////      const data = regionData[id];
////      if (data) {
////        console.log(`클릭된 지역: ${data.name}`);
////        document.getElementById("siteCarbonTitle").innerText = `${data.name}의 탄소 배출량`;
////        updateSiteCarbonChart(data);
////
////        document.querySelectorAll("#korea-map path").forEach(region => {
////    region.addEventListener("click", () => {
////      const id   = region.id;
////      const data = regionData[id];
////      if (data) {
////        console.log(`클릭된 지역: ${data.name}`);
////        document.getElementById("siteCarbonTitle").innerText = `${data.name}의 탄소 배출량`;
////        updateSiteCarbonChart(data);
////
////        // ← 여기에 붙여넣기
////        // ─── construction-list 업데이트 & 토글 ──────────────────────
////        const listBox = document.querySelector(".construction-list");
////        const sites   = siteData[id] || [];
////
////        let html = `<h3>${data.name} 현장 list</h3>`;
////        if (sites.length) {
////          html += "<ul>" +
////                    sites.map(s => `<li>${s.name} (${s.address})</li>`).join("") +
////                  "</ul>";
////        } else {
////          html += `<p style="margin-top:8px;color:#666;">등록된 현장이 없습니다.</p>`;
////        }
////
////        listBox.innerHTML = html;
////        listBox.classList.add("active");
////        // ────────────────────────────────────────────────────────────
////      }
////    });
////  });
////
////
////
////
////      }
////    });
////  });
////});
////
////// ✅ 지역 차트 업데이트 함수 정의
////function updateSiteCarbonChart(data) {
////  if (!siteCarbonChart) return;
////  siteCarbonChart.data.labels = data.ranks;
////  siteCarbonChart.data.datasets[0].data = data.ranks.map(() => Math.floor(Math.random() * 100 + 10));
////  siteCarbonChart.update();
////}
//// analytics_and_statistics.js
//
//function getEmissionColor(emission) {
//  if (emission > 22000) return "#e53935";   // 빨강
//  if (emission > 18000) return "#fb8c00";   // 주황
//  if (emission > 14000) return "#fdd835";   // 노랑
//  if (emission > 10000) return "#43a047";   // 초록
//  return "#1e88e5";                         // 파랑
//}
//
//Chart.defaults.maintainAspectRatio = false;
//Chart.register(ChartDataLabels);
//
//let siteCarbonChart;
//
//document.addEventListener("DOMContentLoaded", () => {
//  // 1. 도넛 차트
//  new Chart(
//    document.getElementById("wasteChart").getContext("2d"),
//    {
//      type: "doughnut",
//      data: {
//        labels: ["플라스틱", "벽돌", "목재", "콘크리트"],
//        datasets: [{
//          data: [25,25,25,25],
//          backgroundColor: ["#3f51b5","#ffeb3b","#ff5722","#00bcd4"],
//          cutout: "70%",
//          borderWidth: 0
//        }]
//      },
//      options: {
//        plugins: {
//          legend: { display:false },
//          tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}` } }
//        }
//      },
//      plugins: [{
//        id: "centerText",
//        beforeDraw(chart) {
//          const { width, height, ctx } = chart;
//          ctx.restore();
//          ctx.font = "bold 16px sans-serif";
//          ctx.fillStyle = "#fff";
//          ctx.textAlign = "center";
//          ctx.textBaseline = "middle";
//          ctx.fillText("Total", width/2, height/2 - 10);
//          ctx.fillText("100",   width/2, height/2 + 15);
//          ctx.save();
//        }
//      }]
//    }
//  );
//
//  // 2. 세로 막대 차트
//  new Chart(
//    document.getElementById("wasteTypeChart").getContext("2d"),
//    {
//      type: "bar",
//      data: {
//        labels: ["철근","플라스틱","목재","기타","석면","콘크리트"],
//        datasets: [{
//          data: [20,40,55,25,65,75],
//          backgroundColor: "#ffeb3b",
//          borderRadius: 10,
//          barThickness: 30
//        }]
//      },
//      options: {
//        scales: {
//          x: { ticks:{ color:"#fff" }, grid:{ display:false } },
//          y: { beginAtZero:true, ticks:{ color:"#fff" }, grid:{ color:"rgba(255,255,255,0.1)" } }
//        },
//        plugins: {
//          legend:{ display:false },
//          tooltip:{ callbacks:{ label: ctx=>`${ctx.raw} kg` } }
//        }
//      }
//    }
//  );
//
//  // 3. 가로 막대 (계열사별 순위)
//  const ctx = document.getElementById("carbonLineChart").getContext("2d");
//  const data = {
//    labels: ['계룡건설', '태영건설', '한화건설', 'GS건설', '현대건설'],
//    datasets: [{
//      label: '탄소 배출량 (톤)',
//      data: [120, 95, 80, 60, 40],
//      backgroundColor: ['#ff9800', '#4caf50', '#2196f3', '#9c27b0', '#f44336'],
//      borderRadius: 8
//    }]
//  };
//  const config = {
//    type: 'bar',
//    data: data,
//    options: {
//      indexAxis: 'y',
//      plugins: {
//        legend: { display: false },
//        tooltip: { callbacks: { label: ctx => `${ctx.raw}톤` } }
//      },
//      scales: { x: { beginAtZero: true } }
//    }
//  };
//  new Chart(ctx, config);
//
//  // 4. 3월 배출 순위
//  const ctx2 = document.getElementById("rankChart").getContext("2d");
//  new Chart(ctx2, {
//    type: 'bar',
//    data: {
//      labels: ['플라스틱','콘크리트','목재','벽돌'],
//      datasets: [{
//        label: '배출량 (%)',
//        data: [48,17,19,26],
//        backgroundColor: ['#ffa726','#80deea','#42a5f5','#ce93d8'],
//        borderRadius: 10,
//        barThickness: 20
//      }]
//    },
//    options: {
//      indexAxis: 'y',
//      responsive: true,
//      maintainAspectRatio: false,
//      scales: {
//        x: {
//          beginAtZero:true,
//          max:100,
//          ticks:{ color:"#fff", callback: v=>`${v}%` },
//          grid:{ color:"rgba(255,255,255,0.1)" }
//        },
//        y: { ticks:{ color:"#fff" }, grid:{ display:false } }
//      },
//      plugins: {
//        legend:{ display:false },
//        tooltip:{ callbacks:{ label: ctx=>`${ctx.label}: ${ctx.raw}%` } },
//        datalabels:{
//          anchor:'end', align:'right', color:'#fff', formatter:v=>`${v}%`
//        }
//      }
//    },
//    plugins: [ChartDataLabels]
//  });
//
//  // 5. 미래건설 진행률
//  const ctx3 = document.getElementById("progressChart").getContext("2d");
//  new Chart(ctx3, {
//    type: 'doughnut',
//    data: {
//      labels:['탄소 배출량'],
//      datasets:[{
//        data:[70,30],
//        backgroundColor:['#ffcc00','#222'],
//        borderWidth:0,
//        cutout:'75%'
//      }]
//    },
//    options:{
//      plugins:{ legend:false, tooltip:false }
//    },
//    plugins:[{
//      id:'centerText',
//      beforeDraw(chart){
//        const { width, height, ctx } = chart;
//        ctx.save();
//        ctx.font = 'bold 24px sans-serif';
//        ctx.fillStyle = '#fff';
//        ctx.textAlign = 'center';
//        ctx.textBaseline = 'middle';
//        ctx.fillText('70%', width/2, height/2);
//      }
//    }]
//  });
//
//  // 6. 월별 비교 그룹형 막대
//  new Chart(
//    document.getElementById("monthlyCompareChart").getContext("2d"),
//    {
//      type:"bar",
//      data:{
//        labels:["Nov","Dec","Jan","Feb","Mar","Apr"],
//        datasets:[
//          { label:"폐기물 배출량", data:[30,32,35,28,40,20], backgroundColor:"#ffeb3b" },
//          { label:"탄소 배출량",   data:[28,30,33,26,38,18], backgroundColor:"#b388ff" }
//        ]
//      },
//      options:{
//        scales:{
//          x:{ ticks:{color:"#fff"}, grid:{display:false} },
//          y:{ beginAtZero:true, ticks:{color:"#fff"}, grid:{color:"rgba(255,255,255,0.1)"} }
//        },
//        plugins:{
//          legend:{ labels:{ color:"#fff" } },
//          tooltip:{ callbacks:{ label: ctx=>`${ctx.dataset.label}: ${ctx.raw}` } }
//        }
//      }
//    }
//  );
//
//  // 7. 인기 폐기물 수평 막대
//  const ctx4 = document.getElementById("popularityChart").getContext("2d");
//  new Chart(ctx4, {
//    type:'bar',
//    data:{
//      labels:['플라스틱','목재','철근','벽돌'],
//      datasets:[{
//        label:'퍼센트',
//        data:[48,17,19,29],
//        backgroundColor:['#f5a623','#a3e6dc','#3a9bd9','#d5a3e6'],
//        borderRadius:8,
//        barThickness:14
//      }]
//    },
//    options:{
//      indexAxis:'y',
//      scales:{
//        x:{ beginAtZero:true, max:100, ticks:{color:"#ccc"}, grid:{color:"rgba(255,255,255,0.05)"} },
//        y:{ ticks:{color:"#fff"}, grid:{display:false} }
//      },
//      plugins:{
//        legend:{display:false},
//        tooltip:{ callbacks:{ label: ctx=>`${ctx.raw}%` } }
//      }
//    }
//  });
//
//  // 8. 지역별 차트 초기화 (빈 차트)
//  const siteCarbonCanvas = document.getElementById("siteCarbonChart");
//  siteCarbonCanvas.width  = siteCarbonCanvas.offsetWidth;
//  siteCarbonCanvas.height = 300;
//  siteCarbonChart = new Chart(
//    siteCarbonCanvas.getContext("2d"),
//    {
//      type:"bar",
//      data:{ labels:[], datasets:[{ label:"폐기물 비율", data:[], backgroundColor:"#4caf50" }] },
//      options:{
//        responsive:true,
//        maintainAspectRatio:false,
//        scales:{
//          x:{ ticks:{color:"#fff"}, grid:{display:false} },
//          y:{ beginAtZero:true, ticks:{color:"#fff"}, grid:{color:"rgba(255,255,255,0.1)"} }
//        },
//        plugins:{
//          legend:{display:false},
//          tooltip:{ callbacks:{ label: ctx=>`${ctx.raw} kg` } }
//        }
//      }
//    }
//  );
//
//  // 샘플 현장‐주소 데이터
//  const siteData = {
//    "KR-11":[{name:"현장A",address:"서울 강남구"},{name:"현장B",address:"서울 마포구"}],
//    "KR-26":[{name:"부산현장1",address:"부산 해운대구"}],
//    // …필요시 추가…
//  };
//
//  // 지역별 메타정보
//  const regionData = {
//    "KR-11":{ name:"서울특별시",  emission:25000, ranks:["폐콘크리트","폐목재"] },
//    "KR-26":{ name:"부산광역시",  emission:18000, ranks:["혼합건설폐기물","폐금속류"] },
//    "KR-27":{ name:"대구광역시",  emission:15000, ranks:["폐목재","석면"] },
//    "KR-28":{ name:"인천광역시",  emission:22000, ranks:["플라스틱","유리"] },
//    "KR-29":{ name:"광주광역시",  emission:12000, ranks:["폐콘크리트","기타"] },
//    "KR-30":{ name:"대전광역시",  emission:14000, ranks:["금속","벽돌"] },
//    "KR-41":{ name:"경기도",      emission:19000, ranks:["폐콘크리트","폐유리"] },
//    "KR-42":{ name:"강원도",      emission:9000,  ranks:["플라스틱","벽돌"] },
//    "KR-43":{ name:"충청북도",    emission:16000, ranks:["목재","기타"] },
//    "KR-44":{ name:"충청남도",    emission:13000, ranks:["석면","철근"] },
//    "KR-45":{ name:"전라북도",    emission:11000, ranks:["금속","유리"] },
//    "KR-46":{ name:"전라남도",    emission:8000,  ranks:["벽돌","기타"] },
//    "KR-47":{ name:"경상북도",    emission:17000, ranks:["콘크리트","목재"] },
//    "KR-48":{ name:"경상남도",    emission:14500, ranks:["폐콘크리트","플라스틱"] },
//    "KR-49":{ name:"제주특별자치도",emission:9500, ranks:["혼합폐기물","기타"] },
//    "KR-50":{ name:"세종특별자치시",emission:7200, ranks:["건축폐기물","유리"] },
//    "KR-31":{ name:"울산광역시",  emission:6800,  ranks:["금속","플라스틱"] }
//  };
//
//  // 지도에 색 채우기
//  document.querySelectorAll("#korea-map path").forEach(region => {
//    const d = regionData[region.id];
//    if (d) region.setAttribute("fill", getEmissionColor(d.emission));
//  });
//
//  // 클릭 이벤트: 차트 & 팝업 열기/닫기
//  document.querySelectorAll("#korea-map path").forEach(region => {
//    region.addEventListener("click", () => {
//      const id   = region.id;
//      const d    = regionData[id];
//      if (!d) return;
//
//      // 차트 제목 & 데이터 업데이트
//      document.getElementById("siteCarbonTitle").innerText = `${d.name}의 탄소 배출량`;
//      updateSiteCarbonChart(d);
//
//      // 팝업 내용 생성
//      const listBox = document.querySelector(".construction-list");
//      const sites   = siteData[id] || [];
//      let html = `<button class="close-btn" id="closeConstructionList">✖</button>
//                  <h3>${d.name} 현장 list</h3>`;
//      if (sites.length) {
//        html += `<ul>${sites.map(s=>`<li>${s.name} (${s.address})</li>`).join("")}</ul>`;
//      } else {
//        html += `<p style="margin-top:8px;color:#666;">등록된 현장이 없습니다.</p>`;
//      }
//      listBox.innerHTML = html;
//      listBox.classList.add("active");
//
//      // 닫기 버튼에 이벤트 붙이기
//      document
//        .getElementById("closeConstructionList")
//        .addEventListener("click", () => {
//          listBox.classList.remove("active");
//        });
//    });
//  });
//});
//
//// 지역 차트 데이터 업데이트 함수
//function updateSiteCarbonChart(data) {
//  if (!siteCarbonChart) return;
//  siteCarbonChart.data.labels = data.ranks;
//  siteCarbonChart.data.datasets[0].data = data.ranks.map(() =>
//    Math.floor(Math.random() * 100 + 10)
//  );
//  siteCarbonChart.update();
//}


// analytics_and_statistics.js

function getEmissionColor(emission) {
  if (emission > 22000) return "#e53935";   // 빨강
  if (emission > 18000) return "#fb8c00";   // 주황
  if (emission > 14000) return "#fdd835";   // 노랑
  if (emission > 10000) return "#43a047";   // 초록
  return "#1e88e5";                         // 파랑
}

Chart.defaults.maintainAspectRatio = false;
Chart.register(ChartDataLabels);

let siteCarbonChart;

document.addEventListener("DOMContentLoaded", () => {
  // 1. 도넛 차트
  new Chart(
    document.getElementById("wasteChart").getContext("2d"),
    {
      type: "doughnut",
      data: {
        labels: ["플라스틱", "벽돌", "목재", "콘크리트"],
        datasets: [{
          data: [25, 25, 25, 25],
          backgroundColor: ["#3f51b5", "#ffeb3b", "#ff5722", "#00bcd4"],
          cutout: "70%",
          borderWidth: 0
        }]
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}` } }
        }
      },
      plugins: [{
        id: "centerText",
        beforeDraw(chart) {
          const { width, height, ctx } = chart;
          ctx.restore();
          ctx.font = "bold 16px sans-serif";
          ctx.fillStyle = "#fff";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Total", width/2, height/2 - 10);
          ctx.fillText("100",   width/2, height/2 + 15);
          ctx.save();
        }
      }]
    }
  );

  // 2. 세로 막대 차트
  new Chart(
    document.getElementById("wasteTypeChart").getContext("2d"),
    {
      type: "bar",
      data: {
        labels: ["철근","플라스틱","목재","기타","석면","콘크리트"],
        datasets: [{
          data: [20,40,55,25,65,75],
          backgroundColor: "#ffeb3b",
          borderRadius: 10,
          barThickness: 30
        }]
      },
      options: {
        scales: {
          x: { ticks:{ color:"#fff" }, grid:{ display:false } },
          y: { beginAtZero:true, ticks:{ color:"#fff" }, grid:{ color:"rgba(255,255,255,0.1)" } }
        },
        plugins: {
          legend:{ display:false },
          tooltip:{ callbacks:{ label: ctx=>`${ctx.raw} kg` } }
        }
      }
    }
  );

  // 3. 수평 바 차트 (건설사 탄소 배출량 순위)
  {
    const ctx = document.getElementById("carbonLineChart").getContext("2d");
    const data = {
      labels: ['계룡건설', '태영건설', '한화건설', 'GS건설', '현대건설'],
      datasets: [{
        label: '탄소 배출량 (톤)',
        data: [120, 95, 80, 60, 40],
        backgroundColor: ['#ff9800', '#4caf50', '#2196f3', '#9c27b0', '#f44336'],
        borderRadius: 8
      }]
    };
    const config = {
      type: 'bar',
      data: data,
      options: {
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => `${ctx.raw}톤` } }
        },
        scales: { x: { beginAtZero: true } }
      }
    };
    new Chart(ctx, config);
  }

  // 4. 폐기물 종류별 배출량 순위
  {
    const ctx2 = document.getElementById('rankChart').getContext('2d');
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['플라스틱', '콘크리트', '목재', '벽돌'],
        datasets: [{
          label: '배출량 (%)',
          data: [48, 17, 19, 26],
          backgroundColor: ['#ffa726', '#80deea', '#42a5f5', '#ce93d8'],
          borderRadius: 10,
          barThickness: 20
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: { color: "#fff", callback: val => `${val}%` },
            grid: { color: "rgba(255,255,255,0.1)" }
          },
          y: { ticks: { color: "#fff" }, grid: { display: false } }
        },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}%` } },
          datalabels: {
            anchor: 'end',
            align: 'right',
            color: '#fff',
            formatter: value => `${value}%`
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  }

  // 5. 진행률 도넛 차트
  {
    const ctx3 = document.getElementById('progressChart').getContext('2d');
    new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: ['탄소 배출량'],
        datasets: [{
          data: [70, 30],
          backgroundColor: ['#ffcc00', '#222'],
          borderWidth: 0,
          cutout: '75%'
        }]
      },
      options: {
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
      },
      plugins: [{
        id: 'centerText',
        beforeDraw(chart) {
          const { width, height, ctx } = chart;
          ctx.save();
          ctx.font = 'bold 24px sans-serif';
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('70%', width / 2, height / 2);
        }
      }]
    });
  }

  // 6. 월별 폐기물 vs 탄소 배출량 비교
  new Chart(
    document.getElementById("monthlyCompareChart").getContext("2d"),
    {
      type: "bar",
      data: {
        labels: ["Nov","Dec","Jan","Feb","Mar","Apr"],
        datasets: [
          { label:"폐기물 배출량", data:[30,32,35,28,40,20], backgroundColor:"#ffeb3b" },
          { label:"탄소 배출량",   data:[28,30,33,26,38,18], backgroundColor:"#b388ff" }
        ]
      },
      options: {
        scales: {
          x: { ticks:{ color:"#fff" }, grid:{ display:false } },
          y: { beginAtZero:true, ticks:{ color:"#fff" }, grid:{ color:"rgba(255,255,255,0.1)" } }
        },
        plugins: {
          legend:{ labels:{ color:"#fff" } },
          tooltip:{ callbacks:{ label: ctx=>`${ctx.dataset.label}: ${ctx.raw}` } }
        }
      }
    }
  );

  // 7. 인기 폐기물 수평 바 차트
  {
    const ctx4 = document.getElementById("popularityChart").getContext("2d");
    new Chart(ctx4, {
      type: 'bar',
      data: {
        labels: ['플라스틱', '목재', '철근', '벽돌'],
        datasets: [{
          label: '퍼센트',
          data: [48, 17, 19, 29],
          backgroundColor: ['#f5a623','#a3e6dc','#3a9bd9','#d5a3e6'],
          borderRadius: 8,
          barThickness: 14
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => `${ctx.raw}%` } }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: { color: "#ccc" },
            grid: { color: "rgba(255,255,255,0.05)" }
          },
          y: { ticks: { color: "#fff" }, grid: { display: false } }
        }
      }
    });
  }

  // 8. 지역별 차트 초기화 (빈 차트)
  const siteCarbonCanvas = document.getElementById("siteCarbonChart");
  siteCarbonCanvas.width  = siteCarbonCanvas.offsetWidth;
  siteCarbonCanvas.height = 300;
  siteCarbonChart = new Chart(
    siteCarbonCanvas.getContext("2d"),
    {
      type: "bar",
      data: {
        labels: [],
        datasets: [{ label: "폐기물 비율", data: [], backgroundColor: "#4caf50" }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks:{ color:"#fff" }, grid:{ display:false } },
          y: { beginAtZero:true, ticks:{ color:"#fff" }, grid:{ color:"rgba(255,255,255,0.1)" } }
        },
        plugins: {
          legend:{ display:false },
          tooltip:{ callbacks:{ label: ctx=>`${ctx.raw} kg` } }
        }
      }
    }
  );

  // 샘플 현장 데이터
  const siteData = {
    "KR-11": [
      { name: "현장A", address: "서울 강남구" },
      { name: "현장B", address: "서울 마포구" },
    ],
    "KR-26": [
      { name: "부산현장1", address: "부산 해운대구" },
    ],
    // …필요시 추가…
  };

  // 샘플 지역 데이터
  const regionData = {
    "KR-11": { name: "서울특별시", emission: 25000, ranks: ["폐콘크리트", "폐목재"] },
    "KR-26": { name: "부산광역시", emission: 18000, ranks: ["혼합건설폐기물", "폐금속류"] },
    "KR-27": { name: "대구광역시", emission: 15000, ranks: ["폐목재", "석면"] },
    "KR-28": { name: "인천광역시", emission: 22000, ranks: ["플라스틱", "유리"] },
    "KR-29": { name: "광주광역시", emission: 12000, ranks: ["폐콘크리트", "기타"] },
    "KR-30": { name: "대전광역시", emission: 14000, ranks: ["금속", "벽돌"] },
    "KR-41": { name: "경기도", emission: 19000, ranks: ["폐콘크리트", "폐유리"] },
    "KR-42": { name: "강원도", emission: 9000,  ranks: ["플라스틱", "벽돌"] },
    "KR-43": { name: "충청북도", emission: 16000, ranks: ["목재", "기타"] },
    "KR-44": { name: "충청남도", emission: 13000, ranks: ["석면", "철근"] },
    "KR-45": { name: "전라북도", emission: 11000, ranks: ["금속", "유리"] },
    "KR-46": { name: "전라남도", emission: 8000,  ranks: ["벽돌", "기타"] },
    "KR-47": { name: "경상북도", emission: 17000, ranks: ["콘크리트", "목재"] },
    "KR-48": { name: "경상남도", emission: 14500, ranks: ["폐콘크리트", "플라스틱"] },
    "KR-49": { name: "제주특별자치도", emission: 9500,  ranks: ["혼합폐기물", "기타"] },
    "KR-50": { name: "세종특별자치시", emission: 7200,  ranks: ["건축폐기물", "유리"] },
    "KR-31": { name: "울산광역시", emission: 6800,  ranks: ["금속", "플라스틱"] }
  };

  // 지도 채우기
  document.querySelectorAll("#korea-map path").forEach(region => {
    const d = regionData[region.id];
    if (d) region.setAttribute("fill", getEmissionColor(d.emission));
  });

  // 클릭 이벤트
  document.querySelectorAll("#korea-map path").forEach(region => {
    region.addEventListener("click", () => {
      const id   = region.id;
      const data = regionData[id];
      const listBox = document.querySelector(".construction-list");
      if (!data || !listBox) return;

      // 차트 타이틀 & 업데이트
      document.getElementById("siteCarbonTitle").innerText = `${data.name}의 탄소 배출량`;
      updateSiteCarbonChart(data);

      // 팝업 내용 생성
      const sites = siteData[id] || [];
      let html = `
        <button class="close-btn" id="closeConstructionList">✖</button>
        <h3>${data.name} 현장 list</h3>
      `;
      if (sites.length) {
        html += `<ul>${sites.map(s => `<li>${s.name} (${s.address})</li>`).join("")}</ul>`;
      } else {
        html += `<p style="margin-top:8px;color:#666;">등록된 현장이 없습니다.</p>`;
      }

      listBox.innerHTML = html;
      listBox.classList.add("active");

      // 닫기 버튼 이벤트
      document.getElementById("closeConstructionList")
        .addEventListener("click", () => listBox.classList.remove("active"));
    });
  });
});

// 지역별 차트 데이터 갱신 함수
function updateSiteCarbonChart(data) {
  if (!siteCarbonChart) return;
  siteCarbonChart.data.labels = data.ranks;
  siteCarbonChart.data.datasets[0].data = data.ranks.map(
    () => Math.floor(Math.random() * 90 + 10)
  );
  siteCarbonChart.update();
}


