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