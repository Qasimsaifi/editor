<script>
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { oneDark } from "@codemirror/theme-one-dark";
  import Terminal from "./Terminal.svelte";
  import { writable } from 'svelte/store';
  import Icon from "@iconify/svelte";
  let nodeCode;
  let executionResult = ""; // To store execution output
  let isExecuting = writable(false); // Track execution state

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

  async function executeCode() {
    isExecuting.set(true); // Set execution state to true
    executionResult = ""; // Reset execution result
    try {
      // Capture console.log output and display it in the terminal
      console.log = function (message) {
        executionResult += message + "\n"; // Append log message to execution result
      };

      await eval(nodeCode); // Execute the code
    } catch (error) {
      executionResult = "Error executing code: " + error;
    } finally {
      isExecuting.set(false); // Reset execution state
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
          class="btn btn-sm btn-neutral"
          disabled={$isExecuting}
        >
          {#if $isExecuting}
          <span class="loading loading-spinner text-success"></span>
          {:else}
          <Icon
          icon="solar:play-bold"
          color="green"
          style="font-size: 18px;"
        />
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
