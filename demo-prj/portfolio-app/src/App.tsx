import './index.css';
import { usePortfolio } from './hooks/usePortfolio';
import { Header } from './components/Header';
import { Editor } from './components/editor/Editor';
import { Preview } from './components/preview/Preview';
import type { WorkExperience, Project, PortfolioData } from './types/index';

function App() {
  const { portfolio, updateBasics, setPortfolio, clearPortfolio } = usePortfolio();

  const handleUpdateWork = (work: WorkExperience[]) => {
    setPortfolio({ ...portfolio, work });
  };

  const handleUpdateProjects = (projects: Project[]) => {
    setPortfolio({ ...portfolio, projects });
  };

  const handleImport = (data: PortfolioData) => {
    setPortfolio(data);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header portfolio={portfolio} onClear={clearPortfolio} onImport={handleImport} />
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div className="w-1/2 border-r border-gray-300 overflow-hidden">
          <Editor
            portfolio={portfolio}
            onUpdateBasics={updateBasics}
            onUpdateWork={handleUpdateWork}
            onUpdateProjects={handleUpdateProjects}
          />
        </div>
        {/* Preview Panel */}
        <div className="w-1/2 bg-gray-50 overflow-hidden">
          <Preview portfolio={portfolio} />
        </div>
      </div>
    </div>
  );
}

export default App;
