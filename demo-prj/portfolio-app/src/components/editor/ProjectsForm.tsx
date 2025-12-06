import type { Project } from '../../types/index';

interface ProjectsFormProps {
    projects: Project[];
    onChange: (projects: Project[]) => void;
}

export function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
    const addProject = () => {
        onChange([...projects, { name: '', description: '', url: '' }]);
    };

    const updateProject = (index: number, field: keyof Project, value: string) => {
        const updated = [...projects];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeProject = (index: number) => {
        onChange(projects.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
                <button
                    onClick={addProject}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                    + Add Project
                </button>
            </div>

            {projects.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Project #{index + 1}</span>
                        <button
                            onClick={() => removeProject(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                        >
                            Remove
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                            <input
                                type="text"
                                value={item.name}
                                onChange={(e) => updateProject(index, 'name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Project Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                            <input
                                type="url"
                                value={item.url || ''}
                                onChange={(e) => updateProject(index, 'url', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={item.description || ''}
                            onChange={(e) => updateProject(index, 'description', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your project..."
                        />
                    </div>
                </div>
            ))}

            {projects.length === 0 && (
                <p className="text-gray-500 text-center py-4">No projects added yet.</p>
            )}
        </div>
    );
}
