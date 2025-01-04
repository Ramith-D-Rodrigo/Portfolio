// src/components/MainContent.tsx

interface MainContentProps {
    renderingPage: React.ReactNode;
}

const MainContent = ({renderingPage} : MainContentProps) => {
    return (
        <div className="flex-1 p-6 bg-gray-500 h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
            {renderingPage}
        </div>
    );
};

export default MainContent;
