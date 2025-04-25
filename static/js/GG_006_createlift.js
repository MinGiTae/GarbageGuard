////const character = document.getElementById('character');
////
////window.addEventListener('mousemove', (e) => {
////  character.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
////});
////
////const searchButton = document.getElementById('search-button');
////const searchInput = document.getElementById('search-input');
////const searchResults = document.getElementById('search-results');
////
////searchButton.addEventListener('click', () => {
////  const keyword = searchInput.value.trim();
////
////  if (keyword === '') {
////    searchResults.style.display = 'block';
////    searchResults.innerHTML = '검색어를 입력해주세요!';
////    return;
////  }
////
////  searchResults.style.display = 'block';
////  searchResults.innerHTML = `
////    <p>🔍 <strong>"${keyword}"</strong>건설현장에 대한 검색 결과</p>
////    <ul>
////      <li>${keyword} </li>
////    </ul>
////  `;
////});
////
////document.addEventListener("DOMContentLoaded", function () {
////  const checkButton = document.getElementById("check-all-button");
////  let isChecked = false;
////
////  checkButton.addEventListener("click", function () {
////    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
////    checkboxes.forEach((checkbox) => {
////      checkbox.checked = !isChecked;
////    });
////
////    isChecked = !isChecked;
////
////    checkButton.textContent = isChecked ? "모두 해제하기" : "모두 체크하기";
////  });
////});
////
////const btn = document.getElementById('popup-btn');
////const popup = document.getElementById('popup');
////
////btn.addEventListener('click', () => {
////  popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
////});
////
////window.addEventListener('DOMContentLoaded', () => {
////  const checkboxes = document.querySelectorAll('.arrow-target');
////  const arrow = document.getElementById('arrow');
////
////  if (!arrow || checkboxes.length === 0) return;
////
////  function moveArrowToCheckbox(checkbox) {
////    const row = checkbox.parentElement;
////    const rect = row.getBoundingClientRect();
////    const scrollTop = window.scrollY || document.documentElement.scrollTop;
////    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
////
////    // 화살표 위치 이동
////    arrow.style.display = 'block';
////    arrow.style.top = `${rect.top + scrollTop}px`;
////    arrow.style.left = `${rect.left + scrollLeft - 40}px`;
////  }
////
////  // 사용자 클릭 시 이벤트 연결
////  checkboxes.forEach(checkbox => {
////    checkbox.addEventListener('change', () => {
////      if (checkbox.checked) {
////        moveArrowToCheckbox(checkbox);
////        checkbox.parentElement.style.color = '#00FF00'; // ✅ 체크 시 초록
////      } else {
////        checkbox.parentElement.style.color = '#ffffff'; // ⬅ 체크 해제 시 흰색
////      }
////    });
////  });
////});
////
////document.addEventListener('DOMContentLoaded', () => {
////  const checkboxes = document.querySelectorAll('.arrow-target');
////  const resultTableBody = document.querySelector('#result-table tbody');
////
////  const checklistReasons = {
////    1: { title: "환경 방침 수립", reason: "공식 문서 미존재" },
////    2: { title: "환경 측면 식별", reason: "영향 요소 평가 누락" },
////    3: { title: "환경 목표 설정", reason: "문서화된 목표 없음" },
////    4: { title: "법적 요구사항", reason: "관련 법률 파악 미흡" },
////    5: { title: "교육 훈련", reason: "직원 대상 교육 미실시" },
////    6: { title: "운영 관리", reason: "운영 절차 미정립" },
////    7: { title: "비상 대응", reason: "비상 매뉴얼 없음" },
////    8: { title: "모니터링", reason: "측정 계획 미수립" },
////    9: { title: "내부 감사", reason: "정기 감사 미실시" },
////    10: { title: "경영 검토", reason: "경영진 검토 누락" },
////    11: { title: "문서화 관리", reason: "문서 변경 기록 누락" },
////    12: { title: "성과 평가", reason: "지표 평가 미흡" },
////    13: { title: "규제 대응", reason: "법규 미이행" },
////    14: { title: "자원관리", reason: "필수 자원 부족" },
////    15: { title: "위험 평가", reason: "리스크 평가 미수행" },
////    16: { title: "공급자 평가", reason: "협력사 평가 없음" },
////    17: { title: "정보 기록", reason: "기록 관리 미흡" },
////    18: { title: "교육 내역", reason: "교육 이력 미기록" },
////    19: { title: "개선 조치", reason: "개선계획 부재" },
////    20: { title: "지속 가능성", reason: "지속 개선 전략 없음" }
////  };
////
////  document.getElementById('Button3').addEventListener('click', () => {
////    resultTableBody.innerHTML = '';
////
////    checkboxes.forEach((checkbox, i) => {
////      const num = i + 1;
////      const isChecked = checkbox.checked;
////      const data = checklistReasons[num] || {
////        title: `기준 ${num}`,
////        reason: "기준 설명 없음"
////      };
////
////      const row = document.createElement('tr');
////      row.innerHTML = `
////        <td>${num}</td>
////        <td>${data.title}</td>
////        <td>${isChecked ? '✅ 적합' : '❌ 부적합'}</td>
////        <td>${isChecked ? '-' : data.reason}</td>
////        <td>${new Date().toLocaleString()}</td>
////      `;
////      resultTableBody.appendChild(row);
////    });
////  });
////});
////
/////* ✅✅✅ 아래는 PDF 및 Excel 다운로드 기능 추가 코드입니다 ✅✅✅ */
////
////// 📄 PDF 다운로드
////document.getElementById('Button1').addEventListener('click', () => {
////  const { jsPDF } = window.jspdf;
////  const doc = new jsPDF();
////  const table = document.getElementById("result-table");
////  let rows = [...table.rows];
////  let startY = 10;
////
////  rows.forEach((row, index) => {
////    let cols = [...row.cells];
////    cols.forEach((cell, i) => {
////      doc.text(cell.innerText, 10 + i * 40, startY);
////    });
////    startY += 10;
////  });
////
////  doc.save("결과표.pdf");
////});
////
////// 📊 Excel 다운로드
////document.getElementById('Button2').addEventListener('click', () => {
////  const table = document.getElementById('result-table');
////  const wb = XLSX.utils.book_new();
////  const ws = XLSX.utils.table_to_sheet(table);
////  XLSX.utils.book_append_sheet(wb, ws, "결과표");
////  XLSX.writeFile(wb, "결과표.xlsx");
////});
////
/////* ✅✅✅ 끝 ✅✅✅ */
//const character = document.getElementById('character');
//
//window.addEventListener('mousemove', (e) => {
//  character.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
//});
//
//const searchButton = document.getElementById('search-button');
//const searchInput = document.getElementById('search-input');
//const searchResults = document.getElementById('search-results');
//
//searchButton.addEventListener('click', () => {
//  const keyword = searchInput.value.trim();
//
//  if (keyword === '') {
//    searchResults.style.display = 'block';
//    searchResults.innerHTML = '검색어를 입력해주세요!';
//    return;
//  }
//
//  searchResults.style.display = 'block';
//  searchResults.innerHTML = `
//    <p>🔍 <strong>"${keyword}"</strong>건설현장에 대한 검색 결과</p>
//    <ul>
//      <li>${keyword} </li>
//    </ul>
//  `;
//});
//
//document.addEventListener("DOMContentLoaded", function () {
//  const checkButton = document.getElementById("check-all-button");
//  let isChecked = false;
//
//  checkButton.addEventListener("click", function () {
//    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//    checkboxes.forEach((checkbox) => {
//      checkbox.checked = !isChecked;
//    });
//
//    isChecked = !isChecked;
//
//    checkButton.textContent = isChecked ? "모두 해제하기" : "모두 체크하기";
//  });
//});
//
//const btn = document.getElementById('popup-btn');
//const popup = document.getElementById('popup');
//
//btn.addEventListener('click', () => {
//  popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
//});
//
//// ✅✅✅ 자동 체크 + 화살표 이동 (사용자 클릭 제거) ✅✅✅
//window.addEventListener('DOMContentLoaded', () => {
//  const checkboxes = document.querySelectorAll('.arrow-target');
//  const arrow = document.getElementById('arrow');
//
//  if (!arrow || checkboxes.length === 0) return;
//
//  let index = 0;
//
//  function moveArrowAndCheck() {
//    const current = checkboxes[index];
//    if (!current) return;
//
//    const rect = current.getBoundingClientRect();
//    const scrollTop = window.scrollY || document.documentElement.scrollTop;
//    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
//
//    arrow.style.display = 'block';
//    arrow.style.top = `${rect.top + scrollTop}px`;
//    arrow.style.left = `${rect.left + scrollLeft - 30}px`;
//
//    setTimeout(() => {
//      current.checked = true;
//      index++;
//      if (index < checkboxes.length) {
//        setTimeout(moveArrowAndCheck, 800);
//      }
//    }, 500);
//  }
//
//  moveArrowAndCheck();
//});
//// ✅✅✅ 끝 ✅✅✅
//
//document.addEventListener('DOMContentLoaded', () => {
//  const checkboxes = document.querySelectorAll('.arrow-target');
//  const resultTableBody = document.querySelector('#result-table tbody');
//
//  const checklistReasons = {
//    1: { title: "환경 방침 수립", reason: "공식 문서 미존재" },
//    2: { title: "환경 측면 식별", reason: "영향 요소 평가 누락" },
//    3: { title: "환경 목표 설정", reason: "문서화된 목표 없음" },
//    4: { title: "법적 요구사항", reason: "관련 법률 파악 미흡" },
//    5: { title: "교육 훈련", reason: "직원 대상 교육 미실시" },
//    6: { title: "운영 관리", reason: "운영 절차 미정립" },
//    7: { title: "비상 대응", reason: "비상 매뉴얼 없음" },
//    8: { title: "모니터링", reason: "측정 계획 미수립" },
//    9: { title: "내부 감사", reason: "정기 감사 미실시" },
//    10: { title: "경영 검토", reason: "경영진 검토 누락" },
//    11: { title: "문서화 관리", reason: "문서 변경 기록 누락" },
//    12: { title: "성과 평가", reason: "지표 평가 미흡" },
//    13: { title: "규제 대응", reason: "법규 미이행" },
//    14: { title: "자원관리", reason: "필수 자원 부족" },
//    15: { title: "위험 평가", reason: "리스크 평가 미수행" },
//    16: { title: "공급자 평가", reason: "협력사 평가 없음" },
//    17: { title: "정보 기록", reason: "기록 관리 미흡" },
//    18: { title: "교육 내역", reason: "교육 이력 미기록" },
//    19: { title: "개선 조치", reason: "개선계획 부재" },
//    20: { title: "지속 가능성", reason: "지속 개선 전략 없음" }
//  };
//
//  document.getElementById('Button3').addEventListener('click', () => {
//    resultTableBody.innerHTML = '';
//
//    checkboxes.forEach((checkbox, i) => {
//      const num = i + 1;
//      const isChecked = checkbox.checked;
//      const data = checklistReasons[num] || {
//        title: `기준 ${num}`,
//        reason: "기준 설명 없음"
//      };
//
//      const row = document.createElement('tr');
//      row.innerHTML = `
//        <td>${num}</td>
//        <td>${data.title}</td>
//        <td>${isChecked ? '✅ 적합' : '❌ 부적합'}</td>
//        <td>${isChecked ? '-' : data.reason}</td>
//        <td>${new Date().toLocaleString()}</td>
//      `;
//      resultTableBody.appendChild(row);
//    });
//  });
//});
//
///* ✅✅✅ 아래는 PDF 및 Excel 다운로드 기능 ✅✅✅ */
//
//document.getElementById('Button1').addEventListener('click', () => {
//  const { jsPDF } = window.jspdf;
//  const doc = new jsPDF();
//  const table = document.getElementById("result-table");
//  let rows = [...table.rows];
//  let startY = 10;
//
//  rows.forEach((row, index) => {
//    let cols = [...row.cells];
//    cols.forEach((cell, i) => {
//      doc.text(cell.innerText, 10 + i * 40, startY);
//    });
//    startY += 10;
//  });
//
//  doc.save("결과표.pdf");
//});
//
//document.getElementById('Button2').addEventListener('click', () => {
//  const table = document.getElementById('result-table');
//  const wb = XLSX.utils.book_new();
//  const ws = XLSX.utils.table_to_sheet(table);
//  XLSX.utils.book_append_sheet(wb, ws, "결과표");
//  XLSX.writeFile(wb, "결과표.xlsx");
//});
//
///* ✅✅✅ 끝 ✅✅✅ */



