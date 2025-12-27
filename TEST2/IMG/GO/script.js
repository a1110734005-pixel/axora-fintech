document.addEventListener('DOMContentLoaded', () => {
    const cardLeft = document.querySelector('.card-left');
    const cardRight = document.querySelector('.card-right');

    // Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        if (cardLeft && cardRight) {
            // Maintain original rotation and add parallax
            cardLeft.style.transform = `rotate(-15deg) translateX(${x}px) translateY(${y}px)`;
            cardRight.style.transform = `rotate(15deg) translateX(${x * -1}px) translateY(${y * -1}px)`;
        }
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        if (cardLeft && cardRight) {
            cardLeft.style.transform = 'rotate(-15deg)';
            cardRight.style.transform = 'rotate(15deg)';
        }
    });

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove class to trigger shrink animation when scrolling up/away
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.section-title, .section-desc, .insight-card');
    scrollElements.forEach((el, index) => {
        // Add staggered delay for cards
        if (el.classList.contains('insight-card')) {
            el.style.transitionDelay = `${index * 0.1}s`;
        }
        observer.observe(el);
    });
});
