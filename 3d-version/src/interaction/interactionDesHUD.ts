import { HUDComponent } from "../other/hudComponent";

class InteractionDescHUD implements HUDComponent{
    private hudContainer: HTMLElement;
    private isVisible: boolean = false;

    private static instance: InteractionDescHUD;

    private constructor(){
        this.hudContainer = document.createElement("div");
        this.hudContainer.className = 'hud-container';
        document.body.appendChild(this.hudContainer);
    }

    public static getInstance(): InteractionDescHUD {
        if(!InteractionDescHUD.instance){
            InteractionDescHUD.instance = new InteractionDescHUD();
        }
        return InteractionDescHUD.instance;
    }

    display(): void {
        if(this.isVisible){
            this.hudContainer.style.opacity = '100';
        }
    }
    hide(): void {
            this.hudContainer.style.opacity = '0';
    }
    setIsVisible(val: boolean): void {
        this.isVisible = val;
    }
    getIsVisible(): boolean {
        return this.isVisible;
    }

    public setContainerStyle(topRem: number, leftRem: number, alignItems: string): void {
        this.hudContainer.style.top = `${topRem}rem`;
        this.hudContainer.style.left = `${leftRem}rem`;
        this.hudContainer.style.alignItems = alignItems;
    }

    public resetContainerStyle(): void{
        this.hudContainer.style = "";
    }

    public setDisplayText(txt: string, dur: number): void{
        const message = document.createElement("div");
        message.className = "interaction-seq-text";
        message.innerHTML = txt;

        message.style.animationDuration = `${dur}s`;

        // Append to HUD container
        this.hudContainer.appendChild(message);
        message.classList.add("visible");

        setTimeout(() => {
            message.remove();
        }, dur * 1000);
    }

    public clearDisplayText(): void{
        this.hudContainer.innerHTML = "";
    }
}

export default InteractionDescHUD;
