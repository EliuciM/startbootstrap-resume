//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const ragModal = document.getElementById('rag-modal');
    const ragPreviewTrigger = document.getElementById('rag-preview-trigger');
    const ragModalClose = document.getElementById('rag-modal-close');
    const ragModalBackdrop = document.getElementById('rag-modal-backdrop');
    const previewViewport = document.getElementById('rag-preview-viewport');
    const previewFrame = document.getElementById('rag-preview-frame');

    const openRagModal = function () {
        if (!ragModal) {
            return;
        }
        ragModal.classList.add('show');
        ragModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeRagModal = function () {
        if (!ragModal) {
            return;
        }
        ragModal.classList.remove('show');
        ragModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    const syncRagPreviewScale = function () {
        if (!previewViewport || !previewFrame) {
            return;
        }

        const frameDoc = previewFrame.contentDocument;
        const docEl = frameDoc ? frameDoc.documentElement : null;
        const body = frameDoc ? frameDoc.body : null;

        const contentWidth = Math.max(
            (docEl && docEl.scrollWidth) || 0,
            (body && body.scrollWidth) || 0,
            1240
        );
        const contentHeight = Math.max(
            (docEl && docEl.scrollHeight) || 0,
            (body && body.scrollHeight) || 0,
            900
        );

        const scale = previewViewport.clientWidth / contentWidth;
        previewFrame.style.width = contentWidth + 'px';
        previewFrame.style.height = contentHeight + 'px';
        previewFrame.style.transform = 'scale(' + scale + ')';
        previewViewport.style.height = contentHeight * scale + 'px';
    };

    if (ragPreviewTrigger) {
        ragPreviewTrigger.addEventListener('click', openRagModal);
        ragPreviewTrigger.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openRagModal();
            }
        });
    }

    if (ragModalClose) {
        ragModalClose.addEventListener('click', closeRagModal);
    }

    if (ragModalBackdrop) {
        ragModalBackdrop.addEventListener('click', closeRagModal);
    }

    if (previewFrame) {
        previewFrame.addEventListener('load', syncRagPreviewScale);
    }

    const zoomableImages = [].slice.call(
        document.querySelectorAll('img.experience-img')
    ).filter(function (img) {
        return !img.closest('a');
    });

    let imageModal = null;
    let imageModalBackdrop = null;
    let imageModalContent = null;
    let imageModalClose = null;

    const ensureImageModal = function () {
        if (imageModal) {
            return;
        }

        imageModal = document.createElement('div');
        imageModal.className = 'image-modal';
        imageModal.setAttribute('aria-hidden', 'true');

        imageModalBackdrop = document.createElement('div');
        imageModalBackdrop.className = 'image-modal-backdrop';

        const imageModalDialog = document.createElement('div');
        imageModalDialog.className = 'image-modal-dialog';

        imageModalClose = document.createElement('button');
        imageModalClose.className = 'image-modal-close';
        imageModalClose.type = 'button';
        imageModalClose.textContent = 'Close';

        imageModalContent = document.createElement('img');
        imageModalContent.className = 'image-modal-content';
        imageModalContent.alt = 'Preview';

        imageModalDialog.appendChild(imageModalClose);
        imageModalDialog.appendChild(imageModalContent);

        imageModal.appendChild(imageModalBackdrop);
        imageModal.appendChild(imageModalDialog);

        document.body.appendChild(imageModal);

        imageModalBackdrop.addEventListener('click', function () {
            imageModal.classList.remove('show');
            imageModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });

        imageModalClose.addEventListener('click', function () {
            imageModal.classList.remove('show');
            imageModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    };

    const openImageModal = function (src, alt) {
        ensureImageModal();
        imageModalContent.src = src;
        imageModalContent.alt = alt || 'Preview';
        imageModal.classList.add('show');
        imageModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    zoomableImages.forEach(function (img) {
        img.classList.add('zoomable-image');
        img.addEventListener('click', function () {
            openImageModal(img.src, img.alt);
        });
    });

    window.addEventListener('resize', syncRagPreviewScale);
    window.addEventListener('load', syncRagPreviewScale);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeRagModal();
            if (imageModal) {
                imageModal.classList.remove('show');
                imageModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        }
    });

});
