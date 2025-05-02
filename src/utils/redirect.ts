export function countdownRedirect(
  targetUrl: string,
  seconds: number = 5
): void {
  // 카운트다운 창 생성
  const countdownModal = document.createElement("div");
  countdownModal.style.position = "fixed";
  countdownModal.style.top = "50%";
  countdownModal.style.left = "50%";
  countdownModal.style.transform = "translate(-50%, -50%)";
  countdownModal.style.backgroundColor = "rgba(186,225,255, 0.5)";
  countdownModal.style.color = "black";
  countdownModal.style.padding = "20px";
  countdownModal.style.borderRadius = "10px";
  countdownModal.style.textAlign = "center";
  countdownModal.style.zIndex = "9999";
  countdownModal.style.minWidth = "300px";
  countdownModal.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.5)";

  // 타이틀 추가
  const title = document.createElement("h2");
  title.textContent = `${seconds}초 후 페이지 이동`;
  title.style.margin = "0 0 20px 0";
  countdownModal.appendChild(title);

  // 카운트다운 숫자 표시할 요소
  const countdownElement = document.createElement("div");
  countdownElement.textContent = seconds.toString();
  countdownElement.style.fontSize = "60px";
  countdownElement.style.margin = "20px 0";
  countdownModal.appendChild(countdownElement);

  //   // 목적지 URL 표시
  //   const urlInfo = document.createElement("p");
  //   urlInfo.textContent = `이동할 페이지: ${targetUrl}`;
  //   urlInfo.style.margin = "10px 0";
  //   countdownModal.appendChild(urlInfo);

  // 문서에 카운트다운 모달 추가
  document.body.appendChild(countdownModal);

  // 현재 카운트다운 숫자
  let currentCount = seconds;

  // 카운트다운 인터벌 설정
  const countdownInterval = setInterval(() => {
    currentCount--;

    // 카운트다운 숫자 업데이트
    countdownElement.textContent = currentCount.toString();

    // 타이틀 업데이트
    title.textContent = `${currentCount}초 후 페이지 이동`;

    // 카운트다운이 0이 되면 리다이렉트
    if (currentCount <= 0) {
      clearInterval(countdownInterval);
      window.location.href = targetUrl;
    }
  }, 1000);
}
