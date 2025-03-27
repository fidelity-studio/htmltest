document.addEventListener("DOMContentLoaded", function() {
  const elements = document.querySelectorAll(".typing-text");

  elements.forEach((element) => {
      const rawHTML = element.getAttribute("data-text");

      // 태그와 텍스트를 분리
      const regex = /(<[^>]+>)|([^<]+)/g;
      const parts = [];
      let match;

      while ((match = regex.exec(rawHTML)) !== null) {
          if (match[1]) {
              parts.push({ type: "tag", content: match[1] });
          } else if (match[2]) {
              for (const ch of match[2]) {
                  parts.push({ type: "char", content: ch });
              }
          }
      }

      let index = 0;
      const cursor = document.createElement("span");
      cursor.className = "typing typing-active"; // 타이핑 중일 때는 깜빡이지 않음
      cursor.textContent = "|";

      function type() {
          if (index < parts.length) {
              let html = "";
              for (let i = 0; i <= index; i++) {
                  html += parts[i].content;
              }
              element.innerHTML = html;
              element.appendChild(cursor);
              index++;
              setTimeout(type, 40); // 타이핑 속도 조절
          } else {
              // 타이핑이 끝난 후 3초 동안 깜빡이다 사라지게 설정
              setTimeout(() => {
                  cursor.classList.remove("typing-active");
                  cursor.classList.add("done");

                  // 3초 후 커서 서서히 사라지게 설정
                  setTimeout(() => {
                      cursor.style.opacity = "0";
                  }, 5);
              }, 1000);
          }
      }

      type();
  });
});