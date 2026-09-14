(() => {
  const main = document.querySelector('main.wrap');
  const moreCreditLink = document.querySelector('.download-dialog-more-credit');
  if (!main || !moreCreditLink) return;

  const section = document.createElement('section');
  section.className = 'info credit-options-section';
  section.innerHTML = `
    <details class="credit-options" id="credit-options">
      <summary>More ways to credit</summary>
      <div class="credit-options-content">
        <p class="credit-options-intro">Use whichever format fits where you are sharing the artwork. Linking back to the MiniWalls page is preferred whenever the platform allows it.</p>

        <div class="credit-option">
          <p class="credit-option-label">Full credit</p>
          <p class="credit-option-text" id="credit-option-full">Artwork by @naetomgite — https://naetomgite.github.io/Idea0123-MiniWalls/</p>
          <button class="credit-option-copy" type="button" data-copy-target="credit-option-full">Copy</button>
        </div>

        <div class="credit-option">
          <p class="credit-option-label">Short credit</p>
          <p class="credit-option-text" id="credit-option-short">naetomgite.github.io/Idea0123-MiniWalls by @naetomgite</p>
          <button class="credit-option-copy" type="button" data-copy-target="credit-option-short">Copy</button>
        </div>

        <div class="credit-option">
          <p class="credit-option-label">With license</p>
          <p class="credit-option-text" id="credit-option-license">Idea0123: MiniWalls © 2026 @naetomgite · CC BY-NC-ND 4.0 · https://naetomgite.github.io/Idea0123-MiniWalls/</p>
          <button class="credit-option-copy" type="button" data-copy-target="credit-option-license">Copy</button>
        </div>
      </div>
    </details>`;
  main.appendChild(section);

  const creditOptions = section.querySelector('#credit-options');
  const lightbox = document.querySelector('.lightbox');
  const downloadDialog = document.querySelector('.download-dialog');

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  };

  section.querySelectorAll('.credit-option-copy').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      const originalLabel = button.textContent;
      try {
        await copyText(target.textContent.trim());
        button.textContent = 'Copied ✓';
      } catch {
        button.textContent = 'Copy failed';
      }
      window.setTimeout(() => { button.textContent = originalLabel; }, 1400);
    });
  });

  moreCreditLink.addEventListener('click', (event) => {
    event.preventDefault();
    creditOptions.open = true;
    if (downloadDialog?.open) downloadDialog.close();
    if (lightbox?.open) lightbox.close();
    requestAnimationFrame(() => {
      creditOptions.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
