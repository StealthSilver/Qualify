export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  solution: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

function generateQuestions(subjectId: string, chapterId: string, count: number): Question[] {
  const questions: Question[] = [];
  
  const questionTemplates = {
    physics: {
      mechanics: [
        { q: "A body of mass 10 kg is moving with a velocity of 5 m/s. What is its kinetic energy?", opts: ["125 J", "250 J", "50 J", "500 J"], correct: 0, solution: "Kinetic Energy = (1/2)mv² = (1/2) × 10 × 5² = 125 J" },
        { q: "What is the SI unit of force?", opts: ["Newton", "Joule", "Watt", "Pascal"], correct: 0, solution: "The SI unit of force is Newton (N), named after Isaac Newton." },
      ],
      thermodynamics: [
        { q: "First law of thermodynamics is based on conservation of:", opts: ["Energy", "Mass", "Momentum", "Charge"], correct: 0, solution: "The first law of thermodynamics states that energy cannot be created or destroyed, only transformed." },
      ],
    },
    chemistry: {
      'atomic-structure': [
        { q: "The maximum number of electrons in a shell with principal quantum number n is:", opts: ["n²", "2n²", "2n", "n"], correct: 1, solution: "The maximum number of electrons in a shell is given by 2n², where n is the principal quantum number." },
      ],
      'chemical-bonding': [
        { q: "Which type of bond is formed by the sharing of electrons?", opts: ["Ionic", "Covalent", "Metallic", "Hydrogen"], correct: 1, solution: "Covalent bonds are formed when atoms share electrons to achieve stable electron configurations." },
      ],
    },
    mathematics: {
      calculus: [
        { q: "What is the derivative of sin(x)?", opts: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"], correct: 0, solution: "The derivative of sin(x) with respect to x is cos(x). This is a fundamental result in calculus." },
      ],
      algebra: [
        { q: "If x² - 5x + 6 = 0, what are the roots?", opts: ["2, 3", "1, 6", "-2, -3", "2, -3"], correct: 0, solution: "Factoring: x² - 5x + 6 = (x-2)(x-3) = 0, so x = 2 or x = 3" },
      ],
    },
  };

  const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'easy', 'medium', 'medium', 'hard'];

  for (let i = 1; i <= count; i++) {
    const templates = (questionTemplates as any)[subjectId]?.[chapterId] || [
      { q: `Sample question ${i} for ${chapterId}`, opts: ["Option A", "Option B", "Option C", "Option D"], correct: 0, solution: `This is the solution for question ${i}.` }
    ];
    
    const template = templates[i % templates.length];
    
    questions.push({
      id: i,
      question: i <= templates.length ? template.q : `${template.q} (Question ${i})`,
      options: template.opts,
      correctAnswer: template.correct,
      solution: template.solution,
      difficulty: difficulties[i % difficulties.length],
    });
  }
  
  return questions;
}

export function getQuestionsForChapter(subjectId: string, chapterId: string): Question[] {
  const storageKey = `questions_${subjectId}_${chapterId}`;
  const stored = localStorage.getItem(storageKey);
  
  if (stored) {
    return JSON.parse(stored);
  }
  
  const questions = generateQuestions(subjectId, chapterId, 100);
  localStorage.setItem(storageKey, JSON.stringify(questions));
  return questions;
}

export function saveQuestionProgress(
  subjectId: string, 
  chapterId: string, 
  questionId: number, 
  selectedAnswer: number
) {
  const storageKey = `progress_${subjectId}_${chapterId}`;
  const stored = localStorage.getItem(storageKey);
  const progress = stored ? JSON.parse(stored) : {};
  
  progress[questionId] = {
    selectedAnswer,
    timestamp: new Date().toISOString(),
  };
  
  localStorage.setItem(storageKey, JSON.stringify(progress));
}

export function getQuestionProgress(subjectId: string, chapterId: string): Record<number, { selectedAnswer: number; timestamp: string }> {
  const storageKey = `progress_${subjectId}_${chapterId}`;
  const stored = localStorage.getItem(storageKey);
  return stored ? JSON.parse(stored) : {};
}
