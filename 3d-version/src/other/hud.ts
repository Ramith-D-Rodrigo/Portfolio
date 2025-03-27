import { HUDComponent } from "./hudComponent";

class HUD {
    private hudComponents: HUDComponent[] = [];

    public addComponent(comp: HUDComponent): void {
        this.hudComponents.push(comp);
    }

    public display(): void{
        this.hudComponents.forEach(comp => {
            if(comp.getIsVisible()){
                comp.display();
            }
            else{
                comp.hide();
            }
        });
    }
};

export default HUD;
