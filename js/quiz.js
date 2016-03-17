(function(){

	var app = angular.module('myQuiz',[]);
    
    app.controller('QuizController', ['$scope','$http','$sce', function($scope,$http,$sce){
        
        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswered = 0;
        $scope.percentage = 0;
        
        $http.get('quiz_data.json').then(function(quizData){
            $scope.myQuestions = quizData.data;
            $scope.totalQuestions = $scope.myQuestions.length;
        });
        
        $scope.selectAnswer = function(qIndex,aIndex){
            
            var questionState = $scope.myQuestions[qIndex].questionState;
            
            if( questionState != 'answered' ){
                $scope.myQuestions[qIndex].selectedAnswer = aIndex;
                var correctAnswer = $scope.myQuestions[qIndex].correct;
                $scope.myQuestions[qIndex].correctAnswer = correctAnswer;
                
                if( aIndex === correctAnswer ){
                    $scope.myQuestions[qIndex].correctness = 'correct';
                    $scope.score += 1;
                }else{
                    $scope.myQuestions[qIndex].correctness = 'incorrect';
                }
                
                $scope.myQuestions[qIndex].questionState = 'answered';
            }
            
            $scope.percentage = ($scope.score / $scope.totalQuestions)*100;
            
        }
        
        $scope.isSelected = function(qIndex,aIndex){
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        }
        $scope.isCorrect = function(qIndex,aIndex){
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        }
        
        $scope.selectContinue = function(){
            return $scope.activeQuestion += 1;
        }
        
        $scope.createShareLinks = function(percentage){
			
			var url = 'http://quiz.chowtime.com';

//            var emailLink = '<a class="btn email" href="mailto:?&subject=Try to beat my score!&body=I%20scored%20a%20'+percentage+'%25%20on%20this%20quiz.%20Try%20to%20beat%20my%20score%20at%20'+url+'">Send Email</a>';

			var twitterLink = '<a target="blank" class="btn twitter" href="http://twitter.com/share?text=I scored a '+percentage+'%25 on this quiz. Try to beat my score at&amp;hashtags=ChowTimeQuizQuiz&amp;url='+url+'">Tweet your score</a>';
            
            var emailLink = '<a target="blank" class="btn fb" href="https://www.facebook.com/sharer/sharer.php?u=www.chowtime.com">Share on Facebook</a>';
			
			var newMarkup = emailLink + twitterLink;

			return $sce.trustAsHtml(newMarkup);			

		}
        
    }]);
    
    
})();