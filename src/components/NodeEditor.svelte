<script>
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { oneDark } from "@codemirror/theme-one-dark";
  import Terminal from "./Terminal.svelte";

  let nodeCode;
  let executionResult = ""; // To store execution output
  let isExecuting = false; // Track execution state

  // Initialize nodeCode with default code or retrieve it from localStorage
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

  // Capture console.log output and display it
  function captureConsoleLog() {
    const log = console.log;
    console.log = function (message) {
      executionResult += message + "\n"; // Append log message to execution result
      log.apply(console, arguments); // Call the original console.log
    };
  }

  function executeCode() {
    isExecuting = true; // Set execution state to true
    executionResult = ""; // Reset execution result
    try {
      captureConsoleLog(); // Capture console.log output
      eval(nodeCode); // Execute the code

      // Note: Console logs will be captured and displayed in the executionResult variable
    } catch (error) {
      executionResult = "Error executing code: " + error.message;
    } finally {
      isExecuting = false; // Reset execution state
    }
  }

  function onChange() {
    localStorage.setItem("nodeCode", nodeCode);
  }
</script>

<style>
  /* Add your custom CSS styles here */
</style>

<div class="flex flex-col lg:flex-row h-screen">
  <!-- Left Column (Code Editor) -->
  <div class="w-full lg:w-3/4 lg:pl-2">
    <div class="mockup-browser border bg-base-300">
      <div class="mockup-browser-toolbar">
        <!-- "Run Code" button -->
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
