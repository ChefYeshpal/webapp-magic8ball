// Little Timmy's Dialogue Tree System
// A branching narrative where Timmy seeks guidance about his exam crisis

const timmyDialogueTree = {
  character: {
    name: "Little Timmy",
    age: 16,
    situation: "Has an important exam in one week, hasn't studied at all",
    personality: "Anxious, dramatic, easily influenced, prone to extreme decisions"
  },
  
  // Each dialogue has an ID, text, and possible responses
  dialogues: {
    start: {
      id: "start",
      text: "Oh great and mystical Magic 8 Ball! I'm Little Timmy, and I'm in SERIOUS trouble! I have my final chemistry exam in exactly one week, and I haven't studied a single page! My parents will literally ground me until I'm 30 if I fail. What should I do?!",
      mood: "panicked",
      options: [
        {
          text: "Study hard, you still have time",
          leads_to: "study_path_1",
          tone: "encouraging"
        },
        {
          text: "Panic more, it's hopeless",
          leads_to: "panic_path_1", 
          tone: "discouraging"
        },
        {
          text: "Consider other options",
          leads_to: "alternative_path_1",
          tone: "mysterious"
        }
      ]
    },

    study_path_1: {
      id: "study_path_1",
      text: "You're right! One week is totally enough time! I'll study 16 hours a day and drink nothing but energy drinks! But wait... where do I even start? Chemistry is like... atoms and stuff, right? Should I memorize the entire periodic table first?",
      mood: "overly_optimistic",
      options: [
        {
          text: "Start with basics, make a plan",
          leads_to: "study_path_success",
          tone: "wise"
        },
        {
          text: "Yes, memorize everything!",
          leads_to: "study_path_burnout",
          tone: "chaotic"
        },
        {
          text: "Maybe get a tutor instead",
          leads_to: "tutor_path",
          tone: "practical"
        }
      ]
    },

    panic_path_1: {
      id: "panic_path_1", 
      text: "OH NO! You're absolutely right! It IS hopeless! I'm doomed! My life is over! I'll never get into college, I'll end up living in a cardboard box, eating nothing but instant ramen! Maybe I should just disappear forever! What's the point of anything anymore?!",
      mood: "dramatic_despair",
      options: [
        {
          text: "Calm down, it's just one exam",
          leads_to: "reality_check",
          tone: "grounding"
        },
        {
          text: "Yes, run away and join the circus",
          leads_to: "circus_path",
          tone: "absurd"
        },
        {
          text: "Fake your own death",
          leads_to: "dark_path_1",
          tone: "dark"
        }
      ]
    },

    alternative_path_1: {
      id: "alternative_path_1",
      text: "Hmm, other options... You know what, Magic 8 Ball? Maybe this is the universe telling me something! Maybe I'm not meant to be a chemistry student! Maybe I should pursue my TRUE calling... but what could that be?",
      mood: "contemplative",
      options: [
        {
          text: "Become a famous musician",
          leads_to: "musician_path",
          tone: "dreamy"
        },
        {
          text: "Become a professional gamer",
          leads_to: "gamer_path", 
          tone: "modern"
        },
        {
          text: "Still focus on the exam",
          leads_to: "back_to_reality",
          tone: "responsible"
        }
      ]
    },

    study_path_success: {
      id: "study_path_success",
      text: "You know what? You're absolutely right! I made a study schedule, got help from my smart friend Sarah, and actually understood most of the material! The exam went way better than expected - I think I might have actually passed! Thanks, Magic 8 Ball, you saved my academic career!",
      mood: "grateful_success",
      ending: true,
      outcome: "success"
    },

    study_path_burnout: {
      id: "study_path_burnout",
      text: "I tried to memorize the entire textbook in 3 days! I didn't sleep, I survived on nothing but coffee and determination! But during the exam, my brain just... shut down. I couldn't remember my own name, let alone the atomic weight of hydrogen. I think I accidentally wrote 'potato' as the answer to everything. Well, at least I tried really hard?",
      mood: "exhausted_failure",
      ending: true,
      outcome: "comedic_failure"
    },

    tutor_path: {
      id: "tutor_path", 
      text: "I found this amazing tutor who explained everything so clearly! Turns out chemistry isn't that scary when someone actually teaches it properly. I learned more in two days with her than in the entire semester with my teacher who just mumbles at the whiteboard. I actually enjoyed studying! Who would have thought?",
      mood: "pleasantly_surprised",
      ending: true,
      outcome: "moderate_success"
    },

    reality_check: {
      id: "reality_check",
      text: "You're right, it's just one exam. I talked to my parents and they were way more understanding than I thought. Even if I don't ace it, I can retake it next semester. Sometimes the fear is worse than the actual thing. I studied what I could and did my best - that's all anyone can ask for!",
      mood: "mature_acceptance",
      ending: true,
      outcome: "emotional_growth"
    },

    circus_path: {
      id: "circus_path",
      text: "I ran away and joined the circus! Turns out I have a natural talent for juggling flaming torches while riding a unicycle! Who needs chemistry when you can be 'Timmy the Terrific'? My parents were confused but oddly proud when they saw me on TV. The circus life chose me!",
      mood: "absurdly_happy",
      ending: true,
      outcome: "absurd_success"
    },

    dark_path_1: {
      id: "dark_path_1",
      text: "I climbed up to the roof of the school's 10-meter tall science building, thinking maybe if I jumped, I wouldn't have to face the exam... But then I realized something important. This is really stupid. A chemistry exam isn't worth hurting myself over. I climbed back down and called the school counselor instead. Sometimes the darkest thoughts help us realize what really matters.",
      mood: "dark_then_wise",
      ending: true,
      outcome: "serious_growth"
    },

    musician_path: {
      id: "musician_path",
      text: "I picked up my guitar and wrote a song about chemical reactions! It went viral on TikTok - 'The Periodic Table Blues' became a huge hit! Record labels are calling, and I'm touring with my chemistry-themed band 'Atomic Mass Confusion.' Who knew failing chemistry could lead to musical success?",
      mood: "artistic_triumph",
      ending: true,
      outcome: "creative_success"
    },

    gamer_path: {
      id: "gamer_path",
      text: "I started streaming myself playing chemistry-themed video games 24/7! 'Chemistry Crisis' became my signature game, and now I have 2 million followers watching me fail at virtual experiments. Ironically, I learned more chemistry from gaming than I ever did in class. Sometimes failure leads to unexpected success!",
      mood: "modern_success",
      ending: true,
      outcome: "digital_age_win"
    },

    back_to_reality: {
      id: "back_to_reality",
      text: "After my brief daydream about alternative careers, I realized I should probably just face the exam. I spent the remaining days doing practice problems and reviewing past exams. It wasn't glamorous, but it was the responsible thing to do. Sometimes the boring choice is the right choice.",
      mood: "responsible_maturity",
      ending: true,
      outcome: "mature_decision"
    }
  },

  // Helper functions for the dialogue system
  getCurrentDialogue: function(dialogueId) {
    return this.dialogues[dialogueId] || this.dialogues.start;
  },

  getRandomStartingDialogue: function() {
    return this.dialogues.start;
  },

  // Get mood-based styling for the dialogue
  getMoodStyling: function(mood) {
    const moodStyles = {
      panicked: { color: "#ff6b6b", fontSize: "1.1em", animation: "shake" },
      overly_optimistic: { color: "#4ecdc4", fontSize: "1.05em" },
      dramatic_despair: { color: "#ff4757", fontSize: "1.2em", fontWeight: "bold" },
      contemplative: { color: "#3742fa", fontSize: "1em", fontStyle: "italic" },
      grateful_success: { color: "#2ed573", fontSize: "1.1em" },
      exhausted_failure: { color: "#ffa502", fontSize: "0.95em" },
      pleasantly_surprised: { color: "#70a1ff", fontSize: "1em" },
      mature_acceptance: { color: "#5f27cd", fontSize: "1em" },
      absurdly_happy: { color: "#ff9ff3", fontSize: "1.1em" },
      dark_then_wise: { color: "#2f3542", fontSize: "1em" },
      artistic_triumph: { color: "#ff6348", fontSize: "1.1em" },
      modern_success: { color: "#1dd1a1", fontSize: "1.05em" },
      responsible_maturity: { color: "#0984e3", fontSize: "1em" }
    };
    return moodStyles[mood] || { color: "#ffffff", fontSize: "1em" };
  },

  // Track the user's choices for analytics/fun
  trackChoice: function(fromDialogue, choice, toDialogue) {
    if (!this.choiceHistory) {
      this.choiceHistory = [];
    }
    this.choiceHistory.push({
      from: fromDialogue,
      choice: choice,
      to: toDialogue,
      timestamp: new Date()
    });
  },

  // Get a summary of the path taken
  getPathSummary: function() {
    if (!this.choiceHistory || this.choiceHistory.length === 0) {
      return "Path not tracked";
    }
    
    const pathTypes = this.choiceHistory.map(choice => choice.choice.tone);
    const outcome = this.choiceHistory[this.choiceHistory.length - 1].to;
    
    return {
      pathPersonality: pathTypes,
      finalOutcome: outcome,
      choiceCount: this.choiceHistory.length
    };
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = timmyDialogueTree;
} else {
  window.timmyDialogueTree = timmyDialogueTree;
}