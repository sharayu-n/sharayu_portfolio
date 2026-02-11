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
    cursor.style.top = mouseY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Interactive cursor effects
document.querySelectorAll('a, button, .project-card, .skill-card, .education-card, .experience-card, .contact-card')
  .forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor) cursor.style.transform = 'scale(2)';
    });
    el.addEventListener('mouseleave', () => {
      if (cursor) cursor.style.transform = 'scale(1)';
    });
  });


// ================= SMOOTH SCROLLING =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


// ================= EMAILJS CONTACT FORM =================

// Initialize EmailJS
(function () {
  emailjs.init("j4NKG2Hmvj2ahcR-S"); // 🔴 Replace with your Public Key
})();

const contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".submit-btn");

    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    // Send email to YOU
    emailjs.sendForm("service_kvt05fp", "template_hd5pybl", this)
      .then(() => {

        // Send auto reply to USER
        emailjs.sendForm("service_kvt05fp", "template_hd5pybl", this);

        submitBtn.innerText = "Message Sent ✓";
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerText = "Send Message";
          submitBtn.disabled = false;
        }, 3000);

      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        submitBtn.innerText = "Failed ❌";

        setTimeout(() => {
          submitBtn.innerText = "Send Message";
          submitBtn.disabled = false;
        }, 3000);
      });
  });

}
