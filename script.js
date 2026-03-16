// ================= THEME TOGGLE =================

function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);

    const btn = document.getElementById('themeBtn');
    if (btn) {
        btn.innerHTML = newTheme === 'light'
            ? '<span>🌑</span><span>Dark</span>'
            : '<span>☀️</span><span>Light</span>';
    }
    localStorage.setItem('portfolio-theme', newTheme);
}

// Apply saved theme on load
(function () {
    const saved = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    // Update button once DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        const btn = document.getElementById('themeBtn');
        if (btn) {
            btn.innerHTML = saved === 'light'
                ? '<span>🌑</span><span>Dark</span>'
                : '<span>☀️</span><span>Light</span>';
        }
    });
})();


// ================= CUSTOM CURSOR =================

const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top  = mouseY + 'px';
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor scale on hover
document.querySelectorAll('a, button, .project-card, .s4-block, .education-card, .experience-card, .contact-card, .exp-card-h')
    .forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(2.2)';
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });


// ================= SMOOTH SCROLLING =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


// ================= SKILLS MOBILE TAP TO EXPAND =================

const skillBlocks = document.querySelectorAll('.s4-block');

if (skillBlocks.length > 0) {
    skillBlocks.forEach(block => {
        block.addEventListener('click', () => {
            const isMobile = window.innerWidth <= 768;
            if (!isMobile) return;

            const isExpanded = block.classList.contains('expanded');
            skillBlocks.forEach(b => b.classList.remove('expanded'));
            if (!isExpanded) block.classList.add('expanded');
        });
    });
}


// ================= EXPERIENCE HORIZONTAL DRAG SCROLL =================

const expScroll = document.getElementById('expScroll');

if (expScroll) {
    let isDown = false;
    let startX;
    let scrollLeft;

    expScroll.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - expScroll.offsetLeft;
        scrollLeft = expScroll.scrollLeft;
        expScroll.style.cursor = 'grabbing';
    });

    expScroll.addEventListener('mouseleave', () => {
        isDown = false;
        expScroll.style.cursor = 'grab';
    });

    expScroll.addEventListener('mouseup', () => {
        isDown = false;
        expScroll.style.cursor = 'grab';
    });

    expScroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - expScroll.offsetLeft;
        const walk = (x - startX) * 1.5;
        expScroll.scrollLeft = scrollLeft - walk;
    });
}


// ================= EMAILJS CONTACT FORM =================

(function () {
    emailjs.init("j4NKG2Hmvj2ahcR-S");
})();

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector(".contact-btn");
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = "Sending... ⏳";
        submitBtn.disabled = true;

        emailjs.sendForm("service_kvt05fp", "template_hd5pybl", this)
            .then(() => {
                emailjs.sendForm("service_kvt05fp", "template_rr8aj2l", this);

                submitBtn.innerHTML = "Message Sent ✓";
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);
                submitBtn.innerHTML = "Failed ❌ Try again";

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            });
    });
}
