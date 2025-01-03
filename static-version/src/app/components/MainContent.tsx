// src/components/MainContent.tsx

interface MainContentProps {
    selectedItem: string; // The current selected item from the sidebar
}

const MainContent = ({ selectedItem }: MainContentProps) => {
    const renderContent = () => {
        switch (selectedItem) {
            case 'skills':
                return <div>Skills Content</div>;
            case 'education':
                return <div>Education Content</div>;
            case 'experience':
                return <div>Experience Content</div>;
            case 'projects':
                return <div>Projects Content</div>;
            case 'webapp':
                return <div>WebApp Project Details</div>;
            case 'mobileapp':
                return <div>MobileApp Project Details</div>;
            default:
                return <div>Please select an item from the sidebar</div>;
        }
    };

    return (
        <div className="flex-1 p-6 bg-gray-100">
            <h1 className="text-3xl font-bold">Main Content</h1>
            <div className="mt-4">{renderContent()}</div>
        </div>
    );
};

export default MainContent;
