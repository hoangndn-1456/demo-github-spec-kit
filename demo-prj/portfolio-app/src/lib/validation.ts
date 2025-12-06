import Ajv, { type ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import schema from '../data/schema.json';
import type { PortfolioData } from '../types/index';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validate: ValidateFunction = ajv.compile(schema);

export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

export function validatePortfolio(data: unknown): ValidationResult {
    const valid = validate(data);
    if (valid) {
        return { valid: true, errors: [] };
    }
    const errors = validate.errors?.map(
        (err) => `${err.instancePath || 'root'}: ${err.message}`
    ) || [];
    return { valid: false, errors };
}

export function parseAndValidate(jsonString: string): { data: PortfolioData | null; errors: string[] } {
    try {
        const data = JSON.parse(jsonString);
        const result = validatePortfolio(data);
        if (result.valid) {
            return { data: data as PortfolioData, errors: [] };
        }
        return { data: null, errors: result.errors };
    } catch (e) {
        return { data: null, errors: [`Invalid JSON: ${(e as Error).message}`] };
    }
}
