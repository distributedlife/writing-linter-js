"use strict";

var clean = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == "") {         
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
};

var app = angular.module('subeditor', ['ngStorage']);
app.controller('LinterController', function($scope, $localStorage) {
  $scope.$storage = $localStorage.$default({
    rawtext: "A well named function should do what it says. An anonymous function makes no such promise. When new behaviour comes it can be easily slipped into an anonymous function and everything still ‘makes sense’. I prefer to see it as: anonymous functions make it easier to avoid the pain of naming a function. 'I can just use an anonymous function here'. The pain gets deferred to the person who later has to read and understand the function."
  });

  $scope.paragraphs = function() {
    return $scope.$storage.rawtext.split("\n\n")
  };

  $scope.sentences = function(paragraph) {
    var sentences = clean(paragraph.trim().split("."));

    sentences = _.map(sentences, function(sentence) {
      if (paragraph.indexOf(sentence, paragraph.length - sentence.length) !== -1) {
        return sentence;
      }
      return sentence + ".";
    })

    return sentences;
  };

  $scope.voice = function(sentence) {
    var sentence_voice = new SentenceVoice(new Reference(), new TaggedWordAnalyser(new Reference()), new WordAnalyser(new Reference()));

    return sentence_voice.get_voice(sentence);
  };
});