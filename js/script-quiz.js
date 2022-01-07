function Answer(text, boolean) {
    this.text = text;
    this.isTrue = boolean;
}
function Question(text, answers) {
    this.text = text;
    this.answers = answers;
    this.id = Question.counting();
    this.getRightAnswer = function () {
        var result;
        answers.forEach(function (item, index) {
            if (item.isTrue) {
                result = item.text;
            }
        })
        return result;
    }
}
Question.counting = (function () {
    var counter = 0;
    return function () {
        return counter++;
    };
})()
var FullQuestions = [
    new Question("Our Country is spiritual country, theirs ..... religious.",
        [
            new Answer("is", true),
            new Answer("are", false),
            new Answer("alse", false),
            new Answer("have", false),
        ]),
    new Question("Our sir teaches Mathematics ..... English.",
        [
            new Answer("across", false),
            new Answer("besides", true),
            new Answer("beside", false),
            new Answer("both", false),
        ]),
    new Question("Please, come ..... the bathroom.",
        [
            new Answer("out of", true),
            new Answer("over", false),
            new Answer("on", false),
            new Answer("in", false),
        ]),
    new Question("Please, don't laugh ..... those beggars.",
        [
            new Answer("for", false),
            new Answer("against", false),
            new Answer("at", true),
            new Answer("from", false),
        ]),
    new Question("Please, stop ..... so many mistakes.",
        [
            new Answer("to make", false),
            new Answer("make", false),
            new Answer("making", true),
            new Answer("makes", false),
        ]),
    new Question("She ..... her husband for 15 minutes.",
        [
            new Answer("is beating", false),
            new Answer("has been beating", true),
            new Answer("has been beaten", false),
            new Answer("beats", false),
        ]),
    new Question("The English ..... English.",
        [
            new Answer("speak", true),
            new Answer("spoke", false),
            new Answer("spoken", false),
            new Answer("is spoken", false),
        ]),
    new Question("The rain comes ..... the clouds.",
        [
            new Answer("in", false),
            new Answer("near", false),
            new Answer("from", true),
            new Answer("under", false),
        ]),
    new Question("The ships ....., Robinson arrived on the Island.",
        [
            new Answer("had been broken", false),
            new Answer("having been broken", false),
            new Answer("having broken", true),
            new Answer("has broken", false),
        ]),
    new Question("The stars ..... counted.",
        [
            new Answer("can", false),
            new Answer("can be", false),
            new Answer("cannot be", true),
            new Answer("must", false),
        ])
]
var userName = $(".user")
userName.html(getCookie("fname"))
var progressBar = document.getElementById("progress");
var timing = progressBar.childNodes[0];
var questionArea = $("#questions");
var current = $("#current")
var qInd;
var cards = [];
/* ------------ (Shuffle) Generate an array of random numbers from 0 to 9 */
var arrayOfQuestions = shuffle(0, 9);
/* ------------------- Getting the questions from FullQuestions array ---------------*/
arrayOfQuestions.forEach(function (qInd, i) {
    cards[i] = document.createElement("div");
    cards[i].classList.add("card");
    cards[i].id = FullQuestions[qInd].id;
    var qHeading = document.createElement("h1");
    qHeading.classList.add("title");
    qHeading.innerHTML = "Question " + eval(i + 1);
    var question = document.createElement("p");
    question.classList.add("question");
    question.innerHTML = "<b>" + eval(i + 1) + "</b>" + " - " + FullQuestions[qInd].text;

    var choices = document.createElement("ol");
    choices.setAttribute("type", "a")
    for (var j = 0; j < FullQuestions[qInd].answers.length; j++) {
        var qId = FullQuestions[qInd].id;
        var li = document.createElement("li");
        li.innerHTML = "<input type='radio' class='radio' id=" + qId + "_" + j + " name=" + "Question_" + qId + " value=" + j + "><label for=" + qId + "_" + j + ">" + FullQuestions[qInd].answers[j].text + "</label>";
        choices.appendChild(li)
    }
    var hr = document.createElement("hr");
    var isMark = document.createElement("h1");
    isMark.classList.add("markSign", "hide");
    isMark.innerHTML = "<i class='fas fa-map-pin'></i>";
    $(cards[i]).append(qHeading, isMark, question, hr, choices)
})
questionArea.append(cards)
//    set the first Question to be active
$(".card").first().addClass("active");
/* -------------- Create a footer navigator for the questions -----------*/
var nav = $(".navigator");
var next = $("#next")
var prev = $("#prev")
var mark = $("#markBtn");
genNavigator(nav);
$(".nav").first().addClass("activeLi");
$(".nav").click(function () {
    var prevQ = $(".active")
    prevQ.removeClass("active")
    var index = eval(this.innerHTML) - 1
    $(".card").eq(index).addClass("active")
    setCurrent(index)
})
next.click(function () {
    var prevQ = $(".active")
    var index = $(".card").index(prevQ);
    if (index == 8) {
        $(this).addClass("hide")
    }
    if (index != 9) {
        prevQ.removeClass("active");
        index++;
        current.html(eval(index + 1))
        $(".card").eq(index).addClass("active")
    }
    if (index == 1) {
        prev.removeClass("hide");
    }
})
prev.click(function () {
    var prevQ = $(".active")
    var index = $(".card").index(prevQ);
    if (index == 1) {
        $(this).addClass("hide")
    }
    if (index != 0) {
        prevQ.removeClass("active");
        index--;
        current.html(eval(index + 1))
        $(".card").eq(index).addClass("active")
    }
    if (index == 8) {
        next.removeClass("hide")
    }
})
mark.click(function () {
    var li = document.createElement("li");
    var question = $(".active");
    if (!question.hasClass("marked")) {
        var num = $(".card").index(question) + 1;
        li.innerHTML = "<b>Question " + num + "</b><span>X</span>";
        li.setAttribute("class", "mCard");
        li.setAttribute("id", "mark_" + question.attr("id"));
        $("#marked").append(li);
        question.addClass("marked");
        question.children()[1].classList.remove("hide")
    }
})
$("#marked").on("click", ".mCard", function (e) {
    if (e.target.innerHTML == "X") {
        Delete(e.target)
    } else {
        var num = this.id.split("_")[1];
        var curr = $(".active");
        curr.removeClass("active");
        $("#" + num).addClass("active");
        var index = $(".card").index($(".active"))
        setCurrent(index)
    }
})
$("#marked").on("click", ".listMark", function (e) {
    var num = this.id.split("_")[1];
    var curr = $(".active");
    curr.removeClass("active");
    $("#" + num).addClass("active");
})
function Delete(self) {
    var parent = self.parentElement;
    var id = parent.id.split("_")[1];
    $("#" + id).removeClass("marked");
    $("#" + id).children()[1].classList.add("hide")
    parent.remove();
}
/*----------------- Grading Functions ----------------*/

