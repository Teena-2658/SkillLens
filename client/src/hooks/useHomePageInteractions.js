import { useEffect, useRef } from "react";

/**
 * Cursor, scroll UI, reveal, skill bars, CTAs, ripples, tilt, quiz demo, ticker — matches skilllens_animated.html behavior.
 */
export function useHomePageInteractions(navigate) {
  const initGuard = useRef(false);

  useEffect(() => {
    if (initGuard.current) return;
    initGuard.current = true;

    const cur = document.getElementById("cursor");
    const ring = document.getElementById("cursor-ring");
    if (!cur || !ring) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let rafId = 0;
    let rafActive = true;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = `${mx}px`;
      cur.style.top = `${my}px`;
    };
    document.addEventListener("mousemove", onMove, { passive: true });

    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      if (rafActive) rafId = requestAnimationFrame(animRing);
    };
    rafId = requestAnimationFrame(animRing);

    const onEnterHover = () => document.body.classList.add("cursor-hover");
    const onLeaveHover = () => document.body.classList.remove("cursor-hover");
    const onEnterText = () => document.body.classList.add("cursor-text");
    const onLeaveText = () => document.body.classList.remove("cursor-text");

    const hoverEls = document.querySelectorAll(
      "button,a,.bc-opt,.bc-b-row,.feat-card,.test-card,.wf-step,.fsoc,.footer-link,.nav-item,.av,.rm-dot,.badge,.ticker-item"
    );
    const textEls = document.querySelectorAll(
      "p,.hero-p,.feat-p,.wf-p,.test-q,.sec-sub"
    );

    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnterHover);
      el.addEventListener("mouseleave", onLeaveHover);
    });
    textEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnterText);
      el.addEventListener("mouseleave", onLeaveText);
    });

    const onDown = () => document.body.classList.add("cursor-click");
    const onUp = () => document.body.classList.remove("cursor-click");
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    const scrollBar = document.getElementById("scroll-bar");
    const nav = document.getElementById("main-nav");
    const backTop = document.getElementById("back-top");

    const onWindowScroll = () => {
      const y = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollBar) {
        const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
        scrollBar.style.width = `${pct}%`;
      }
      if (nav) nav.classList.toggle("scrolled", y > 10);
      if (backTop) backTop.classList.toggle("show", y > 400);
    };
    onWindowScroll();
    window.addEventListener("scroll", onWindowScroll, { passive: true });

    const revealEls = document.querySelectorAll(".reveal");
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObs.observe(el));

    const bcC = document.querySelector(".bc-c");
    let barsAnimated = false;
    const barObs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !barsAnimated) {
          barsAnimated = true;
          document.querySelectorAll(".sk-fill").forEach((bar, i) => {
            const w = bar.dataset.w;
            setTimeout(() => {
              bar.style.width = `${w}%`;
              if (bar.nextElementSibling) {
                bar.nextElementSibling.classList.add("show");
              }
              const pct = bar.closest(".sk-row")?.querySelector(".sk-pct");
              if (pct) pct.classList.add("show");
            }, i * 120);
          });
          barObs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (bcC) barObs.observe(bcC);

    /* Nav Sign In / Get Started use React onClick + disabled; hero + CTA still go to /login */
    const loginBtns = document.querySelectorAll("#hero-cta,.btn-cta.primary");
    const loginHandlers = [];
    loginBtns.forEach((btn) => {
      const handler = (e) => {
        e.preventDefault();
        navigate("/login");
      };
      btn.addEventListener("click", handler);
      loginHandlers.push([btn, handler]);
    });

    const navItemBtns = document.querySelectorAll(
      "#main-nav .nav-center .nav-item"
    );
    const navHandlers = [];
    navItemBtns.forEach((btn) => {
      const label = btn.textContent.trim().toLowerCase();
      const handler = () => {
        let target = null;
        if (label.includes("platform"))
          target =
            document.getElementById("features") ||
            document.querySelector(".features");
        else if (label.includes("how"))
          target =
            document.getElementById("workflow") ||
            document.querySelector(".workflow");
        else
          target =
            document.getElementById("proof") || document.querySelector(".proof");
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      btn.addEventListener("click", handler);
      navHandlers.push([btn, handler]);
    });

    const rippleBtns = document.querySelectorAll(".btn,.btn-cta,.btn-nav-cta");
    const rippleHandlers = [];
    rippleBtns.forEach((btn) => {
      const handler = (e) => {
        btn.classList.remove("rip");
        void btn.offsetWidth;
        btn.classList.add("rip");
        btn.style.setProperty(
          "--rx",
          `${e.clientX - btn.getBoundingClientRect().left}px`
        );
        btn.style.setProperty(
          "--ry",
          `${e.clientY - btn.getBoundingClientRect().top}px`
        );
        setTimeout(() => btn.classList.remove("rip"), 600);
      };
      btn.addEventListener("click", handler);
      rippleHandlers.push([btn, handler]);
    });

    const featCards = document.querySelectorAll(".feat-card");
    const tiltHandlers = [];
    featCards.forEach((card) => {
      const onCardMove = (e) => {
        const r = card.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width - 0.5;
        const cy = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-4px) rotateX(${(-cy * 6).toFixed(1)}deg) rotateY(${(
          cx * 6
        ).toFixed(1)}deg)`;
      };
      const onCardLeave = () => {
        card.style.transform = "";
      };
      card.addEventListener("mousemove", onCardMove);
      card.addEventListener("mouseleave", onCardLeave);
      tiltHandlers.push([card, onCardMove, onCardLeave]);
    });

    const quizOpts = document.querySelectorAll(".bc-opt");
    const quizHandlers = [];
    quizOpts.forEach((opt) => {
      const handler = () => {
        document.querySelectorAll(".bc-opt").forEach((o) => {
          o.classList.remove("correct", "wrong");
          o.style.pointerEvents = "";
        });
        opt.classList.add(
          opt.textContent.trim().startsWith("B") ? "correct" : "wrong"
        );
        document.querySelectorAll(".bc-opt").forEach((o) => {
          o.style.pointerEvents = "none";
        });
        setTimeout(() => {
          document.querySelectorAll(".bc-opt").forEach((o) => {
            o.classList.remove("correct", "wrong");
            o.style.pointerEvents = "";
          });
          const correct = document.querySelector(".bc-opt:nth-child(2)");
          correct?.classList.add("correct");
        }, 1800);
      };
      opt.addEventListener("click", handler);
      quizHandlers.push([opt, handler]);
    });

    const tickerObs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        const tickerWrap = document.querySelector(".ticker-wrap");
        if (!tickerWrap) return;

        const animCount = (el, target, suffix, duration = 1400) => {
          let start = null;
          const from = 0;
          const isFloat = target % 1 !== 0;

          const step = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            const val = from + (target - from) * ease;
            el.textContent =
              (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        };

        document.querySelectorAll(".ticker-num").forEach((el) => {
          const txt = el.textContent || "";
          const num = parseFloat(txt.replace(/[^0-9.]/g, ""));
          const suffix = txt.replace(/[0-9.]/g, "");
          if (!Number.isNaN(num)) animCount(el, num, suffix);
        });

        tickerObs.disconnect();
      },
      { threshold: 0.5 }
    );

    const tickerWrap = document.querySelector(".ticker-wrap");
    if (tickerWrap) tickerObs.observe(tickerWrap);

    return () => {
      rafActive = false;
      cancelAnimationFrame(rafId);

      document.removeEventListener("mousemove", onMove);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterHover);
        el.removeEventListener("mouseleave", onLeaveHover);
      });
      textEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterText);
        el.removeEventListener("mouseleave", onLeaveText);
      });
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);

      window.removeEventListener("scroll", onWindowScroll);

      revealObs.disconnect();
      barObs.disconnect();
      tickerObs.disconnect();

      loginHandlers.forEach(([btn, handler]) =>
        btn.removeEventListener("click", handler)
      );
      navHandlers.forEach(([btn, handler]) =>
        btn.removeEventListener("click", handler)
      );

      rippleHandlers.forEach(([btn, handler]) =>
        btn.removeEventListener("click", handler)
      );
      tiltHandlers.forEach(([card, onCardMove, onCardLeave]) => {
        card.removeEventListener("mousemove", onCardMove);
        card.removeEventListener("mouseleave", onCardLeave);
      });
      quizHandlers.forEach(([opt, handler]) =>
        opt.removeEventListener("click", handler)
      );

      document.body.classList.remove(
        "cursor-hover",
        "cursor-click",
        "cursor-text"
      );
      initGuard.current = false;
    };
  }, [navigate]);
}
