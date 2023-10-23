document.body.innerHTML = "<div id=\"root\"></div>";
"use strict";
const Clock = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timerLabel, setTimerLabel] = React.useState("Session");
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [isTimerOn, setIsTimerOn] = React.useState(false);

  const Header = () => {return React.createElement("header", null, React.createElement("h1", null, "25 + 5 Clock"));};
  const Footer = () => {return React.createElement("footer", null, "Made by ", React.createElement("a", { href: "https://www.linkedin.com/in/maciej-browarski", target: "_blank" }, "Maciej Browarski"));};

  const breakDecrement = () => {
    if (breakLength > 1 && !isTimerOn) {
      setBreakLength(breakLength - 1);
    }
  };

  const breakIncrement = () => {
    if (breakLength < 60 && !isTimerOn) {
      setBreakLength(breakLength + 1);
    }
  };

  const sessionDecrement = () => {
    if (sessionLength > 1 && !isTimerOn) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const sessionIncrement = () => {
    if (sessionLength < 60 && !isTimerOn) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const btnW = () => {
    document.getElementById("start_stop").classList.remove("btn-success");
    document.getElementById("start_stop").classList.add("btn-warning");
  };

  const btnS = () => {
    document.getElementById("start_stop").classList.remove("btn-warning");
    document.getElementById("start_stop").classList.add("btn-success");
  };

  const status = () => {
    clearTimeout(tick);
    if (!isTimerOn) {
      btnW();
      setIsTimerOn(true);
    } else
    {
      btnS();
      setIsTimerOn(false);
    }
  };

  const currentTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const fM = minutes < 10 ? "0" + minutes : minutes;
    const fS = seconds < 10 ? "0" + seconds : seconds;
    return fM + ":" + fS;
  };

  const countDown = () => {
    if (timeLeft && isTimerOn) {
      setTimeLeft(timeLeft - 1);
    }
  };

  const tick = setTimeout(countDown, 1000);

  const buttonTimer = isTimerOn ? "Stop" : "Start";

  const audioReset = () => {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  };

  const typeOfWork = () => {
    if (timeLeft == 0 && timerLabel == "Session") {
      document.getElementById("beep").play();
      const bS = () => {
        setTimeLeft(breakLength * 60);
        setTimerLabel("Break");
      };
      setTimeout(bS, 2000);
    }

    if (timeLeft == 0 && timerLabel == "Break") {
      audioReset();
      const sS = () => {
        setTimeLeft(sessionLength * 60);
        setTimerLabel("Session");
      };
      setTimeout(sS, 2000);
    }
  };

  const clock = () => {
    if (isTimerOn) {
      tick;
      typeOfWork();
    } else
    {
      clearTimeout(tick);
    }
  };

  React.useEffect(() => {clock();}, [isTimerOn, timeLeft, tick]);

  const reset = () => {
    clearTimeout(tick);
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    setIsTimerOn(false);
    audioReset();
  };

  return (
    React.createElement("main", null, 
    React.createElement("div", { className: "container-fluid bg-dark text-white pt-3 pb-5" }, 
    React.createElement("div", { className: "col-md-4 mx-auto p-1 bg-secondary border border-secondary rounded" }, 
    React.createElement("div", { className: "d-flex justify-content-center mb-4 p-2 bg-primary border border-primary rounded" }, 
    React.createElement(Header, null)), 

    React.createElement("div", { className: "d-flex flex-column mb-4 mx-auto" }, 
    React.createElement("div", { className: "d-flex p-3 mb-3 bg-dark border border-dark rounded" }, 
    React.createElement("div", { className: "w-50 d-flex justify-content-start" }, 
    React.createElement("span", { className: "h4", id: "break-label" }, "Break", React.createElement("br", null), "Length")), 

    React.createElement("div", { className: "w-50 d-flex justify-content-end" }, 
    React.createElement("button", { className: "btn btn-dark btn-sm", type: "button", id: "break-increment", onClick: breakIncrement }, React.createElement("i", { class: "bi bi-arrow-up-circle-fill h2" })), 
    React.createElement("span", { className: "pt-2 h1", id: "break-length" }, breakLength), 
    React.createElement("button", { className: "btn btn-dark btn-sm", type: "button", id: "break-decrement", onClick: breakDecrement }, React.createElement("i", { class: "bi bi-arrow-down-circle-fill h2" })))), 


    React.createElement("div", { className: "d-flex p-3 bg-dark border border-dark rounded" }, 
    React.createElement("div", { className: "w-50 d-flex justify-content-start" }, 
    React.createElement("span", { className: "h4", id: "session-label" }, "Session", React.createElement("br", null), "Length")), 

    React.createElement("div", { className: "w-50 d-flex justify-content-end" }, 
    React.createElement("button", { className: "btn btn-dark btn-sm", type: "button", id: "session-increment", onClick: sessionIncrement }, React.createElement("i", { class: "bi bi-arrow-up-circle-fill h2" })), 
    React.createElement("span", { className: "pt-2 h1", id: "session-length" }, sessionLength), 
    React.createElement("button", { className: "btn btn-dark btn-sm", type: "button", id: "session-decrement", onClick: sessionDecrement }, React.createElement("i", { class: "bi bi-arrow-down-circle-fill h2" }))))), 



    React.createElement("div", { className: "d-flex flex-column ps-5 pe-5 mb-4 mx-auto" }, 
    React.createElement("div", { className: "d-flex justify-content-center p-2 h2 bg-info text-dark border border-info rounded", id: "timer-label" }, timerLabel), 
    React.createElement("div", { className: "d-flex justify-content-center p-2" }, 
    React.createElement("span", { className: "pt-1 pb-1 pe-4 ps-4 display-2 bg-dark border border-dark rounded", id: "time-left" }, currentTimer())), 

    React.createElement("div", { className: "d-flex justify-content-center p-2" }, 
    React.createElement("div", { className: "p-2" }, 
    React.createElement("button", { className: "btn btn-success", type: "button", id: "start_stop", onClick: status }, buttonTimer)), 

    React.createElement("div", { className: "p-2" }, 
    React.createElement("button", { className: "btn btn-danger", type: "button", id: "reset", onClick: reset }, "Reset"))))), 




    React.createElement("div", { className: "d-flex justify-content-center pt-3" }, 
    React.createElement(Footer, null), React.createElement("audio", { preload: "auto", id: "beep", src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })))));




};

ReactDOM.createRoot(document.getElementById("root")).render( React.createElement(Clock, null));
