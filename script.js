document.addEventListener("DOMContentLoaded", () => {
  const profileCard = document.getElementById("profileCard");
  const closeCardBtn = document.getElementById("closeCardBtn");
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("main section");
  const filterBtns = document.querySelectorAll(".tab-btn");
  const publicationItems = document.querySelectorAll(".list-item");

  // 1. Mobile Profile Card Expansion & Close
  profileCard.addEventListener("click", (e) => {
    // تم تعديل المقاس لـ 900 ليطابق الـ CSS
    if (window.innerWidth <= 900) {
      if (!e.target.closest("#closeCardBtn")) {
        profileCard.classList.add("expanded");
      }
    }
  });

  closeCardBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    profileCard.classList.remove("expanded");
  });

  // 2. Sticky Nav Active Link on Scroll
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // 3. Publications Filter Tabs
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      publicationItems.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // 4. Scroll Animations (Slide Up Fade In)
  // إعدادات المراقب (يشتغل لما العنصر يظهر بنسبة 10% في الشاشة)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // لو عايز الأنيميشن يشتغل مرة واحدة بس شيل الشرطتين اللي تحت:
        // observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  // تحديد العناصر اللي هيتعملها أنيميشن وإضافة الكلاس المبدئي ليها
  const elementsToAnimate = document.querySelectorAll('section, .list-item, .sub-block, .timeline-item, div[style*="padding: 40px 32px"] > div');
  
  elementsToAnimate.forEach(el => {
    el.classList.add('fade-in-up'); // إضافة كلاس الإخفاء المبدئي
    animationObserver.observe(el); // بدء المراقبة
  });

});