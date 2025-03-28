import Interaction from "./interaction";

class InteractionManager {
    private static currContactingInteraction: Interaction | null = null;

    public static setContactingInteraction(interaction: Interaction): void {
        InteractionManager.currContactingInteraction = interaction;
    }

    public static removeContactingInteraction(): void {
        InteractionManager.currContactingInteraction = null;
    }

    public static getCurrContactingInteraction(): Interaction | null{
        return InteractionManager.currContactingInteraction;
    }
}

export default InteractionManager;
