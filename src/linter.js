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

var app = angular.module('subeditor', []);

var LinterController = function($scope, $http) {
  $scope.rawtext = "The quick brown fox jumps over the lazy dog. The time has come for all good men to attend the dance.\n\nTo swell the gourd, and plump the hazel shells."

  $scope.paragraphs = function() {
    return $scope.rawtext.split("\n\n")
  }

  $scope.sentences = function(paragraph) {
    var sentences = clean(paragraph.trim().split("."));

    sentences = _.map(sentences, function(sentence) {
      if (paragraph.indexOf(sentence, paragraph.length - sentence.length) !== -1) {
        return sentence;
      }
      return sentence + ".";
    })

    return sentences;
  }

  $scope.voice = function(sentence) {
    var sentence_voice = new SentenceVoice(new Reference(), new TaggedWordAnalyser(new Reference()), new WordAnalyser(new Reference()));

    return sentence_voice.get_voice(sentence);
  }
};

LinterController.inject = ['$scope', '$http']