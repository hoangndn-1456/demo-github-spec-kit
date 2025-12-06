import { useRef } from 'react';
import type { PortfolioData } from '../types/index';
import { exportPortfolio } from '../lib/export';
import { importFromFile } from '../lib/import';

interface HeaderProps {
    portfolio: PortfolioData;
    onClear: () => void;
    onImport: (data: PortfolioData) => void;
}

export function Header({ portfolio, onClear, onImport }: HeaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExport = async () => {
        await exportPortfolio(portfolio);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const result = await importFromFile(file);
        if (result.success && result.data) {
            onImport(result.data);
        } else {
            alert(`Import failed: ${result.errors.join(', ')}`);
        }
        // Reset input
        e.target.value = '';
    };

    return (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 shadow-lg">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
            />
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Portfolio Generator</h1>
                    <p className="text-blue-100 text-sm">Create your professional portfolio</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleImportClick}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm font-medium transition-colors"
                    >
                        Import JSON
                    </button>
                    <button
                        onClick={onClear}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm font-medium transition-colors"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-md text-sm font-medium transition-colors"
                    >
                        Export ZIP
                    </button>
                </div>
            </div>
        </header>
    );
}
