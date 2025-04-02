import { HUDComponent } from "./hudComponent";

class SettingsPanel implements HUDComponent {
    private static instance: SettingsPanel;
    private settingsPanelDiv: HTMLElement;

    private closeSettingsBtn: HTMLElement;
    private openSettingsBtn: HTMLElement;

    private isVisible: boolean = false;

    public static getInstance(): SettingsPanel {
        if(!SettingsPanel.instance){
            SettingsPanel.instance = new SettingsPanel();
        }
        return SettingsPanel.instance;
    }

    private constructor() {
        if (SettingsPanel.instance) {
            return SettingsPanel.instance; // Return the existing instance if it already exists
        }
        
        this.settingsPanelDiv = document.createElement('div');
        this.settingsPanelDiv.classList.add('settings-panel');
        this.settingsPanelDiv.innerHTML = `
            <button class="close-btn" id="closeSettingsBtn">X</button>
            <h2>Settings</h2>
            <div class="setting-item">
                <label for="volumeControl">Volume</label>
                <input type="range" id="volumeControl" min="0" max="100" value="50">
            </div>
            <div class="setting-item">
                <label for="brightnessControl">Brightness</label>
                <input type="range" id="brightnessControl" min="0" max="100" value="75">
            </div>
        `;
        
        document.body.appendChild(this.settingsPanelDiv);

        // Bind events
        this.closeSettingsBtn = document.getElementById('closeSettingsBtn') as HTMLElement;
        this.closeSettingsBtn.addEventListener('click', this.hide.bind(this));
        this.openSettingsBtn = document.getElementById('openSettingsBtn') as HTMLElement;
        this.openSettingsBtn.addEventListener('click', this.display.bind(this));

        SettingsPanel.instance = this; // Save the instance
    }

    display(): void {
        this.isVisible = true;
        this.settingsPanelDiv.classList.add('open');
    }
    hide(): void {
        this.isVisible = false;
        this.settingsPanelDiv.classList.remove('open');
    }

    setIsVisible(val: boolean): void {
        this.isVisible = val;
    }
    getIsVisible(): boolean {
        return this.isVisible;
    }
}

export default SettingsPanel;
