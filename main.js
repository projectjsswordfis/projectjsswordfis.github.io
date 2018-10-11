"use sctrict"

        window.addEventListener("beforeunload", function (EO) {
            var confirmationMessage = "\o/";
            (EO || window.event).returnValue = confirmationMessage; 
            return confirmationMessage;                            
        });


        var RAF =
            // находим, какой метод доступен
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            // ни один не доступен
            // будем работать просто по таймеру
            function (callback) { window.setTimeout(callback, 1000 / 60); };


        // // FPS тест
        // var fps = {
        //     lastAnimationFrameTime: 0,
        //     fpsElement: document.getElementById('fps'),
        //     animate: function (now) {
        //         fps.calculateFps(now);
        //         RAF(fps.animate)
        //     },
        //     calculateFps: function (now) {
        //         var fps = 1000 / (now - this.lastAnimationFrameTime);
        //         this.lastAnimationFrameTime = now;
        //         this.fpsElement.innerHTML = fps.toFixed(0) + ' fps';
        //     },
        //     start: function () {
        //         RAF(fps.animate);
        //     }
        // };

        // fps.start();


        // Главное поле------------------------------------------
        var mainField = document.getElementById("mainField"); 
        var mainFieldNew = new Field();
        mainFieldNew.update(mainField);
        
        // различные блоки------------------------------------------
        var birdDiv = mainField.getElementsByClassName("bird");
        var pipeDiv = mainField.getElementsByClassName("pipe");
        var pipeDivBot = mainField.getElementsByClassName("pipeBot");
        var scoreDiv = mainField.getElementsByClassName("score")
        var bgDiv = mainField.getElementsByClassName("bgg");

        // аудио объекты -------------------------------------------
        var bgMusic = document.getElementById("bgMusic")

        // Кнопки --------------------------------------------------
        var nameInput = document.getElementById("nameInput")
        var playerNameHeading = document.getElementById("playerName")
        var recordButt = document.getElementById("recordButton")
        var backButton =document.getElementById("backButton")
        var settingButt = document.getElementById("settingButton")
        var settingBackButt = document.getElementById("settingBackButt")
        var ezDiffButt = document.getElementById("ezDiffButt")
        var normDiffButt = document.getElementById("normDiffButt")
        var hardDiffButt = document.getElementById("hardDiffButt")
        var backButtonDiff = document.getElementById("backButtonDiff");
        var recordButtonRestart = document.getElementById("recordButtonRestart")
        var mainMenuButt = document.getElementById("mainMenuButt")
        var startButton = document.getElementById("startButton");
        var restartButton = document.getElementById("restartButton");
        var acceptName = document.getElementById("acceptName");
        var recordsContainer = document.getElementById("recordsContainer");

        // Блоки интерфейса -----------------------------------------------
        var ui = document.getElementById("UI")
        var uiSetting = document.getElementById("UISetting")
        var uiRestart = document.getElementById("UIRestart")
        var uiPlayerName = document.getElementById("UIPlayerName")
        var uiRecords = document.getElementById("UIRecords")
        var uiDiff = document.getElementById("UIDifficulty")

        // var transPerTick = 120;
        var currentPlayerName = "" 

        var frame = 0;

        var birdFrameNow = 0;
        var birdFrameParams = {
            0:[19.2,12], 1:[37.2,12], 
            2:[55.2,12], 3:[73.2,12], 
            4:[91.2,12],
        }

        var recordTable = {
            Тимур:1400,
            Василий:950,
            Петр:840
        }

        var pipes = [];
        var bgArr = [];
        var currBgArrLength = 0;

        var height = mainField.offsetHeight
        var width = mainField.offsetWidth
        var vMin = mainFieldNew.vMin();

        var clickAudio = new Audio("hit.wav");
        var bgAudio = new Audio("music.mp3");

        var pipenew = new Pipe();
        var bird = new Bird();
        var bgNew = new Bg();
        var score = new Score();

        
        var uiNew = new UI();
        var newNewUi = new UI();
        var uiPlayer = new UI();
        var uiRecordBoard = new UI();
        var uiSettingsNew = new UI();
        var uiDiffBoard = new UI();

        // предзагрузга изображения
        var imgSetting = new Image();
        imgSetting.src = "bgstart1.jpg";
        imgSetting.height = height;
                
        var coofWHImage = 0;

        window.onload = function(){
            coofWHImage = imgSetting.width/imgSetting.height;
            console.log(coofWHImage)
            return coofWHImage;
        }

        var uiAnimSpeed = (130+50)/60;
        var gameIsStarted = false;

        // RAF(gameMenuPlayerName);

        function addClicEventListner(arr){
            var arrayLength =  arr.length-1
            for(var i = 0; i<=arrayLength;i++){
                arr[i][0].addEventListener("click",arr[i][1],false)
            }
        };

        function removeClicEventListner(arr){
            var arrayLength =  arr.length-1
            for(var i = 0; i<=arrayLength;i++){
                arr[i][0].removeEventListener("click",arr[i][1],false)
            }
        };

        var clickEventsList =[
            [recordButt,showRecordBoard],
            [settingButt,showSettingMenu],
            [startButton,gameMenuSetDifficulty],
            [backButtonDiff,goBackToMenuDiff],
            [backButton,goBackToMenuRec],
            [acceptName,acceptPlayerName],
            [restartButton,gameRestart],
            [ezDiffButt,startEzGame],
            [hardDiffButt,startHardGame],
            [settingBackButt,goBackToMenuSet],
            [mainMenuButt,showMainMenu]
            ];
        
        (function setupUI(){
            // bgAudio.play();
            uiNew.setCurrentObj(ui);
            uiDiffBoard.setCurrentObj(uiDiff);
            uiSettingsNew.setCurrentObj(uiSetting);
            uiPlayer.setCurrentObj(uiPlayerName);
            uiRecordBoard.setCurrentObj(uiRecords);
            newNewUi.setCurrentObj(uiRestart); // Restart !!!!    
        })();

        // gameStart(); // Старт игры


        

        (function askPlayersName(){
            addClicEventListner(clickEventsList); 
            uiPlayer.goTo(-50, uiAnimSpeed );
            RAF(gameMainMenuUI);
        })();

        function startMainMenu(){
        };


        function gameMenuSetDifficulty(){
            uiNew.goTo(-230, uiAnimSpeed);
            uiDiffBoard.goTo(-50, uiAnimSpeed);
        }

        function goBackToMenuDiff(){
            uiNew.goTo(-50, uiAnimSpeed);
            uiDiffBoard.goTo(130, uiAnimSpeed)
        }

        function showSettingMenu(){
            uiNew.goTo(-230, uiAnimSpeed);
            uiSettingsNew.goTo(-50, uiAnimSpeed);
        }

        function goBackToMenuRec(){
            uiNew.goTo(-50, uiAnimSpeed);
            uiRecordBoard.goTo(130, uiAnimSpeed)
        }

         function goBackToMenuSet(){
            uiNew.goTo(-50, uiAnimSpeed);
            uiSettingsNew.goTo(130, uiAnimSpeed);
        }

        function showRecordBoard(){
            uiNew.goTo(-230, uiAnimSpeed);
            uiRecordBoard.goTo(-50, uiAnimSpeed)
        }

        function showMainMenu(){
            uiNew.goTo(-50, uiAnimSpeed)
            newNewUi.goTo(-230, uiAnimSpeed)
            uiDiffBoard.currentObj.style.display="";
        }

        function showRecordBoardRestart(){ // СДЕЛАТЬ КНОПКУ РЕСТАРТА РЕКОРДОВ
            newNewUi.goTo(130, uiAnimSpeed);
            uiRecordBoard.goTo(-50, uiAnimSpeed);
        }

        function acceptPlayerName(){
            uiPlayer.goTo(-230, uiAnimSpeed );
            uiNew.goTo(-50, uiAnimSpeed );
            currentPlayerName = nameInput.value;
            playerNameHeading.innerHTML = currentPlayerName;
        }

        function gameMenuRestart(){
            newNewUi.goTo(-50, uiAnimSpeed);
        }

        var counter = 0;

        function startEzGame(){

            bgMusic.play();
            uiDiffBoard.goTo(-230, uiAnimSpeed);
            uiDiffBoard.currentObj.style.display="none"; // Временно
            removeClicEventListner(clickEventsList); 

            if(counter ==0){
            counter ++;
            gameStart();}
            else {
                gameRestart();
            }
            
        }

        function startHardGame(){
            uiDiffBoard.currentObj.style.display="none";
            gameStart();
        }

        function gameMainMenuUI(){
            // console.log("я работая")
            uiNew.update();
            newNewUi.update(); // рестарт
            uiDiffBoard.update();
            uiSettingsNew.update();
            uiPlayer.update();
            uiRecordBoard.update();

            if(gameIsStarted === false ){
            RAF(gameMainMenuUI)}
        }

        
        
        function gameStart(){ // СТАРТ ИГРЫ

            mainField.style.backgroundImage = "none";
            uiDiffBoard.update();

            console.log(bgNew)

            // uiDiff.update();
            if(bgNew.x != bgNew.w){
                bgNew = new Bg();
            }
            pipenew = new Pipe();
            

            mainField.appendChild(pipenew.createDiv('pipe'));
            mainField.appendChild(pipenew.createDivBot('pipeBot'));
            mainField.appendChild(bird.createBird('bird'));
            mainField.appendChild(bgNew.createImg("bgg"));
            mainField.appendChild(score.createDiv("score"));

            var ostatokForBg;

            console.log(ostatokForBg)

                score.tick =3/60;
                bgNew.currPos=-10;
                // uiNew.setCurrentObj(ui);
                pipes.push(pipenew);
                bgArr.push(bgNew);

                pipenew.update();
                bird.update();
                bgNew.update();
            
                addEventListener("click", keyPressed, false);
                addEventListener("touchstart", keyPressed, false);
                startButton.removeEventListener("click",gameStart,false);

                gameIsStarted = true;

                RAF(game);
            }

        // gameStart();

        function game() {

            frame++;

            // clickSoundInit();

            document.getElementsByClassName("score")[0].innerHTML = Math.floor(score.total);
            score.update();
             
            bird.update();
            birdDiv[0].style.top = bird.y + "px";

            console.log("bfn = "+birdFrameNow)

            if(frame%4==0){
                // console.log(birdFrameNow)

                birdDiv[0].style.backgroundPositionX = birdFrameParams[birdFrameNow][0] +"%"
                birdDiv[0].style.backgroundPositionY = birdFrameParams[birdFrameNow][1] +"%"

                if(birdFrameNow == 4){
                    birdFrameNow = 0;
                }

                else{
                    birdFrameNow ++;
                }
            }

            uiNew.update(bgArr[0]);

            currBgArrLength = bgArr.length

            for (var i = currBgArrLength - 1; i >= 0; i--) {
                console.log(bgArr[0].currPos)

                // bgArr[i].x = getElementPos(bgDiv[i]).left
                bgArr[i].update();

                bgDiv[i].style.transform ="translateZ(0) translateX(" + bgArr[i].currPos + "%)";

                if (

                    // bgArr[0].x < - (bgDiv[0].height*coofWHImage)
                    bgArr[0].currPos<=-100
                
                ) { // убираем фоновый див
                    bgArr.splice(i, 1);
                    mainField.removeChild(bgDiv[0]);
                }
            }

                if (
                    // bgArr[0].x < -(bgDiv[0].height*coofWHImage - width) 

                    bgArr[0].currPos<=-25
                    
                    && bgArr.length<=1) { // добавляем фоновый див
                    bgArr.push(new Bg());
                    // bgNew.speed = 0.5;
                    mainField.appendChild(bgArr[bgArr.length - 1].createImg("bgg"));
                    console.log("Created")
                }

            for (var i = pipes.length - 1; i >= 0; i--) {

                pipes[i].x = getElementPos(pipeDiv[i]).left
                pipes[i].update();

                // pipeDiv[i].style.left = pipes[i].x + "px"; // animation 
                // pipeDivBot[i].style.left = pipes[i].x + "px";

                pipeDiv[i].style.transform ="translateZ(0) translateX(" + pipes[i].currPos + "%)"; // animation 
                pipeDivBot[i].style.transform ="translateZ(0) translateX(" + pipes[i].currPos + "%)";

                if (pipes[i].hits(bird)) {
                    vibro(true);
                    bgMusic.pause();
                    bgMusic.currentTime=0
                    clickSound();
                    score.tick = 0;
                    score.update();
                    frame = 0;                    

                    removeEventListener("click", keyPressed, false);
                    removeEventListener("touchstart", keyPressed, false);
                   
    
                    for (var j = 0; j <= pipes.length - 1; j++) {
                        pipes[j].speed = 0
                        bird.velocity = 0;
                        bird.gravity = 0;
                    }

                    for (var j = 0; j <= bgArr.length - 1; j++) {
                        bgArr[j].speed = 0
                    }
                }

                if (getElementPos(pipeDiv[0]).left + pipes[0].w <=0) { // убираем пару труб
                    pipes.splice(i, 1)
                    mainField.removeChild(pipeDiv[0]);
                    mainField.removeChild(pipeDivBot[0]);
                }
            }

            if (frame % 120 == 0 && pipes[0].speed>0) { // создаем 1 пару труб каждые 120 кадров
                pipes.push(new Pipe());
                console.log()
                mainField.appendChild(pipes[pipes.length - 1].createDivBot('pipeBot'));
                mainField.appendChild(pipes[pipes.length - 1].createDiv('pipe'));
            }

            (function gameProcess(){
                // var gameContinue = true;
                for (var i = pipes.length - 1; i >= 0; i--){
                    if (pipes[i].highlight===true){
                        gameIsStarted = false;
                    }
                }
                if(gameIsStarted === false)  {
                    addClicEventListner(clickEventsList); 
                    RAF(gameMainMenuUI);
                    gameMenuRestart();
                }
                if(gameIsStarted === true)   {RAF(game);}
            })();
        } 

        // gameStart(); // СТАРТ ИГРЫ

        function keyPressed(EO) {
            EO = EO || window.event;
                bird.up();
        }

        function randomDiap(n, m) {
            return Math.floor(Math.random() * ( m - n + 1)) + n;
        }
        
        function gameRestart(){
            bgMusic.play();
            uiRestart.style.transition = "0.1s"
            newNewUi.currentPos = newNewUi.currentPosMax

            score.tick =3/60;
            score.total = 0;

            var pipeArrayLength = pipeDiv.length;
            var bgArrayLength = bgArr.length;

                for (var i = 0; i < pipeArrayLength; i++){
                    mainField.removeChild(pipeDiv[0]);
                    mainField.removeChild(pipeDivBot[0]);
                }

                for (var i = 0; i < bgArrayLength; i++){
                    mainField.removeChild(bgDiv[0]);
                }

            mainField.removeChild(scoreDiv[0]); 

            mainField.removeChild(birdDiv[0])

            console.log(pipeDiv.length)

            pipenew = new Pipe();
            bird = new Bird();

            pipes = [];
            bgArr = [];

            // mainField.appendChild(pipenew.createDiv('pipe'));
            // mainField.appendChild(pipenew.createDivBot('pipeBot'));
            // mainField.appendChild(bird.createBird('bird'));
            // mainField.appendChild(bgNew.createImg("bgg"));
            // mainField.appendChild(score.createDiv("score"));

            gameStart();
            // restartButton.removeEventListener("click",gameRestart,false);
        }

        document.addEventListener('touchstart', handleTouchStart, false);        
        document.addEventListener('touchmove', handleTouchMove, false);

        var xDown = null;                                                        
        var yDown = null;                                                        

        function handleTouchStart(evt) {                                         
            xDown = evt.touches[0].clientX;                                      
            yDown = evt.touches[0].clientY;                                      
        };                                                

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }

            var xUp = evt.touches[0].clientX;                                    
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
                if ( xDiff > 0 ) {
                    alert("SS")
                } else {
                    alert("SS")
                }                       
            } else {
                if ( yDiff > 0 ) {
                    alert("SS")
                } else { 
                    alert("SS")
                }                                                                 
            }
            /* reset values */
            xDown = null;
            yDown = null;                                             
        };

        function getElementPos(elem) {
            var bbox=elem.getBoundingClientRect();
            return {
                left: bbox.left+window.pageXOffset,
                top: bbox.top+window.pageYOffset
            };
        }


    function clickSoundInit() {
        clickAudio.play(); // запускаем звук
        clickAudio.pause(); // и сразу останавливаем
    }

    function clickSound() {
        clickAudio.currentTime=0; // в секундах
        clickAudio.play();
    }

    function vibro(longFlag) {
        if ( navigator.vibrate ) { // есть поддержка Vibration API?
            if ( !longFlag )
                window.navigator.vibrate(100); // вибрация 100мс
            else
                window.navigator.vibrate([100,50,100,50,100]); // вибрация 3 раза по 100мс с паузами 50мс
            }
    }

