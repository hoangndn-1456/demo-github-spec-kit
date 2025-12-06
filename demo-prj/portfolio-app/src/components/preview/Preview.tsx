import type { PortfolioData } from '../../types/index';

interface PreviewProps {
    portfolio: PortfolioData;
}

export function Preview({ portfolio }: PreviewProps) {
    const { basics, work, projects, skills } = portfolio;

    return (
        <div className="h-full overflow-y-auto bg-white">
            <div className="max-w-3xl mx-auto p-8">
                {/* Hero Section */}
                <header className="text-center pb-6 border-b border-gray-200 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {basics.name || 'Your Name'}
                    </h1>
                    <p className="text-xl text-blue-600 mb-3">
                        {basics.label || 'Your Title'}
                    </p>
                    <div className="flex justify-center gap-4 text-gray-500 text-sm">
                        {basics.email && <a href={`mailto:${basics.email}`} className="hover:text-blue-600">{basics.email}</a>}
                        {basics.url && <a href={basics.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">{basics.url}</a>}
                        {basics.location && <span>{basics.location}</span>}
                    </div>
                </header>

                {/* About Section */}
                {basics.summary && (
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-1 mb-3">About</h2>
                        <p className="text-gray-700 leading-relaxed">{basics.summary}</p>
                    </section>
                )}

                {/* Experience Section */}
                {work && work.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-1 mb-3">Experience</h2>
                        {work.map((item, index) => (
                            <div key={index} className="mb-4 pb-4 border-b border-gray-100 last:border-0">
                                <h3 className="font-medium text-gray-900">{item.position} at {item.name}</h3>
                                <p className="text-sm text-gray-500">{item.startDate} - {item.endDate || 'Present'}</p>
                                {item.summary && <p className="text-gray-700 mt-1">{item.summary}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {/* Projects Section */}
                {projects && projects.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-1 mb-3">Projects</h2>
                        {projects.map((item, index) => (
                            <div key={index} className="mb-4 pb-4 border-b border-gray-100 last:border-0">
                                <h3 className="font-medium text-gray-900">{item.name}</h3>
                                {item.description && <p className="text-gray-700 mt-1">{item.description}</p>}
                                {item.url && (
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                                        View Project →
                                    </a>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills Section */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-1 mb-3">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-400 text-sm">
                    Generated with Portfolio Generator
                </footer>
            </div>
        </div>
    );
}
