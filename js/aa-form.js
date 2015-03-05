var app = angular.module("directives", [])
	.controller("aaformCtrl", ["$scope", function ($scope) {
        // :: INIT
        $scope.formData = { } ;

        $scope.init = function( ) {
            $scope.letterCountArray = [ ];
            $scope.rank = 0;
            $scope.alphabetizedWord = $scope.alphabetize( $scope.formData.word );
        };


        // :: ACTIONS
        $scope.submit = function ( ) {
        	if ($scope.formData.word != null &&  !/[^a-zA-Z]/.test( $scope.formData.word ) ){
	            $scope.init( );
	            $scope.calculateAlphabeticalRank( $scope.letterCountArray, $scope.alphabetizedWord, $scope.formData.word.toUpperCase( ) );
	            bootbox.alert('This word\'s rank is ' + $scope.rank + '!' );
            } else {
	            bootbox.alert('Please type in a word that uses letters from a-z');
            }
        };

        // :: PRIVATE METHODS
        $scope.calculateAlphabeticalRank = function ( letterArray, alphabetizedWord, word ) {
            var denominatorRepetition = 1;
            for ( var i = 0; i < 26; i++ ) {
                denominatorRepetition = denominatorRepetition * $scope.factorial( letterArray[String.fromCharCode( i + 65 ) ] );
            }
            if ( word == alphabetizedWord ) {
                $scope.rank++;
            } else {
                for ( var i = 0; i < alphabetizedWord.length; i++ ){
                    if ( alphabetizedWord[ i ] != word [ 0 ] ) {
                        $scope.rank += $scope.factorial( alphabetizedWord.length - 1 )/denominatorRepetition;
                    } else {
                        letterArray[ word[ 0 ] ]--;
                        $scope.calculateAlphabeticalRank( letterArray, $scope.setCharAt( alphabetizedWord, i, '' ), $scope.setCharAt( word, 0, '' ) );
                        break;
                    }
                }
            }
        };

        $scope.alphabetize = function ( word ) {
            var alphabetizedWord = '';
            for ( var i = 0; i < 26; i++ ) {
                $scope.letterCountArray[ String.fromCharCode(i + 65) ] = 0;
            }
            for ( var i = 0; i < word.length; i++ ) {
                $scope.letterCountArray[ word[i].toUpperCase() ] += 1;
            }
            for ( var i = 0; i < 26; i++ ) {
                if ($scope.letterCountArray[String.fromCharCode( i + 65 ) ] > 0 ) {
                    for ( var j = 0; j < $scope.letterCountArray[String.fromCharCode( i + 65 ) ]; j++ ) {
                        alphabetizedWord += String.fromCharCode( i + 65 )
                    }
                }
            }
            return alphabetizedWord;
        };
		
		// :: UTIL FUNCTIONS
        $scope.setCharAt = function ( str, index, chr )
        {
            if ( index > str.length - 1) return str;
            return str.substr(0, index) + chr + str.substr( index + 1 );
        };

        $scope.factorial = function ( num ) {
            if( num == 0 ) return 1;
            return ( num == 1 ? num : num * $scope.factorial( num - 1 ) );
        };    }])
    .directive("aaForm", function ()
    {
        return {
	        restrict: "AE",
	        scope: {},
	        templateUrl: "views/form.html",
	        controller: "aaformCtrl"
		};
    });
