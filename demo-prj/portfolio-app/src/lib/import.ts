import type { PortfolioData } from '../types/index';
import { parseAndValidate } from './validation';

export interface ImportResult {
    success: boolean;
    data: PortfolioData | null;
    errors: string[];
}

export function importFromJson(jsonString: string): ImportResult {
    const { data, errors } = parseAndValidate(jsonString);
    if (data) {
        return { success: true, data, errors: [] };
    }
    return { success: false, data: null, errors };
}

export function importFromFile(file: File): Promise<ImportResult> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            resolve(importFromJson(content));
        };
        reader.onerror = () => {
            resolve({ success: false, data: null, errors: ['Failed to read file'] });
        };
        reader.readAsText(file);
    });
}
