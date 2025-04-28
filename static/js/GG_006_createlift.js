// ✅ 캐릭터 이동
const character = document.getElementById('character');
window.addEventListener('mousemove', (e) => {
  character.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// ✅ 검색 기능 (🔥 서버 연동 + 기존 카드 삭제 후 검색 결과 추가)
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', () => {
  const keyword = searchInput.value.trim();
  if (keyword === '') {
    alert('건설현장 이름을 입력해주세요!');
    return;
  }

  fetch(`/search-site?keyword=${encodeURIComponent(keyword)}`)
    .then(response => response.json())
    .then(data => {
      const listContainer = document.getElementById('site-list'); // 🔥 여기로 추가
      listContainer.innerHTML = ''; // 🔥 기존 site-card 전부 삭제

      if (data.length === 0) {
        listContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
        return;
      }

      data.forEach(site => {
        const card = document.createElement('div');
        card.className = 'site-card';
        card.textContent = site.site_name;

        card.addEventListener('click', () => {
          selectSite(site.site_name, card);
        });

        listContainer.appendChild(card);
      });
    })
    .catch(error => console.error('Error:', error));
});

// ✅ 팝업
const btn = document.getElementById('popup-btn');
const popup = document.getElementById('popup');
btn.addEventListener('click', () => {
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
});

// ✅ 화살표 움직이기 (처음엔 왼쪽에서 시작)
let index = 0;
function moveArrowAndToggle() {
  const targets = document.querySelectorAll('.status-circle.arrow-target');
  const arrow = document.getElementById('arrow');
  if (!arrow || targets.length === 0) return;

  const current = targets[index];
  if (!current) return;

  const row = current.closest('.row');
  const rect = row.getBoundingClientRect();
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const scrollX = window.scrollX || document.documentElement.scrollLeft;

  // 시작은 무조건 왼쪽
  arrow.style.left = `${rect.left + scrollX - 40}px`;
  arrow.style.top = `${rect.top + scrollY + rect.height/2 - 20}px`;
  arrow.style.display = 'block';

  setTimeout(() => {
    const isChecked = Math.random() > 0.5;

    if (isChecked) {
      current.classList.add('checked');
      current.classList.remove('unchecked');
      current.style.backgroundColor = '#00c300';
      current.style.boxShadow = 'inset 0 2px 6px rgba(0,0,0,0.3), 0 0 5px #00c300';
    } else {
      current.classList.add('unchecked');
      current.classList.remove('checked');
      current.style.backgroundColor = '#ff3b3b';
      current.style.boxShadow = 'inset 0 2px 6px rgba(0,0,0,0.3), 0 0 5px #ff3b3b';
    }

    index++;
    if (index < targets.length) {
      setTimeout(() => {
        const next = targets[index];
        if (!next) return;
        const nextRow = next.closest('.row');
        const nextRect = nextRow.getBoundingClientRect();
        const nextIsLeftColumn = nextRow.parentElement === document.querySelector('.table-container .table-column:first-child');

        if (nextIsLeftColumn) {
          arrow.style.left = `${nextRect.right + scrollX + 10}px`;
        } else {
          arrow.style.left = `${nextRect.left + scrollX - 40}px`;
        }
        arrow.style.top = `${nextRect.top + scrollY + nextRect.height/2 - 20}px`;

        moveArrowAndToggle();
      }, 100);
    }
  }, 500);
}

// ✅ 완료 버튼 → 결과표 생성 + 화살표 숨김
document.addEventListener('DOMContentLoaded', () => {
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

    const circles = document.querySelectorAll('.status-circle.arrow-target');
    circles.forEach((circle, i) => {
      const num = i + 1;
      const isPass = circle.classList.contains('checked');
      const isFail = circle.classList.contains('unchecked');
      const data = checklistReasons[num] || { title: `기준 ${num}`, reason: "기준 설명 없음" };

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${num}</td>
        <td>${data.title}</td>
        <td>${isPass ? '✅ 적합' : '❌ 부적합'}</td>
        <td>${isPass ? '-' : data.reason}</td>
        <td>${new Date().toLocaleString()}</td>
      `;
      resultTableBody.appendChild(row);
    });

    const arrow = document.getElementById('arrow');
    if (arrow) {
      arrow.style.display = 'none';
    }
  });
});

// ✅ PDF/Excel 다운로드 (건설현장명으로 저장)
document.getElementById('Button2').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const rows = [...document.getElementById("result-table").rows];
  let y = 10;
  rows.forEach(r => {
    [...r.cells].forEach((c, i) => doc.text(c.innerText, 10 + i * 40, y));
    y += 10;
  });
  const filename = selectedSiteName ? selectedSiteName.replace(/\s/g, "_") + ".pdf" : "결과표.pdf";
  doc.save(filename);
});

document.getElementById('Button1').addEventListener('click', () => {
  const ws = XLSX.utils.table_to_sheet(document.getElementById('result-table'));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "결과표");

  const filename = selectedSiteName ? selectedSiteName.replace(/\s/g, "_") + ".xlsx" : "결과표.xlsx";
  XLSX.writeFile(wb, filename);
});

// ✅ 선택된 건설현장 저장
let selectedSiteName = null;
let previouslySelectedCard = null;

function selectSite(siteName, cardElement) {
  if (previouslySelectedCard) {
    previouslySelectedCard.classList.remove('selected');
  }
  cardElement.classList.add('selected');
  previouslySelectedCard = cardElement;
  selectedSiteName = siteName;
  document.getElementById('selected-site').textContent = `선택된 건설현장: ${siteName}`;
}

// ✅ 선택하기 버튼 클릭 시
function submitSelectedSite() {
  if (!selectedSiteName) {
    alert('건설현장을 선택해주세요.');
    return;
  }

  document.getElementById('site-name-input').value = selectedSiteName;

  // 🔥 체크리스트 초기화
  const circles = document.querySelectorAll('.status-circle.arrow-target');
  circles.forEach(circle => {
    circle.classList.remove('checked', 'unchecked');
    circle.style.backgroundColor = 'gray';
    circle.style.boxShadow = 'none';
  });

  // 🔥 결과표 초기화
  document.querySelector('#result-table tbody').innerHTML = '';

  index = 0;
  moveArrowAndToggle();
}