const character = document.getElementById('character');

window.addEventListener('mousemove', (e) => {
  character.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', () => {
  const keyword = searchInput.value.trim();

  if (keyword === '') {
    searchResults.style.display = 'block';
    searchResults.innerHTML = '검색어를 입력해주세요!';
    return;
  }

  searchResults.style.display = 'block';
  searchResults.innerHTML = `
    <p>🔍 <strong>"${keyword}"</strong>건설현장에 대한 검색 결과</p>
    <ul>
      <li>${keyword} </li>
    </ul>
  `;
});

document.addEventListener("DOMContentLoaded", function () {
  const checkButton = document.getElementById("check-all-button");
  let isChecked = false;

  checkButton.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = !isChecked;
    });

    isChecked = !isChecked;

    checkButton.textContent = isChecked ? "모두 해제하기" : "모두 체크하기";
  });
});

const btn = document.getElementById('popup-btn');
const popup = document.getElementById('popup');

btn.addEventListener('click', () => {
  popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
});

// ✅✅✅ 자동 체크 + 화살표 이동 (사용자 클릭 제거) + .row 기준 왼쪽에 화살표 표시 ✅✅✅
window.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.arrow-target');
  const arrow = document.getElementById('arrow');

  if (!arrow || checkboxes.length === 0) return;

  let index = 0;

  function moveArrowAndCheck() {
    const current = checkboxes[index];
    if (!current) return;

    const row = current.closest('.row'); // ✅ .row 기준으로 화살표 위치 계산
    const rect = row.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    arrow.style.display = 'block';
    arrow.style.top = `${rect.top + scrollTop}px`;
    arrow.style.left = `${rect.left + scrollLeft - 30}px`; // ✅ .row 왼쪽에 화살표 위치

    setTimeout(() => {
      current.checked = true;
      index++;
      if (index < checkboxes.length) {
        setTimeout(moveArrowAndCheck, 800);
      }
    }, 500);
  }

  moveArrowAndCheck();
});
// ✅✅✅ 끝 ✅✅✅

