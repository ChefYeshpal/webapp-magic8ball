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
      text: "Oh great Magic 8 Ball! I'm Timmy and I'm DOOMED! Chemistry exam in one week, haven't studied AT ALL! My parents will ground me until I'm 30 if I fail! Help!",
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
        },
        {
          text: "Tell me more about this exam",
          leads_to: "exam_details",
          tone: "wise"
        }
      ]
    },

    exam_details: {
      id: "exam_details",
      text: "It's Professor Meltdown's class! He's called 'Meltdown' because he literally had a breakdown about molecular bonds! Last year he threw a banana at the board to demonstrate potassium decay! I don't even know what a molecule IS!",
      mood: "dramatic_despair",
      options: [
        {
          text: "That sounds manageable actually",
          leads_to: "professor_focus",
          tone: "grounding"
        },
        {
          text: "Professor Meltdown sounds terrifying",
          leads_to: "professor_terror",
          tone: "chaotic"
        },
        {
          text: "Let's break it down topic by topic",
          leads_to: "study_breakdown",
          tone: "practical"
        },
        {
          text: "Maybe you can charm your way out",
          leads_to: "charm_path",
          tone: "absurd"
        }
      ]
    },

    professor_focus: {
      id: "professor_focus", 
      text: "You're right! Maybe he's just passionate about chemistry! If I show genuine interest and ask good questions, he might appreciate my effort even if I don't know everything perfectly!",
      mood: "contemplative",
      options: [
        {
          text: "Exactly! Engage with the material",
          leads_to: "engagement_path",
          tone: "encouraging"
        },
        {
          text: "But what if he asks something you don't know?",
          leads_to: "anxiety_spiral",
          tone: "discouraging"
        },
        {
          text: "Practice explaining concepts out loud",
          leads_to: "practice_path",
          tone: "practical"
        }
      ]
    },

    professor_terror: {
      id: "professor_terror",
      text: "RIGHT?! He made a kid cry over sodium vs potassium! He yelled 'SALT ISN'T JUST SALT!' and threw a banana! What if he throws fruit at ME?!",
      mood: "panicked",
      options: [
        {
          text: "Focus on learning, not the professor",
          leads_to: "ignore_professor",
          tone: "wise"
        },
        {
          text: "Maybe bring protective gear to the exam",
          leads_to: "protection_comedy",
          tone: "absurd"
        },
        {
          text: "Study extra hard to avoid his wrath",
          leads_to: "fear_motivation",
          tone: "chaotic"
        },
        {
          text: "Transfer to a different school",
          leads_to: "escape_plan",
          tone: "dramatic"
        }
      ]
    },

    study_breakdown: {
      id: "study_breakdown",
      text: "Let me think... Atomic structure - atoms have parts? Organic chemistry - vegetables? Chemical bonds - things stick together? Wait, I need to learn EVERYTHING about EVERYTHING!",
      mood: "overwhelmed",
      options: [
        {
          text: "Start with one topic at a time",
          leads_to: "topic_by_topic",
          tone: "practical"
        },
        {
          text: "Actually, vegetables aren't quite right...",
          leads_to: "misconception_fix",
          tone: "wise"
        },
        {
          text: "You know what? Just memorize formulas",
          leads_to: "formula_memorization",
          tone: "chaotic"
        },
        {
          text: "Maybe chemistry isn't for you",
          leads_to: "give_up_academics",
          tone: "discouraging"
        }
      ]
    },

    charm_path: {
      id: "charm_path",
      text: "I'll walk in with finger guns, wink at Prof Meltdown, and say 'Nice periodic table! Mind if I... bond with it?' Then do a chemistry pun dance! Think that'll work?",
      mood: "absurdly_happy",
      options: [
        {
          text: "That's... definitely a unique approach",
          leads_to: "charm_disaster",
          tone: "grounding"
        },
        {
          text: "Add more chemistry puns!",
          leads_to: "pun_master",
          tone: "absurd"
        },
        {
          text: "Maybe tone it down a bit",
          leads_to: "subtle_charm",
          tone: "practical"
        },
        {
          text: "Practice your dance moves",
          leads_to: "dance_practice",
          tone: "chaotic"
        }
      ]
    },

    study_path_1: {
      id: "study_path_1",
      text: "You're right! One week is plenty! I'll study 16 hours a day and live on energy drinks! But where do I start? Chemistry is atoms and stuff, right? Should I memorize the entire periodic table first?",
      mood: "overly_optimistic",
      options: [
        {
          text: "Start with basics, make a plan",
          leads_to: "study_plan_creation",
          tone: "wise"
        },
        {
          text: "Yes, memorize everything!",
          leads_to: "memorization_madness",
          tone: "chaotic"
        },
        {
          text: "Maybe get a tutor instead",
          leads_to: "tutor_search",
          tone: "practical"
        },
        {
          text: "16 hours a day might be too much",
          leads_to: "realistic_schedule",
          tone: "grounding"
        }
      ]
    },

    study_plan_creation: {
      id: "study_plan_creation",
      text: "Perfect! My SUPER DETAILED plan: Day 1: Learn atoms. Day 2: Learn molecules. Day 3: Why things explode. Day 4: Panic. Day 5: More panic. Day 6: Accept fate. Day 7: Exam! Solid plan, right?",
      mood: "overly_optimistic",
      options: [
        {
          text: "Maybe adjust days 4-6",
          leads_to: "plan_revision",
          tone: "practical"
        },
        {
          text: "Actually, that's a solid panic schedule",
          leads_to: "panic_endorsement",
          tone: "absurd"
        },
        {
          text: "Add some practice problems",
          leads_to: "practice_problems",
          tone: "wise"
        },
        {
          text: "Start with YouTube videos",
          leads_to: "youtube_education",
          tone: "modern"
        }
      ]
    },

    memorization_madness: {
      id: "memorization_madness",
      text: "YES! Hydrogen-1-proton-helium-2-protons... wait, there are 118 elements?! And each has properties and configurations and... OH NO, my brain is full at Beryllium! How do people fit all this in their heads?!",
      mood: "dramatic_despair",
      options: [
        {
          text: "You don't need to memorize everything",
          leads_to: "memorization_reality",
          tone: "grounding"
        },
        {
          text: "Try making a song about elements",
          leads_to: "element_song",
          tone: "creative"
        },
        {
          text: "Use flashcards and spaced repetition",
          leads_to: "flashcard_system",
          tone: "practical"
        },
        {
          text: "Maybe your brain needs more RAM",
          leads_to: "brain_upgrade",
          tone: "absurd"
        }
      ]
    },

    tutor_search: {
      id: "tutor_search",
      text: "Great idea! There's Sarah who speaks only in chemical formulas, Bob who explains everything with food analogies, and my neighbor's cat Mr. Whiskers who once made a rainbow by knocking over chemicals. Who should I choose?",
      mood: "contemplative",
      options: [
        {
          text: "Definitely Sarah, she knows her stuff",
          leads_to: "sarah_tutoring",
          tone: "practical"
        },
        {
          text: "Bob sounds fun and relatable",
          leads_to: "bob_tutoring",
          tone: "modern"
        },
        {
          text: "Mr. Whiskers has natural talent",
          leads_to: "cat_tutoring",
          tone: "absurd"
        },
        {
          text: "Why not all three?",
          leads_to: "tutoring_committee",
          tone: "chaotic"
        }
      ]
    },

    panic_path_1: {
      id: "panic_path_1", 
      text: "OH NO! You're right! It IS hopeless! I'm doomed! I'll live in a cardboard box eating ramen! Maybe I should just disappear forever! What's the point?!",
      mood: "dramatic_despair",
      options: [
        {
          text: "Calm down, it's just one exam",
          leads_to: "reality_check_detailed",
          tone: "grounding"
        },
        {
          text: "Yes, run away and join the circus",
          leads_to: "circus_planning",
          tone: "absurd"
        },
        {
          text: "Fake your own death",
          leads_to: "fake_death_planning",
          tone: "dark"
        },
        {
          text: "Actually, ramen isn't that bad",
          leads_to: "ramen_philosophy",
          tone: "comedic"
        }
      ]
    },

    alternative_path_1: {
      id: "alternative_path_1",
      text: "You know what? Maybe this is the universe telling me something! Maybe I'm not meant for chemistry! Maybe I should pursue my TRUE calling... but what could that be?",
      mood: "contemplative",
      options: [
        {
          text: "Become a famous musician",
          leads_to: "musician_exploration",
          tone: "dreamy"
        },
        {
          text: "Become a professional gamer",
          leads_to: "gaming_career", 
          tone: "modern"
        },
        {
          text: "Still focus on the exam",
          leads_to: "back_to_reality_detailed",
          tone: "responsible"
        },
        {
          text: "Become a professional Magic 8 Ball consultant",
          leads_to: "mystical_career",
          tone: "absurd"
        }
      ]
    },

    realistic_schedule: {
      id: "realistic_schedule",
      text: "You're right! 16 hours is insane. Let me try 6 hours studying? That's 8 for sleep, 2 for food, 1 for crying, 1 for existential dread, and 6 for... wait, that's 24 hours. Math is hard too!",
      mood: "confused_but_trying",
      options: [
        {
          text: "Let's work on that math together",
          leads_to: "math_help",
          tone: "helpful"
        },
        {
          text: "4 hours studying might be more realistic",
          leads_to: "realistic_goals",
          tone: "practical"
        },
        {
          text: "The crying hour is essential",
          leads_to: "emotional_schedule",
          tone: "understanding"
        },
        {
          text: "Maybe hire a time manager",
          leads_to: "time_management_consultant",
          tone: "absurd"
        }
      ]
    },

    engagement_path: {
      id: "engagement_path",
      text: "I went to Professor Meltdown's office hours! His eyes lit up when I asked about molecular bonding! He spent 2 hours explaining atoms like people looking for friends! Then he gave me extra credit for 'genuine curiosity!' Being interested actually works!",
      mood: "pleasantly_surprised",
      options: [
        {
          text: "Keep building that relationship",
          leads_to: "professor_mentorship",
          tone: "wise"
        },
        {
          text: "Now tackle the harder concepts",
          leads_to: "advanced_concepts",
          tone: "encouraging"
        },
        {
          text: "Ask about the banana incident",
          leads_to: "banana_story",
          tone: "curious"
        }
      ]
    },

    protection_comedy: {
      id: "protection_comedy",
      text: "I wore a helmet, safety goggles, and fruit stickers to class! Professor Meltdown burst out laughing! Turns out he only threw that banana to demonstrate radioactive decay! Now he calls me 'Safety Timmy' and I'm his favorite student!",
      mood: "absurdly_happy",
      options: [
        {
          text: "Embrace your new identity",
          leads_to: "safety_timmy_path",
          tone: "encouraging"
        },
        {
          text: "Ask for extra safety demonstrations",
          leads_to: "safety_demonstrations",
          tone: "absurd"
        },
        {
          text: "Become the class safety officer",
          leads_to: "safety_officer",
          tone: "responsible"
        }
      ]
    },

    pun_master: {
      id: "pun_master",
      text: "I've been practicing! 'I've got my ion you!' 'Are you made of copper and tellurium? Because you're Cu-Te!' Wait... is that biology? OH NO, am I mixing sciences like crossing streams in Ghostbusters?!",
      mood: "panicked_excitement",
      options: [
        {
          text: "Science puns are universally good",
          leads_to: "pun_acceptance",
          tone: "encouraging"
        },
        {
          text: "Maybe focus on chemistry-specific ones",
          leads_to: "chemistry_puns_only",
          tone: "practical"
        },
        {
          text: "Start a science pun comedy show",
          leads_to: "comedy_career",
          tone: "absurd"
        },
        {
          text: "Test them on Professor Meltdown",
          leads_to: "pun_testing",
          tone: "brave"
        }
      ]
    },

    element_song: {
      id: "element_song",
      text: "♪ Hydrogen and helium, lithium too! Beryllium's fancy, boron's so blue! ♪ Wait, this is working! I remember more elements! Should I become the next Hamilton but for chemistry?",
      mood: "artistic_triumph",
      options: [
        {
          text: "Keep making science songs",
          leads_to: "science_musician_path",
          tone: "creative"
        },
        {
          text: "Add dance moves to help memorize",
          leads_to: "science_choreography",
          tone: "absurd"
        },
        {
          text: "Share it with classmates",
          leads_to: "classroom_performance",
          tone: "brave"
        },
        {
          text: "Focus on the hardest concepts",
          leads_to: "song_advanced_topics",
          tone: "practical"
        }
      ]
    },

    cat_tutoring: {
      id: "cat_tutoring",
      text: "Mr. Whiskers is my tutor! Every time he knocks something over, I explain the reaction! Baking soda + vinegar = acid-base reactions! Food coloring = chemical indicators! He's chaotic but effective!",
      mood: "absurdly_happy",
      options: [
        {
          text: "Document your cat-chemistry discoveries",
          leads_to: "cat_science_journal",
          tone: "scientific"
        },
        {
          text: "Enter Mr. Whiskers in a science fair",
          leads_to: "cat_science_fair",
          tone: "absurd"
        },
        {
          text: "Teach other pets chemistry",
          leads_to: "pet_chemistry_school",
          tone: "entrepreneurial"
        },
        {
          text: "Maybe get a human tutor too",
          leads_to: "hybrid_tutoring",
          tone: "practical"
        }
      ]
    },

    ramen_philosophy: {
      id: "ramen_philosophy",
      text: "You're right! Ramen is chemistry in a bowl! Noodles are carbohydrates, broth has proteins, flavor packet is pure chemistry magic! Maybe being a ramen philosopher isn't bad! 'The Tao of Sodium' and 'Zen and Instant Noodles!'",
      mood: "philosophical_comedy",
      options: [
        {
          text: "Actually use ramen to learn chemistry",
          leads_to: "ramen_chemistry_lessons",
          tone: "clever"
        },
        {
          text: "Open a philosophical ramen shop",
          leads_to: "ramen_philosopher_career",
          tone: "absurd"
        },
        {
          text: "Write ramen haikus about chemistry",
          leads_to: "ramen_poetry",
          tone: "artistic"
        },
        {
          text: "Maybe aim a bit higher than ramen life",
          leads_to: "higher_aspirations",
          tone: "motivational"
        }
      ]
    },

    // Success ending branches
    professor_mentorship: {
      id: "professor_mentorship",
      text: "Professor Meltdown became my mentor! He taught me chemistry is like a language - learn the vocabulary and everything makes sense! I got an A+! He's recommending me for advanced chemistry! Genuine interest was the secret!",
      mood: "grateful_success",
      ending: true,
      outcome: "mentorship_success"
    },

    science_musician_path: {
      id: "science_musician_path",
      text: "My chemistry songs went viral! I'm 'Timmy the Science Bard' with 2 million YouTube subscribers! Kids worldwide learn chemistry through my songs! I performed at the Nobel Prize ceremony! Failing chemistry led to making it fun for everyone!",
      mood: "artistic_triumph",
      ending: true,
      outcome: "musical_science_success"
    },

    cat_science_fair: {
      id: "cat_science_fair",
      text: "Mr. Whiskers and I won first place with 'Chaos Theory in Chemical Reactions: A Feline Perspective!' Universities are calling, National Geographic wants a documentary, and Mr. Whiskers has 500K Instagram followers! Science revolution, one knocked-over beaker at a time!",
      mood: "absurdly_triumphant",
      ending: true,
      outcome: "cat_science_revolution"
    },

    ramen_chemistry_lessons: {
      id: "ramen_chemistry_lessons",
      text: "I used ramen to learn everything! Miso = pH levels, spicy = exothermic reactions, seafood = protein structures! My 'Ramen Chemistry Guide' is required reading at universities! I'm the 'Ramen Chemist!' Weird study methods work best!",
      mood: "proud_innovation",
      ending: true,
      outcome: "innovative_learning_success"
    },

    safety_timmy_path: {
      id: "safety_timmy_path",
      text: "I embraced 'Safety Timmy!' Started a safety committee, designed lab protocols, got a scholarship for 'Innovation in Laboratory Safety!' My helmet-wearing self proved being prepared is smart! Now studying to be a chemical safety engineer!",
      mood: "proud_transformation",
      ending: true,
      outcome: "safety_specialist_success"
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
      responsible_maturity: { color: "#0984e3", fontSize: "1em" },
      overwhelmed: { color: "#fd79a8", fontSize: "1.05em", fontStyle: "italic" },
      confused_but_trying: { color: "#fdcb6e", fontSize: "1em" },
      panicked_excitement: { color: "#e17055", fontSize: "1.1em" },
      philosophical_comedy: { color: "#a29bfe", fontSize: "1em", fontStyle: "italic" },
      absurdly_triumphant: { color: "#ff7675", fontSize: "1.2em", fontWeight: "bold" },
      proud_innovation: { color: "#00b894", fontSize: "1.1em" },
      proud_transformation: { color: "#0984e3", fontSize: "1.1em", fontWeight: "bold" }
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