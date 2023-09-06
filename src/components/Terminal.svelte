<script>
  export let output;
</script>


<div class="mockup-code h-screen border">
  <pre data-prefix="$" class="ml-4"><code>node/src</code></pre>
  {#if output}
    <pre data-prefix=">" class="text-warning ml-4"><br><code >{output}</code></pre>
  {/if}
  <!-- <pre data-prefix=">" class="text-success"><code>Done!</code></pre> -->
</div>
