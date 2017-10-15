$(document).ready(function () {
  let sessionLength = 25;
  let breakLength = 5;
  let originalTime = sessionLength;
  let currentLength = 0;
  let timeLeft = sessionLength;
  let secs = timeLeft * 60;

  let sessionName = "Session";

  let timerRunning = null;

  function secondsToHms(d) {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    let result = "";
    if (h > 0) {
      result = h + ":";
    }
    if (m < 10) {
      result += "0"
    }
    result += m + ":";
    if (s < 10) {
      result += "0";
    }
    result += s;

    return result;
  }

  function updateTimer() {
    secs--;

    if (secs < 0) {
      if (sessionName === "Session") {
        sessionName = "Break!";
        $("#current-session").text(sessionName);
        currentLength = breakLength;
        timeLeft = secondsToHms(breakLength * 60);
        originalTime = breakLength;
        secs = breakLength * 60;
      } else {
        sessionName = "Session";
        $("#current-session").text(sessionName);
        currentLength = sessionLength;
        timeLeft = secondsToHms(sessionLength * 60);
        originalTime = sessionLength;
        secs = sessionLength * 60;
      }
    } else {
      timeLeft = secondsToHms(secs);
    }
    $("#time-left").text(timeLeft);
  }

  $("#session-minus, #session-plus").click(function () {
    let time = 0;
    switch ($(this).attr("id")) {
      case "session-minus":
        time = -1;
        break;
      case "session-plus":
        time = 1;
        break;
    }
    if (!timerRunning) {
      if (sessionName === "Session") {
        sessionLength += time;
        if (sessionLength < 1) {
          sessionLength = 1;
        }
        timeLeft = sessionLength;
        originalTime = sessionLength;
        secs = sessionLength * 60;
      }
    }
    $("#session-length").text(sessionLength);
    $("#time-left").text(timeLeft);
  });

  $("#break-minus, #break-plus").click(function () {
    let time = 0;
    switch ($(this).attr("id")) {
      case "break-minus":
        time = -1;
        break;
      case "break-plus":
        time = 1;
        break;
    }
    if (!timerRunning) {
      breakLength += time;
      if (breakLength < 1) {
        breakLength = 1;
      }
      if (sessionName === "Break!") {
        timeLeft = breakLength;
        originalTime = breakLength;
        secs = breakLength * 60;
      }
    }
    $("#break-length").text(breakLength);
    $("#time-left").text(timeLeft);
  });

  $("#timer").click(function () {
    if (!timerRunning) {
      if (sessionName === "Session") {
        currentLength = sessionLength;
      } else {
        currentLength = breakLength;
      }

      updateTimer();
      timerRunning = setInterval(updateTimer, 1000);
    } else {
      clearInterval(timerRunning);
      timerRunning = false;
    }
  });
});