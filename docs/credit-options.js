(() => {
  const main = document.querySelector('main.wrap');
  const moreCreditLink = document.querySelector('.download-dialog-more-credit');
  if (!main || !moreCreditLink) return;

  const creditStack = document.querySelector('#license .credit-stack');
  if (creditStack) {
    const projectNamingNote = document.createElement('p');
    projectNamingNote.className = 'project-naming-note';
    projectNamingNote.innerHTML = `<strong>Project naming:</strong> this project has two official names: “Idea0123: MiniWalls” (full name) and “Idea0123” (short name). For attribution, “Idea0123-MiniWalls” and “Idea0123_MiniWalls” are also accepted naming variants. Any of these four forms may be used to identify the project in an attribution.`;
    creditStack.insertAdjacentElement('beforebegin', projectNamingNote);

    const suggestedCreditMore = document.createElement('a');
    suggestedCreditMore.className = 'suggested-credit-more';
    suggestedCreditMore.href = '#credit-options';
    suggestedCreditMore.textContent = 'More ways to credit';
    creditStack.insertAdjacentElement('afterend', suggestedCreditMore);

    const minimumCreditNote = document.createElement('p');
    minimumCreditNote.className = 'minimum-credit-note';
    minimumCreditNote.innerHTML = `<strong>Recommended minimum attribution:</strong> for a simple and reliable attribution, include (1) a link shown as “naetomgite.github.io/Idea0123-MiniWalls” or “https://naetomgite.github.io/Idea0123-MiniWalls/”, or a QR code pointing to it; (2) the project name using any accepted form: “Idea0123: MiniWalls”, “Idea0123”, “Idea0123-MiniWalls”, or “Idea0123_MiniWalls”; and (3) an author reference as “github.com/naetomgite”, “GitHub: naetomgite”, “By naetomgite (GitHub)”, “https://naetomgite.github.io/Idea0123-MiniWalls/”, or “naetomgite” accompanied by the GitHub logo. To make sure your attribution is correct, you can visit the <a class="minimum-credit-more-link" href="#credit-options">More ways to credit</a> section.`;
    suggestedCreditMore.insertAdjacentElement('afterend', minimumCreditNote);
  }

  const section = document.createElement('section');
  section.className = 'info credit-options-section';
  section.innerHTML = `
    <details class="credit-options" id="credit-options">
      <summary>More ways to credit</summary>
      <div class="credit-options-content">
        <p class="credit-options-intro">Use whichever format fits where you are sharing the artwork. Linking back to the MiniWalls page is preferred whenever the platform allows it.</p>

        <div class="credit-card-row">
          <div class="credit-option credit-option-card">
            <p class="credit-option-label">Credit card</p>
            <img class="credit-option-card-preview" src="assets/idea0123-v-card-2160x2160.png" alt="Idea0123: MiniWalls credit card" loading="lazy">
            <a class="credit-option-download" href="assets/idea0123-v-card-2160x2160.png" download>Download card</a>
          </div>

          <div class="credit-option credit-option-card">
            <p class="credit-option-label">1080p banner</p>
            <img class="credit-option-card-preview" src="assets/idea0123-h-card-1920x1080.png" alt="Idea0123: MiniWalls 1080p credit banner" loading="lazy">
            <a class="credit-option-download" href="assets/idea0123-h-card-1920x1080.png" download>Download banner</a>
          </div>
        </div>

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
  const suggestedCreditMore = document.querySelector('.suggested-credit-more');
  const minimumCreditMoreLink = document.querySelector('.minimum-credit-more-link');
  const downloadDialogItemName = document.querySelector('.download-dialog-item-name');
  const downloadDialogDownloadLabel = document.querySelector('.download-dialog-download span');
  const mobileDownloadDialog = window.matchMedia('(max-width: 700px)');

  const initialHash = window.location.hash;
  const gallerySection = document.querySelector('#gallery');
  const getInitialHashTarget = () => {
    if (!initialHash || initialHash.length < 2) return null;
    try {
      return document.getElementById(decodeURIComponent(initialHash.slice(1)));
    } catch {
      return null;
    }
  };

  const stabilizeInitialHashScroll = () => {
    const target = getInitialHashTarget();
    if (!target || !gallerySection) return;

    const targetIsAfterGallery = Boolean(
      gallerySection.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING
    );
    if (!targetIsAfterGallery) return;

    let active = true;
    let settleTimer = 0;
    const watchedImages = new WeakSet();

    const realign = () => {
      if (!active) return;
      requestAnimationFrame(() => {
        if (active) target.scrollIntoView({ block: 'start' });
      });
    };

    const stop = () => {
      if (!active) return;
      active = false;
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.clearTimeout(settleTimer);
      window.clearTimeout(maxTimer);
    };

    const maybeFinish = () => {
      if (!active) return;
      const images = [...gallerySection.querySelectorAll('img')];
      if (!images.length || images.some((image) => !image.complete)) return;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        realign();
        window.setTimeout(stop, 120);
      }, 500);
    };

    const watchGalleryImages = () => {
      gallerySection.querySelectorAll('img').forEach((image) => {
        image.loading = 'eager';
        if (watchedImages.has(image)) return;
        watchedImages.add(image);
        if (!image.complete) {
          image.addEventListener('load', () => {
            realign();
            maybeFinish();
          }, { once: true });
          image.addEventListener('error', () => {
            realign();
            maybeFinish();
          }, { once: true });
        }
      });
      realign();
      maybeFinish();
    };

    const resizeObserver = new ResizeObserver(() => realign());
    const mutationObserver = new MutationObserver(watchGalleryImages);
    resizeObserver.observe(gallerySection);
    mutationObserver.observe(gallerySection, { childList: true, subtree: true });

    const maxTimer = window.setTimeout(stop, 15000);
    window.addEventListener('load', realign, { once: true });
    document.fonts?.ready.then(realign);

    window.addEventListener('wheel', stop, { once: true, passive: true });
    window.addEventListener('touchstart', stop, { once: true, passive: true });
    window.addEventListener('pointerdown', stop, { once: true, passive: true });
    document.addEventListener('keydown', stop, { once: true });

    watchGalleryImages();
  };

  stabilizeInitialHashScroll();

  const syncDownloadButtonLabel = () => {
    if (!downloadDialogDownloadLabel || !downloadDialogItemName) return;

    const hasWallpaper = !downloadDialogItemName.hidden && downloadDialogItemName.textContent.trim();
    if (mobileDownloadDialog.matches) {
      downloadDialogDownloadLabel.textContent = hasWallpaper
        ? `${downloadDialogItemName.textContent.trim()} • Download`
        : 'Download';
      return;
    }

    downloadDialogDownloadLabel.textContent = hasWallpaper ? 'Download image' : 'Download';
  };

  if (downloadDialog) {
    const dialogObserver = new MutationObserver(() => {
      if (downloadDialog.open) syncDownloadButtonLabel();
    });
    dialogObserver.observe(downloadDialog, { attributes: true, attributeFilter: ['open'] });
    mobileDownloadDialog.addEventListener('change', syncDownloadButtonLabel);
  }

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

  suggestedCreditMore?.addEventListener('click', (event) => {
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
