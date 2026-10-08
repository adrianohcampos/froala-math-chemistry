export type LocaleLabels = Partial<{
  title: string;
  mathEditorTitle: string;
  chemEditorTitle: string;
  tabMath: string;
  tabChem: string;
  latexSource: string;
  chemInput: string;
  chemPlaceholder: string;
  preview: string;
  examples: string;
  snippets: string;
  display: string;
  insert: string;
  update: string;
  cancel: string;
  close: string;
  empty: string;
  placeholderLeft: string;
  invalidFormula: string;
  noMathlive: string;
  noKatex: string;
}>;

export interface ChemSnippet { label: string; insert: string }
export interface ChemExample { label: string; value: string }

export interface MathChemModalOptions {
  language?: string;
  theme?: 'light' | 'dark' | 'auto';
  setMathliveLocale?: boolean;
  labels?: LocaleLabels;
  chemSnippets?: ChemSnippet[];
  chemExamples?: ChemExample[];
  katexOptions?: Record<string, unknown>;
  onSave?: (result: { latex: string; displayMode: boolean; editing: boolean }) => void;
  onClose?: (result: { saved: boolean }) => void;
}

export class MathChemModal {
  constructor(options?: MathChemModalOptions);
  open(options?: { latex?: string; displayMode?: boolean; tab?: 'math' | 'chem' }): void;
  close(): void;
  save(): void;
  destroy(): void;
}

export const DEFAULT_LABELS: Required<LocaleLabels>;
export const LOCALES: Record<string, LocaleLabels>;
export const DEFAULT_CHEM_SNIPPETS: ChemSnippet[];
export const DEFAULT_CHEM_EXAMPLES: ChemExample[];

export function registerLocale(code: string, labels: LocaleLabels): void;
export function getLabels(code: string, overrides?: LocaleLabels): Required<LocaleLabels>;
export function resolveLocaleCode(code: string): string;
export function parsePureCe(latex: string): string | null;
export function wrapLatex(latex: string, display?: boolean): string;
export function extractLatex(text: string): { latex: string; display: boolean } | null;
export function buildFormulaHtml(latex: string, display?: boolean): string;
export function serializeFormulas(html: string): string;

export function install<T = unknown>(froalaEditor?: T): T;
export default install;

export interface MathChemistryOptions {
  mathChemistryRender?: boolean;
  mathChemistryKatexOptions?: Record<string, unknown>;
  mathChemistryLanguage?: string | null;
  mathChemistryTheme?: 'light' | 'dark' | 'auto';
  mathChemistryMathliveLocale?: boolean;
  mathChemistryLabels?: LocaleLabels;
  mathChemistryChemSnippets?: ChemSnippet[] | null;
  mathChemistryChemExamples?: ChemExample[] | null;
}
