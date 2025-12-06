import type { PortfolioData, Basics, WorkExperience, Project } from '../../types/index';
import { BasicsForm } from './BasicsForm';
import { WorkForm } from './WorkForm';
import { ProjectsForm } from './ProjectsForm';

interface EditorProps {
    portfolio: PortfolioData;
    onUpdateBasics: (basics: Partial<Basics>) => void;
    onUpdateWork: (work: WorkExperience[]) => void;
    onUpdateProjects: (projects: Project[]) => void;
}

export function Editor({ portfolio, onUpdateBasics, onUpdateWork, onUpdateProjects }: EditorProps) {
    return (
        <div className="h-full overflow-y-auto p-6 space-y-8 bg-white">
            <BasicsForm basics={portfolio.basics} onChange={onUpdateBasics} />
            <hr className="border-gray-200" />
            <WorkForm work={portfolio.work || []} onChange={onUpdateWork} />
            <hr className="border-gray-200" />
            <ProjectsForm projects={portfolio.projects || []} onChange={onUpdateProjects} />
        </div>
    );
}
