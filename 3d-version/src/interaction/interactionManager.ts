import InteractableArea from "./interactableArea";
import Interaction from "./interaction";

class InteractionManager {
    private static currContactingArea: InteractableArea | null = null;

    public static setContactingInteractableArea(area: InteractableArea): void {
        InteractionManager.currContactingArea = area;
    }

    public static removeContactingInteractableArea(): void {
        InteractionManager.currContactingArea = null;
    }

    public static getCurrContactingInteractableArea(): InteractableArea | null{
        return InteractionManager.currContactingArea;
    }
}

export default InteractionManager;
