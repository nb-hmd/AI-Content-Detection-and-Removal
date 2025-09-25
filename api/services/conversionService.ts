export interface ConversionRequest {
  text: string;
}

export interface ConversionResult {
  original_text: string;
  converted_text: string;
}

export class ConversionService {
  static async convertText(request: ConversionRequest): Promise<ConversionResult> {
    const { text } = request;

    // Simple text conversion using basic transformations
    const convertedText = await this.performBasicConversion(text);

    return {
      original_text: text,
      converted_text: convertedText
    };
  }

  private static async performBasicConversion(text: string): Promise<string> {
    let result = text;

    // 1. Replace formal AI transitions with very simple alternatives
    const formalTransitions = {
      'Furthermore,': 'And,',
      'Moreover,': 'Also,',
      'Additionally,': 'Plus,',
      'Consequently,': 'So,',
      'Therefore,': 'So,',
      'Nevertheless,': 'But,',
      'Nonetheless,': 'But,',
      'However,': 'But',
      'In conclusion,': 'So,',
      'In summary,': 'So,',
      'It is important to note that': 'Remember that',
      'It should be mentioned that': 'Also,',
      'It is worth noting that': 'Also,',
      'As a result,': 'So,',
      'On the other hand,': 'But,',
      'In contrast,': 'But,'
    };

    Object.entries(formalTransitions).forEach(([formal, casual]) => {
      result = result.replace(new RegExp(formal, 'gi'), casual);
    });

    // 2. Replace complex vocabulary with very simple words (child-like)
    const complexToSimple = {
      'utilize': 'use',
      'demonstrate': 'show',
      'facilitate': 'help',
      'establish': 'make',
      'implement': 'do',
      'comprehensive': 'full',
      'significant': 'big',
      'substantial': 'big',
      'fundamental': 'basic',
      'essential': 'needed',
      'optimal': 'best',
      'commence': 'start',
      'terminate': 'stop',
      'acquire': 'get',
      'endeavor': 'try',
      'magnificent': 'great',
      'extraordinary': 'amazing',
      'tremendous': 'huge',
      'exceptional': 'great',
      'sophisticated': 'fancy',
      'elaborate': 'detailed',
      'numerous': 'many',
      'various': 'different',
      'particular': 'special',
      'specific': 'exact',
      'individual': 'single',
      'appropriate': 'right',
      'sufficient': 'enough',
      'necessary': 'needed',
      'important': 'big',
      'excellent': 'great',
      'outstanding': 'amazing',
      'remarkable': 'cool',
      'incredible': 'amazing',
      'fantastic': 'great',
      'wonderful': 'nice',
      'beautiful': 'pretty',
      'gorgeous': 'pretty',
      'delicious': 'yummy',
      'enormous': 'huge',
      'tiny': 'small',
      'gigantic': 'huge',
      'minuscule': 'tiny'
    };

    Object.entries(complexToSimple).forEach(([complex, simple]) => {
      result = result.replace(new RegExp(`\\b${complex}\\b`, 'gi'), simple);
    });

    // 3. Simplify sentence structures
    result = this.simplifyStructures(result);

    // 4. Add contractions to make it more casual
    result = this.addContractions(result);

    // 5. Break up long sentences into shorter ones
    result = this.breakIntoSimpleSentences(result);

    // 6. Add child-like expressions and simplifications
    result = this.addChildLikeExpressions(result);

    // 7. Remove overly complex punctuation
    result = this.simplifyPunctuation(result);

    return result;
  }

  private static addContractions(text: string): string {
    // Add contractions to make text sound more natural
    const contractions = {
      'do not': "don't",
      'does not': "doesn't",
      'did not': "didn't",
      'will not': "won't",
      'would not': "wouldn't",
      'can not': "can't",
      'cannot': "can't",
      'could not': "couldn't",
      'should not': "shouldn't",
      'is not': "isn't",
      'are not': "aren't",
      'was not': "wasn't",
      'were not': "weren't",
      'have not': "haven't",
      'has not': "hasn't",
      'had not': "hadn't",
      'it is': "it's",
      'that is': "that's",
      'there is': "there's",
      'you are': "you're",
      'we are': "we're",
      'they are': "they're"
    };

    let result = text;
    Object.entries(contractions).forEach(([full, contracted]) => {
      result = result.replace(new RegExp(`\\b${full}\\b`, 'gi'), contracted);
    });

    return result;
  }

  private static simplifyStructures(text: string): string {
    let result = text;
    
    // Replace passive voice with active voice (simpler)
    result = result.replace(/is being (\w+)/gi, 'gets $1');
    result = result.replace(/was being (\w+)/gi, 'got $1');
    result = result.replace(/will be (\w+)/gi, 'will get $1');
    
    // Simplify "there are/is" constructions
    result = result.replace(/there are many/gi, 'lots of');
    result = result.replace(/there are several/gi, 'some');
    result = result.replace(/there is a/gi, 'a');
    
    // Replace complex conditionals
    result = result.replace(/in the event that/gi, 'if');
    result = result.replace(/provided that/gi, 'if');
    result = result.replace(/assuming that/gi, 'if');
    
    return result;
  }

