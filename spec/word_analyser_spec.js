describe("word analyser", function() {
  var analyser;
  var reference;

  beforeEach(function() {
    reference = {
        auxiliary_verbs: function() {
          return ["is"];
        }
    }
    analyser = new WordAnalyser(reference);
  });

  describe("get auxiliary verbs", function() {
    it("should return a sublist containing only past tense verbs", function() {
        expect(analyser.get_auxiliary_verbs(["is", "banana"])).toEqual(["is"])
    });
  });

  describe("contains auxiliary verb", function() {
    it("should return true if the tagged words contains an auxillary verb", function() {
      var does_contain = ["is", "banana"];
      var does_not_contain = ["banana"];

      expect(analyser.contains_auxiliary_verb(does_contain)).toBeTruthy();
      expect(analyser.contains_auxiliary_verb(does_not_contain)).toBeFalsy();
    });
  });
});