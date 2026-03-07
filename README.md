Money Heist: The Interactive Story Engine:
Project Overview:

This is my submission for the Dynamic Interactive Story Engine task. I decided to theme the project around Money Heist (La Casa de Papel).

The goal was to build a reusable engine that doesn't just show text, but actually tracks your decisions. Every choice you make impacts the heist's "State"—if you're too aggressive, the police heat rises; if you're too selfish, the team stops trusting you. I also built a built-in Editor mode so you can change the story on the fly without touching the code.

How I Built It:
I decided to go with Vanilla JavaScript, HTML, and CSS. I didn't want to use a heavy framework like React because I wanted to really understand how to manage state and DOM updates manually.

1. Modular Architecture
I split the code into different files to keep things organized:

engine.js: This is the "brain." It handles the game state, calculates whether a player meets requirements for a choice, and applies the consequences of their actions.

ui.js: This handles all the "visuals." It updates the progress bars for Police Heat and Team Trust and renders the text on the screen.

editor.js: A separate module I built that lets the user edit the JSON story data directly in the browser.

main.js: The glue that holds everything together and manages the flow between the Engine and the UI.

2. State Management & Logic
Instead of just hard-coding "If choice A, go to Scene B," I built a dynamic system:

Conditions: Some choices are hidden unless you have a specific skill (like "Combat") or enough money.

Effects: Choices can add or subtract from your stats.

Endings: The game automatically checks for "Failure" conditions (like Police Heat reaching 100%) and triggers the end of the game based on your stats.

3. The Story Editor
One of the requirements was a Story Editor. In my version, you can:

Add new scenes.

Change the text of existing scenes.

Link choices to different scene IDs.

Persistence: It saves your custom story to localStorage, so even if you refresh the page, your edits stay there.

Challenges I Faced
The "Double-Click" Issue: I learned the hard way that because I'm using type="module" in my scripts, you can't just open the index.html file in a browser. It has to be run on a server because of security rules.

JSON Logic: Mapping choices to scene IDs was a bit of a brain-teaser. I had to make sure that if a choice pointed to a scene that didn't exist, the engine wouldn't just crash.

UI Updates: Making the progress bars move smoothly and updating the stats in real-time took a few tries to get the math right.

How to Run the App:
Since this project uses ES Modules, it needs to be served from a local server.

Download the project files.

Open with a Server:

If you have VS Code, use the Live Server extension.

Or, if you have Node.js, run npx serve in the folder.

Play: Follow the prompts from the Professor.

Edit: Click the "Open Editor" button at the top, You can add your own scenes, or change the prompts of the professor and even chnage the options and the endings.
