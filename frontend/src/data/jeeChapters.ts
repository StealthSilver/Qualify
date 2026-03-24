export interface Chapter {
  id: string;
  name: string;
  totalQuestions: number;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  chapters: Chapter[];
}

const baseJeeSubjects: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    color: 'bg-blue-500',
    chapters: [
      { id: 'mechanics', name: 'Mechanics', totalQuestions: 100 },
      { id: 'thermodynamics', name: 'Thermodynamics', totalQuestions: 100 },
      { id: 'waves', name: 'Waves and Sound', totalQuestions: 100 },
      { id: 'optics', name: 'Optics', totalQuestions: 100 },
      { id: 'electrostatics', name: 'Electrostatics', totalQuestions: 100 },
      { id: 'current-electricity', name: 'Current Electricity', totalQuestions: 100 },
      { id: 'magnetism', name: 'Magnetism', totalQuestions: 100 },
      { id: 'em-induction', name: 'Electromagnetic Induction', totalQuestions: 100 },
      { id: 'modern-physics', name: 'Modern Physics', totalQuestions: 100 },
      { id: 'semiconductor', name: 'Semiconductor Electronics', totalQuestions: 100 },
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    color: 'bg-purple-500',
    chapters: [
      { id: 'physical-chemistry', name: 'Physical Chemistry - Basics', totalQuestions: 100 },
      { id: 'atomic-structure', name: 'Atomic Structure', totalQuestions: 100 },
      { id: 'chemical-bonding', name: 'Chemical Bonding', totalQuestions: 100 },
      { id: 'thermodynamics', name: 'Thermodynamics', totalQuestions: 100 },
      { id: 'equilibrium', name: 'Chemical Equilibrium', totalQuestions: 100 },
      { id: 'organic-chemistry', name: 'Organic Chemistry Basics', totalQuestions: 100 },
      { id: 'hydrocarbons', name: 'Hydrocarbons', totalQuestions: 100 },
      { id: 'coordination', name: 'Coordination Compounds', totalQuestions: 100 },
      { id: 'electrochemistry', name: 'Electrochemistry', totalQuestions: 100 },
      { id: 'p-block', name: 'p-Block Elements', totalQuestions: 100 },
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    color: 'bg-emerald-500',
    chapters: [
      { id: 'algebra', name: 'Algebra', totalQuestions: 100 },
      { id: 'trigonometry', name: 'Trigonometry', totalQuestions: 100 },
      { id: 'calculus', name: 'Calculus', totalQuestions: 100 },
      { id: 'coordinate-geometry', name: 'Coordinate Geometry', totalQuestions: 100 },
      { id: 'vectors', name: 'Vectors and 3D Geometry', totalQuestions: 100 },
      { id: 'probability', name: 'Probability', totalQuestions: 100 },
      { id: 'matrices', name: 'Matrices and Determinants', totalQuestions: 100 },
      { id: 'complex-numbers', name: 'Complex Numbers', totalQuestions: 100 },
      { id: 'statistics', name: 'Statistics', totalQuestions: 100 },
      { id: 'differential-equations', name: 'Differential Equations', totalQuestions: 100 },
    ]
  }
];

export function getCompletedQuestionsCount(subjectId: string, chapterId: string): number {
  const storageKey = `progress_${subjectId}_${chapterId}`;
  const stored = localStorage.getItem(storageKey);
  return stored ? Object.keys(JSON.parse(stored)).length : 0;
}

export const jeeSubjects: Subject[] = baseJeeSubjects;

export function getSubjectById(subjectId: string): Subject | undefined {
  return jeeSubjects.find(s => s.id === subjectId);
}

export function getChapterById(subjectId: string, chapterId: string): Chapter | undefined {
  const subject = getSubjectById(subjectId);
  return subject?.chapters.find(c => c.id === chapterId);
}

export function getChapterWithProgress(subjectId: string, chapterId: string) {
  const chapter = getChapterById(subjectId, chapterId);
  if (!chapter) return null;
  
  return {
    ...chapter,
    completedQuestions: getCompletedQuestionsCount(subjectId, chapterId),
  };
}
