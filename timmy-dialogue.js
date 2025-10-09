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
      text: "Oh, you want the gory details? It's Professor Meltdown's Advanced Chemistry class! He's called 'Meltdown' because last year a student asked him about the periodic table and he literally had a breakdown about how 'kids these days don't appreciate the beauty of molecular bonds!' The exam covers everything from atomic structure to organic chemistry. I don't even know what a molecule IS!",
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
      text: "You know what? You're right! Maybe Professor Meltdown isn't that scary. I mean, he's passionate about chemistry, right? Maybe if I show genuine interest and ask good questions, he'll appreciate my effort even if I don't know everything perfectly!",
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
      text: "RIGHT?! Last month he made a kid cry because they confused sodium with potassium! He started yelling about how 'SALT ISN'T JUST SALT, THERE ARE DIFFERENT KINDS!' I heard he once threw a banana at the whiteboard to demonstrate potassium decay! What if he throws fruit at ME?!",
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
      text: "Okay, okay... let me think. Atomic structure - that's like... atoms have parts? Organic chemistry - that's about... organic things? Like vegetables? Chemical bonds - things stick together somehow? Actually, when you put it like that, it sounds like I need to learn EVERYTHING about EVERYTHING!",
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
      text: "Ooh, interesting idea! I could walk into the exam with finger guns, wink at Professor Meltdown, and say 'Hey there, Prof! Nice periodic table you got there. Mind if I... bond with it?' Then I'd do a little chemistry pun dance! Think that would work?",
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
      text: "You're right! One week is totally enough time! I'll study 16 hours a day and drink nothing but energy drinks! But wait... where do I even start? Chemistry is like... atoms and stuff, right? Should I memorize the entire periodic table first?",
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
      text: "Okay, okay, you're right! Let me make a SUPER DETAILED study plan! Day 1: Learn what an atom is. Day 2: Learn what molecules are. Day 3: Figure out why things explode. Day 4: Panic about everything I still don't know. Day 5: More panic. Day 6: Accept my fate. Day 7: Exam day! Perfect plan, right?",
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
      text: "YES! I'll memorize EVERYTHING! Hydrogen-1-proton-helium-2-protons-lithium-3-protons... wait, there are HOW MANY elements?! 118?! And each one has properties and electron configurations and... OH NO, my brain is already full and I'm only at Beryllium! How do people fit all this knowledge in their heads?!",
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
      text: "Great idea! I'll find a tutor! Let's see... there's Sarah the Chemistry Genius, but she speaks only in chemical formulas. There's Bob the Grad Student who explains everything using food analogies. And there's my neighbor's cat, Mr. Whiskers, who once knocked over a chemistry set and somehow created a small rainbow. Who should I choose?",
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

    realistic_schedule: {
      id: "realistic_schedule",
      text: "You know what, you're totally right! 16 hours is insane. I need sleep, food, and bathroom breaks! Let me try... 6 hours of studying a day? That leaves 8 hours for sleep, 2 hours for meals, 1 hour for crying, 1 hour for staring at the ceiling in existential dread, and 6 hours for... wait, that's 24 hours. Math is hard too!",
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

    panic_path_1: {
      id: "panic_path_1", 
      text: "OH NO! You're absolutely right! It IS hopeless! I'm doomed! My life is over! I'll never get into college, I'll end up living in a cardboard box, eating nothing but instant ramen! Maybe I should just disappear forever! What's the point of anything anymore?!",
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
      text: "Hmm, other options... You know what, Magic 8 Ball? Maybe this is the universe telling me something! Maybe I'm not meant to be a chemistry student! Maybe I should pursue my TRUE calling... but what could that be?",
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

    // New detailed branches continuing the story...

    engagement_path: {
      id: "engagement_path",
      text: "You know what? I went to Professor Meltdown's office hours and asked him about molecular bonding! His eyes literally lit up! He spent 2 hours explaining how atoms are like people looking for friendship, and molecules are like friend groups! Then he gave me extra credit for 'showing genuine curiosity!' Who knew being interested actually works?",
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
      text: "I showed up to the next class wearing a helmet, safety goggles, and a lab coat covered in fruit stickers! Professor Meltdown took one look at me and burst out laughing! Turns out he only threw that banana because he was demonstrating radioactive decay and wanted something 'naturally occurring with potassium!' Now he calls me 'Safety Timmy' and I'm his favorite student!",
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
      text: "Oh my gosh, yes! I've been practicing! 'I've got my ion you!' 'Are you made of copper and tellurium? Because you're Cu-Te!' 'I wish I was adenine so I could get paired with U!' Wait... that last one might be biology... OH NO, am I mixing up my sciences?! Is that like crossing the streams in Ghostbusters?!",
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
      text: "♪ Hydrogen and helium, lithium too! Beryllium's fancy, boron's so blue! Carbon's in pencils, nitrogen's in air, oxygen helps us breathe everywhere! ♪ Wait, this is actually working! I remember more elements now! Should I record this and become the next Hamilton but for chemistry?",
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
      text: "I convinced Mr. Whiskers to be my tutor! I set up a chemistry lab in my backyard, and every time he knocks something over, I try to explain what reaction would happen! When he knocked over the baking soda and vinegar, I explained acid-base reactions! When he got into the food coloring, I learned about chemical indicators! He's the most chaotic but effective teacher ever!",
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
      text: "You know what? You're right! Ramen is actually amazing! It's like... chemistry in a bowl! The noodles are carbohydrates, the broth has proteins and fats, the flavor packet is pure chemistry magic! Maybe failing chemistry and becoming a ramen philosopher isn't such a bad life! I could write books like 'The Tao of Sodium' and 'Zen and the Art of Instant Noodles!'",
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
      text: "Professor Meltdown became my mentor! He taught me that chemistry is like a language, and once you learn the vocabulary, everything else makes sense! I not only passed the exam, I got an A+! He's even recommending me for advanced chemistry next year! Who would have thought that showing genuine interest was the secret all along?",
      mood: "grateful_success",
      ending: true,
      outcome: "mentorship_success"
    },

    science_musician_path: {
      id: "science_musician_path",
      text: "My chemistry songs went viral! I became 'Timmy the Science Bard' and now I have a YouTube channel with 2 million subscribers! Kids around the world are learning chemistry through my songs! I even got invited to perform at the Nobel Prize ceremony! Who knew failing chemistry could lead to making chemistry fun for everyone?",
      mood: "artistic_triumph",
      ending: true,
      outcome: "musical_science_success"
    },

    cat_science_fair: {
      id: "cat_science_fair",
      text: "Mr. Whiskers and I won first place at the Regional Science Fair with our project 'Chaos Theory in Chemical Reactions: A Feline Perspective!' Universities are calling, National Geographic wants to do a documentary, and Mr. Whiskers now has his own Instagram account with 500K followers! We're revolutionizing science education, one knocked-over beaker at a time!",
      mood: "absurdly_triumphant",
      ending: true,
      outcome: "cat_science_revolution"
    },

    ramen_chemistry_lessons: {
      id: "ramen_chemistry_lessons",
      text: "I used different types of ramen to learn every chemistry concept! Miso ramen taught me about pH levels, spicy ramen showed me exothermic reactions, and seafood ramen demonstrated protein structures! My 'Ramen Chemistry Guide' became required reading at universities worldwide! I passed my exam with flying colors and now I'm known as the 'Ramen Chemist!' Sometimes the weirdest study methods work best!",
      mood: "proud_innovation",
      ending: true,
      outcome: "innovative_learning_success"
    },

    safety_timmy_path: {
      id: "safety_timmy_path",
      text: "I embraced being 'Safety Timmy!' I started a school safety committee, designed better lab protocols, and even got a scholarship for 'Innovation in Laboratory Safety!' My helmet-wearing, fruit-sticker-covered self became a symbol of how asking questions and being prepared isn't nerdy - it's smart! I aced the chemistry exam and now I'm studying to become a chemical safety engineer!",
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