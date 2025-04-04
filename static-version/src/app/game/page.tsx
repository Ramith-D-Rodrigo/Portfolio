import MenuBar from "../components/MenuBar";

const GamePage = () => {
    return (
        <>
            <MenuBar hasMenu={false} />
            <iframe
                src="/index.html"
                className="flex flex-grow"
            />
        </>
    );
}

export default GamePage;
