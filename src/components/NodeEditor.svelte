<script>
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { oneDark } from "@codemirror/theme-one-dark";
  import Terminal from "./Terminal.svelte";
  let nodeCode;
  if (typeof localStorage !== "undefined") {
    nodeCode =
      localStorage.getItem("nodeCode") ||
      `function createStarPattern(rows) {
  for (let i = 1; i <= rows; i++) {
    let pattern = '';
    for (let j = 1; j <= rows - i; j++) {
      pattern += ' ';
    }
    for (let k = 1; k <= i * 2 - 1; k++) {
      pattern += '*';
    }

    console.log(pattern);
  }
}

const numberOfRows = 5;
createStarPattern(numberOfRows);
`;
  }
  let executionResult = "";
  let isExecuting = false; // Track execution state

  async function executeCode() {
    isExecuting = true; // Set execution state to true
    try {
      const response = await fetch("https://node-executer.vercel.app/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: nodeCode }),
      });

      if (response.ok) {
        const data = await response.json();
        executionResult = data.output;
      } else {
        executionResult = "Error executing code.";
      }
    } catch (error) {
      executionResult = "An error occurred.";
    } finally {
      isExecuting = false; // Reset execution state
    }
  }
  function onChange() {
    localStorage.setItem("nodeCode", nodeCode);
  }
</script>

<div class="flex flex-col lg:flex-row h-screen">
  <!-- Left Column (Code Editor) -->
  <div class="w-full lg:w-3/4 lg:pl-2">
    <div class="mockup-browser border bg-base-300">
      <div class="mockup-browser-toolbar">
        <!-- Add the "Run Code" button here with conditional text -->
        <button
          on:click={executeCode}
          class="btn btn-success btn-sm"
          disabled={isExecuting}
        >
          {#if isExecuting}
            <span class="loading loading-spinner loading-sm" />
          {:else}
            Run
          {/if}
        </button>
      </div>

      <div class="mockup-browser-content">
        <CodeMirror
          bind:value={nodeCode}
          lang={javascript()}
          theme={oneDark}
          styles={{
            "&": {
              width: "100%",
              height: "calc(98vh - 45px)" /* Subtract the button height */,
              fontSize: "17px",
            },
          }}
          on:change={onChange}
        />
      </div>
    </div>
  </div>

  <!-- Right Column (Terminal) -->
  <div class="w-full lg:w-1/4 lg:mx-2">
    <Terminal output={executionResult} />
  </div>
</div>
