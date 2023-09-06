Sure, here's a sample README.md for your Svelte CodeMirror Editor component:

```markdown
# Svelte CodeMirror Editor

This is a Svelte component that provides a CodeMirror-based code editor for HTML, CSS, and JavaScript. It allows you to switch between the different code languages and supports real-time updates and full-screen mode.

## Installation
```

To use this component in your Svelte project, you can follow these steps:

1. Install the required dependencies:
   ```bash
   npm install svelte-codemirror-editor @codemirror/lang-javascript @codemirror/theme-one-dark @codemirror/lang-html @codemirror/lang-css
   ```

2. Import the necessary modules and components in your Svelte file:

   ```javascript
   import CodeMirror from "svelte-codemirror-editor";
   import { javascript, snippets } from "@codemirror/lang-javascript";
   import { oneDark } from "@codemirror/theme-one-dark";
   import { html, autoCloseTags } from "@codemirror/lang-html";
   import { css } from "@codemirror/lang-css";
   import { goto } from "$app/navigation";
   import { fullscreenStore } from "../store/fullscreenStore";
   import Icon from "@iconify/svelte";
   ```

3. Use the `CodeMirror` component in your Svelte file, passing in the required props:
   ```javascript
   <CodeMirror
     bind:value={htmlCode}
     lang={html()}
     theme={oneDark}
     styles={{
       "&": {
         width: "100%", // Full width
         height: "92vh",
         fontSize: "17px",
       },
     }}
     on:change={onChange}
   />
   ```

4. Customize the code as needed for your project.

## Usage

- Use the buttons in the editor's toolbar to switch between HTML, CSS, and JavaScript code.
- Click the "Preview" button to open a preview of your code in a new tab.
- Toggle full-screen mode using the full-screen button.

## Local Storage

The component automatically stores your HTML, CSS, and JavaScript code in local storage, so you can continue your work where you left off.

## License

This project is licensed under the MIT License. Feel free to use and modify it for your needs.

## Author

This component was created by Kasim saifi. If you have any questions or suggestions, feel free to reach out.
`