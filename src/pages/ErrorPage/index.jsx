import React from "react";
import * as Sentry from "@sentry/react";

function ErrorPage() {
  const causeTypeError = () => {
    try {
      const str = undefined;
      console.log(str.toString()); // TypeError발생
    } catch (error) {
      Sentry.withScope((scope) => {
        scope.setTag("errorType", "TypeError");
        scope.setLevel("warning"); //scope를 통해 정보를 추가
        Sentry.captureException(error); // 에러를 Sentry에 전송
      });
    }
  };

  const causeRangeError = () => {
    try {
      const arr = [];
      arr.length = -1; // RangeError에러 발생
    } catch (error) {
      console.error(error);
      Sentry.captureException(error); // 에러를 Sentry에 전송
    }
  };

  const causeNetworkError = async () => {
    try {
      const response = await fetch(
        "https://api.causeNetworkError.com/causeNetworkError"
      );

      if (!response.ok) {
        throw new Error("Network error: " + response.statusText);
      }
    } catch (error) {
      console.error(error);
      Sentry.withScope((scope) => {
        scope.setContext("apiInfo", {
          url: "https://api.causeNetworkError.com/causeNetworkError",
          method: "GET",
          status: 401,
          // (헤더, 파라미터 등의 추가정보 등록)
        });
        scope.setTag("errorType", "NetworkError"); // 태그 설정
        scope.setLevel("fatal"); // 레벨 설정
        Sentry.captureException(error); // 에러를 Sentry에 전송
      });
    }
  };

  const causeCustomError = () => {
    try {
      throw new Error("커스텀 에러, 타입 Fatal 발생 예시");
    } catch (error) {
      Sentry.withScope((scope) => {
        scope.setTag("errorType", "TypeError");
        scope.setLevel("fatal"); //scope를 통해 정보를 추가
        Sentry.captureException(error); // 에러를 Sentry에 전송
      });
    }
  };

  return (
    <div>
      <button onClick={causeTypeError}>Type Error</button>
      <button onClick={causeRangeError}> Range Error</button>
      <button onClick={causeNetworkError}> Network Error</button>
      <button onClick={causeCustomError}> Custom Error</button>
    </div>
  );
}

export default ErrorPage;
