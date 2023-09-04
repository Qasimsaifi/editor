<script>
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { html, autoCloseTags } from "@codemirror/lang-html";
  import { css } from "@codemirror/lang-css";
  import { goto } from "$app/navigation";
  export let htmlCode = "HTML";
  export let cssCode = "CSS";
  let isHtmlEditor = true;
  let isCssEditor = false;

  function showHtml() {
    isHtmlEditor = true;
    isCssEditor = false;
  }

  function showCss() {
    isHtmlEditor = false;
    isCssEditor = true;
  }

  function onChange() {
    localStorage.setItem("htmlCode", htmlCode);
    localStorage.setItem("cssCode", cssCode);
  }

  function handleRun() {
    goto("preview")
  }
</script>

<div>
  {#if isHtmlEditor}
    <div class="mx-1">
      <div class="mockup-browser border bg-base-300">
        <div class="mockup-browser-toolbar">
          <div class="btn-group">
            <button on:click={showHtml} class="btn btn-sm">HTML</button>
            <button on:click={showCss} class="btn btn-sm">CSS</button>
            <button on:click={handleRun} class="btn btn-sm">RUN</button>
          </div>
        </div>
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
      </div>
    </div>
  {/if}

  {#if isCssEditor}
    <div class="mx-1">
      <div class="mockup-browser border bg-base-300">
        <div class="mockup-browser-toolbar">
          <div class="btn-group">
            <button on:click={showHtml} class="btn btn-sm">HTML</button>
            <button on:click={showCss} class="btn btn-sm">CSS</button>
          </div>
        </div>
        <CodeMirror
          bind:value={cssCode}
          lang={css()}
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
      </div>
    </div>
  {/if}
</div>
