const activeTimers = [];//this line declares the empty array callad "timers" to store all information about activetimers//
const activeTimersContainer = document.getElementById("activeTimers");
const startTimerButton = document.getElementById("startTimer");
const timerAudio = document.getElementById("timerAudio");

startTimerButton.addEventListener("click", () => {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;

    const totalTime = hours * 3600 + minutes * 60 + seconds;

    if (totalTime > 0) {
        createTimer(totalTime);
    }
});

function createTimer(totalTime) {  //this funcion is responsible for creating a newtimer when user click on the "set" button
    const timer = document.createElement("div");
    timer.className = "active-timer";

    const setTime = document.createElement("h1");
    timer.innerText = " Time Left :"
    timer.appendChild(setTime);

    const timeDisplay = document.createElement("div");
    timeDisplay.className = "time";
    timer.appendChild(timeDisplay);

    const stopButton = document.createElement("button");
    stopButton.className = "stop-button";
    stopButton.innerText = "Stop Timer";
    timer.appendChild(stopButton);

    activeTimersContainer.appendChild(timer);

    const intervalId = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(intervalId);
            timerAudio.play();
            timer.classList.add("timer-ended"); // Add CSS class for timer end design
            stopButton.remove();
        } else {
            const hoursRemaining = Math.floor(totalTime / 3600);
            const minutesRemaining = Math.floor((totalTime % 3600) / 60);
            const secondsRemaining = totalTime % 60;
            timeDisplay.innerText = `${hoursRemaining}:${minutesRemaining}:${secondsRemaining}`;
            totalTime--;
        }
    }, 1000);

    stopButton.addEventListener("click", () => {
        clearInterval(intervalId);
        timer.remove();
    });

    activeTimers.push({ timer, intervalId });
}
