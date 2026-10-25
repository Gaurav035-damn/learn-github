 let isRunning = false;
 let timeLeft;
 let workTime = 25;
 let breakTime = 5;
 let isWorkTime = true;
 let timerId = null;

 
 const minutesDisplay = document.getElementById("minutes");
 const secondsDisplay = document.getElementById("seconds");
 const startButton = document.getElementById("start");
 const pauseButton = document.getElementById("pause");
 const resetButton = document.getElementById("reset");
 const workTimeInput = document.getElementById("work-time");
 const breakTimeInput = document.getElementById("break-time");
 const statusDisplay = document.getElementById("status");
 const progressBar = document.getElementById("progress");
 function initTimer(){
    timeLeft = workTime*60;
    console.log("initTimer: timeLeft:", timeLeft);
    
    updateDisplay(); 
 }
 function updateDisplay(){
  const minutes = Math.floor(timeLeft/60);
  const seconds = timeLeft % 60;  
  minutesDisplay.textContent = minutes.toString().padStart(2,"0");
  secondsDisplay.textContent = seconds.toString().padStart(2,"0");

  console.log("minutesDisplay.textContent: ", minutesDisplay.textContent );
  console.log("secondsDisplay.textContent: ", secondsDisplay.textContent);
  updateProgressBar();
  }

  function startTimer(){
    if(timerId===null){
        timerId = setInterval(()=>{
            timeLeft--;
            updateDisplay();

            if(timeLeft === 0){
                switchMode();
            }
        },1000)
    }
    startButton.disabled = true;
    pauseButton.disabled = false;

  }
  function pauseTimer(){
    clearInterval(timerId);
    timerId = null;
    startButton.disabled = false;
    pauseButton.disabled = true;
  }
  function resetTimer(){
    pauseTimer();
    isWorkTime = true;
    statusDisplay.textContent = "Work";
    initTimer();
  }
  function switchMode(){
    isWorkTime = !isWorkTime;

  }
  startButton.addEventListener("click",startTimer)
  pauseButton.addEventListener("click",pauseTimer)
  resetButton.addEventListener("click",resetTimer)
  workTimeInput.addEventListener("change",(event)=>{
    workTime = parseInt(event.target.value);
    if(isWorkTime){
        resetTimer();
    }
  })
  breakTimeInput.addEventListener("change",(event)=>{
    breakTime = parseInt(event.target.value);
    if(!isWorkTime){
        resetTimer();
    }
  })
  function updateProgressBar(){
    const totalTime = isWorkTime ? workTime*60:breakTime*60;
    const progress = ((totalTime-timeLeft)/totalTime)*100;
    progressBar.style.width = progress + "%";
    progressBar.style.backgroundColor = isWorkTime ? "#4caf50" : "#2196f3"
  }


  pauseButton.disabled = true;
  initTimer();