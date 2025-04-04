// src/components/MainContent.tsx
import Tabs from "./Tabs";

interface MainContentProps {
    renderingPage: React.ReactNode;
}

const MainContent = ({ renderingPage }: MainContentProps) => {
    return (
        <div className="bg-gray-800 flex-1 flex flex-col text-white overflow-visible">
            <Tabs/>
            <div id="pageDisplayer" className="flex-1 p-5 overflow-auto scrollbar scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {renderingPage}
            </div>
        </div>
    );
};

export default MainContent;
