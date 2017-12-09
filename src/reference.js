function Reference() {
	var reference = this;

	reference.past_tense_verbs = function() {
		return ['VBN', 'VBD'];
	};

	// var verbs = function() {
	//     return ['MD','VB','VBD','VBG','VBN','VBP','VBZ'];
	// };

	reference.auxiliary_verbs = function() {
	    return [
	    	"be", "am", "are", "is", "was", "were", "being", "can", "could",
	    	"dare", "does", "did", "has", "had", "having", "may", "might",
	    	"must", "need", "ought", "shall", "should", "will", "would", "got"
	    	];
	};

	reference.likely_auxiliary_verbs = function() {
	    return ["is"];
	};

	reference.likely_passive_phrases = function() {
	    return ["will be"];
	};

	return reference;
}