interface HUDComponent {
    display(): void;
    hide(): void;
    setIsVisible(val: boolean): void;
    getIsVisible(): boolean; 
}

export type {HUDComponent};
