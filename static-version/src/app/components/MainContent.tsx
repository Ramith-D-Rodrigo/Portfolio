// src/components/MainContent.tsx

interface MainContentProps {
    renderingPage: React.ReactNode;
}

const MainContent = ({ renderingPage }: MainContentProps) => {
    return (
        <div className="flex-1 bg-gray-500 flex flex-col">
            <div className="bg-gray-800 text-gray-300 flex items-center">
                <div className="text-sm font-medium px-4 py-1 bg-gray-700">
                    Sample 
                </div>
            </div>
            <div className="flex-1 p-5 overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
                {renderingPage}
            </div>
        </div>
    );
};

export default MainContent;
