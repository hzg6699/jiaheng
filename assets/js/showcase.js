(() => {
  const albums = JSON.parse(document.getElementById('gallery-data').textContent);
  const albumDialog = document.getElementById('album-dialog');
  const imageDialog = document.getElementById('image-dialog');
  const photoGrid = document.getElementById('album-photos');
  let activeAlbum, activeIndex = 0;
  const lock = () => document.body.classList.toggle('gallery-open', albumDialog.open || imageDialog.open);
  const byId = id => albums.find(album => album.id === id);
  // Certificates advance only through explicit previous/next actions.
  const certificateTiles = [...document.querySelectorAll('.certificate-tile')];
  const certificatePageSize = 9;
  const certificatePageCount = Math.ceil(certificateTiles.length / certificatePageSize);
  let certificatePage = 0;
  const certificatePrevious = document.getElementById('certificates-previous');
  const certificateNext = document.getElementById('certificates-next');
  function renderCertificatePage() {
    certificateTiles.forEach((tile, index) => {
      tile.hidden = Math.floor(index / certificatePageSize) !== certificatePage;
    });
    certificatePrevious.disabled = certificatePage === 0;
    certificateNext.disabled = certificatePage === certificatePageCount - 1;
    document.getElementById('certificates-page-status').textContent = `${certificatePage + 1} / ${certificatePageCount}`;
  }
  certificatePrevious.addEventListener('click', () => {
    if (certificatePage > 0) { certificatePage--; renderCertificatePage(); }
  });
  certificateNext.addEventListener('click', () => {
    if (certificatePage < certificatePageCount - 1) { certificatePage++; renderCertificatePage(); }
  });
  renderCertificatePage();
  function displayImage() {
    const item = activeAlbum.items[activeIndex];
    const full = document.getElementById('full-image');
    full.src = item.src; full.alt = item.label;
    document.getElementById('image-heading').textContent = item.label;
    document.getElementById('image-count').textContent = `${activeIndex + 1} / ${activeAlbum.items.length}`;
    document.getElementById('original-image').href = item.src;
    const pdf = document.getElementById('original-pdf');
    pdf.hidden = !item.document;
    if (item.document) pdf.href = item.document; else pdf.removeAttribute('href');
    document.getElementById('previous-image').disabled = activeIndex === 0;
    document.getElementById('next-image').disabled = activeIndex === activeAlbum.items.length - 1;
  }
  function openImage(album, index) {
    activeAlbum = album; activeIndex = index; displayImage();
    if (!imageDialog.open) imageDialog.showModal(); lock();
  }
  document.querySelectorAll('[data-album]').forEach(button => button.addEventListener('click', () => {
    const album = byId(button.dataset.album);
    document.getElementById('album-heading').textContent = album.title;
    document.getElementById('album-summary').textContent = `${album.items.length} ${album.items.length === 1 ? 'image' : 'images'}`;
    photoGrid.replaceChildren(...album.items.map((item, index) => {
      const link = document.createElement('a'); link.href = item.src; link.setAttribute('aria-label', `View ${item.label}`);
      const img = document.createElement('img'); img.src = item.thumb; img.alt = item.label; img.loading = 'lazy'; img.width = item.width; img.height = item.height;
      link.append(img); link.addEventListener('click', event => { event.preventDefault(); openImage(album, index); }); return link;
    }));
    albumDialog.showModal(); albumDialog.scrollTop = 0; lock();
  }));
  document.querySelectorAll('[data-gallery]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault(); openImage(byId(link.dataset.gallery), Number(link.dataset.index));
  }));
  document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
  for (const dialog of [albumDialog, imageDialog]) {
    dialog.addEventListener('close', lock);
    dialog.addEventListener('click', event => {
      const r = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close();
    });
  }
  function step(direction) {
    const next = activeIndex + direction;
    if (next >= 0 && next < activeAlbum.items.length) { activeIndex = next; displayImage(); }
  }
  document.getElementById('previous-image').addEventListener('click', () => step(-1));
  document.getElementById('next-image').addEventListener('click', () => step(1));
  imageDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); step(event.key === 'ArrowLeft' ? -1 : 1); }
  });
})();
