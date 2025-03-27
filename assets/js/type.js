document.addEventListener("DOMContentLoaded", function () {
  // 한 글자씩 타이핑 애니메이션
  const typingTextElements = document.querySelectorAll(".typing-text");

  typingTextElements.forEach((element) => {
    const rawHTML = element.getAttribute("data-text");

    // 숨겨진 요소로 높이 계산
    const hiddenDiv = document.createElement("div");
    hiddenDiv.style.position = "absolute";
    hiddenDiv.style.visibility = "hidden";
    hiddenDiv.style.height = "auto";
    hiddenDiv.style.whiteSpace = "normal"; // 줄바꿈 최소화
    hiddenDiv.style.width = `${element.offsetWidth}px`; // 부모 요소의 실제 너비 사용
    hiddenDiv.style.padding = "0"; // 패딩 제거
    hiddenDiv.style.margin = "0"; // 마진 제거
    hiddenDiv.style.lineHeight = getComputedStyle(element).lineHeight; // 동일한 줄 간격 사용
    hiddenDiv.style.fontSize = getComputedStyle(element).fontSize; // 동일한 글꼴 크기 사용
    hiddenDiv.style.fontFamily = getComputedStyle(element).fontFamily; // 동일한 글꼴 사용
    hiddenDiv.style.boxSizing = "border-box"; // 박스 크기 계산 방식 통일
    hiddenDiv.innerHTML = rawHTML;

    document.body.appendChild(hiddenDiv);
    const calculatedHeight = hiddenDiv.offsetHeight;
    document.body.removeChild(hiddenDiv);

    // 계산된 높이를 적용
    element.style.height = `${calculatedHeight}px`;

    // 타이핑 애니메이션 시작
    startTypingAnimation(element, rawHTML);
  });

  function startTypingAnimation(element, rawHTML) {
    const regex = /(<[^>]+>)|([^<]+)/g; // 태그와 텍스트를 분리하는 정규식
    const parts = [];
    let match;

    while ((match = regex.exec(rawHTML)) !== null) {
      if (match[1]) {
        // HTML 태그
        parts.push({ type: "tag", content: match[1] });
      } else if (match[2]) {
        // 일반 텍스트
        for (const ch of match[2]) {
          parts.push({ type: "char", content: ch });
        }
      }
    }

    let index = 0;
    const cursor = document.createElement("span");
    cursor.className = "typing typing-active";
    cursor.textContent = "|";
    element.appendChild(cursor);

    // 타이핑 중 스타일 적용
    element.classList.add("typing-in-progress");

    function type() {
      if (index < parts.length) {
        let html = "";
        for (let i = 0; i <= index; i++) {
          if (parts[i].type === "tag") {
            html += parts[i].content; // 태그는 그대로 추가
          } else {
            html += parts[i].content; // 텍스트는 한 글자씩 추가
          }
        }
        element.innerHTML = html;
        element.appendChild(cursor);
        index++;
        setTimeout(type, 40); // 타이핑 속도 조절
      } else {
        // 타이핑 완료 후 스타일 변경
        element.classList.remove("typing-in-progress");
        element.classList.add("typing-complete");
        cursor.remove();
      }
    }

    type();
  }
});