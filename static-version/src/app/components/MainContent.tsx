// src/components/MainContent.tsx

import OpenedTab from "./OpenedTab";
import Tabs from "./Tabs";

interface MainContentProps {
    renderingPage: React.ReactNode;
}

const MainContent = ({ renderingPage }: MainContentProps) => {
    return (
        <div className="flex-1 flex flex-col text-white">
            <Tabs/>
            <div className="flex-1 p-5 overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
                {renderingPage}
            </div>
        </div>
    );
};

export default MainContent;
