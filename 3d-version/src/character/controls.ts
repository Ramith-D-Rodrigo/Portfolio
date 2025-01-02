const setupKeyControls = (keysPressed: Map<string, boolean>) => {
    document.addEventListener('keydown', (event) => {
        keysPressed.set(event.key.toLowerCase(), true);
    }, false);  
    
    document.addEventListener('keyup', (event) => {
        keysPressed.set(event.key.toLowerCase(), false);
    }, false);
};

const DIRECTIONS = ['w', 'a', 's', 'd'];

export {setupKeyControls, DIRECTIONS};
