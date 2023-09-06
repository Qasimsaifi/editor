<script>
  import Editors from "../components/Editors.svelte";
  import Preview from "../components/Preview.svelte";
  import { fullscreenStore } from "../store/fullscreenStore";
  export let htmlCode = "";
  export let cssCode = "";
  export let jsCode = "";
  let isFullScreen;
  fullscreenStore.subscribe((value) => {
    isFullScreen = value; // Log the value whenever it changes
  });

  if (typeof localStorage !== "undefined") {
    htmlCode =
      localStorage.getItem("htmlCode") ||
      `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional Message</title>
</head>
<body>
    <div class="message">
        <h1>Welcome to Our Platform</h1>
        <p>Delivering excellence through simplicity and innovation.</p>
    </div>
</body>
</html>
`;

    cssCode =
      localStorage.getItem("cssCode") ||
      `
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.message {
    text-align: center;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.message h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 10px;
}

.message p {
    font-size: 1.2rem;
    color: #555;
}
`;

    jsCode = localStorage.getItem("jsCode") || "console.log('hello world')";
  }
  function updateCode(newHtmlCode, newCssCode, newJsCode) {
    htmlCode = newHtmlCode;
    cssCode = newCssCode;
    jsCode = newJsCode;
  }
</script>

{#if isFullScreen}
  <Editors bind:htmlCode bind:cssCode bind:jsCode {updateCode} />
{:else}
  <div class="flex flex-col lg:flex-row h-screen">
    <div class="w-full lg:w-1/2">
      <Editors bind:htmlCode bind:cssCode bind:jsCode {updateCode} />
    </div>
    <div class="w-full lg:w-1/2">
      <Preview {htmlCode} {cssCode} {jsCode}/>
    </div>
  </div>
{/if}
