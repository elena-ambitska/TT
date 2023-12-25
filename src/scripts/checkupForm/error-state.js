import {VALIDATE_RULES} from './validate-rules';

export const ERROR_STATE = Object.fromEntries(Object.keys(VALIDATE_RULES).map((key) => [key, false]));