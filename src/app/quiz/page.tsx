'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RefreshCw, Award, Coffee, Heart } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "Your ideal dinner starts with...",
    options: [
      { text: "A massive appetizer platter to share... or not share.", score: "joey" },
      { text: "A perfectly plated dish with clean, handcrafted flavors.", score: "monica" },
      { text: "A witty joke to break the ice with the waiter.", score: "chandler" },
      { text: "Analyzing the menu aesthetic and restaurant decor.", score: "rachel" },
      { text: "Asking if the chef can prepare a organic vegan special.", score: "phoebe" },
      { text: "Explaining the molecular history of the ingredients.", score: "ross" }
    ]
  },
  {
    id: 2,
    question: "Where do you prefer to sit in the café?",
    options: [
      { text: "Right next to the bakery display cabinet.", score: "joey" },
      { text: "At the cleanest table with perfectly aligned chairs.", score: "monica" },
      { text: "On a comfy armchair, making sarcastic observations.", score: "chandler" },
      { text: "In the central spot, showing off your outfit.", score: "rachel" },
      { text: "In a cozy corner with an acoustic guitar nearby.", score: "phoebe" },
      { text: "Near a window, reading a science journal.", score: "ross" }
    ]
  },
  {
    id: 3,
    question: "Your go-to comfort meal is...",
    options: [
      { text: "A loaded double cheeseburger and pepperoni pizza.", score: "joey" },
      { text: "Homemade pasta cooked to absolute al-dente perfection.", score: "monica" },
      { text: "A strong craft cold brew coffee.", score: "chandler" },
      { text: "A decadent slice of New York cheesecake.", score: "rachel" },
      { text: "Fresh organic greens with clean tahini glaze.", score: "phoebe" },
      { text: "A thick chocolate milkshake with extra cookies.", score: "ross" }
    ]
  },
  {
    id: 4,
    question: "If a friend tries to take a fry from your plate...",
    options: [
      { text: "Guard your plate fiercely. You do NOT share food!", score: "joey" },
      { text: "Gently explain that they should have ordered their own.", score: "monica" },
      { text: "Make a self-deprecating joke about your appetite.", score: "chandler" },
      { text: "Let them have it, but keep an eye on their dessert.", score: "rachel" },
      { text: "Happily share! Good energy is meant to be shared.", score: "phoebe" },
      { text: "Lecture them on the evolutionary origins of table manners.", score: "ross" }
    ]
  },
  {
    id: 5,
    question: "Your perfect weekend activity is...",
    options: [
      { text: "Watching games on a recliner and ordering takeout.", score: "joey" },
      { text: "Hosting a meticulously organized dinner party.", score: "monica" },
      { text: "Binging sitcoms and typing witty posts online.", score: "chandler" },
      { text: "Exploring fashion boutiques in the city.", score: "rachel" },
      { text: "Singing quirky folksy tunes at an open mic night.", score: "phoebe" },
      { text: "Visiting a museum or a history lecture.", score: "ross" }
    ]
  }
];

