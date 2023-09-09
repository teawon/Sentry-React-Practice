import React from "react";
import * as Sentry from "@sentry/react";

function ErrorPage() {
  const causeTypeError = () => {
    try {
      const str = undefined;
      console.log(str.toString()); // TypeError발생
    } catch (error) {
      console.error(error);
      Sentry.captureException(error); // 에러를 Sentry에 전송
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
      Sentry.captureException(error); // 에러를 Sentry에 전송
    }
  };

  const causeCustomError = () => {
    try {
      throw new Error("커스텀 에러 발생");
    } catch (error) {
      console.error(error);
      Sentry.captureException(error); // 에러를 Sentry에 전송
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
