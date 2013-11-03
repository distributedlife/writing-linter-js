describe("tagged word analyser", function() {
  var analyser;
  var reference;

  beforeEach(function() {
    reference = {
        past_tense_verbs: function() {
            return ["VBN"];
        }
    }
    analyser = new TaggedWordAnalyser(reference);
  });

  describe("get past tense verbs", function() {
    it("should return a sublist containing only past tense verbs", function() {
        expect(analyser.get_past_tense_verbs(["VBN", "VBA", "VBC"])).toEqual(["VBN"])
    });
  });

  describe("has past tense verb", function() {
    it("should return true if the tagged words contains a past tense verb", function() {
      var does_contain = ["VBA", "VBN"];
      var does_not_contain = ["VBA"];

      expect(analyser.has_past_tense_verb(does_contain)).toBeTruthy();
      expect(analyser.has_past_tense_verb(does_not_contain)).toBeFalsy();
    });
  });
});