document.addEventListener('DOMContentLoaded', function () {
    // Function to add a smooth scrolling effect
    const smoothScroll = (target, duration) => {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    // Add event listeners to navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target, 1000);
        });
    });

    // Function to add a scroll-to-top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '⬆️';
    scrollToTopButton.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopButton);

    scrollToTopButton.addEventListener('click', () => {
        smoothScroll('body', 1000);
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });

    // Function to make header sticky on scroll
    const header = document.querySelector('header');
    const sticky = header.offsetTop;
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > sticky) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Function to animate section headers on scroll
    const sections = document.querySelectorAll('section');
    const animateOnScroll = () => {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.getBoundingClientRect().height;
            if (sectionTop < window.innerHeight - sectionHeight / 4) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);

    // Function to add a parallax effect to the background image
    var bg = document.querySelector('.bg');
    window.addEventListener('scroll', () => {
        var scrollPosition = window.pageYOffset;
        bg.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
    });

    // Typewriter Effect for Headings
    const typewriterEffect = (element, text, delay = 100) => {
        let charIndex = 0;
        const type = () => {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, delay);
            }
        };
        type();
    };

    const headings = document.querySelectorAll('section h2');
    headings.forEach((heading) => {
        const text = heading.textContent;
        heading.textContent = '';
        typewriterEffect(heading, text);
    });

    // Modal Popups for Images
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');
            const modalImage = document.createElement('img');
            modalImage.src = img.src;
            const closeButton = document.createElement('span');
            closeButton.classList.add('close');
            closeButton.innerHTML = '&times;';
            closeButton.addEventListener('click', () => {
                modal.remove();
            });
            modalContent.appendChild(modalImage);
            modalContent.appendChild(closeButton);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        });
    });

    // Toggleable Dark Mode
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.classList.add('dark-mode-toggle');
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
