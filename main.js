/**
 * Nexure Studios - Main JavaScript Logic
 * Neat White & Black Theme Switcher, Portfolio Showcase, Case Study Modals,
 * Live INR (₹) Pricing Calculator, Scroll Reveals & Direct Live Chat Integration.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Theme Management (White & Black)
  initTheme();

  // State Management
  let currentFilter = "all";



  // Setup Core Functionalities
  initPortfolio();
  initScrollReveals();
  initAnimatedCounters();
  initFAQAccordion();
  initContactForm();

  /* ==========================================================================
     0. Theme Switcher (White / Black Theme)
     ========================================================================== */
  function initTheme() {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.classList.add("dark");
    if (window.lucide) window.lucide.createIcons();
  }

  /* ==========================================================================
     1. Portfolio Rendering & Filtering
     ========================================================================== */
  function initPortfolio() {
    const grid = document.getElementById("portfolio-grid");
    if (!grid || !window.NEXURE_CLIENTS) return;

    renderPortfolioCards(window.NEXURE_CLIENTS);

    // Setup Filter Buttons
    const filterBtns = document.querySelectorAll(".portfolio-filter-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => {
          b.classList.remove("bg-slate-900", "text-white", "dark:bg-white", "dark:text-slate-950");
          b.classList.add("btn-neat-outline");
        });

        btn.classList.remove("btn-neat-outline");
        btn.classList.add("bg-slate-900", "text-white", "dark:bg-white", "dark:text-slate-950");

        const filter = btn.getAttribute("data-filter");
        currentFilter = filter;
        filterPortfolio(filter);
      });
    });
  }

  function renderPortfolioCards(clients) {
    const grid = document.getElementById("portfolio-grid");
    if (!grid) return;

    grid.innerHTML = clients.map((client, idx) => {
      return `
        <div class="portfolio-card neat-card rounded-2xl overflow-hidden flex flex-col justify-between reveal-init reveal-delay-${(idx % 4) + 1}" data-id="${client.id}" data-categories='${JSON.stringify(client.category)}'>
          
          <!-- Card Header Visual -->
          <div class="p-6 border-b border-slate-200 dark:border-zinc-800 flex flex-col justify-between h-44 relative bg-slate-50 dark:bg-zinc-900">
            <div class="flex items-center justify-between z-10">
              <span class="neat-badge text-xs">
                <span class="text-sm">${client.flag}</span> ${client.location.split('(')[0]}
              </span>
              <span class="text-[11px] font-mono-code font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200">
                ${client.categoryLabel.split('•')[1] || client.categoryLabel}
              </span>
            </div>

            <div class="z-10 mt-auto">
              <h3 class="text-lg font-bold font-syne text-main leading-snug">
                ${client.title}
              </h3>
              <p class="text-xs text-sub mt-0.5">
                Client: <span class="font-bold text-main">${client.clientName}</span>
              </p>
            </div>
          </div>

          <!-- Card Body Stats & Metrics -->
          <div class="p-6 flex-grow flex flex-col justify-between">
            <p class="text-xs text-sub leading-relaxed mb-4">
              ${client.summary}
            </p>

            <!-- Metrics Pills -->
            <div class="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 mb-4">
              ${client.metrics.map(m => `
                <div class="text-center">
                  <div class="text-[10px] text-muted-custom font-medium">${m.label}</div>
                  <div class="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 font-mono-code">${m.value}</div>
                </div>
              `).join('')}
            </div>

            <!-- Tech Tags -->
            <div class="flex flex-wrap gap-1.5 mb-5">
              ${client.techStack.map(tech => `
                <span class="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700">
                  ${tech}
                </span>
              `).join('')}
            </div>

            <!-- Card Actions -->
            <div class="flex flex-col gap-2 pt-3 border-t border-zinc-800">
              ${client.website ? `
                <a href="${client.website}" target="_blank" class="w-full py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all">
                  <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                  <span>Live Site: ${client.websiteDisplay} &rarr;</span>
                </a>
              ` : ''}
              <div class="flex items-center gap-2">
                <button onclick="openClientModal('${client.id}')" class="flex-1 py-2 px-3 rounded-xl btn-neat-outline text-xs font-bold flex items-center justify-center gap-1.5">
                  <span>View Details</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </button>
                <a href="#" class="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 transition-all" title="Chat about project">
                  <i data-lucide="message-square" class="w-4 h-4"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();
    initScrollReveals();
  }

  function filterPortfolio(filter) {
    const cards = document.querySelectorAll(".portfolio-card");
    cards.forEach(card => {
      const categories = JSON.parse(card.getAttribute("data-categories") || "[]");
      if (filter === "all" || categories.includes(filter)) {
        card.style.display = "flex";
        setTimeout(() => { card.style.opacity = "1"; card.style.transform = "translateY(0)"; }, 50);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => { card.style.display = "none"; }, 300);
      }
    });
  }

  /* ==========================================================================
     2. Case Study Modal System
     ========================================================================== */
  window.openClientModal = function(id) {
    const client = window.NEXURE_CLIENTS.find(c => c.id === id);
    if (!client) return;

    const modal = document.getElementById("case-study-modal");
    const container = document.getElementById("modal-detail-container");
    if (!modal || !container) return;

    container.innerHTML = `
      <div class="p-6 sm:p-8 space-y-6 bg-zinc-950 text-white rounded-3xl border border-zinc-800">
        
        <!-- Header Banner -->
        <div class="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
          <div class="flex items-center justify-between gap-3 mb-3">
            <span class="neat-badge text-xs">
              <span class="text-base">${client.flag}</span> ${client.location}
            </span>
            <span class="text-xs font-mono-code font-bold px-3 py-1 rounded bg-zinc-800 text-white">
              ${client.categoryLabel}
            </span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-bold font-syne text-white mb-2">
            ${client.title}
          </h2>
          <p class="text-xs text-sub">Client: <span class="font-bold text-white">${client.clientName}</span></p>
        </div>

        <!-- Metric Highlight Banner -->
        <div class="grid grid-cols-3 gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          ${client.metrics.map(m => `
            <div class="text-center p-2 rounded-lg bg-zinc-950 border border-zinc-800">
              <div class="text-[10px] text-sub font-medium">${m.label}</div>
              <div class="text-base sm:text-lg font-extrabold text-emerald-400 font-mono-code mt-0.5">${m.value}</div>
            </div>
          `).join('')}
        </div>

        <!-- Description -->
        <div>
          <h4 class="text-xs font-mono-code uppercase tracking-wider text-sub mb-2 font-bold">Project Summary & Impact</h4>
          <p class="text-xs sm:text-sm text-sub leading-relaxed bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            ${client.fullDescription}
          </p>
        </div>

        <!-- Key Deliverables -->
        <div>
          <h4 class="text-xs font-mono-code uppercase tracking-wider text-sub mb-2 font-bold">What Nexure Studios Built</h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            ${client.deliverables.map(d => `
              <div class="flex items-center gap-2 p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white font-medium">
                <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 flex-shrink-0"></i>
                <span>${d}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Verified Testimonial -->
        <div class="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 relative">
          <p class="text-xs sm:text-sm italic text-white mb-3 leading-relaxed">
            "${client.testimonial.quote}"
          </p>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-white text-zinc-950 font-bold flex items-center justify-center text-xs">
              ${client.testimonial.author.charAt(0)}
            </div>
            <div>
              <div class="text-xs font-bold text-white">${client.testimonial.author}</div>
              <div class="text-[11px] text-sub">${client.testimonial.role}</div>
            </div>
          </div>
        </div>

        <!-- Direct Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-zinc-800">
          ${client.website ? `
            <a href="${client.website}" target="_blank" class="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all">
              <i data-lucide="external-link" class="w-4 h-4"></i>
              <span>Visit ${client.websiteDisplay}</span>
            </a>
          ` : ''}
          <a href="#" class="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl btn-chat-neat text-xs flex items-center justify-center gap-2">
            <i data-lucide="message-square" class="w-4 h-4"></i>
            <span>Chat</span>
          </a>
          <button onclick="closeClientModal()" class="w-full sm:w-auto py-3 px-5 rounded-xl btn-neat-outline text-xs font-bold">
            Close
          </button>
        </div>

      </div>
    `;

    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.add("modal-open");
    }, 10);

    if (window.lucide) window.lucide.createIcons();
  };

  window.closeClientModal = function() {
    const modal = document.getElementById("case-study-modal");
    if (!modal) return;
    modal.classList.remove("modal-open");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 200);
  };



  /* ==========================================================================
     4. Scroll Reveal & Intersection Observer
     ========================================================================== */
  function initScrollReveals() {
    const reveals = document.querySelectorAll(".reveal-init");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     5. Animated Numerical Counter Statistics
     ========================================================================== */
  function initAnimatedCounters() {
    const counterEls = document.querySelectorAll(".counter-val");
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counterEls.forEach(el => {
            const target = parseFloat(el.getAttribute("data-target"));
            const prefix = el.getAttribute("data-prefix") || "";
            const suffix = el.getAttribute("data-suffix") || "";
            const decimals = parseInt(el.getAttribute("data-decimals") || "0");

            let current = 0;
            const duration = 1800;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.innerText = `${prefix}${current.toFixed(decimals)}${suffix}`;
            }, stepTime);
          });
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById("stats-banner");
    if (statsSection) observer.observe(statsSection);
  }



  /* ==========================================================================
     7. FAQ Accordion Logic
     ========================================================================== */
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
      const header = item.querySelector(".faq-header");
      const body = item.querySelector(".faq-body");
      const icon = item.querySelector(".faq-icon");

      if (header && body) {
        header.addEventListener("click", () => {
          const isOpen = !body.classList.contains("hidden");

          document.querySelectorAll(".faq-body").forEach(b => b.classList.add("hidden"));
          document.querySelectorAll(".faq-icon").forEach(i => i.style.transform = "rotate(0deg)");

          if (!isOpen) {
            body.classList.remove("hidden");
            if (icon) icon.style.transform = "rotate(180deg)";
          }
        });
      }
    });
  }

  /* ==========================================================================
     8. Contact Form Handler
     ========================================================================== */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name")?.value || "Client";
      const phone = document.getElementById("form-phone")?.value || "";
      const project = document.getElementById("form-project")?.value || "";

      if (window.confetti) {
        window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      }

      form.reset();
    });
  }
});
