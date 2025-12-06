import type { WorkExperience } from '../../types/index';

interface WorkFormProps {
    work: WorkExperience[];
    onChange: (work: WorkExperience[]) => void;
}

export function WorkForm({ work, onChange }: WorkFormProps) {
    const addWork = () => {
        onChange([...work, { name: '', position: '', startDate: '', endDate: '', summary: '' }]);
    };

    const updateWork = (index: number, field: keyof WorkExperience, value: string) => {
        const updated = [...work];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeWork = (index: number) => {
        onChange(work.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
                <button
                    onClick={addWork}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                    + Add Experience
                </button>
            </div>

            {work.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Experience #{index + 1}</span>
                        <button
                            onClick={() => removeWork(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                        >
                            Remove
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <input
                                type="text"
                                value={item.name}
                                onChange={(e) => updateWork(index, 'name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Company Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                            <input
                                type="text"
                                value={item.position}
                                onChange={(e) => updateWork(index, 'position', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Job Title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                                type="text"
                                value={item.startDate}
                                onChange={(e) => updateWork(index, 'startDate', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="2020-01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                                type="text"
                                value={item.endDate || ''}
                                onChange={(e) => updateWork(index, 'endDate', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="2023-06 or Present"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                        <textarea
                            value={item.summary || ''}
                            onChange={(e) => updateWork(index, 'summary', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your role and achievements..."
                        />
                    </div>
                </div>
            ))}

            {work.length === 0 && (
                <p className="text-gray-500 text-center py-4">No work experience added yet.</p>
            )}
        </div>
    );
}
