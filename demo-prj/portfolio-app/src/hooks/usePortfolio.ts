import { useState, useEffect, useCallback } from 'react';
import { defaultPortfolio, type PortfolioData } from '../types/index';

const STORAGE_KEY = 'portfolio_draft';

export function usePortfolio() {
    const [portfolio, setPortfolioState] = useState<PortfolioData>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored) as PortfolioData;
            }
        } catch (e) {
            console.error('Failed to load from localStorage', e);
        }
        return defaultPortfolio;
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
        } catch (e) {
            console.error('Failed to save to localStorage', e);
        }
    }, [portfolio]);

    const setPortfolio = useCallback((data: PortfolioData) => {
        setPortfolioState(data);
    }, []);

    const updateBasics = useCallback((basics: Partial<PortfolioData['basics']>) => {
        setPortfolioState((prev) => ({
            ...prev,
            basics: { ...prev.basics, ...basics },
        }));
    }, []);

    const clearPortfolio = useCallback(() => {
        setPortfolioState(defaultPortfolio);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return {
        portfolio,
        setPortfolio,
        updateBasics,
        clearPortfolio,
    };
}
