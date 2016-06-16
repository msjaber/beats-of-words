
// Notes for developers:
// - It should have been built based on Object-oriented design, to be easily configured, but for the time being I don't mind!
// - The source code is all yours <3
// 
//
// DOM Hierarchy for Words Tree
// - ul.wordsTree
// --- ul.word
//    ----- li.letter
//    ----- li.letter
//    ----- li.letter
// --- ul.word
//    ----- li.letter
//    ----- li.letter
// --- ul.word
//    ----- li.letter
//    ----- li.letter
//    ----- li.letter
//

// Different languages words .. make it yours :)
var Languages = {
	arabic: ['كلمات','حروف','ُحب','ضوء','حياة','جمال','عربية','كلمة','شغف','اقرأ','قلم','ورقة','قهوة','روح','سماء','ورد'],
	english: ['Breath', 'Love', 'Light', 'Soul', 'Beauty', 'Art', 'Life', 'Voice', 'Wordiness', 'Words', 'Letters', 'Shine', 'Books', 'Write'],
	spanish: ['Sueño', 'Mar', 'Estrella', 'Paz', 'Cielo', 'Mañana', 'Letras', 'Vida', 'Amor', 'Idioma', 'Ligero', 'Aliento', 'Leyendo', 'Alma']
}

var Options = {
    language: Languages.arabic, // the selected language 
    ltr: false, // Left-to-right lang: to inverse the order of the animated letters based on the different 4-Quarter of the circle
    paused: false, // to pause the flying words 
    colors: ['#98fd85', '#241379', '#1fbce1', '#78ffba', '#ff4293', '#6c046c', '#f04c81'], // words' colors palette
    timer: 500, // every so often a word will fly
    power: 200, // the power of the flying words (Phyiscal power!)

    pause: function () {
    	this.paused = true;
    },
    play: function() {
    	this.paused = false;
    },


    changeLanguateTo: function(choosedLanguage) {
    	this.pause();
    	var allWords = document.getElementsByClassName('word');
    	for (var i = allWords.length - 1; i >= 0; i--) {
    		allWords[i].remove();
    	};

    	if (choosedLanguage == 'arabic') {
    		this.language = Languages.arabic;
    		this.ltr = false;
    	} else if (choosedLanguage == 'english') {
    		this.language = Languages.english;
    		this.ltr = true;
    	} else if (choosedLanguage == 'spanish') {
    		this.language = Languages.spanish;
    		this.ltr = true;
    	}
    	this.play();
    }
}




window.onload = function() {
   generateWordsTree(); // Generate default words tree in the DOM
   
   // Initilize animation timer ..
	// var languagesInputs = document.getElementsByClassName('language-input');

   // for (var i = 0; i < languagesInputs.length; i++) {
   // 	languagesInputs[i].onclick = function() {
   // 		Options.changeLanguateTo(this.value);
	  //   };
   // };

   // document.getElementById("english").onclick = Options.changeLanguateTo('english');
   // document.getElementById("arabic").onclick = Options.changeLanguateTo('arabic');
   // document.getElementById("spanish").onclick = Options.changeLanguateTo('spanish');

   setInterval(function () {
   	if (!Options.paused) {
			flyAway(getElementToFly());
   	};
   }, Options.timer);
}



// To generate the words tree in the DOM
function generateWordsTree () {
   for (var i = 0; i < Options.language.length; i++) {
      generateWordWithIndex(i);
   };
}

// To generate a single word 
function generateWordWithIndex(index) {
   var singleWord = Options.language[index]; // word letters
   console.log(singleWord);

   var wordElement = document.createElement('ul'); // single word elemnt 
   wordElement.className += ' word';
   wordElement.dataset.isFlying = 'NO';

   wordElement.addEventListener('transitionend', function () {
      resetStyle(this);
   }, false);

   // Iterating through each letter (li) and appending it to the word's tree (ul) 
   for (var i = 0; i <= singleWord.length-1; i++) {
      var item = document.createElement('li');
      item.className += ' letter__item'
      item.appendChild(document.createTextNode(singleWord[i]));
      wordElement.appendChild(item);
   };

   // add the word element to the words' tree
   document.getElementsByClassName('wordsTree')[0].appendChild(wordElement);
   return wordElement; 
}

// After the animation of a single word is finished, reset its position and opacity.
function resetStyle(e) {

      e.classList.remove('transition');
      e.dataset.isFlying = 'NO';
      e.style["color"] = "black";

      e.style["-webkit-transform"] = "translate(" + 0 +"px, " + 0 + "px) rotate(" + 0 +"deg)";
      e.style["-moz-transform"]    = "translate(" + 0 +"px, " + 0 + "px) rotate(" + 0 +"deg)";
      e.style["-ms-transform"]     = "translate(" + 0 +"px, " + 0 + "px) rotate(" + 0 +"deg)";
      e.style["-o-transform"]      = "translate(" + 0 +"px, " + 0 + "px) rotate(" + 0 +"deg)";
      e.style["transform"]         = "translate(" + 0 +"px, " + 0 + "px) rotate(" + 0 +"deg)";

      e.style["-webkit-opacity"]  = "1";
      e.style["-o-opacity"]       = "1";
      e.style["opacity"]          = "1";

      for (var i = 0; i < e.children.length; i++) {
         e.children[i].classList.remove('transition');
         e.children[i].style["-webkit-transform"] = "translate(" + 0 +"px, " + 0 + "px) rotate(" + 0 +"deg)" ; 
      };
}

