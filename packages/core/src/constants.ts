import { Formula, GrapherTheme, Variable, VisualizerState, FunctionData } from './types.js';

/**
 * Utility function to sort by ID
 */
export const sortById = <T extends { id: number }>(a: T, b: T) => a.id - b.id;

/**
 * Map a formula from a string to a formula
 * @param fs The formula string
 * @param id The ID of the formula
 */
export const mapFormulaStringArray = (fs: string, id: number): Formula => ({
  enabled: true,
  id,
  value: fs,
  visualizer: id === 0 ? ([true, true, true] as VisualizerState) : defaultVisualizer,
});

export const defaultVariables: Variable[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
].map((name, idx) => ({
  name,
  id: idx,
  value: 0.0,
  step: 0.01,
  min: -1,
  max: 1,
}));

export const defaultVisualizer: [boolean, boolean, boolean] = [
  false,
  false,
  false,
];

export const emptyFormula: Formula = {
  value: '',
  enabled: true,
  id: -1,
  visualizer: defaultVisualizer,
};

export const defaultFormulas: Formula[] = ['x*A', '', '', '', '', '']
  .map(mapFormulaStringArray)
  .sort(sortById);

export const exampleFormulas1: Formula[] = [
  '4 + 4 * smoothstep(0, 0.7, sin(x+t)) * A',
  'sqrt(9^2 - x^2) + B',
  '3 * sin(x) / x + C',
  '2 * noise(3*x+t) + f3(x, t) + D',
  '(t + floor(x-t)) / (2-5) + E',
  'sin(f5(x, t)) - 5 + F',
]
  .map(mapFormulaStringArray)
  .sort(sortById);

export const exampleFormulas2: Formula[] = [
  'sqrt(8^2-x^2)',
  '-f1(x,t)',
  '7/2-sqrt(3^2-(abs(x)-3.5)^2)',
  '7/2+sqrt(3^2-(abs(x)-3.5)^2)/2',
  '3+sqrt(1-(abs(x+sin(4*t)/2)-3)^2)*2/3',
  '-3-sqrt(5^2-x^2)*(1/4+pow(0.5+0.5*sin(2*PI*t),6)/10)',
]
  .map(mapFormulaStringArray)
  .sort(sortById);

export const exampleFormulas3: Formula[] = [
  '2+2*sin(floor(x+t)*4321)',
  'max(sqrt(8^2-x^2),f1(x,t))',
  '-1',
  '-2',
  '-5',
  '0',
]
  .map(mapFormulaStringArray)
  .sort(sortById);

export const darkTheme: GrapherTheme = {
  mBackground: '#202020',
  mBackgroundOut: '#000000',
  mText: '#B0B0B0',
  mGrid: '#606060',
  mGridThin: '#404040',
  mGraphs: ['#ffc040', '#ffffa0', '#a0ffc0', '#40c0ff', '#d0a0ff', '#ff80b0'],
};

export const lightTheme: GrapherTheme = {
  mBackground: '#FFFFFF',
  mBackgroundOut: '#808080',
  mText: '#000000',
  mGrid: '#A0A0A0',
  mGridThin: '#D0D0D0',
  mGraphs: ['#ff8000', '#ffe800', '#40ff00', '#1040ff', '#ff10ff', '#ff0000'],
};

export const FUNCS: Record<string, FunctionData>[] = [
  // Common Operations
  {
    '()': {
      text: '()',
      description: 'Parenthesis',
      params: [],
    },
    '+': {
      text: '+',
      description: 'Add',
      params: [],
    },
    '-': {
      text: '-',
      description: 'Subtract',
      params: [],
    },
    '*': {
      text: '*',
      description: 'Multiply',
      params: [],
    },
    '/': {
      text: '/',
      description: 'Divide',
      params: [],
    },
    'rcp(x)': {
      text: 'rcp(',
      description: 'Reciprocal',
      params: [
        {
          name: 'x',
          description: 'The value to get the recriprocal of',
          valueType: 'number',
        },
      ],
    },
    'fma(x,y,z)': {
      text: 'fma(',
      description:
        'Multiply-add Returns x*y+z. The function computes the result without losing precision in any intermediate result.',
      params: [
        {
          name: 'x',
          description: 'The value to multiply',
          valueType: 'number',
        },
        {
          name: 'y',
          description: 'The value to multiply',
          valueType: 'number',
        },
        {
          name: 'z',
          description: 'The value to add.',
          valueType: 'number',
        },
      ],
    },
    '%': {
      text: '%',
      description: 'Modulo',
      params: [],
    },
    'mod(x,y)': {
      text: 'mod(',
      description: 'Modulo',
      params: [
        {
          name: 'x',
          description: 'The value to get the modulo of',
          valueType: 'number',
        },
        {
          name: 'y',
          description: 'The modulo value Example:  x % _y_',
          valueType: 'number',
        },
      ],
    },
  },
  // Additional function categories would continue here...
];

export const kPHI = '(1.61803398874989484820)';

// Security blacklist for formula evaluation
export const kBlackList = [
  '?',
  '=',
  '[',
  ']',
  "'",
  ';',
  'new',
  'ml',
  '$',
  ').',
  'alert',
  'ook',
  'ipt',
  'doc',
  'win',
  'set',
  'get',
  'tim',
  'net',
  'post',
  'black',
  'z',
  'if',
];

export const symbolSubs = [
  ['^', '**'],
  ['²', '**2'],
  ['³', '**3'],
  ['\u2074', '**4'],
  ['\u2075', '**5'],
  ['\u2076', '**6'],
  ['\u2077', '**7'],
  ['\u2078', '**8'],
  ['\u2079', '**9'],
  ['𝜋', 'PI'],
  ['π', 'PI'],
  ['𝛑', 'PI'],
  ['𝝅', 'PI'],
  ['𝞹', 'PI'],
  ['PHI', kPHI],
  ['\u03C6', kPHI],
  ['TAU', '(2*PI)'],
  ['𝜏', '(2*PI)'],
  ['½', '(1/2)'],
  ['⅓', '(1/3)'],
  ['⅔', '(2/3)'],
  ['¼', '(1/4)'],
  ['¾', '(3/4)'],
  ['⅕', '(1/5)'],
  ['⅖', '(2/5)'],
  ['⅗', '(3/5)'],
  ['⅘', '(4/5)'],
  ['⅙', '(1/6)'],
  ['⅚', '(5/6)'],
  ['⅐', '(1/7)'],
  ['⅛', '(1/8)'],
  ['⅜', '(3/8)'],
  ['⅝', '(5/8)'],
  ['⅞', '(7/8)'],
  ['⅑', '(1/9)'],
  ['⅒', '(1/10)'],
] as const;