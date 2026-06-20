document.addEventListener('DOMContentLoaded', () => {
  // Tema-växling (Ljust/Mörkt)
  const themeToggle = document.getElementById('themeToggle');
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon = document.getElementById('sunIcon');
  const htmlEl = document.documentElement;

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      htmlEl.setAttribute('data-theme', 'dark');
      if (moonIcon) moonIcon.style.display = 'none';
      if (sunIcon) sunIcon.style.display = 'block';
    } else {
      htmlEl.removeAttribute('data-theme');
      if (moonIcon) moonIcon.style.display = 'block';
      if (sunIcon) sunIcon.style.display = 'none';
    }
  };

  // Hämta sparat tema eller använd systeminställning
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Mobil navigering
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Stäng menyn när man klickar på en länk
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Scroll-animationer (Fade in)
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => {
    observer.observe(el);
  });

  // Formulärvalidering
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    const setError = (element, isError) => {
      const input = element;
      if (isError) {
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    };

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      // Validera Namn
      if (!name.value.trim()) {
        setError(name, true);
        isValid = false;
      } else {
        setError(name, false);
      }

      // Validera E-post
      if (!email.value.trim() || !validateEmail(email.value.trim())) {
        setError(email, true);
        isValid = false;
      } else {
        setError(email, false);
      }

      // Validera Meddelande
      if (!message.value.trim()) {
        setError(message, true);
        isValid = false;
      } else {
        setError(message, false);
      }

      if (isValid) {
        // Simulera lyckad sändning
        const formWrapper = contactForm.parentElement;
        formWrapper.innerHTML = `
          <h2>Tack för ditt meddelande!</h2>
          <p>Vi har mottagit din förfrågan och kommer att återkomma till dig inom 24 timmar.</p>
          <a href="index.html" class="btn btn-secondary" style="margin-top: 20px;">Tillbaka till startsidan</a>
        `;
      }
    });

    // Ta bort fel-meddelande när användaren skriver
    contactForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        setError(input, false);
      });
    });
  }
});
