$(document).ready(function () {

    // music by Kanye West brought to you by Oren Spiegel;
    add_line();
    function add_line() {
        var line = document.createElement("audio");
        var head = document.getElementsByTagName('body')[0];
        line.type = "audio/mp3";
        line.src = "./song/Amazing.mp3";
        line.id = "bgSong";
        line.autoplay = true;
        line.style.display = "none";
        head.appendChild(line);
    }
    // the above will play Amazing by Kanye West, because that sounds like basketball;


    // launch the right grid according to user main menu seletions
    $("#launchNewGame").on("click", runNewGame);
    function runNewGame() {
        var gameType = $("input:radio[name='gameType']:checked").val();
        var difficultyFactor = parseFloat($("input:radio[name='difficulty']:checked").val());
        if ($("input:radio[name='difficulty']:checked").length === 0) {
            alert("you must select a difficulty");
        } else {
            if (gameType === "duos") {
                duos();
                countCards.bind(difficultyFactor);
                displayCard.bind(difficultyFactor);
                checkCardsEqual.bind(difficultyFactor);

            } else if (gameType === "bigThrees") {
                bigThrees();
                countCards.bind(difficultyFactor);
                displayCard.bind(difficultyFactor);
                checkCardsEqual.bind(difficultyFactor);
            } else {
                alert("you haven't selected a game type");
            }
        }

    }





    $(".outerContainer").css("display", "none");
    $("#bigThreesContainer").css("display", "none");
    $("#duosContainer").css("display", "none");


    function duos() {
        $(".loading-page-outer-container").css("display", "none");
        $(".outerContainer").css("display", "flex");
        $("#duosContainer").css("display", "flex");
        $(".instructions").text("Match 2 cards of All-Star Basketball players; belonging, and playing on the same super team");


        let allCards = $(".duos > .card-container");
        allCards.addClass("cardClosedImg");
        let allCardsArr = [...allCards];

        const row1 = document.querySelector(".row1duo");
        const row2 = document.querySelector(".row2duo");
        const row3 = document.querySelector(".row3duo");
        const row4 = document.querySelector(".row4duo");
        startGame();
        function startGame() {
            checkRemainingCards();

            for (var i = 0; i < allCardsArr.length; i++) {
                allCardsArr[i].addEventListener("click", displayCard);
                allCardsArr[i].addEventListener("click", countCards);
            };
            var shuffledCards = shuffle(allCardsArr);
            for (var i = 0; i < shuffledCards.length / 4; i++) {
                row1.appendChild(shuffledCards[i]);
            }

            for (var i = 6; i < shuffledCards.length / 2; i++) {
                row2.appendChild(shuffledCards[i]);
            }
            for (var i = 12; i < shuffledCards.length / 4 * 3; i++) {
                row3.appendChild(shuffledCards[i]);
            }
            for (var i = 18; i < shuffledCards.length; i++) {
                row4.appendChild(shuffledCards[i]);
            }
        }

        startTimer();

    };



    function bigThrees() {
        $(".loading-page-outer-container").css("display", "none");
        $(".outerContainer").css("display", "flex");
        $("#bigThreesContainer").css("display", "flex");
        $(".instructions").text("Match 3 cards of All-Star Basketball players; belonging, and playing on the same super team");

        let allCards = $(".bigThrees > .card-container");
        allCards.addClass("cardClosedImg");
        let allCardsArr = [...allCards];

        const row1 = document.querySelector(".row1BT");
        const row2 = document.querySelector(".row2BT");
        const row3 = document.querySelector(".row3BT");
        const row4 = document.querySelector(".row4BT");
        const row5 = document.querySelector(".row5BT");
        startGame();
        function startGame() {
            checkRemainingCards();

            for (var i = 0; i < allCardsArr.length; i++) {
                allCardsArr[i].addEventListener("click", displayCard);
                allCardsArr[i].addEventListener("click", countCards);
            };

            var shuffledCards = shuffle(allCardsArr);
            for (var i = 0; i < shuffledCards.length / 5; i++) {
                row1.appendChild(shuffledCards[i]);
            }

            for (var i = 6; i < shuffledCards.length / 10 * 4; i++) {
                row2.appendChild(shuffledCards[i]);
            }
            for (var i = 12; i < shuffledCards.length / 10 * 6; i++) {
                row3.appendChild(shuffledCards[i]);
            }
            for (var i = 18; i < shuffledCards.length / 10 * 8; i++) {
                row4.appendChild(shuffledCards[i]);
            }
            for (var i = 24; i < shuffledCards.length; i++) {
                row5.appendChild(shuffledCards[i]);
            }
        }

        startTimer();

    }



    function displayCard() {
        $(this).toggleClass("cardClosedImg");
        $(this).toggleClass("open");
        var playerPhotoId = event.target.getAttribute('data-player');
        $(this).css("background-image", playerPhotoId);
        $(this).css("background-size", "100% 100%");
        $(this).toggleClass("disabled");


    }

    function shuffle(array) {
        var currentIndex = array.length;

        for (var i = currentIndex; i > 0; i--) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            var temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }
        return array;
    }
    var openedCards = 0;
    function countCards() {
        openedCards += 1;
        var max = 2;
        if ($("#duosContainer").css("display") === "none") {
            max = 3
        }
        if (openedCards === max) {
            checkCardsEqual();
            openedCards = 0;
            turnOnOff(max);

        }

    }

    function checkCardsEqual() {

        var cardsSelected = $(".disabled");
        var arr = [];
        for (var i = 0; i < cardsSelected.length; i++) {
            var x = cardsSelected.get(i).value;
            arr.push(x);
        }
        const allEqual = arr => arr.every(v => v === arr[0])

        if (allEqual(arr)) {

            lockSound();
            cardsSelected.removeClass("disabled");
            cardsSelected.addClass("goldBorder");
            var outOfPlay = document.querySelectorAll(".goldBorder");
            for (var i = 0; i < outOfPlay.length; i++) {
                outOfPlay[i].removeEventListener("click", displayCard);
                outOfPlay[i].removeEventListener("click", countCards);
            }
            var totalCards = 0;
            if ($("#duosContainer").css("display") === "none") {
                totalCards = 30;
            } else {
                totalCards = 24;
            }
            checkRemainingCards();
            if (outOfPlay.length === totalCards) {
                setTimeout(() => {
                    $("#victory-modal").css("display", "flex");
                    $("#winningTime").text(startTimer());
                }, 700);

            }


        } else {
            var difficulty = parseFloat($("input:radio[name='difficulty']:checked").val());
            if (difficulty === 0.75) {
                var x = 0.3;
            } else if (difficulty === 0.33) {
                var x = 0.66;
            } else {
                var x = 0.5;
            }
            setTimeout(() => {
                cardsSelected.removeClass("open");
                cardsSelected.removeAttr("style");
                cardsSelected.removeClass("disabled");
                cardsSelected.addClass("cardClosedImg");
            }, 1700 * x);
        };


    }

    function turnOnOff(max) {
        if (max === 3) {
            var cards = document.querySelectorAll(".bigThrees > .card-container");
        } else {
            var cards = document.querySelectorAll(".duos > .card-container");
        }

        for (var i = 0; i < cards.length; i++) {
            cards[i].removeEventListener("click", displayCard);
            cards[i].removeEventListener("click", countCards);
        }
        var difficulty = parseFloat($("input:radio[name='difficulty']:checked").val());
        setTimeout(() => {
            for (var i = 0; i < cards.length; i++) {
                cards[i].addEventListener("click", displayCard);
                cards[i].addEventListener("click", countCards);
            }
            let outOfPlay = document.querySelectorAll(".goldBorder");
            for (var i = 0; i < outOfPlay.length; i++) {
                outOfPlay[i].removeEventListener("click", displayCard);
                outOfPlay[i].removeEventListener("click", countCards);
            }
        }, 2600 * difficulty);
    }
    var totalSeconds = 0;
    function startTimer() {
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");

        setInterval(setTime, 1000);

        function setTime() {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds % 60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        }

        function pad(val) {
            var valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }
        }
        return `${pad(parseInt(totalSeconds / 60))}:${pad(totalSeconds % 60)}`
    }

    function checkRemainingCards() {
        let remainingCards = $(".cardClosedImg").length;
        $("#cards-remaining").text(remainingCards);
    }

    function lockSound() {
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', './song/lock.mp3');

       audioElement.play();
    }

});