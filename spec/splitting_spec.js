describe("splitting", function() {
  var split = function(para) {
    return _.map(para.match( /[^\.!\?]+[\.!\?]+/g ), function(sentence) {
      return sentence.trim();
    })
  };

  beforeEach(function() {
  });

  describe("splitting paragraphs", function() {
    var para = "Mr. Smith bought cheapsite.com for 1.5 million dollars, i.e. he paid a lot for it. Did he mind? Adam Jones Jr. thinks he didn't. In any case, this isn't true... Well, with a probability of .9 it isn't. I like turtles. Do you? Awesome! lol!!! \"What did he say?\" lol!!! What's going on???? \"Another Quoted Sentence Here.\"";

    it("should handle full stops", function() { return expect(split(para)).toContain("I like turtles."); });
    it("should handle question marks", function() { return expect(split(para)).toContain("Do you?"); });
    it("should handle exclamation marks", function() { return expect(split(para)).toContain("Awesome!"); });
    it("should handle multiple question marks", function() { return expect(split(para)).toContain("lol!!!"); });
    it("should handle multiple exclamation marks", function() { return expect(split(para)).toContain("What's going on????"); });

    it("should handle quoted sentences", function() { return expect(split(para)).toContain("\"What did he say?\" lol!!!"); });
  });
});