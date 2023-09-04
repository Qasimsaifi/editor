<script>
  import Editors from "../components/Editors.svelte";
  import Preview from "../components/Preview.svelte";
 
  export let htmlCode = "";
  export let cssCode = "";
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
  }
  function updateCode(newHtmlCode, newCssCode) {
    htmlCode = newHtmlCode;
    cssCode = newCssCode;
  }
</script>
<div class="flex h-screen">
  <div class="w-1/2">
    <Editors bind:htmlCode bind:cssCode {updateCode} />
  </div>
  <div class="w-1/2">
    <Preview {htmlCode} {cssCode} />
  </div>
</div>
