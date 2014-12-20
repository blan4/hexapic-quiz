(function(document) {
  'use strict';
  Polymer('hexapic-app', {
    ready: function() {
      var ajax = document.querySelector('core-ajax');
      var button = document.querySelector('#submit');
      var toast = document.querySelector('paper-toast');
      var answer = document.querySelector('paper-radio-group');
      var img = document.querySelector('#question');
      var totalScore = 0;
      var passedQuestions = 10;
      var score = document.querySelector('#score');
      var progress = document.querySelector('paper-progress');
      var endGame = document.querySelector('#endGame');
      var results = document.querySelector('#results');
      var restartButton = document.querySelector('#restart');
      restartButton.addEventListener('click', function(){
        totalScore = 0;
        passedQuestions = 10;
        progress.value = 0;
        endGame.toggle();
        score.innerHTML = 'Score: ' + totalScore;
        ajax.params = '';
      });
      button.addEventListener('click', function(){
        if (answer.selected !== null) {
          ajax.params = {uid: button.model.uid, answer: answer.selected};
        }
      });
      ajax.addEventListener('core-response', function(e){
        console.log(e.detail.response);
        var data = e.detail.response;

        if (data.uid !== undefined) {
          img.src = 'http://hexapicserv.appspot.com/random?uid=' + data.uid;

          button.model = {
            uid: data.uid
          };

          document.querySelector('#answers').model = {
            variants: e.detail.response.variants
          };
        } else {
          if (data.isRight !== undefined) {
            if (data.isRight === 'true') {
              passedQuestions -= 1;
              totalScore += 10;
              progress.value = (10 - passedQuestions)*10;
              if (passedQuestions <= 0) {
                toast.text = 'Good job. You win!';
                results.innerHTML = 'Your scored ' + totalScore + ' points. Well done. Twit it now!!!!';
                endGame.toggle();
              } else {
                toast.text = 'Good job. Next picture!';
                ajax.params = '';
              }
              toast.show();
            } else {
              toast.text = 'Answer ' + data.answer + ' is wrong. Try again!.';
              toast.show();
              if (totalScore !== 0) {
                totalScore -= 5;
              }
            }
          }
        }
        score.innerHTML = 'Score: ' + totalScore;
      });
      var help = document.querySelector('#help_button');
      var dialog = document.querySelector('#helpModal');
      help.addEventListener('click', function() {
        dialog.toggle();
      });
    }
  });

})(wrap(document));
