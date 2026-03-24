export interface MockTestQuestion {
  id: number;
  subject: 'Physics' | 'Chemistry' | 'Maths';
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface MockTest {
  id: string;
  title: string;
  week: number;
  duration: number; // in minutes
  totalQuestions: number;
  physicsQuestions: number;
  chemistryQuestions: number;
  mathsQuestions: number;
  description: string;
}

export const mockTests: MockTest[] = [
  {
    id: 'mock-test-1',
    title: 'JEE Mock Test - Week 1',
    week: 1,
    duration: 180,
    totalQuestions: 75,
    physicsQuestions: 25,
    chemistryQuestions: 25,
    mathsQuestions: 25,
    description: 'Full syllabus mock test covering all topics from Physics, Chemistry, and Mathematics',
  },
  {
    id: 'mock-test-2',
    title: 'JEE Mock Test - Week 2',
    week: 2,
    duration: 180,
    totalQuestions: 75,
    physicsQuestions: 25,
    chemistryQuestions: 25,
    mathsQuestions: 25,
    description: 'Comprehensive test focusing on problem-solving skills across all three subjects',
  },
  {
    id: 'mock-test-3',
    title: 'JEE Mock Test - Week 3',
    week: 3,
    duration: 180,
    totalQuestions: 75,
    physicsQuestions: 25,
    chemistryQuestions: 25,
    mathsQuestions: 25,
    description: 'Advanced level mock test with challenging problems from entire JEE syllabus',
  },
  {
    id: 'mock-test-4',
    title: 'JEE Mock Test - Week 4',
    week: 4,
    duration: 180,
    totalQuestions: 75,
    physicsQuestions: 25,
    chemistryQuestions: 25,
    mathsQuestions: 25,
    description: 'Full-length test simulating actual JEE Main exam conditions',
  },
];

// Generate mock test questions
export function generateMockTestQuestions(_testId: string): MockTestQuestion[] {
  const questions: MockTestQuestion[] = [];
  
  // Physics Questions (1-25)
  const physicsQuestions: Omit<MockTestQuestion, 'id'>[] = [
    {
      subject: 'Physics',
      question: 'A body is thrown vertically upward with velocity u. The distance traveled by it in the 5th and 6th seconds are equal. The velocity u is equal to (g = 10 m/s²)',
      options: ['45 m/s', '50 m/s', '55 m/s', '60 m/s'],
      correctAnswer: 2,
    },
    {
      subject: 'Physics',
      question: 'A particle moves in a straight line with constant acceleration. If it covers 10m in first 2 seconds and 25m in next 2 seconds, what is its acceleration?',
      options: ['3.75 m/s²', '2.5 m/s²', '5 m/s²', '7.5 m/s²'],
      correctAnswer: 0,
    },
    {
      subject: 'Physics',
      question: 'Two forces of magnitude 3N and 4N act on a body. The resultant force can be:',
      options: ['0N', '1N', '5N', '10N'],
      correctAnswer: 2,
    },
    {
      subject: 'Physics',
      question: 'A body of mass 5 kg is acted upon by a force of 20N. What is the acceleration produced?',
      options: ['2 m/s²', '4 m/s²', '5 m/s²', '10 m/s²'],
      correctAnswer: 1,
    },
    {
      subject: 'Physics',
      question: 'The dimensional formula for impulse is:',
      options: ['[MLT⁻¹]', '[MLT⁻²]', '[ML²T⁻¹]', '[ML²T⁻²]'],
      correctAnswer: 0,
    },
    {
      subject: 'Physics',
      question: 'A ball is dropped from height h. The time taken to cover the first half distance is:',
      options: ['t/√2', 't/2', 't√2', 't/4'],
      correctAnswer: 0,
    },
    {
      subject: 'Physics',
      question: 'The work done by a force F = (2î + 3ĵ) N in displacing an object by s = (3î + 4ĵ) m is:',
      options: ['6 J', '12 J', '18 J', '24 J'],
      correctAnswer: 2,
    },
    {
      subject: 'Physics',
      question: 'A spring of force constant k is cut into two equal parts. The force constant of each part will be:',
      options: ['k', 'k/2', '2k', '4k'],
      correctAnswer: 2,
    },
    {
      subject: 'Physics',
      question: 'The escape velocity from Earth\'s surface is approximately:',
      options: ['7.2 km/s', '9.8 km/s', '11.2 km/s', '15 km/s'],
      correctAnswer: 2,
    },
    {
      subject: 'Physics',
      question: 'Two bodies of masses m₁ and m₂ have equal kinetic energies. The ratio of their momenta is:',
      options: ['m₁:m₂', '√(m₁):√(m₂)', 'm₁²:m₂²', '1:1'],
      correctAnswer: 1,
    },
    {
      subject: 'Physics',
      question: 'A projectile is fired at an angle of 45° with horizontal. The horizontal range is maximum when the angle is:',
      options: ['30°', '45°', '60°', '90°'],
      correctAnswer: 1,
    },
    {
      subject: 'Physics',
      question: 'The coefficient of restitution for a perfectly elastic collision is:',
      options: ['0', '0.5', '1', 'infinity'],
      correctAnswer: 2,
    },
    {
      subject: 'Physics',
      question: 'A uniform rod of length L is suspended from one end. The time period of its oscillation is:',
      options: ['2π√(L/g)', '2π√(2L/3g)', '2π√(L/3g)', '2π√(3L/2g)'],
      correctAnswer: 1,
    },
    {
      subject: 'Physics',
      question: 'The Young\'s modulus of a wire is defined as:',
      options: ['Stress/Strain', 'Strain/Stress', 'Force/Area', 'Length/Extension'],
      correctAnswer: 0,
    },
    {
      subject: 'Physics',
      question: 'In SHM, the acceleration is maximum when:',
      options: ['velocity is maximum', 'displacement is zero', 'displacement is maximum', 'kinetic energy is maximum'],
      correctAnswer: 2,
    },
    {
      subject: 'Physics',
      question: 'The gravitational potential energy at height h from Earth\'s surface is:',
      options: ['mgh', '-GMm/R', '-GMm/(R+h)', 'GMm/(R+h)'],
      correctAnswer: 2,
    },
    {
      subject: 'Physics',
      question: 'A conducting sphere of radius R carries charge Q. The electric field at distance r (r > R) from center is:',
      options: ['kQ/R²', 'kQ/r²', 'kQ/(r-R)²', '0'],
      correctAnswer: 1,
    },
    {
      subject: 'Physics',
      question: 'The capacitance of a parallel plate capacitor increases when:',
      options: ['Area of plates decreases', 'Distance between plates increases', 'Dielectric constant increases', 'Charge on plates increases'],
      correctAnswer: 2,
    },
    {
      subject: 'Physics',
      question: 'The resistance of a wire is R. If it is stretched to double its length, the new resistance will be:',
      options: ['R', '2R', '4R', 'R/2'],
      correctAnswer: 2,
    },
    {
      subject: 'Physics',
      question: 'In a series LCR circuit at resonance, the impedance is:',
      options: ['Maximum', 'Minimum', 'Zero', 'Infinite'],
      correctAnswer: 1,
    },
    {
      subject: 'Physics',
      question: 'The power factor in a purely inductive circuit is:',
      options: ['0', '0.5', '1', 'infinity'],
      correctAnswer: 0,
    },
    {
      subject: 'Physics',
      question: 'According to Bohr\'s theory, the angular momentum of electron in the ground state of hydrogen is:',
      options: ['h/2π', 'h/π', '2h/π', 'h'],
      correctAnswer: 0,
    },
    {
      subject: 'Physics',
      question: 'The de-Broglie wavelength associated with a particle is:',
      options: ['h/p', 'hp', 'h/mv', 'Both (a) and (c)'],
      correctAnswer: 3,
    },
    {
      subject: 'Physics',
      question: 'In photoelectric effect, the stopping potential depends on:',
      options: ['Intensity of light', 'Frequency of light', 'Work function only', 'Both frequency and work function'],
      correctAnswer: 3,
    },
    {
      subject: 'Physics',
      question: 'The half-life of a radioactive substance is 10 days. In how many days will it reduce to 1/8th of its original value?',
      options: ['10 days', '20 days', '30 days', '40 days'],
      correctAnswer: 2,
    },
  ];

  // Chemistry Questions (26-50)
  const chemistryQuestions: Omit<MockTestQuestion, 'id'>[] = [
    {
      subject: 'Chemistry',
      question: 'Which of the following has maximum number of atoms?',
      options: ['18g of H₂O', '18g of O₂', '18g of CO₂', '18g of CH₄'],
      correctAnswer: 3,
    },
    {
      subject: 'Chemistry',
      question: 'The oxidation state of Cr in K₂Cr₂O₇ is:',
      options: ['+3', '+4', '+6', '+7'],
      correctAnswer: 2,
    },
    {
      subject: 'Chemistry',
      question: 'Which of the following is an example of extensive property?',
      options: ['Temperature', 'Pressure', 'Volume', 'Density'],
      correctAnswer: 2,
    },
    {
      subject: 'Chemistry',
      question: 'The number of orbitals in n=3 shell is:',
      options: ['3', '6', '9', '12'],
      correctAnswer: 2,
    },
    {
      subject: 'Chemistry',
      question: 'Which quantum number determines the shape of the orbital?',
      options: ['Principal quantum number (n)', 'Azimuthal quantum number (l)', 'Magnetic quantum number (m)', 'Spin quantum number (s)'],
      correctAnswer: 1,
    },
    {
      subject: 'Chemistry',
      question: 'The electronic configuration of Cu (Z=29) is:',
      options: ['[Ar] 3d⁹ 4s²', '[Ar] 3d¹⁰ 4s¹', '[Ar] 3d⁸ 4s²', '[Ar] 3d¹⁰ 4s²'],
      correctAnswer: 1,
    },
    {
      subject: 'Chemistry',
      question: 'The bond order of O₂⁺ is:',
      options: ['1.5', '2.0', '2.5', '3.0'],
      correctAnswer: 2,
    },
    {
      subject: 'Chemistry',
      question: 'Which of the following is the most ionic compound?',
      options: ['NaCl', 'KCl', 'CsCl', 'LiCl'],
      correctAnswer: 2,
    },
    {
      subject: 'Chemistry',
      question: 'According to VSEPR theory, the shape of CH₄ is:',
      options: ['Linear', 'Trigonal planar', 'Tetrahedral', 'Octahedral'],
      correctAnswer: 2,
    },
    {
      subject: 'Chemistry',
      question: 'What is the hybridization of carbon in CO₂?',
      options: ['sp', 'sp²', 'sp³', 'sp³d'],
      correctAnswer: 0,
    },
    {
      subject: 'Chemistry',
      question: 'The pH of a solution with [H⁺] = 10⁻⁴ M is:',
      options: ['4', '10', '-4', '14'],
      correctAnswer: 0,
    },
    {
      subject: 'Chemistry',
      question: 'Which of the following is a Lewis acid?',
      options: ['NH₃', 'H₂O', 'BF₃', 'OH⁻'],
      correctAnswer: 2,
    },
    {
      subject: 'Chemistry',
      question: 'The rate of reaction increases with temperature because:',
      options: ['Activation energy decreases', 'Collision frequency increases', 'Both (a) and (b)', 'None of the above'],
      correctAnswer: 1,
    },
    {
      subject: 'Chemistry',
      question: 'For the reaction N₂ + 3H₂ → 2NH₃, if the rate of disappearance of H₂ is 0.3 mol/L/s, the rate of formation of NH₃ is:',
      options: ['0.1 mol/L/s', '0.2 mol/L/s', '0.3 mol/L/s', '0.45 mol/L/s'],
      correctAnswer: 1,
    },
    {
      subject: 'Chemistry',
      question: 'The standard electrode potential of Zn²⁺/Zn is -0.76V. This means:',
      options: ['Zn can displace H₂ from acids', 'Zn cannot displace H₂ from acids', 'Zn is a weak reducing agent', 'None of these'],
      correctAnswer: 0,
    },
    {
      subject: 'Chemistry',
      question: 'In electrolysis of aqueous NaCl, the product at cathode is:',
      options: ['Na', 'Cl₂', 'H₂', 'O₂'],
      correctAnswer: 2,
    },
    {
      subject: 'Chemistry',
      question: 'The coordination number of Ni in [Ni(CO)₄] is:',
      options: ['2', '4', '6', '8'],
      correctAnswer: 1,
    },
    {
      subject: 'Chemistry',
      question: 'Which of the following is an example of organometallic compound?',
      options: ['Grignard reagent', 'Ferrocene', 'Zeise\'s salt', 'All of these'],
      correctAnswer: 3,
    },
    {
      subject: 'Chemistry',
      question: 'The IUPAC name of CH₃-CH(CH₃)-CH₂-OH is:',
      options: ['2-methylpropan-1-ol', '2-methylpropan-2-ol', 'Isobutanol', '2-propanol'],
      correctAnswer: 0,
    },
    {
      subject: 'Chemistry',
      question: 'Lucas reagent is used to distinguish between:',
      options: ['Primary, secondary and tertiary alcohols', 'Aldehydes and ketones', 'Alcohols and phenols', 'Ethers and alcohols'],
      correctAnswer: 0,
    },
    {
      subject: 'Chemistry',
      question: 'The nucleophile in the SN2 reaction is:',
      options: ['Electron deficient species', 'Electron rich species', 'Neutral species', 'Free radical'],
      correctAnswer: 1,
    },
    {
      subject: 'Chemistry',
      question: 'Toluene on oxidation with KMnO₄ gives:',
      options: ['Benzaldehyde', 'Benzoic acid', 'Benzyl alcohol', 'Phenol'],
      correctAnswer: 1,
    },
    {
      subject: 'Chemistry',
      question: 'The general formula for alkynes is:',
      options: ['CₙH₂ₙ₊₂', 'CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₋₄'],
      correctAnswer: 2,
    },
    {
      subject: 'Chemistry',
      question: 'Which of the following is most acidic?',
      options: ['Ethanol', 'Phenol', 'Acetic acid', 'Benzoic acid'],
      correctAnswer: 3,
    },
    {
      subject: 'Chemistry',
      question: 'The polymer obtained by condensation of hexamethylenediamine and adipic acid is:',
      options: ['Nylon-6', 'Nylon-6,6', 'Terylene', 'Bakelite'],
      correctAnswer: 1,
    },
  ];

  // Maths Questions (51-75)
  const mathsQuestions: Omit<MockTestQuestion, 'id'>[] = [
    {
      subject: 'Maths',
      question: 'If sin θ + cos θ = √2, then tan θ + cot θ is equal to:',
      options: ['1', '2', '√2', '2√2'],
      correctAnswer: 1,
    },
    {
      subject: 'Maths',
      question: 'The value of sin 15° is:',
      options: ['(√3-1)/(2√2)', '(√3+1)/(2√2)', '(√3-1)/2', '(√3+1)/2'],
      correctAnswer: 0,
    },
    {
      subject: 'Maths',
      question: 'If ⁿPᵣ = 720 and ⁿCᵣ = 120, then r is equal to:',
      options: ['2', '3', '4', '5'],
      correctAnswer: 1,
    },
    {
      subject: 'Maths',
      question: 'The number of ways to arrange the letters of the word "MATHEMATICS" is:',
      options: ['11!/(2!×2!×2!)', '11!/2!', '11!/(2!×2!)', '11!'],
      correctAnswer: 0,
    },
    {
      subject: 'Maths',
      question: 'If (1+x)ⁿ = C₀ + C₁x + C₂x² + ... + Cₙxⁿ, then C₀ + C₁ + C₂ + ... + Cₙ equals:',
      options: ['2ⁿ⁻¹', '2ⁿ', '2ⁿ⁺¹', 'n!'],
      correctAnswer: 1,
    },
    {
      subject: 'Maths',
      question: 'The derivative of sin²x with respect to x is:',
      options: ['2sin x', 'sin 2x', '2cos x', 'cos 2x'],
      correctAnswer: 1,
    },
    {
      subject: 'Maths',
      question: 'If f(x) = x³ - 3x² + 4x + 5, then f\'(1) equals:',
      options: ['1', '2', '3', '4'],
      correctAnswer: 0,
    },
    {
      subject: 'Maths',
      question: 'The slope of the tangent to the curve y = x² at the point (1,1) is:',
      options: ['1', '2', '3', '4'],
      correctAnswer: 1,
    },
    {
      subject: 'Maths',
      question: 'The equation of the line passing through (2,3) and perpendicular to the line 3x + 4y = 5 is:',
      options: ['4x - 3y + 1 = 0', '4x - 3y - 1 = 0', '3x - 4y + 1 = 0', '3x + 4y - 1 = 0'],
      correctAnswer: 1,
    },
    {
      subject: 'Maths',
      question: 'If the sum of first n terms of an A.P. is 3n² + 5n, then its common difference is:',
      options: ['3', '6', '8', '10'],
      correctAnswer: 1,
    },
    {
      subject: 'Maths',
      question: 'The value of determinant |a b c; b c a; c a b| is:',
      options: ['a³ + b³ + c³', 'a³ + b³ + c³ - 3abc', '0', '3abc - a³ - b³ - c³'],
      correctAnswer: 1,
    },
    {
      subject: 'Maths',
      question: 'If A is a 3×3 matrix with |A| = 5, then |3A| equals:',
      options: ['15', '45', '135', '125'],
      correctAnswer: 2,
    },
    {
      subject: 'Maths',
      question: 'The area bounded by y = x² and y = x is:',
      options: ['1/3', '1/6', '1/2', '1/4'],
      correctAnswer: 1,
    },
    {
      subject: 'Maths',
      question: 'The value of ∫(1/(1+x²))dx is:',
      options: ['log(1+x²) + C', 'tan⁻¹x + C', 'tan x + C', '2x/(1+x²) + C'],
      correctAnswer: 1,
    },
    {
      subject: 'Maths',
      question: 'The order and degree of differential equation d²y/dx² + (dy/dx)³ = 0 is:',
      options: ['2, 3', '3, 2', '2, 1', '1, 2'],
      correctAnswer: 2,
    },
    {
      subject: 'Maths',
      question: 'If vectors a and b are perpendicular, then a·b equals:',
      options: ['1', '0', '-1', '|a||b|'],
      correctAnswer: 1,
    },
    {
      subject: 'Maths',
      question: 'The angle between vectors i + j + k and i - j - k is:',
      options: ['90°', '180°', 'cos⁻¹(1/3)', 'cos⁻¹(-1/3)'],
      correctAnswer: 3,
    },
    {
      subject: 'Maths',
      question: 'The distance of the point (1,2,3) from the plane x + y + z = 5 is:',
      options: ['1/√3', '2/√3', '1', '√3'],
      correctAnswer: 0,
    },
    {
      subject: 'Maths',
      question: 'If P(A) = 0.4, P(B) = 0.3, and P(A∩B) = 0.2, then P(A∪B) equals:',
      options: ['0.5', '0.7', '0.9', '0.1'],
      correctAnswer: 0,
    },
    {
      subject: 'Maths',
      question: 'Two dice are thrown. The probability that the sum is 7 is:',
      options: ['1/6', '1/12', '1/36', '5/36'],
      correctAnswer: 0,
    },
    {
      subject: 'Maths',
      question: 'If the mean of a binomial distribution is 20 and variance is 16, then p equals:',
      options: ['0.2', '0.4', '0.6', '0.8'],
      correctAnswer: 0,
    },
    {
      subject: 'Maths',
      question: 'The eccentricity of the hyperbola x²/16 - y²/9 = 1 is:',
      options: ['5/4', '4/5', '5/3', '3/5'],
      correctAnswer: 0,
    },
    {
      subject: 'Maths',
      question: 'The locus of a point which moves such that its distance from (3,0) is twice its distance from (0,0) is:',
      options: ['x² + y² = 12', 'x² + y² - 4x = 0', 'x² + y² + 4x = 0', 'Circle'],
      correctAnswer: 1,
    },
    {
      subject: 'Maths',
      question: 'The value of lim(x→0) (sin x)/x is:',
      options: ['0', '1', 'infinity', 'Does not exist'],
      correctAnswer: 1,
    },
    {
      subject: 'Maths',
      question: 'If f(x) = |x|, then f\'(0) is:',
      options: ['0', '1', '-1', 'Does not exist'],
      correctAnswer: 3,
    },
  ];

  // Combine all questions
  questions.push(...physicsQuestions.map((q, idx) => ({ ...q, id: idx + 1 })));
  questions.push(...chemistryQuestions.map((q, idx) => ({ ...q, id: idx + 26 })));
  questions.push(...mathsQuestions.map((q, idx) => ({ ...q, id: idx + 51 })));

  return questions;
}
