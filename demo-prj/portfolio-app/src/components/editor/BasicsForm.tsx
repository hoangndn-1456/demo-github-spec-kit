import type { Basics } from '../../types/index';

interface BasicsFormProps {
    basics: Basics;
    onChange: (basics: Partial<Basics>) => void;
}

export function BasicsForm({ basics, onChange }: BasicsFormProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                        type="text"
                        value={basics.name}
                        onChange={(e) => onChange({ name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title/Label</label>
                    <input
                        type="text"
                        value={basics.label || ''}
                        onChange={(e) => onChange({ label: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Frontend Developer"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={basics.email || ''}
                        onChange={(e) => onChange({ email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="john@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        type="tel"
                        value={basics.phone || ''}
                        onChange={(e) => onChange({ phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+1 234 567 890"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                        type="url"
                        value={basics.url || ''}
                        onChange={(e) => onChange({ url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://yourwebsite.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                        type="text"
                        value={basics.location || ''}
                        onChange={(e) => onChange({ location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="New York, NY"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                <textarea
                    value={basics.summary || ''}
                    onChange={(e) => onChange({ summary: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="A brief summary about yourself..."
                />
            </div>
        </div>
    );
}
