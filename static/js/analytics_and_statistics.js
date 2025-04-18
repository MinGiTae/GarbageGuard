// analytics_and_statistics.js

// ① 전역 기본값 설정
Chart.defaults.maintainAspectRatio = false;
Chart.register(ChartDataLabels);

document.addEventListener("DOMContentLoaded", () => {
  // 1. 도넛 차트
  new Chart(
    document.getElementById("wasteChart").getContext("2d"),
    {
      type: "doughnut",
      data: {
        labels: ["플라스틱", "벽돌", "목재", "콘크리트"],
        datasets: [{
          data: [25,25,25,25],
          backgroundColor: ["#3f51b5","#ffeb3b","#ff5722","#00bcd4"],
          cutout: "70%",
          borderWidth: 0
        }]
      },
      options: {
        plugins: {
          legend: { display:false },
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

  // 3. 월별 비교 그룹형 막대
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

  // 4. 3월 배출 순위 (가로 막대)
  new Chart(
    document.getElementById("rankChart").getContext("2d"),
    {
      type:"bar",
      data:{
        labels:["플라스틱","콘크리트","목재","벽돌"],
        datasets:[{
          data:[48,17,19,29],
          backgroundColor:["#fdd835","#4dd0e1","#29b6f6","#ce93d8"],
          borderRadius:10, barThickness:16
        }]
      },
      options:{
        indexAxis:"y",
        scales:{
          x:{ display:false, beginAtZero:true },
          y:{ ticks:{ color:"#fff" }, grid:{ display:false } }
        },
        plugins:{
          legend:{ display:false },
          tooltip:{ callbacks:{ label: ctx=>`${ctx.raw}%` } },
          datalabels:{
            anchor:"end", align:"end", offset:-4,
            color:"#fff", backgroundColor: ctx=>ctx.dataset.backgroundColor[ctx.dataIndex],
            borderRadius:6, padding:6, formatter:v=>v+"%", font:{ weight:"bold" }
          }
        }
      },
      plugins:[ChartDataLabels]
    }
  );

  // 5. 계열사별 선 차트
  new Chart(
    document.getElementById("carbonLineChart").getContext("2d"),
    {
      type:"line",
      data:{
        labels:[2,4,5,6,9,11,12,19,20,22,23,24,26,27],
        datasets:[{
          data:[200,150,50,90,130,180,10,300,20,70,50,180,0,20],
          borderColor:"#ffeb3b", backgroundColor:"rgba(255,235,59,0.3)",
          tension:0.3, fill:true, borderWidth:2
        }]
      },
      options:{
        scales:{
          x:{ ticks:{ color:"#fff" }, grid:{ color:"rgba(255,255,255,0.05)" } },
          y:{ ticks:{ color:"#fff", callback:v=>`$${v}K` }, grid:{ color:"rgba(255,255,255,0.1)" } }
        },
        plugins:{ legend:{ display:false } }
      }
    }
  );

  // 6. 미래건설 진행률 반원 도넛
  new Chart(
    document.getElementById("progressChart").getContext("2d"),
    {
      type:"doughnut",
      data:{
        labels:["사용량","잔여"],
        datasets:[{ data:[70,30], backgroundColor:["#ffc107","#2e2e2e"], borderWidth:0 }]
      },
      options:{
        cutout:"70%", rotation:-90, circumference:180,
        plugins:{ legend:{ display:false }, tooltip:{ enabled:false } }
      }
    }
  );

  // 7. 현장 탄소 배출량 그라데이션 선 차트
  {
    const ctx = document.getElementById("siteCarbonChart").getContext("2d");
    const grad1 = ctx.createLinearGradient(0,0,0,300);
    grad1.addColorStop(0,"rgba(116,242,231,0.6)");
    grad1.addColorStop(1,"rgba(116,242,231,0)");
    const grad2 = ctx.createLinearGradient(0,0,0,300);
    grad2.addColorStop(0,"rgba(241,143,248,0.6)");
    grad2.addColorStop(1,"rgba(241,143,248,0)");
    new Chart(ctx, {
      type:"line",
      data:{
        labels:["1","2","3","4","5","6","7","8","9","10","11","12"],
        datasets:[
          {
            label:"탄소배출량",
            data:[420,380,400,390,410,395,430,420,370,360,450,480],
            borderColor:"rgba(116,242,231,1)", backgroundColor:grad1,
            fill:true, tension:0.4, pointRadius:5, pointBackgroundColor:"rgba(116,242,231,1)"
          },
          {
            label:"폐기물량",
            data:[350,360,330,320,340,330,360,355,310,300,370,390],
            borderColor:"rgba(241,143,248,1)", backgroundColor:grad2,
            fill:true, tension:0.4, pointRadius:5, pointBackgroundColor:"rgba(241,143,248,1)"
          }
        ]
      },
      options:{
        scales:{
          x:{ grid:{ display:false }, ticks:{ color:"#ccc" } },
          y:{ grid:{ color:"rgba(255,255,255,0.1)" }, ticks:{ color:"#ccc" } }
        },
        plugins:{ legend:{ display:false } }
      }
    });
  }

  // 8. 폐기물 종류별 Popularity 스택 막대
  {
    const labels = ["01 플라스틱","02 목재","03 철근","04 벽돌"];
    const vals   = [46,17,19,29];
    new Chart(
      document.getElementById("popularityChart").getContext("2d"),
      {
        type:"bar",
        data:{
          labels,
          datasets:[
            { data:Array(labels.length).fill(100), backgroundColor:"#333", barThickness:12, borderRadius:6, order:1 },
            {
              data:vals,
              backgroundColor:["#FFC107","#4FC3F7","#2196F3","#CE93D8"],
              barThickness:12, borderRadius:6, order:2,
              datalabels:{
                anchor:"end", align:"end", offset:-4,
                color:"#fff", borderColor: ctx=>ctx.dataset.backgroundColor[ctx.dataIndex],
                borderWidth:2, borderRadius:4, padding:4,
                formatter:v=>v+"%", font:{ weight:"bold", size:12 }
              }
            }
          ]
        },
        options:{
          indexAxis:"y",
          scales:{ x:{ display:false, max:100 }, y:{ ticks:{ color:"#fff" }, grid:{ display:false } } },
          plugins:{ legend:{ display:false }, tooltip:{ enabled:false } }
        },
        plugins:[ChartDataLabels]
      }
    );
  }
});
