function SentenceVoice(reference, tagged_word_analyser, word_analyser) {
	var sentence_voice = this;

	var looks_passive = function(taggedWords) {
		var words = _.map(taggedWords, function(taggedWord) { return taggedWord[0]; });
		var tags = _.map(taggedWords, function(taggedWord) { return taggedWord[1]; });

		return (word_analyser.contains_auxiliary_verb(words) && tagged_word_analyser.has_past_tense_verb(tags));
	};

	var looks_likely_passive = function(sentence) {
		return (_.filter(reference.likely_passive_phrases(), function(phrase) {
			return (sentence.toLowerCase().indexOf(phrase) != -1);
		}).length > 0);
	};

	var check_is_then_by_pattern = function(sentence) {
        if (sentence.indexOf("by") != -1) {
            return 'passive';
        } else {
            return 'active';
        }
	};

	sentence_voice.get_voice = function(sentence) {
		var words = new Lexer().lex(sentence);
		var taggedWords = new POSTagger().tag(words);

        if (looks_passive(taggedWords)) {
            if (sentence.indexOf("is") != -1) {
                return check_is_then_by_pattern(sentence)
            }

            return 'passive';
        }

        if (looks_likely_passive(sentence)) {
            return 'likely-passive';
        }
                
        return 'active';
	};

	sentence_voice.get_reason = function(sentence) {
		var reasons = [];
		var taggedWords = new POSTagger().tag(new Lexer().lex(sentence));

		var words = _.map(taggedWords, function(taggedWord) { return taggedWord[0]; });
		var tags = _.map(taggedWords, function(taggedWord) { return taggedWord[1]; });

		if (word_analyser.contains_auxiliary_verb(words)) {
			reasons.push("Contains the auxiliary verb: " + word_analyser.get_auxiliary_verbs(words).join(", "));
		}
		if (tagged_word_analyser.has_past_tense_verb(tags)) {
			var past_tense_verbs = _.filter(taggedWords, function(taggedWord) {
				if (_.contains(tagged_word_analyser.get_past_tense_verbs(tags), taggedWord[1])) {
					return taggedWord[0];	
				}
			});
			past_tense_verbs = _.map(past_tense_verbs, function(past_tense_verb) { return past_tense_verb[0] });

			reasons.push("Contains the past tense verb: " + past_tense_verbs.join(", "));
		}
		
		// var contains_magic_phrases = _.filter(reference.likely_passive_phrases(), function(phrase) {
		// 	return (sentence.toLowerCase().indexOf(phrase) != -1);
		// }).join(", ");

		return reasons;
	}

	return sentence_voice;
};