document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.arrow-target');
  const resultTableBody = document.querySelector('#result-table tbody');

  const checklistReasons = {
    1: { title: "환경 방침 수립", reason: "공식 문서 미존재" },
    2: { title: "환경 측면 식별", reason: "영향 요소 평가 누락" },
    3: { title: "환경 목표 설정", reason: "문서화된 목표 없음" },
    4: { title: "법적 요구사항", reason: "관련 법률 파악 미흡" },
    5: { title: "교육 훈련", reason: "직원 대상 교육 미실시" },
    6: { title: "운영 관리", reason: "운영 절차 미정립" },
    7: { title: "비상 대응", reason: "비상 매뉴얼 없음" },
    8: { title: "모니터링", reason: "측정 계획 미수립" },
    9: { title: "내부 감사", reason: "정기 감사 미실시" },
    10: { title: "경영 검토", reason: "경영진 검토 누락" },
    11: { title: "문서화 관리", reason: "문서 변경 기록 누락" },
    12: { title: "성과 평가", reason: "지표 평가 미흡" },
    13: { title: "규제 대응", reason: "법규 미이행" },
    14: { title: "자원관리", reason: "필수 자원 부족" },
    15: { title: "위험 평가", reason: "리스크 평가 미수행" },
    16: { title: "공급자 평가", reason: "협력사 평가 없음" },
    17: { title: "정보 기록", reason: "기록 관리 미흡" },
    18: { title: "교육 내역", reason: "교육 이력 미기록" },
    19: { title: "개선 조치", reason: "개선계획 부재" },
    20: { title: "지속 가능성", reason: "지속 개선 전략 없음" }
  };

  document.getElementById('Button3').addEventListener('click', () => {
    resultTableBody.innerHTML = '';

    checkboxes.forEach((checkbox, i) => {
      const num = i + 1;
      const isChecked = checkbox.checked;
      const data = checklistReasons[num] || {
        title: `기준 ${num}`,
        reason: "기준 설명 없음"
      };

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${num}</td>
        <td>${data.title}</td>
        <td>${isChecked ? '✅ 적합' : '❌ 부적합'}</td>
        <td>${isChecked ? '-' : data.reason}</td>
        <td>${new Date().toLocaleString()}</td>
      `;
      resultTableBody.appendChild(row);
    });
  });
});

/* ✅✅✅ 아래는 PDF 및 Excel 다운로드 기능 ✅✅✅ */

document.getElementById('Button1').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const table = document.getElementById("result-table");
  let rows = [...table.rows];
  let startY = 10;

  rows.forEach((row, index) => {
    let cols = [...row.cells];
    cols.forEach((cell, i) => {
      doc.text(cell.innerText, 10 + i * 40, startY);
    });
    startY += 10;
  });

  doc.save("결과표.pdf");
});

document.getElementById('Button2').addEventListener('click', () => {
  const table = document.getElementById('result-table');
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(table);
  XLSX.utils.book_append_sheet(wb, ws, "결과표");
  XLSX.writeFile(wb, "결과표.xlsx");
});

/* ✅✅✅ 끝 ✅✅✅ */
