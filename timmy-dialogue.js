// Little Timmy's Dialogue Tree System
// A branching narrative where Timmy seeks guidance about his exam crisis

const timmyDialogueTree = {
  character: {
    name: "Little Timmy",
    age: 16, // Why do I need this? to get myself in the mood dear reader
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
      text: "YES! Hydrogen-1-proton-helium-2-protons... I stayed awake for 72 hours straight trying to memorize everything. Energy drinks, caffeine pills, anything to keep going. I collapsed during the exam from exhaustion and malnutrition. When I woke up in the hospital, I'd developed a severe anxiety disorder and an addiction to stimulants. The doctor said my heart nearly stopped. I failed chemistry and spent the next year in and out of rehab.",
      mood: "stimulant_addiction_collapse",
      ending: true,
      outcome: "substance_abuse_hospitalization"
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

    math_help: {
      id: "math_help",
      text: "We worked on time management math together! 24 hours = 8 sleep + 3 meals + 1 personal time + 1 exercise + 5 study + 6 other activities! I learned scheduling is just applied math! Now I'm organized AND good at chemistry!",
      mood: "mathematical_enlightenment",
      ending: true,
      outcome: "time_management_mastery"
    },

    realistic_goals: {
      id: "realistic_goals",
      text: "4 hours of focused studying worked perfectly! I used the Pomodoro technique, took breaks, and actually retained information! Quality over quantity! I got an A- and learned that sustainable habits beat cramming!",
      mood: "balanced_success",
      ending: true,
      outcome: "sustainable_study_success"
    },

    emotional_schedule: {
      id: "emotional_schedule",
      text: "The crying hour became my emotional release time! I scheduled it daily, processed my stress healthily, then focused better on studying! My therapist says I'm a pioneer in 'structured emotional processing!' Mental health first!",
      mood: "emotional_intelligence_triumph",
      ending: true,
      outcome: "emotional_wellness_innovation"
    },

    time_management_consultant: {
      id: "time_management_consultant",
      text: "I hired a professional time manager! She taught me efficiency, priority matrices, and work-life balance! I became so good at time management, I started my own consulting business for overwhelmed students! Productivity guru at 16!",
      mood: "efficiency_entrepreneur",
      ending: true,
      outcome: "time_management_business_success"
    },

    ignore_professor: {
      id: "ignore_professor",
      text: "I focused purely on learning chemistry concepts and ignored Professor Meltdown's quirks! Knowledge became my shield! I understood the material so well that his teaching style didn't matter! I aced the exam through pure preparation!",
      mood: "focused_determination",
      ending: true,
      outcome: "knowledge_over_fear_triumph"
    },

    fear_motivation: {
      id: "fear_motivation",
      text: "Fear of Professor Meltdown's wrath motivated me to study harder than ever before! I knew every concept inside and out! Ironically, my terror-driven preparation impressed him so much he offered me a research position!",
      mood: "fear_transformed_to_opportunity",
      ending: true,
      outcome: "anxiety_driven_excellence"
    },

    escape_plan: {
      id: "escape_plan",
      text: "I researched transferring schools but realized Professor Meltdown was actually brilliant and caring! The 'escape plan' research taught me about different educational approaches! I stayed, thrived, and now help other students see past intimidating exteriors!",
      mood: "perspective_shift_wisdom",
      ending: true,
      outcome: "judge_not_by_appearances_success"
    },

    topic_by_topic: {
      id: "topic_by_topic",
      text: "I tackled one topic per day! Day 1: Atoms, Day 2: Molecules, Day 3: Bonds, etc. Breaking it down made everything manageable! I built chemistry knowledge like building blocks! Steady progress beats overwhelming panic!",
      mood: "systematic_success",
      ending: true,
      outcome: "methodical_learning_victory"
    },

    misconception_fix: {
      id: "misconception_fix",
      text: "You corrected my vegetable misconception! Organic chemistry is about carbon compounds, not vegetables! This one correction opened my understanding! Sometimes one small clarification can illuminate everything! I became the class's misconception-buster!",
      mood: "clarity_breakthrough",
      ending: true,
      outcome: "misconception_correction_mastery"
    },

    formula_memorization: {
      id: "formula_memorization",
      text: "I memorized hundreds of formulas without understanding them! During the exam, I mixed everything up spectacularly! But Professor Meltdown appreciated my effort and taught me that understanding beats memorization! Failure led to better learning!",
      mood: "failure_wisdom_transformation",
      ending: true,
      outcome: "learning_from_failure_success"
    },

    give_up_academics: {
      id: "give_up_academics",
      text: "I gave up on academics completely and it destroyed my life. Without education, I couldn't find decent work. Started hanging around with dropouts who introduced me to meth. Within a year, I was stealing from my own family to feed my addiction. I lost 40 pounds, my teeth fell out, and I developed severe paranoia. Last my parents heard, I was living in an abandoned building downtown, selling my body to buy drugs. They don't even look for me anymore.",
      mood: "academic_failure_meth_addiction",
      ending: true,
      outcome: "education_abandonment_destruction"
    },

    charm_disaster: {
      id: "charm_disaster",
      text: "My finger guns and chemistry pun dance was... memorable! Professor Meltdown laughed so hard he cried! He said it was the most enthusiasm he'd seen in 20 years! My disaster became legendary! Sometimes being memorably bad is better than being forgettably average!",
      mood: "legendary_disaster_success",
      ending: true,
      outcome: "memorable_enthusiasm_triumph"
    },

    subtle_charm: {
      id: "subtle_charm",
      text: "I toned down to respectful enthusiasm and genuine interest! Asked thoughtful questions, participated actively, and showed Professor Meltdown I truly cared about chemistry! Subtle charm and authentic passion won the day! Sincerity beats performance!",
      mood: "authentic_connection_success",
      ending: true,
      outcome: "genuine_enthusiasm_victory"
    },

    plan_revision: {
      id: "plan_revision", 
      text: "Right! New plan: Day 1-3: Learn concepts with breaks. Day 4: Practice problems. Day 5: Review with friends. Day 6: Light review and relaxation. Day 7: Confident exam! Much better! Balanced approach worked perfectly!",
      mood: "mature_planning_success",
      ending: true,
      outcome: "balanced_study_plan_success"
    },

    panic_endorsement: {
      id: "panic_endorsement",
      text: "You're right! Days 4-6 were peak panic efficiency! I channeled anxiety into laser focus! Panic became my superpower! I aced the exam through strategic stress management! Sometimes controlled chaos is the answer!",
      mood: "productive_panic_mastery",
      ending: true,
      outcome: "anxiety_as_motivation_success"
    },

    practice_problems: {
      id: "practice_problems",
      text: "I added practice problems to every day! Repetition made everything click! By day 3, I was solving complex equations in my sleep! Practice truly makes perfect! I scored in the top 5% of the class!",
      mood: "practice_perfection",
      ending: true,
      outcome: "repetition_mastery_success"
    },

    youtube_education: {
      id: "youtube_education",
      text: "YouTube University saved me! Khan Academy, CrashCourse, and Professor Dave explained everything clearly! I learned more from videos than textbooks! Modern education is amazing! I became a digital learning advocate!",
      mood: "digital_native_triumph",
      ending: true,
      outcome: "online_learning_revolution"
    },

    memorization_reality: {
      id: "memorization_reality",
      text: "You're absolutely right! I focused on understanding patterns and relationships instead of brute memorization! Chemistry made sense as a logical system! Understanding beats memorizing every time! I became the class concept explainer!",
      mood: "understanding_over_memorization",
      ending: true,
      outcome: "conceptual_learning_mastery"
    },

    flashcard_system: {
      id: "flashcard_system",
      text: "Flashcards with spaced repetition worked like magic! Anki app helped me review efficiently! I memorized key concepts without overwhelm! Technology made learning systematic and fun! Now I teach other students this method!",
      mood: "systematic_learning_success",
      ending: true,
      outcome: "spaced_repetition_expertise"
    },

    brain_upgrade: {
      id: "brain_upgrade",
      text: "I became obsessed with 'upgrading' my brain through any means necessary. Started with nootropics, then moved to unprescribed Adderall I bought from classmates. When that wasn't enough, I found harder stimulants online. The 'enhanced' studying sessions became 3-day meth binges where I'd scribble equations on my walls with my own blood. My parents found me convulsing on my bedroom floor, surrounded by pages of nonsensical formulas. I nearly died from the overdose. Brain damage left me with permanent memory problems.",
      mood: "drug_psychosis_overdose",
      ending: true,
      outcome: "stimulant_psychosis_brain_damage"
    },

    sarah_tutoring: {
      id: "sarah_tutoring",
      text: "Sarah taught me chemistry through pure formulas! At first it was overwhelming, but then I realized I was learning the language of science! Her systematic approach gave me a solid foundation! Formula fluency led to chemical literacy!",
      mood: "systematic_excellence",
      ending: true,
      outcome: "formula_based_learning_success"
    },

    bob_tutoring: {
      id: "bob_tutoring",
      text: "Bob's food analogies made everything clear! 'Ionic bonds are like salt and pepper - opposites that stick together!' 'Covalent bonds share electrons like sharing pizza!' I learned through my stomach and my brain! Delicious education!",
      mood: "culinary_chemistry_success",
      ending: true,
      outcome: "food_analogy_learning_mastery"
    },

    tutoring_committee: {
      id: "tutoring_committee",
      text: "All three tutors created the perfect learning system! Sarah's formulas, Bob's analogies, and Mr. Whiskers' chaos theory! I got systematic knowledge, memorable connections, and unpredictable insights! Dream team education!",
      mood: "collaborative_tutoring_triumph",
      ending: true,
      outcome: "multi_method_learning_success"
    },

    reality_check_detailed: {
      id: "reality_check_detailed",
      text: "You helped me see perspective! One exam doesn't define my life! I calmed down, studied what I could, talked to the teacher about extra credit, and passed! Sometimes you need someone to remind you that life goes on!",
      mood: "perspective_restored",
      ending: true,
      outcome: "life_perspective_wisdom"
    },

    circus_planning: {
      id: "circus_planning",
      text: "I actually tried to run away and join the circus. Three months later, my parents found me living behind a dumpster near the train yards, strung out on whatever drugs the other runaways were sharing. I'd been surviving by begging and doing... things I'm not proud of. My teeth were rotting, I weighed 90 pounds, and I had track marks on my arms. The circus dream became a nightmare of addiction and homelessness. I spent two years in juvenile detention and rehab after they arrested me.",
      mood: "homeless_drug_addiction",
      ending: true,
      outcome: "runaway_addiction_arrest"
    },

    fake_death_planning: {
      id: "fake_death_planning",
      text: "I researched faking my death so thoroughly that I became obsessed with the real thing. The depression from failing chemistry spiraled into something darker. I started cutting myself to 'practice' being dead. My parents found me in the garage with a noose I'd been 'testing.' After my suicide attempt, I spent six months in a psychiatric ward where the other patients scared me more than any chemistry exam ever could. Some of them never made it out.",
      mood: "suicidal_psychiatric_ward",
      ending: true,
      outcome: "suicide_attempt_hospitalization"
    },

    musician_exploration: {
      id: "musician_exploration",
      text: "I learned that music theory is mathematical and physics-based! Sound waves, frequency ratios, and acoustic chemistry fascinated me! I became a sound engineer who understands the science behind music! Science and art united!",
      mood: "artistic_science_fusion",
      ending: true,
      outcome: "audio_science_engineering_success"
    },

    gaming_career: {
      id: "gaming_career",
      text: "I became obsessed with gaming to escape my chemistry failure. Started playing 16 hours a day, stopped showering, eating real food, or leaving my room. My parents cut off the internet, so I stole their credit cards to pay for gaming cafes. When the money ran out, I robbed a convenience store with a kitchen knife to get cash for more gaming time. Got arrested, spent two years in juvenile detention. When I got out, I was so disconnected from reality I couldn't function in society.",
      mood: "gaming_addiction_crime",
      ending: true,
      outcome: "gaming_obsession_criminal_record"
    },

    back_to_reality_detailed: {
      id: "back_to_reality_detailed",
      text: "You reminded me that escaping won't solve anything! I faced the chemistry exam head-on, asked for help when needed, and discovered I was more capable than I thought! Sometimes you have to go through the challenge, not around it!",
      mood: "facing_challenges_courage",
      ending: true,
      outcome: "confronting_fears_success"
    },

    mystical_career: {
      id: "mystical_career",
      text: "I became a professional Magic 8 Ball consultant! But I used chemistry knowledge to create better fortune-telling solutions! Color-changing chemistry, pH indicators, and molecular gastronomy! Science-based mysticism is surprisingly popular!",
      mood: "scientific_mysticism_entrepreneur",
      ending: true,
      outcome: "science_mysticism_business_success"
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

    advanced_concepts: {
      id: "advanced_concepts",
      text: "I dove into quantum chemistry and molecular orbital theory! It's like Professor Meltdown opened a door to a secret universe! I'm tutoring other students now and considering a chemistry major! Who knew atoms could be so fascinating?",
      mood: "intellectual_excitement",
      ending: true,
      outcome: "academic_excellence_success"
    },

    banana_story: {
      id: "banana_story", 
      text: "Professor Meltdown explained the banana incident! He was demonstrating how potassium-40 naturally decays - bananas are slightly radioactive! He threw it because 'kinetic energy demonstrates particle behavior!' Now I understand his teaching style perfectly!",
      mood: "enlightened_comedy",
      ending: true,
      outcome: "understanding_teacher_success"
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

    safety_demonstrations: {
      id: "safety_demonstrations",
      text: "Professor Meltdown now does 'Safety Theater' in every class! We wear costumes for different experiments! I'm the 'Acid-Base Detective' and my friend Jenny is 'Captain Catalyst!' Learning chemistry through safety roleplay is surprisingly effective and hilarious!",
      mood: "educational_theater_success",
      ending: true,
      outcome: "creative_learning_success"
    },

    safety_officer: {
      id: "safety_officer",
      text: "I became the official Chemistry Safety Officer! I inspect all lab equipment, teach safety protocols, and even got a special badge! The school hired me as a part-time safety consultant! My paranoia became my superpower!",
      mood: "responsible_pride",
      ending: true,
      outcome: "safety_leadership_success"
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

    pun_acceptance: {
      id: "pun_acceptance",
      text: "You're right! All science puns are noble gases - they're inert but stable! I started a science comedy club called 'Laughing Gas!' We perform at schools making science fun! Even Professor Meltdown does guest spots now!",
      mood: "comedic_triumph",
      ending: true,
      outcome: "science_comedy_success"
    },

    chemistry_puns_only: {
      id: "chemistry_puns_only",
      text: "I mastered chemistry puns! 'You're sodium fine!' 'We have great chemistry!' Professor Meltdown laughed so hard at my exam puns, he gave me bonus points! Humor made chemistry memorable and I aced everything!",
      mood: "pun_master_success",
      ending: true,
      outcome: "humor_learning_success"
    },

    comedy_career: {
      id: "comedy_career",
      text: "My 'Chemistry Comedy Hour' went viral! I perform at universities worldwide, making science accessible through humor! Neil deGrasse Tyson invited me on his show! I'm the 'Comedy Chemist' with my own Netflix special coming!",
      mood: "comedy_stardom",
      ending: true,
      outcome: "comedy_career_success"
    },

    pun_testing: {
      id: "pun_testing",
      text: "I tested my puns on Professor Meltdown! He groaned so hard he nearly had another 'meltdown!' But then he admitted they helped him remember concepts too! Now we collaborate on educational chemistry comedy skits!",
      mood: "collaborative_comedy",
      ending: true,
      outcome: "teacher_student_comedy_partnership"
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

    science_choreography: {
      id: "science_choreography",
      text: "I created the 'Molecular Dance!' Hydrogen atoms do the simple step, carbon atoms do complex footwork, and noble gases just stand there! My dance-learning method spread worldwide! I'm teaching chemistry through choreography!",
      mood: "dance_education_revolution",
      ending: true,
      outcome: "kinesthetic_learning_success"
    },

    classroom_performance: {
      id: "classroom_performance",
      text: "I performed my element song for the class! Everyone joined in! Now we sing chemistry concepts during every lesson! Professor Meltdown recorded us for educational videos! Our class became the 'Singing Chemists!'",
      mood: "musical_classroom_success",
      ending: true,
      outcome: "collaborative_music_learning"
    },

    song_advanced_topics: {
      id: "song_advanced_topics",
      text: "I wrote songs for quantum mechanics and thermodynamics! '♪ Entropy's always rising, energy's conserved! ♪' My 'Advanced Chemistry Rock Opera' is being performed at MIT! Complex concepts become simple through music!",
      mood: "musical_genius_recognition",
      ending: true,
      outcome: "advanced_musical_chemistry"
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

    cat_science_journal: {
      id: "cat_science_journal",
      text: "My 'Feline Chemistry Lab Notes' went viral! Scientists worldwide now study 'chaos-based learning theory!' Mr. Whiskers has his own research grant! We're revolutionizing education through controlled randomness!",
      mood: "scientific_breakthrough",
      ending: true,
      outcome: "chaos_theory_education_success"
    },

    pet_chemistry_school: {
      id: "pet_chemistry_school",
      text: "I opened 'Paws & Polymers Academy!' Dogs learn about pH with their saliva, cats demonstrate surface tension, and hamsters run wheels to generate electricity! Pet-assisted learning is the future of education!",
      mood: "entrepreneurial_innovation",
      ending: true,
      outcome: "pet_education_empire"
    },

    hybrid_tutoring: {
      id: "hybrid_tutoring",
      text: "I combined Mr. Whiskers' chaos method with Sarah's systematic approach! Controlled chaos plus structure equals perfect learning! My hybrid method is now taught in education schools! Best of both worlds!",
      mood: "balanced_innovation",
      ending: true,
      outcome: "hybrid_learning_methodology"
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

    ramen_philosopher_career: {
      id: "ramen_philosopher_career",
      text: "I did end up living off ramen - but not by choice. After failing chemistry, my parents disowned me. I dropped out of school, couldn't find work, and ended up homeless. For three years, I lived in a cardboard box under a bridge, surviving on discarded ramen packets from convenience store dumpsters. The 'philosophical' part was just me talking to myself to stave off the crushing loneliness and depression. Mental illness consumed me while I slowly starved.",
      mood: "homeless_starvation_despair",
      ending: true,
      outcome: "homeless_ramen_existence"
    },

    ramen_poetry: {
      id: "ramen_poetry",
      text: "My chemistry haikus are published! 'Sodium chloride / Dissolved in boiling water / Taste buds dance with joy' My book 'Molecular Gastronomy Poetry' won the Nobel Prize for Literature! Food science meets art!",
      mood: "poetic_scientific_acclaim",
      ending: true,
      outcome: "scientific_poetry_mastery"
    },

    higher_aspirations: {
      id: "higher_aspirations",
      text: "You're right! I used ramen as a stepping stone to understand food chemistry, then biochemistry, then won a scholarship to culinary school and chemistry double-major! Now I'm developing space food for NASA!",
      mood: "progressive_ambition_success",
      ending: true,
      outcome: "space_food_scientist"
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
      text: "I presented my cat research to the science fair judges. They thought I was having a mental breakdown - talking about a 'genius cat tutor' and 'feline chemistry insights.' My parents found me three weeks later in my room, unwashed, surrounded by empty cat food cans, still taking notes on Mr. Whiskers' non-existent experiments. I was committed to Riverside Mental Health Facility for 'acute psychotic episode with animal-related delusions.'",
      mood: "tragic_mental_breakdown",
      ending: true,
      outcome: "mental_asylum_cat_delusions"
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
      proud_transformation: { color: "#0984e3", fontSize: "1.1em", fontWeight: "bold" },
      intellectual_excitement: { color: "#6c5ce7", fontSize: "1.1em", fontWeight: "bold" },
      enlightened_comedy: { color: "#fd79a8", fontSize: "1.05em", fontStyle: "italic" },
      educational_theater_success: { color: "#e84393", fontSize: "1.1em" },
      responsible_pride: { color: "#00b894", fontSize: "1.05em", fontWeight: "bold" },
      comedic_triumph: { color: "#ff7675", fontSize: "1.15em" },
      pun_master_success: { color: "#fdcb6e", fontSize: "1.1em" },
      comedy_stardom: { color: "#e17055", fontSize: "1.2em", fontWeight: "bold" },
      collaborative_comedy: { color: "#74b9ff", fontSize: "1.05em" },
      dance_education_revolution: { color: "#fd79a8", fontSize: "1.15em" },
      musical_classroom_success: { color: "#55a3ff", fontSize: "1.1em" },
      musical_genius_recognition: { color: "#a29bfe", fontSize: "1.2em", fontWeight: "bold" },
      scientific_breakthrough: { color: "#00b894", fontSize: "1.15em", fontWeight: "bold" },
      entrepreneurial_innovation: { color: "#e17055", fontSize: "1.1em" },
      balanced_innovation: { color: "#6c5ce7", fontSize: "1.05em" },
      philosophical_entrepreneurship: { color: "#a29bfe", fontSize: "1.1em", fontStyle: "italic" },
      poetic_scientific_acclaim: { color: "#fd79a8", fontSize: "1.2em", fontWeight: "bold" },
      progressive_ambition_success: { color: "#0984e3", fontSize: "1.15em", fontWeight: "bold" },
      relieved_success: { color: "#00b894", fontSize: "1.05em" },
      zen_acceptance: { color: "#6c5ce7", fontSize: "1em", fontStyle: "italic" },
      communication_breakthrough: { color: "#74b9ff", fontSize: "1.1em" },
      accidental_overachiever: { color: "#fdcb6e", fontSize: "1.1em" },
      teaching_revelation: { color: "#55a3ff", fontSize: "1.05em" },
      leadership_development: { color: "#0984e3", fontSize: "1.1em", fontWeight: "bold" },
      whimsical_empire: { color: "#ff9ff3", fontSize: "1.2em" },
      mentorship_fulfillment: { color: "#00b894", fontSize: "1.1em" },
      digital_education_stardom: { color: "#74b9ff", fontSize: "1.15em", fontWeight: "bold" },
      mathematical_enlightenment: { color: "#6c5ce7", fontSize: "1.1em" },
      balanced_success: { color: "#00b894", fontSize: "1.05em" },
      emotional_intelligence_triumph: { color: "#fd79a8", fontSize: "1.1em" },
      efficiency_entrepreneur: { color: "#e17055", fontSize: "1.1em", fontWeight: "bold" },
      focused_determination: { color: "#2d3436", fontSize: "1.1em", fontWeight: "bold" },
      fear_transformed_to_opportunity: { color: "#0984e3", fontSize: "1.1em" },
      perspective_shift_wisdom: { color: "#6c5ce7", fontSize: "1.05em", fontStyle: "italic" },
      systematic_success: { color: "#00b894", fontSize: "1.05em" },
      clarity_breakthrough: { color: "#74b9ff", fontSize: "1.1em" },
      failure_wisdom_transformation: { color: "#e17055", fontSize: "1.1em" },
      alternative_path_discovery: { color: "#a29bfe", fontSize: "1.05em" },
      legendary_disaster_success: { color: "#ff7675", fontSize: "1.15em" },
      authentic_connection_success: { color: "#00b894", fontSize: "1.1em" },
      kinesthetic_revolution: { color: "#fd79a8", fontSize: "1.15em" },
      mature_planning_success: { color: "#0984e3", fontSize: "1.05em" },
      productive_panic_mastery: { color: "#e17055", fontSize: "1.1em" },
      practice_perfection: { color: "#00b894", fontSize: "1.1em" },
      digital_native_triumph: { color: "#74b9ff", fontSize: "1.1em" },
      understanding_over_memorization: { color: "#6c5ce7", fontSize: "1.1em" },
      systematic_learning_success: { color: "#55a3ff", fontSize: "1.05em" },
      biohacking_student_success: { color: "#e17055", fontSize: "1.1em", fontWeight: "bold" },
      systematic_excellence: { color: "#0984e3", fontSize: "1.05em" },
      culinary_chemistry_success: { color: "#fdcb6e", fontSize: "1.1em" },
      collaborative_tutoring_triumph: { color: "#74b9ff", fontSize: "1.15em", fontWeight: "bold" },
      perspective_restored: { color: "#00b894", fontSize: "1.05em" },
      unexpected_career_discovery: { color: "#e17055", fontSize: "1.1em" },
      dark_to_bright_transformation: { color: "#6c5ce7", fontSize: "1.1em" },
      artistic_science_fusion: { color: "#a29bfe", fontSize: "1.1em" },
      gamification_innovation: { color: "#74b9ff", fontSize: "1.1em" },
      facing_challenges_courage: { color: "#0984e3", fontSize: "1.1em", fontWeight: "bold" },
      // mood styles for the new darker themes
      tragic_mental_breakdown: { color: "#2d3436", fontSize: "0.95em", fontStyle: "italic" },
      stimulant_addiction_collapse: { color: "#636e72", fontSize: "0.9em" },
      homeless_drug_addiction: { color: "#2d3436", fontSize: "0.85em", fontWeight: "300" },
      homeless_starvation_despair: { color: "#636e72", fontSize: "0.9em", fontStyle: "italic" },
      suicidal_psychiatric_ward: { color: "#2d3436", fontSize: "0.85em", fontWeight: "300" },
      drug_psychosis_overdose: { color: "#636e72", fontSize: "0.9em" },
      academic_failure_meth_addiction: { color: "#2d3436", fontSize: "0.85em" },
      gaming_addiction_crime: { color: "#636e72", fontSize: "0.9em", fontStyle: "italic" }
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