  private static breakIntoSimpleSentences(text: string): string {
    // Break up sentences that are too long (over 15 words for child-like writing)
    const sentences = text.split('. ');
    
    return sentences.map(sentence => {
      const words = sentence.split(' ');
      if (words.length > 15) {
        // Find a good breaking point (look for conjunctions)
        const breakWords = ['and', 'but', 'or', 'so', 'because', 'when', 'while', 'that'];
        for (let i = 7; i < words.length - 3; i++) {
          if (breakWords.includes(words[i].toLowerCase())) {
            const firstPart = words.slice(0, i).join(' ');
            let secondPart = words.slice(i + 1).join(' '); // Skip the conjunction
            if (secondPart) {
              secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
              return firstPart + '. ' + secondPart;
            }
          }
        }
        
        // If no conjunction found, break at midpoint
        const midPoint = Math.floor(words.length / 2);
        const firstPart = words.slice(0, midPoint).join(' ');
        let secondPart = words.slice(midPoint).join(' ');
        secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
        return firstPart + '. ' + secondPart;
      }
      return sentence;
    }).join('. ');
  }

  private static addChildLikeExpressions(text: string): string {
    let result = text;
    
    // Replace intensifiers with child-like alternatives
    result = result.replace(/\bis very\b/gi, 'is really');
    result = result.replace(/\bextremely\b/gi, 'super');
    result = result.replace(/\bincredibly\b/gi, 'really really');
    result = result.replace(/\bexceptionally\b/gi, 'super');
    
    // Add simple exclamations
    result = result.replace(/\. This is (\w+)/gi, '. This is so $1!');
    result = result.replace(/\. It is (amazing|great|wonderful|fantastic)/gi, '. It is so cool!');
    
    // Use simpler comparisons
    result = result.replace(/\bsuperior to\b/gi, 'better than');
    result = result.replace(/\binferior to\b/gi, 'worse than');
    result = result.replace(/\bequivalent to\b/gi, 'the same as');
    
    // Add more personal pronouns and informal language
    result = this.addPersonalTouch(result);
    
    // Add emotional expressions
    result = this.addEmotionalExpressions(result);
    
    // Add child-like enthusiasm and vary sentence lengths
    const sentences = result.split('. ');
    const modifiedSentences = sentences.map((sentence, index) => {
      // More frequently add simple expressions for stronger human indicators
      if (Math.random() > 0.6 && index > 0) {
        const expressions = ['Wow! ', 'Cool! ', 'Nice! ', 'Great! ', 'Awesome! ', 'Amazing! '];
        const expression = expressions[Math.floor(Math.random() * expressions.length)];
        return expression + sentence;
      }
      
      // Occasionally add personal thoughts
      if (Math.random() > 0.7 && index > 0) {
        const personalThoughts = ['I think ', 'I feel like ', 'I believe ', 'In my opinion, '];
        const thought = personalThoughts[Math.floor(Math.random() * personalThoughts.length)];
        return thought + sentence.toLowerCase();
      }
      
      return sentence;
    });
    
    return modifiedSentences.join('. ');
  }
  
  private static addPersonalTouch(text: string): string {
    let result = text;
    
    // Add more personal pronouns
    result = result.replace(/\bOne can\b/gi, 'You can');
    result = result.replace(/\bOne should\b/gi, 'You should');
    result = result.replace(/\bIt can be seen that\b/gi, 'I can see that');
    result = result.replace(/\bIt is evident that\b/gi, 'I think that');
    result = result.replace(/\bThis demonstrates\b/gi, 'This shows me');
    
    // Add casual filler words
    const sentences = result.split('. ');
    const casualSentences = sentences.map(sentence => {
      if (Math.random() > 0.8) {
        const fillers = ['you know, ', 'like, ', 'I mean, ', 'actually, ', 'honestly, '];
        const filler = fillers[Math.floor(Math.random() * fillers.length)];
        return sentence.replace(/^(\w+)/, `$1, ${filler}`);
      }
      return sentence;
    });
    
    return casualSentences.join('. ');
  }
  
  private static addEmotionalExpressions(text: string): string {
    let result = text;
    
    // Replace neutral words with emotional ones
    result = result.replace(/\bgood\b/gi, 'awesome');
    result = result.replace(/\bbad\b/gi, 'terrible');
    result = result.replace(/\binteresting\b/gi, 'fascinating');
    result = result.replace(/\bnice\b/gi, 'amazing');
    
    // Add emotional reactions
    result = result.replace(/\. (This|That) is/gi, '. Wow, $1 is');
    result = result.replace(/\. (I|We) (found|discovered)/gi, '. OMG, $1 $2');
    
    return result;
  }
  
  private static simplifyPunctuation(text: string): string {
    let result = text;
    
    // Replace semicolons with periods (simpler)
    result = result.replace(/;/g, '.');
    
    // Replace colons with periods in most cases
    result = result.replace(/: /g, '. ');
    
    // Remove excessive commas in lists
    result = result.replace(/, and /g, ' and ');
    
    // Fix double periods
    result = result.replace(/\.\.+/g, '.');
    
    // Ensure proper spacing
    result = result.replace(/\s+/g, ' ');
    
    return result.trim();
  }


}