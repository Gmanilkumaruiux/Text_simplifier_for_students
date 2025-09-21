
document.addEventListener("DOMContentLoaded", () => {

  // ===================== NAVIGATION =====================
  const pages = {
    home: document.getElementById("page-home"),
    simplify: document.getElementById("page-simplify"),
    glossary: document.getElementById("page-glossary")
  };
  const navButtons = {
    home: document.getElementById("nav-home"),
    simplify: document.getElementById("nav-simplify"),
    glossary: document.getElementById("nav-glossary")
  };

  function showPage(pageKey) {
    Object.values(pages).forEach(p => p.style.display = "none");
    Object.values(navButtons).forEach(b => b.classList.remove("active"));
    
    if (pages[pageKey]) {
      pages[pageKey].style.display = "block";
      navButtons[pageKey].classList.add("active");
    }
  }

  Object.keys(navButtons).forEach(key => {
    navButtons[key].addEventListener("click", () => showPage(key));
  });

  document.querySelectorAll("[data-go]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-go").replace("#", "");
      showPage(target);
    });
  });
  
  showPage("home"); // Show home page by default

  // ===================== THEME TOGGLE =====================
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });

  // ===================== DICTIONARY (EXPANDED) =====================
  const dictionary = {
    "a significant number of": "many",
    "accelerate": "speed up",
    "accompany": "go with",
    "accomplish": "do",
    "accordingly": "so",
    "acquire": "get",
    "additional": "more",
    "adjacent to": "next to",
    "advantageous": "helpful",
    "adversely impact": "harm",
    "advise": "tell",
    "aggregate": "total",
    "all of a sudden": "suddenly",
    "ameliorate": "improve",
    "anticipate": "expect",
    "apparent": "clear",
    "appreciable": "enough",
    "as a result of": "because of",
    "ascertain": "find out",
    "assistance": "help",
    "at this point in time": "now",
    "attain": "reach",
    "attempt": "try",
    "be advised": "please know",
    "broader implications": "wider effects",
    "cease": "stop",
    "close proximity": "near",
    "commence": "start",
    "component": "part",
    "comprehend": "understand",
    "concerning": "about",
    "consequently": "so",
    "consolidate": "combine",
    "construct": "build",
    "deem": "believe",
    "demonstrate": "show",
    "depart": "leave",
    "designate": "choose",
    "discontinue": "stop",
    "due to the fact that": "because",
    "elucidate": "explain",
    "employ": "use",
    "endeavor": "try",
    "enumerate": "count",
    "equivalent": "equal",
    "erroneous": "wrong",
    "evaluate": "check",
    "evince": "show",
    "exclusively": "only",
    "expedite": "speed up",
    "expend": "spend",
    "expertise": "skill",
    "fabricate": "make",
    "facilitate": "help",
    "feasible": "workable",
    "finalize": "finish",
    "for the purpose of": "to",
    "frequently": "often",
    "function": "work",
    "fundamental": "basic",
    "furthermore": "also",
    "however": "but",
    "identical": "same",
    "identify": "find",
    "if this is not the case": "if not",
    "in accordance with": "by",
    "in addition": "also",
    "in all cases": "always",
    "in an effort to": "to",
    "in order to": "to",
    "in regard to": "about",
    "in the event that": "if",
    "in the near future": "soon",
    "in view of": "since",
    "inception": "start",
    "indicate": "show",
    "initial": "first",
    "initiate": "start",
    "interrogate": "question",
    "is of the opinion that": "believes",
    "it is crucial that": "must",
    "it is essential that": "must",
    "liaise": "work with",
    "magnitude": "size",
    "maintain": "keep",
    "maximum": "most",
    "methodology": "method",
    "minimize": "cut",
    "minimum": "least",
    "modify": "change",
    "monitor": "check",
    "multiple": "many",
    "necessitate": "require",
    "nevertheless": "but",
    "notify": "tell",
    "numerous": "many",
    "objective": "goal",
    "observe": "see",
    "obtain": "get",
    "on a daily basis": "daily",
    "on the contrary": "but",
    "operate": "run",
    "optimum": "best",
    "otherwise": "or else",
    "participate": "take part",
    "perform": "do",
    "permit": "let",
    "portion": "part",
    "possess": "have",
    "preserve": "protect",
    "principal": "main",
    "prior to": "before",
    "prioritize": "rank",
    "proceed": "go on",
    "procure": "get",
    "proficient": "skilled",
    "provide": "give",
    "purchase": "buy",
    "regarding": "about",
    "relative to": "about",
    "relocate": "move",
    "remain": "stay",
    "remuneration": "payment",
    "render": "make",
    "report": "tell",
    "request": "ask",
    "require": "need",
    "reside": "live",
    "retain": "keep",
    "selection": "choice",
    "state": "say",
    "strategize": "plan",
    "submit": "send",
    "subsequent": "next",
    "substantial": "large",
    "successfully complete": "pass",
    "sufficient": "enough",
    "summon": "call",
    "terminate": "end",
    "therefore": "so",
    "transmit": "send",
    "transpire": "happen",
    "until such time as": "until",
    "utilize": "use",
    "validate": "confirm",
    "variation": "change",
    "viable": "workable",
    "visualize": "picture",
    "whereas": "while",
    "with reference to": "about",
    "with the exception of": "except for"
  };

  // ===================== SIMPLIFY FUNCTION (Used by both pages) =====================
  function simplifyText(text) {
    let simplified = ` ${text} `; // Add padding for better word boundary matching
    Object.entries(dictionary)
      .sort((a, b) => b[0].length - a[0].length) // Process longer phrases first
      .forEach(([complex, simple]) => {
        const regex = new RegExp(`\\b${complex}\\b`, "gi");
        simplified = simplified.replace(regex, simple);
      });
    return simplified.trim();
  }

  // ===================== HOME PAGE INTERACTIVE DEMO (NEW) =====================
  const demoBtn = document.getElementById("demo-simplify-btn");
  const demoBeforeText = document.getElementById("demo-before-text");
  const demoAfterText = document.getElementById("demo-after-text");

  if (demoBtn) {
    demoBtn.addEventListener("click", () => {
      const originalText = demoBeforeText.textContent;
      const simplifiedText = simplifyText(originalText);
      
      // Typing animation effect
      let i = 0;
      demoAfterText.textContent = "";
      demoBtn.disabled = true;
      function typeWriter() {
        if (i < simplifiedText.length) {
          demoAfterText.textContent += simplifiedText.charAt(i);
          i++;
          setTimeout(typeWriter, 30);
        } else {
            demoBtn.disabled = false;
        }
      }
      typeWriter();
    });
  }

  // ===================== SIMPLIFY PAGE LOGIC =====================
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const simplifyBtn = document.getElementById("simplifyBtn");
  const copyBtn = document.getElementById("copyBtn");
  const clearAllBtn = document.getElementById("clearAllBtn");
  const textStats = document.getElementById("text-stats");
  const spinner = document.getElementById("spinner");
  const toast = document.getElementById("toast");
  
  if(inputText) {
    inputText.addEventListener("input", updateTextStats);
  }
  
  function updateTextStats() {
    const text = inputText.value;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const charCount = text.length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed
    
    textStats.innerHTML = `
      <span>Words: ${wordCount}</span>
      <span>Characters: ${charCount}</span>
      <span>Reading Time: ~${readingTime} min</span>
    `;
  }
  
  if(simplifyBtn) {
    simplifyBtn.addEventListener("click", () => {
      const text = inputText.value.trim();
      if (!text) {
        showToast("Please enter some text to simplify.");
        return;
      }

      spinner.style.display = "block";
      simplifyBtn.disabled = true;

      setTimeout(() => {
        const simplifiedResult = simplifyText(text);
        outputText.textContent = simplifiedResult;
        
        spinner.style.display = "none";
        simplifyBtn.disabled = false;
      }, 500);
    });
  }
  
  function copyOutputText() {
    const textToCopy = outputText.textContent.trim();
    if (!textToCopy) {
      showToast("Nothing to copy from output.");
      return;
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => showToast("Output text copied to clipboard!"))
        .catch(err => {
          console.error("Modern copy failed:", err);
          showToast("Could not copy text.");
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";
      textArea.style.top = "-9999px";
      textArea.style.left = "-9999px";
      
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        showToast("Output text copied to clipboard!");
      } catch (err) {
        console.error("Fallback copy failed:", err);
        showToast("Could not copy text.");
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", copyOutputText);
  }

  if(clearAllBtn) {
    clearAllBtn.addEventListener("click", () => {
      inputText.value = "";
      outputText.textContent = "";
      updateTextStats();
    });
  }
  
  // ===================== GLOSSARY PAGE LOGIC =====================
  const glossSearch = document.getElementById("glossSearch");
  const glossaryListFull = document.getElementById("glossaryListFull");

  function renderGlossary(filter = "") {
    if (!glossaryListFull) return;
    const filterText = filter.toLowerCase();
    const entries = Object.entries(dictionary)
      .filter(([complex, simple]) => 
        complex.toLowerCase().includes(filterText) || 
        simple.toLowerCase().includes(filterText)
      );

    glossaryListFull.innerHTML = entries.length ? entries.map(([complex, simple]) =>
        `<div class="glossary-item"><strong>${complex}</strong><p>${simple}</p></div>`
    ).join("") : "<p>No matches found.</p>";
  }
  
  if (glossSearch) {
    glossSearch.addEventListener("input", () => renderGlossary(glossSearch.value));
  }
  
  renderGlossary();

  // ===================== UTILITY FUNCTIONS =====================
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

});

