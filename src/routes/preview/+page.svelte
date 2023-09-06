<script>
  import Preview from "../../components/Preview.svelte";

  let htmlCode = '';
  let cssCode = '';
  let jsCode = ''

  // Check if localStorage is available before using it
  if (typeof localStorage !== 'undefined') {
    htmlCode = localStorage.getItem('htmlCode') || '';
    cssCode = localStorage.getItem('cssCode') || '';
    jsCode = localStorage.getItem('jsCode') || '';

  }

  // Listen for changes in localStorage
  if (typeof localStorage !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'htmlCode') {
      htmlCode = e.newValue || '';
    }
    if (e.key === 'cssCode') {
      cssCode = e.newValue || '';
    }
    if (e.key === 'jsCode') {
      jsCode = e.newValue || '';
    }
  });
}
</script>

<Preview {htmlCode} {cssCode} {jsCode}/>
