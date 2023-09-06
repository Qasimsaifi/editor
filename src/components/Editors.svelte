<script>
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { html, autoCloseTags } from "@codemirror/lang-html";
  import { css } from "@codemirror/lang-css";
  import { goto } from "$app/navigation";
  import { fullscreenStore } from "../store/fullscreenStore";
  import Icon from "@iconify/svelte";
  export let htmlCode = "HTML";
  export let cssCode = "CSS";
  export let jsCode = "JS";
  let isHtmlEditor = true;
  let isCssEditor = false;
  let isJsEditor = false;
  let isFullScreen;

  // Subscribe to the fullscreen store to get the real-time value
  fullscreenStore.subscribe((value) => {
    isFullScreen = value;
  });

  // Function to toggle fullscreen using the store
  function toggleFullScreen() {
    fullscreenStore.update((value) => !value);
  }

  function showHtml() {
    isJsEditor = false;
    isHtmlEditor = true;
    isCssEditor = false;
  }

  function showCss() {
    isHtmlEditor = false;
    isJsEditor = false;
    isCssEditor = true;
  }
  function showJs() {
    isHtmlEditor = false;
    isCssEditor = false;
    isJsEditor = true;
  }

  function onChange() {
    localStorage.setItem("htmlCode", htmlCode);
    localStorage.setItem("cssCode", cssCode);
    localStorage.setItem("jsCode", jsCode);
  }
</script>

<div>
  <div class={isFullScreen ? "fullscreen" : ""}>
    {#if isHtmlEditor}
      <div class="mx-1">
        <div class="mockup-browser border bg-base-300">
          <div class="mockup-browser-toolbar">
            <div class="btn-group">
              <button on:click={showHtml} class="btn btn-sm"
                ><Icon
                  icon="vscode-icons:file-type-html"
                  style="font-size: 18px;"
                /></button
              >
              <button on:click={showCss} class="btn btn-sm">
                <Icon
                  icon="vscode-icons:file-type-css"
                  style="font-size: 18px;"
                /></button
              >
              <button on:click={showJs} class="btn btn-sm">
                <Icon
                  icon="vscode-icons:file-type-js"
                  style="font-size: 18px;"
                /></button
              >
              <button class="btn btn-sm"
                ><a href="/preview" target="_blank"
                  ><Icon
                    icon="solar:play-bold"
                    color="green"
                    style="font-size: 18px;"
                  /></a
                ></button
              >
              <button on:click={toggleFullScreen} class="btn btn-sm">
                {#if isFullScreen}
                  <Icon
                    icon="gridicons:fullscreen-exit"
                    style="font-size: 18px;"
                  />
                {:else}
                  <Icon icon="map:fullscreen" style="font-size: 16px;" />
                {/if}
              </button>
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
              <button on:click={showHtml} class="btn btn-sm"
                ><Icon
                  icon="vscode-icons:file-type-html"
                  style="font-size: 18px;"
                /></button
              >
              <button on:click={showCss} class="btn btn-sm">
                <Icon
                  icon="vscode-icons:file-type-css"
                  style="font-size: 18px;"
                /></button
              >
              <button on:click={showJs} class="btn btn-sm">
                <Icon
                  icon="vscode-icons:file-type-js"
                  style="font-size: 18px;"
                /></button
              >
              <button class="btn btn-sm"
                ><a href="/preview" target="_blank"
                  ><Icon
                    icon="solar:play-bold"
                    color="green"
                    style="font-size: 18px;"
                  /></a
                ></button
              >
              <button on:click={toggleFullScreen} class="btn btn-sm">
                {#if isFullScreen}
                  <Icon
                    icon="gridicons:fullscreen-exit"
                    style="font-size: 18px;"
                  />
                {:else}
                  <Icon icon="map:fullscreen" style="font-size: 16px;" />
                {/if}
              </button>
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

    {#if isJsEditor}
      <div class="mx-1">
        <div class="mockup-browser border bg-base-300">
          <div class="mockup-browser-toolbar">
            <div class="btn-group">
              <button on:click={showHtml} class="btn btn-sm"
                ><Icon
                  icon="vscode-icons:file-type-html"
                  style="font-size: 18px;"
                /></button
              >

              <button on:click={showCss} class="btn btn-sm">
                <Icon
                  icon="vscode-icons:file-type-css"
                  style="font-size: 18px;"
                /></button
              >
              <button on:click={showJs} class="btn btn-sm">
                <Icon
                  icon="vscode-icons:file-type-js"
                  style="font-size: 18px;"
                /></button
              >
              <button class="btn btn-sm"
                ><a href="/preview" target="_blank"
                  ><Icon
                    icon="solar:play-bold"
                    color="green"
                    style="font-size: 18px;"
                  /></a
                ></button
              >
              <button on:click={toggleFullScreen} class="btn btn-sm">
                {#if isFullScreen}
                  <Icon
                    icon="gridicons:fullscreen-exit"
                    style="font-size: 18px;"
                  />
                {:else}
                  <Icon icon="map:fullscreen" style="font-size: 16px;" />
                {/if}
              </button>
            </div>
          </div>
          <CodeMirror
            bind:value={jsCode}
            lang={javascript()}
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
</div>