var submit = $("#submit")
submit.click(function () {
    setCookie("isTimeOut", "0")
    GradingAndLeave()
})
function GradingAndLeave() {
    var answers = [];
    $("#questions").children().each(function (ind, question) {
        var answer = $(question).find("ol").has(".radio:checked")
        var AnswerId = eval(answer.find(".radio:checked").val());
        var QuestionId = eval(question.id);
        var newAnswerObj = (AnswerId != undefined) ? FullQuestions[QuestionId].answers[AnswerId] : "";
        answers.push(newAnswerObj)
    })
    var totalGrade = 0;
    answers.forEach(function (answer) {
        totalGrade = (answer.isTrue) ? totalGrade + 1 : totalGrade;
    })
    setCookie("totalGrade", totalGrade + "")
    setCookie("fullGrade", FullQuestions.length + "")
    location.replace("final.html")
}

/* ---------------- Progressive bar ----------------*/
progressing()
var tNow = new Date();
function progressing() {
    var QuizTime = [0, 1, 0];
    clock(QuizTime)
    var TimeInSeconds = 1 + QuizTime[0] * 60 + QuizTime[1] * 60 + QuizTime[2];
    var a = 100 / TimeInSeconds;
    timing.style.width = eval(a) + "%";
    var timer = setInterval(function () {
        if (a >= 100) {
            clearInterval(timer)
            setCookie("isTimeOut", "1")
            GradingAndLeave()
            return 0;
        }
        a += 100 / TimeInSeconds;
        timing.style.width = eval(a) + "%";
    }, 1000);
}
function clock(QuizTime) {
    var TimeInSeconds = 1 + QuizTime[0] * 60 + QuizTime[1] * 60 + QuizTime[2];
    var hours = (QuizTime[0] < 10) ? "0" + QuizTime[0] : QuizTime[0];
    var minutes = (QuizTime[1] < 10) ? "0" + QuizTime[1] : QuizTime[1];
    var seconds = (QuizTime[2] < 10) ? "0" + QuizTime[2] : QuizTime[2];
    $(".timer").html(hours + ':' + minutes + ':' + seconds)
    var timer = setInterval(function () {
        if (TimeInSeconds == 0) {
            clearInterval(timer)
        }
        else {
            TimeInSeconds--;
            if (seconds == 0) {
                seconds = 59;
                if (minutes == 0) {
                    minutes = 59;
                    hours = eval(hours) - 1;
                    hours = (hours < 10) ? "0" + hours : hours;
                } else {
                    minutes = eval(minutes) - 1;
                    minutes = (minutes < 10) ? "0" + minutes : minutes;
                }
            } else {
                seconds = eval(seconds) - 1;
                seconds = (seconds < 10) ? "0" + seconds : seconds;
            }
            $(".timer").html(hours + ':' + minutes + ':' + seconds)
        }
    }, 1000)
}
/* --------------------- Shuffle --------------------- */
function shuffle(min, max) {
    for (var arr = [], i = min; i < max + 1; ++i) {
        arr[i] = i;
    }
    var tmp, current, top = arr.length;
    while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = arr[current];
        arr[current] = arr[top];
        arr[top] = tmp;
    }
    return arr;
}
/* ------------------- Navigator ---------------------*/
function genNavigator(nav) {
    var noQuestions = 10;
    for (var i = 0; i < noQuestions; i++) {
        nav.append("<li class='nav'>" + eval(i + 1) + "</li>");
    }
}
function setCurrent(ind) {
    if (ind == 9) {
        next.addClass("hide");
        prev.removeAttr("class");
    } else if (ind == 0) {
        prev.addClass("hide");
        next.removeAttr("class");
    } else {
        prev.removeAttr("class");
        next.removeAttr("class");
    }
    current.html(eval(ind + 1))
}
