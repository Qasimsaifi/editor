<script>
  export let htmlCode = ""; // Default HTML code
  export let cssCode = ""; // Default CSS code
  export let jsCode = "";
  let slash = "/"
  let hostedDomainURL;
  if (typeof localStorage !== "undefined") {
    hostedDomainURL =
      window.location.protocol + "//" + window.location.hostname;
  }
</script>

<div class="mockup-browser border bg-base-300 mr-1">
  <div class="mockup-browser-toolbar">
    <div class="input ">
      <a target="_blank" href="{hostedDomainURL}/preview">{hostedDomainURL}/preview</a>
    </div>
  </div>
  <div class="h-[92vh] flex justify-center bg-red bg-base-200">
    <iframe
      title="Preview"
      style="width: 100vw; height: 92vh; border: none;"
      srcdoc={`
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                ${cssCode}
              </style>
            </head>
            <body>
              <div>${htmlCode}</div>
              <script>${jsCode}<${slash}script>
            </body>
          </html>
        `}
    />
  </div>
</div>

<style>
</style>
