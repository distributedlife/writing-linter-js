function WordAnalyser(reference) {
	var analyser = this;

	analyser.contains_auxiliary_verb = function(words) {
        return analyser.get_auxiliary_verbs(words).length > 0;
	};

	analyser.get_auxiliary_verbs = function(words) {
		return filtered = _.filter(words, function(word) {
			return (_.indexOf(reference.auxiliary_verbs(), word) != -1);
		});
	};

	return analyser;
};