// Get a random word's element (ul) to fly from the exiting ul elemens in the DOM ..
function getElementToFly () {
   var staticElements = document.querySelectorAll("[data-is-flying='NO']"); 
   var random = Math.floor(Math.random() * (staticElements.length));

   if (staticElements.length < 2) {
      // generateWordsTree(); // to generate another words 
   };

   return staticElements[random];
}


// Where the magic happens!
function flyAway(e) {
   
   if (Options.paused) {
   	return;
   };

   if (e == null) {
      generateWordsTree(); // if there was no element to fly, generate other words' tree
      return;
   };

   // This was the first logic I used to randommly fly the words in different directions, 
   // which was not as perfect as I imagined ..
   //
   // var randomSign01 = Math.random() < 0.5 ? -1 : 1;
   // var randomSign02 = Math.random() < 0.5 ? -1 : 1;
   // var randomSign03 = Math.random() < 0.5 ? -1 : 1;
   // var randomX = (Math.floor(Math.random() * ((200-150)+1) + 150)) * randomSign01; // random X between 150 and 200
   // var randomY = (Math.floor(Math.random() * ((200-150)+1) + 150)) * randomSign02; // random Y between 150 and 200
   // var randomDegrees = (Math.floor(Math.random() * ((60 - 0)+1) + 0 )) * randomSign03; // random degress between 0 and 60

   // So, I thought of another way, which was ...
   // .. To generate random (x,y) point with random direction (0 - 360) I used Vectors notation (radius / magnitude, direction) 
   // instead of normal notation (x, y)
   // Check out: Polar Coordinate and Rectangular Coordinate

   var vectorMagnitude = Options.power; // Fixed radius which, in our case, determine the *power* of the flying words. (Try to make it 1000 and see)
   var randomRadian = Math.random() * ((Math.PI*2)); // Generate a random degree (0 to 360)

   var x = vectorMagnitude * Math.cos(randomRadian); // Get the x point based on the fxied radius and the random degree ( x = r * cosθ)
   var y = vectorMagnitude * Math.sin(randomRadian); // Get the y point based on the fixed radius and the random degree ( y = r * sinθ)

   makeTranslateAnimation(e, x, y, randomRadian * (180/Math.PI) /* From RADIANS to DEGREES*/);
}


function makeTranslateAnimation(e, x, y, randomDegrees) {
   e.dataset.isFlying = 'YES'; // when a word flies, set its data-is-flying to YES
   e.className += ' transition';

   // Animate the word container (ul) ..
   e.style["-webkit-transform"] = "translate(" + x +"px, " + y + "px) rotate(" + randomDegrees / 6 +"deg)";
   e.style["-moz-transform"]    = "translate(" + x +"px, " + y + "px) rotate(" + randomDegrees / 6 +"deg)";
   e.style["-ms-transform"]     = "translate(" + x +"px, " + y + "px) rotate(" + randomDegrees / 6 +"deg)";
   e.style["-o-transform"]      = "translate(" + x +"px, " + y + "px) rotate(" + randomDegrees / 6 +"deg)";
   e.style["transform"]         = "translate(" + x +"px, " + y + "px) rotate(" + randomDegrees / 6 +"deg)";

   e.style["-webkit-opacity"]  = "0";
   e.style["-o-opacity"]       = "0";
   e.style["opacity"]          = "0";
   
   randomColor = Options.colors[Math.floor(Math.random() * (Options.colors.length + 1))];

      // Animation letters ..
      var inverseIterator = e.children.length;
      var translateIterator;

      for (var i = 0; i < e.children.length; i++) {
         var randomMinus = Math.random() < 0.5 ? -1 : 1;

         e.children[i].className += ' transition';
         e.children[i].style['color'] = randomColor;

         // IF LTR and 2-3 Quarter -> Inverse the translateIterator OTHERWISE leave it as normal
         // IF RTL and 1-4 Quarter -> Inverse the translateIterator OTHERWISE leave it as normal
         if ((randomDegrees > 90 && randomDegrees < 270) && Options.ltr) {
            translateIterator = inverseIterator; // Inverse the translate iterator
         } else if (((randomDegrees > 0 && randomDegrees <= 110) || (randomDegrees > 270 && randomDegrees < 360 )) && !Options.ltr) {
            translateIterator = inverseIterator; // Inverse the translate iterator
            console.log("YES ARABIC!");
         } else {
         	translateIterator = i; 
         }

         e.children[i].style["-webkit-transform"] = "translate(" + (x * (translateIterator+1) * 0.2)   +"px, " + (y * (translateIterator+1) * 0.2) + "px) rotate(" + randomMinus*90 +"deg) scale(" + (translateIterator+1)*0.3 + ")" ; 
         // e.children[i].style["-webkit-transform"] = "translate(" + (x * (i+1) * 0.2)   +"px, " + (y * (i+1) * 0.2) + "px) rotate(" + randomMinus*90 +"deg)" ; 
         inverseIterator--;

      };
}






// Helpers functions ..
function toggleStop () {
	Options.paused = !Options.paused;
}

// function changeLanguageTo (choosedLanguage) {
// 	toggleStop();
// 	var allWords = document.getElementsByClassName('word');
// 	for (var i = allWords.length - 1; i >= 0; i--) {
// 		allWords[i].remove();
// 	};

// 	if (choosedLanguage == 'arabic') {
// 		Options.language = Languages.arabic;
// 		Options.ltr = false;
// 	} else if (choosedLanguage == 'english') {
// 		Options.language = Languages.english;
// 		Options.ltr = true;
// 	} else if (choosedLanguage == 'spanish') {
// 		Options.language = Languages.spanish;
// 		Options.ltr = true;
// 	}

// 	toggleStop();
// }


window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    alert("Error occured: " + errorMsg);//or any message
    return false;
}