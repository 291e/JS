// 로컬 스토리지를 사용하여 색상 저장 상태 유지
let savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];

// 선택된 색상
let selectedColor = ""; // 초기값은 선택된 색상

// 페이지가 로드될 때 실행되는 함수
document.addEventListener("DOMContentLoaded", () => {
  const saveColorBtn = document.getElementById("saveColorBtn");
  const saveIcon = document.getElementById("saveIcon");
  const colorPicker = document.getElementById("colorPicker");

  // saved.html일 때는 저장된 색상만 렌더링
  const savedColorsContainer = document.getElementById("savedColorsContainer");
  if (savedColorsContainer) {
    // saved.html에서 저장된 색상 렌더링
    renderSavedColors();
  }

  // index.html에서만 동작하는 부분
  if (saveColorBtn && saveIcon && colorPicker) {
    updateSaveIcon();

    // 저장 버튼 클릭 이벤트
    saveColorBtn.addEventListener("click", function () {
      if (savedColors.includes(selectedColor)) {
        // 저장된 색상이면 삭제
        savedColors = savedColors.filter((color) => color !== selectedColor);
        saveIcon.src = "star-regular.svg"; // 아이콘을 regular로 변경
      } else {
        // 저장되지 않은 색상이면 추가
        savedColors.push(selectedColor);
        saveIcon.src = "star-solid.svg"; // 아이콘을 solid로 변경
      }

      // 로컬 스토리지에 저장
      localStorage.setItem("savedColors", JSON.stringify(savedColors));

      // 저장된 색상 업데이트
      renderSavedColors();
    });

    // 컬러 피커 값이 변경될 때마다 선택된 색상 업데이트
    colorPicker.addEventListener("input", function () {
      selectedColor = this.value; // 선택된 색상을 업데이트
      updateSaveIcon(); // 아이콘 상태 업데이트
    });
  }
});

// 저장된 색상을 표시하는 함수 (Saved 페이지)
function renderSavedColors() {
  const savedColorsContainer = document.getElementById("savedColorsContainer");
  if (savedColorsContainer) {
    savedColorsContainer.innerHTML = savedColors
      .map(
        (color) => `
      <div class="saved-color" style="background-color: ${color};   width: 50px;
  height: 50px;
  border-radius: 0.25rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);"></div>`
      )
      .join("");
  }
}

// 아이콘 상태 업데이트 함수 (index.html 전용)
function updateSaveIcon() {
  const saveIcon = document.getElementById("saveIcon");
  if (!saveIcon) return; // saveIcon이 없으면 함수 종료

  if (savedColors.includes(selectedColor)) {
    saveIcon.src = "star-solid.svg"; // 저장된 경우 solid로 변경
  } else {
    saveIcon.src = "star-regular.svg"; // 저장되지 않은 경우 regular로 설정
  }
}
