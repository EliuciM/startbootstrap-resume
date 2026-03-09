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

    window.addEventListener('resize', syncRagPreviewScale);
    window.addEventListener('load', syncRagPreviewScale);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeRagModal();
        }
    });

});
