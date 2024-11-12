// 색상을 밝게 또는 어둡게 만드는 유틸리티 함수
function shadeColor(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const RR =
    R.toString(16).length === 1 ? `0${R.toString(16)}` : R.toString(16);
  const GG =
    G.toString(16).length === 1 ? `0${G.toString(16)}` : G.toString(16);
  const BB =
    B.toString(16).length === 1 ? `0${B.toString(16)}` : B.toString(16);

  return `#${RR}${GG}${BB}`;
}

// 색상 카드를 렌더링하는 함수
function renderColorCards(baseColor) {
  const colors = [
    { name: "Gray 100", color: shadeColor(baseColor, 40) },
    { name: "Gray 200", color: shadeColor(baseColor, 20) },
    { name: "Gray 400", color: baseColor },
    { name: "Gray 600", color: shadeColor(baseColor, -20) },
    { name: "Gray 800", color: shadeColor(baseColor, -40) },
  ];

  const colorCardsContainer = document.getElementById("color-cards");
  colorCardsContainer.innerHTML = colors
    .map(
      (color) => `
          <div class="color-card" style="background-color: ${color.color}" data-color="${color.color}">
            <div class="color-info">
              <div class="color-value">${color.color}</div>
              <div class="color-name">${color.name}</div>
            </div>
          </div>`
    )
    .join("");

  // 색상 카드에 클릭 이벤트 추가
  document.querySelectorAll(".color-card").forEach((card) => {
    card.addEventListener("click", function () {
      const color = this.getAttribute("data-color");
      copyToClipboard(color);
    });
  });
}

// Example 버튼 렌더링 및 클릭 시 복사 처리
function renderExampleCards(baseColor) {
  const exampleCardsContainer = document.getElementById("example-cards");
  exampleCardsContainer.innerHTML = `
        <div class="ex-card">
          <div class="card-layout">
            <div class="card-layout-content">
              <div class="font-medium">Buttons</div>
            </div>
          </div>
          <div class="card-layout-2">
            <div class="card-content">
              ${[
                "#9ca3af",
                shadeColor(baseColor, 0),
                shadeColor(baseColor, -20),
                shadeColor(baseColor, -40),
              ]
                .map(
                  (color, index) => `
                  <div class="cord-ex">
                    <div class="button-ex" style="background-color: ${color}" data-color="${color}">
                      ${
                        index === 0
                          ? "Default"
                          : index === 1
                          ? "Hover"
                          : index === 2
                          ? "Active"
                          : "Disabled"
                      }
                    </div>
                  </div>`
                )
                .join("")}
            </div>
          </div>
        </div>
      `;

  // 각 버튼에 클릭 이벤트 추가
  document.querySelectorAll(".button-ex").forEach((button) => {
    button.addEventListener("click", function () {
      const color = this.getAttribute("data-color");
      copyToClipboard(color);
    });
  });
}

// 클립보드에 색상을 복사하는 함수
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showCopyMessage(text); // 색상이 복사되었음을 알리는 메시지 표시
    })
    .catch((err) => {
      console.error("Failed to copy color: ", err);
    });
}

// 복사 완료 메시지 표시 함수
function showCopyMessage(text) {
  // 메시지 요소 생성
  const message = document.createElement("div");
  message.classList.add("copy-message");
  message.textContent = `${text}가 복사되었습니다.`;

  // 메시지를 body에 추가
  document.body.appendChild(message);

  // 2초 후 메시지 사라지기
  setTimeout(() => {
    message.classList.add("fade-out"); // 페이드 아웃 효과 추가
    setTimeout(() => {
      message.remove(); // 메시지 삭제
    }, 500); // 페이드 아웃이 끝난 후 삭제
  }, 2000); // 2초 동안 유지
}

// Saved 팔레트 렌더링 및 애니메이션 적용
function renderPaletteCards(baseColor) {
  const colors = [
    shadeColor(baseColor, 40),
    shadeColor(baseColor, 20),
    baseColor,
    shadeColor(baseColor, -20),
    shadeColor(baseColor, -40),
  ];

  const savedPalettesContainer = document.getElementById("saved-palettes");
  savedPalettesContainer.innerHTML = colors
    .map((color, index) => {
      const delay = index * 0.2; // 0.2초씩 지연 시간 설정
      return `
          <div class="palette-bg">
            <div class="palette-color" style="background-color: ${color}; animation-delay: ${delay}s;"></div>
          </div>`;
    })
    .join("");
}

// 인풋 색상 값이 변경되면 처리
document.getElementById("colorPicker").addEventListener("input", function () {
  const selectedColor = this.value;

  // 텍스트 필드에 HEX 코드 표시
  document.querySelector(".input_text").value = selectedColor;

  // 색상에 맞게 팔레트와 카드들을 렌더링
  renderColorCards(selectedColor);
  renderExampleCards(selectedColor);
  renderPaletteCards(selectedColor);
});

// 텍스트 필드에 HEX 값을 입력하면 colorPicker에 반영
document.querySelector(".input_text").addEventListener("input", function () {
  const enteredColor = this.value;

  // 유효한 HEX 색상인지 확인 (정규식으로 유효성 검증)
  const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(enteredColor);

  if (isValidHex) {
    // 컬러 피커에 입력한 색상 반영
    document.getElementById("colorPicker").value = enteredColor;

    // 색상에 맞게 팔레트와 카드들을 렌더링
    renderColorCards(enteredColor);
    renderExampleCards(enteredColor);
    renderPaletteCards(enteredColor);
  }
});
