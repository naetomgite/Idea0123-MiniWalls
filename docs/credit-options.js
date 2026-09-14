(() => {
  const main = document.querySelector('main.wrap');
  const moreCreditLink = document.querySelector('.download-dialog-more-credit');
  if (!main || !moreCreditLink) return;

  const creditStack = document.querySelector('#license .credit-stack');
  if (creditStack) {
    const minimumCreditNote = document.createElement('p');
    minimumCreditNote.className = 'minimum-credit-note';
    minimumCreditNote.innerHTML = `<strong>Minimum attribution:</strong> include (1) a link shown as “naetomgite.github.io/Idea0123-MiniWalls” or “https://naetomgite.github.io/Idea0123-MiniWalls/”, or a QR code pointing to it; (2) the project name as “Idea0123: MiniWalls”, “Idea0123-MiniWalls”, “Idea0123”, or “Idea0123_MiniWalls”; and (3) an author reference as “github.com/naetomgite”, “GitHub: naetomgite”, “By naetomgite (GitHub)”, “https://naetomgite.github.io/Idea0123-MiniWalls/”, or “naetomgite” accompanied by the GitHub logo. To make sure your attribution is correct, visit the <a class="minimum-credit-more-link" href="#credit-options">More ways to credit</a> section.`;
    creditStack.insertAdjacentElement('afterend', minimumCreditNote);
  }

  const section = document.createElement('section');
  section.className = 'info credit-options-section';
  section.innerHTML = `
    <details class="credit-options" id="credit-options">
      <summary>More ways to credit</summary>
      <div class="credit-options-content">
        <p class="credit-options-intro">Use whichever format fits where you are sharing the artwork. Linking back to the MiniWalls page is preferred whenever the platform allows it.</p>

        <div class="credit-option">
          <p class="credit-option-label">Full credit</p>
          <p class="credit-option-text" id="credit-option-full">Artwork by naetomgite — https://naetomgite.github.io/Idea0123-MiniWalls/</p>
          <button class="credit-option-copy" type="button" data-copy-target="credit-option-full">Copy</button>
        </div>

        <div class="credit-option">
          <p class="credit-option-label">Short credit</p>
          <p class="credit-option-text" id="credit-option-short">naetomgite.github.io/Idea0123-MiniWalls by naetomgite</p>
          <button class="credit-option-copy" type="button" data-copy-target="credit-option-short">Copy</button>
        </div>

        <div class="credit-option">
          <p class="credit-option-label">With license</p>
          <p class="credit-option-text" id="credit-option-license">Idea0123: MiniWalls © 2026 naetomgite · CC BY-NC-ND 4.0 · https://naetomgite.github.io/Idea0123-MiniWalls/</p>
          <button class="credit-option-copy" type="button" data-copy-target="credit-option-license">Copy</button>
        </div>

        <div class="credit-option">
          <p class="credit-option-label">Markdown short</p>
          <p class="credit-option-text" id="credit-option-markdown-short">[Idea0123 by naetomgite](https://naetomgite.github.io/Idea0123-MiniWalls/)</p>
          <button class="credit-option-copy" type="button" data-copy-target="credit-option-markdown-short">Copy</button>
        </div>

        <div class="credit-option">
          <p class="credit-option-label">Markdown with license</p>
          <p class="credit-option-text" id="credit-option-markdown-license">[Idea0123: MiniWalls © 2026 naetomgite · CC BY-NC-ND 4.0](https://naetomgite.github.io/Idea0123-MiniWalls/)</p>
          <button class="credit-option-copy" type="button" data-copy-target="credit-option-markdown-license">Copy</button>
        </div>
      </div>
    </details>`;
  main.appendChild(section);

  const creditOptions = section.querySelector('#credit-options');
  const lightbox = document.querySelector('.lightbox');
  const downloadDialog = document.querySelector('.download-dialog');
  const minimumCreditMoreLink = document.querySelector('.minimum-credit-more-link');

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

  const openCreditOptions = () => {
    creditOptions.open = true;
    if (downloadDialog?.open) downloadDialog.close();
    if (lightbox?.open) lightbox.close();
    requestAnimationFrame(() => {
      creditOptions.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  moreCreditLink.addEventListener('click', (event) => {
    event.preventDefault();
    openCreditOptions();
  });

  minimumCreditMoreLink?.addEventListener('click', (event) => {
    event.preventDefault();
    openCreditOptions();
  });

  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let textNode = textWalker.nextNode();
  while (textNode) {
    if (textNode.nodeValue.includes('@naetomgite')) {
      textNode.nodeValue = textNode.nodeValue.replaceAll('@naetomgite', 'naetomgite');
    }
    textNode = textWalker.nextNode();
  }
})();
