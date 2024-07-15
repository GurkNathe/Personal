import { Stemmer, Tokenizer, DefaultTokenizerConfig } from '../../types.js';
import { Language } from './languages.js';
interface DefaultTokenizer extends Tokenizer {
    language: Language;
    stemmer?: Stemmer;
    tokenizeSkipProperties: Set<string>;
    stemmerSkipProperties: Set<string>;
    stopWords?: string[];
    allowDuplicates: boolean;
    normalizationCache: Map<string, string>;
    normalizeToken(this: DefaultTokenizer, token: string, prop: string | undefined): string;
}
export declare function createTokenizer(config?: DefaultTokenizerConfig): Promise<DefaultTokenizer>;
export {};
