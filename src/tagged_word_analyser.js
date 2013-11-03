function TaggedWordAnalyser(reference) {
	var analyser = this;

	analyser.has_past_tense_verb = function(tags) {
        return (analyser.get_past_tense_verbs(tags).length > 0);
	};

	analyser.get_past_tense_verbs = function(tags) {
		return _.filter(tags, function(tag) {
			return (_.indexOf(reference.past_tense_verbs(), tag) != -1);
		});
	};

	return analyser;
};