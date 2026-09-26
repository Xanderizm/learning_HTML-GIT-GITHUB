// =========================================================
// PORTFOLIO TEMPLATE - JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------------------------------
    // Mobile menu
    // -------------------------------------------------------
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    menuToggle?.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        document.body.classList.toggle("menu-open");

        const icon = menuToggle.querySelector("i");
        if (navMenu.classList.contains("open")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            document.body.classList.remove("menu-open");

            const icon = menuToggle?.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    });


    // -------------------------------------------------------
    // Active navigation berdasarkan section yang terlihat
    // -------------------------------------------------------
    const sections = document.querySelectorAll("section[id]");

    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove("active");

                        if (link.getAttribute("href") === `#${entry.target.id}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        {
            threshold: 0.45
        }
    );

    sections.forEach(section => sectionObserver.observe(section));


    // -------------------------------------------------------
    // Scroll reveal
    // -------------------------------------------------------
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => revealObserver.observe(element));


    // -------------------------------------------------------
    // Fullscreen tiap section
    // -------------------------------------------------------
    const fullscreenButtons = document.querySelectorAll("[data-fullscreen]");

    fullscreenButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const section = button.closest(".section");

            try {
                if (!document.fullscreenElement) {
                    await section.requestFullscreen();
                } else {
                    await document.exitFullscreen();
                }
            } catch (error) {
                console.log("Fullscreen tidak tersedia:", error);
            }
        });
    });


    // -------------------------------------------------------
    // Tahun footer otomatis
    // -------------------------------------------------------
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