const CHARACTER_RESULTS: Record<string, { name: string; title: string; desc: string; recommend: string; image: string }> = {
  joey: {
    name: "Joey Tribbiani",
    title: "The Ultimate Food Enthusiast",
    desc: "You appreciate generous portions, rich flavors, and comfort food above all else. You believe rules are optional but mealtime is sacred. Your friendly nature makes you the heart of any dinner table.",
    recommend: "Joey's Double Cheeseburger + Loaded NYC Fries",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  monica: {
    name: "Monica Geller",
    title: "The Culinary Perfectionist",
    desc: "You have exceptionally high standards for cleanliness, organization, and culinary execution. You appreciate elegant plating, structured recipes, and hosting perfect dinner events.",
    recommend: "Monica's Alfredo Pasta + Grilled Chicken Steak",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
  },
  chandler: {
    name: "Chandler Bing",
    title: "The Craft Coffee Connoisseur",
    desc: "You rely on high-quality caffeine, cozy armchairs, and quick-witted conversations. You prefer bold brews that match your analytical, humorous approach to life.",
    recommend: "Chandler's Cold Brew + Gunther's Cappuccino",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  rachel: {
    name: "Rachel Green",
    title: "The Chic Dessert Connoisseur",
    desc: "You appreciate fine aesthetics, elegant dining setups, and sweet, luxurious finishes. You believe a dinner is incomplete without a trendy, photo-worthy dessert slice.",
    recommend: "Rachel's NYC Cheesecake + Belgian Waffles",
    image: "https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&w=600&q=80"
  },
  phoebe: {
    name: "Phoebe Buffay",
    title: "The Eccentric Vegan Soul",
    desc: "You prioritize organic ingredients, unique spice blends, and friendly, sustainable dining. You appreciate eccentric cafe atmospheres, live acoustics, and warm, creative recipes.",
    recommend: "Phoebe's Vegan Bowl + Phoebe's Caramel Latte",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  ross: {
    name: "Ross Geller",
    title: "The Analytical Beverage Critic",
    desc: "You love deep details, historical facts, and balanced flavor complexities. You approach food with a scientific curiosity, appreciating textured shakes and clean, single-origin espressos.",
    recommend: "Ross's Dino Chocolate Shake + Ross Americano",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
  }
};

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    joey: 0, monica: 0, chandler: 0, rachel: 0, phoebe: 0, ross: 0
  });
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (scoreType: string) => {
    // Add to score
    const updatedScores = { ...scores, [scoreType]: scores[scoreType] + 1 };
    setScores(updatedScores);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate winner
      let winner = "joey";
      let maxScore = -1;
      
      Object.entries(updatedScores).forEach(([char, score]) => {
        if (score > maxScore) {
          maxScore = score;
          winner = char;
        }
      });
      
      setResult(winner);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({ joey: 0, monica: 0, chandler: 0, rachel: 0, phoebe: 0, ross: 0 });
    setResult(null);
  };

  return (
    <div className="brick-wall-bg min-h-screen py-16 px-6 relative z-10 flex items-center justify-center">
      <div className="max-w-xl w-full flex flex-col gap-8">
        
        {/* Title */}
        <div className="text-center flex flex-col gap-2">
          <span className="text-[10px] font-bold text-central-orange uppercase tracking-widest flex items-center gap-1.5 justify-center">
            <Sparkles className="w-3.5 h-3.5" />
            Sitcom Personality Quiz
          </span>
          <h1 className="font-serif text-3xl font-bold text-cream-white">
            Which Friend Are You?
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {result === null ? (
            <motion.div
              key="quiz-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-6 md:p-8 rounded-2xl border border-cream-white/5 flex flex-col gap-6"
            >
              {/* Progress Bar */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs text-cream-white/50">
                  <span>Question {QUESTIONS[currentStep].id} of {QUESTIONS.length}</span>
                  <span>{Math.round((QUESTIONS[currentStep].id / QUESTIONS.length) * 100)}% Complete</span>
                </div>
                <div className="w-full h-1.5 bg-coffee-brown/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-central-orange transition-all duration-300"
                    style={{ width: `${(QUESTIONS[currentStep].id / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <h2 className="font-serif text-lg md:text-xl font-bold text-cream-white leading-snug">
                {QUESTIONS[currentStep].question}
              </h2>

              {/* Options list */}
              <div className="flex flex-col gap-3">
                {QUESTIONS[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.score)}
                    className="w-full text-left px-5 py-4 rounded-xl bg-coffee-brown/10 hover:bg-coffee-brown/30 border border-cream-white/5 hover:border-central-orange/30 text-xs md:text-sm text-cream-white/80 hover:text-cream-white transition-all font-sans leading-relaxed"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-6 md:p-8 rounded-2xl border border-cream-white/5 flex flex-col gap-6 text-center"
            >
              <div className="relative h-48 w-full rounded-xl overflow-hidden border border-cream-white/10">
                <img
                  src={CHARACTER_RESULTS[result].image}
                  alt={CHARACTER_RESULTS[result].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black via-charcoal-black/20 to-transparent" />
                <span className="absolute bottom-4 left-4 right-4 text-xs font-semibold text-central-orange uppercase tracking-wider block">
                  Your sitcom dining match
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="font-serif text-2xl font-bold text-cream-white leading-tight">
                  You are {CHARACTER_RESULTS[result].name}!
                </h2>
                <span className="text-xs text-monica-purple uppercase tracking-widest font-semibold font-sans">
                  {CHARACTER_RESULTS[result].title}
                </span>
                <p className="text-xs md:text-sm text-cream-white/70 leading-relaxed font-sans mt-2 px-2">
                  {CHARACTER_RESULTS[result].desc}
                </p>
              </div>

              {/* Menu Recommendation Box */}
              <div className="p-4 rounded-xl bg-coffee-brown/15 border border-cream-white/5 text-left flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-luxury-gold uppercase tracking-wider flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5" />
                  Specials recommendation
                </span>
                <span className="text-xs md:text-sm font-semibold text-cream-white block">
                  {CHARACTER_RESULTS[result].recommend}
                </span>
                <p className="text-[10px] text-cream-white/40">Try this the next time you order, or add it to your order now!</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={resetQuiz}
                  className="flex-1 py-3.5 rounded-xl bg-coffee-brown/40 border border-cream-white/10 hover:border-cream-white/30 text-xs font-bold text-cream-white flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retake Quiz
                </button>
                <Link
                  href="/menu"
                  className="flex-1 py-3.5 rounded-xl bg-central-orange text-charcoal-black text-xs font-bold shadow-lg shadow-central-orange/10 flex items-center justify-center gap-1 group"
                >
                  Order Your Meal
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
