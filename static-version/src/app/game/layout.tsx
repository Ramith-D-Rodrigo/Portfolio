import Dock from "../components/Dock";

// app/game/layout.tsx
export default function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* This is where game-specific content will be rendered */}
            {children}
        </>
    );
}
