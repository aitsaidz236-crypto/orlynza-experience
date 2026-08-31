const units = {
  archon: {
    id: "O–01",
    name: "ARCHON",
    role: "Strategy Intelligence",
    copy: "Strategic command unit. Converts research into a prioritized, measurable mission architecture.",
    capabilities: ["Market intelligence", "Offer architecture", "Decision systems"],
    stats: [["Analysis", 96], ["Planning", 91], ["Coordination", 88]],
  },
  forge: {
    id: "O–02",
    name: "FORGE",
    role: "Digital Engineering",
    copy: "Engineering unit. Converts the mission architecture into fast, precise digital systems built to perform.",
    capabilities: ["Web experiences", "Commerce systems", "Automation builds"],
    stats: [["Engineering", 97], ["Systems", 94], ["Conversion", 89]],
  },
  muse: {
    id: "O–03",
    name: "MUSE",
    role: "Creative Intelligence",
    copy: "Creative unit. Builds a coherent world of identity, narrative and content around the business objective.",
    capabilities: ["Brand direction", "AI content studio", "Campaign systems"],
    stats: [["Identity", 95], ["Narrative", 93], ["Production", 90]],
  },
  vector: {
    id: "O–04",
    name: "VECTOR",
    role: "Growth Operations",
    copy: "Growth unit. Identifies demand, creates qualified conversations and makes pipeline movement measurable.",
    capabilities: ["Lead intelligence", "Outbound systems", "Growth campaigns"],
    stats: [["Prospecting", 94], ["Campaigns", 91], ["Pipeline", 92]],
  },
  aegis: {
    id: "O–05",
    name: "AEGIS",
    role: "Quality & Continuity",
    copy: "Guardian unit. Protects delivery standards, client experience and operational continuity after launch.",
    capabilities: ["Quality assurance", "Client operations", "Continuous tuning"],
    stats: [["Quality", 98], ["Support", 95], ["Continuity", 93]],
  },
};

const missions = {
  brand: {
    code: "PROTOCOL 01",
    name: "BRAND GENESIS",
    risk: "MEDIUM",
    description: "Transform an early business idea into a distinct, market-ready brand with a strategic position, visual world and launch system.",
    objective: "Build a premium, credible brand system ready to enter the market.",
    deliverables: ["Market position", "Identity system", "Launch narrative", "90-day plan"],
    units: ["archon", "muse", "vector"],
    duration: "21 DAYS",
    readiness: "94%",
  },
  commerce: {
    code: "PROTOCOL 02",
    name: "COMMERCE LAUNCH",
    risk: "HIGH",
    description: "Deploy a differentiated commerce experience—from offer and storefront to product content, acquisition system and launch readiness.",
    objective: "Launch a premium commerce experience engineered for conversion.",
    deliverables: ["Offer system", "Commerce build", "Product content", "Launch campaign"],
    units: ["archon", "forge", "muse", "vector", "aegis"],
    duration: "35 DAYS",
    readiness: "91%",
  },
  growth: {
    code: "PROTOCOL 03",
    name: "GROWTH OFFENSIVE",
    risk: "HIGH",
    description: "Create a focused acquisition engine that finds qualified demand, starts conversations and converts attention into a managed pipeline.",
    objective: "Create a repeatable B2B pipeline with measurable weekly momentum.",
    deliverables: ["Lead map", "Outbound system", "Campaign assets", "Pipeline dashboard"],
    units: ["archon", "muse", "vector", "aegis"],
    duration: "28 DAYS",
    readiness: "92%",
  },
  autonomy: {
    code: "PROTOCOL 04",
    name: "AUTONOMOUS OPS",
    risk: "ADVANCED",
    description: "Install an AI-assisted operating layer across strategy, delivery, content, growth and client continuity—with human approval at decisive points.",
    objective: "Build a review-first AI operating system for the business.",
    deliverables: ["Operating map", "Agent workflows", "Approval system", "Control dashboard"],
    units: ["archon", "forge", "muse", "vector", "aegis"],
    duration: "42 DAYS",
    readiness: "88%",
  },
  custom: {
    code: "PROTOCOL 05",
    name: "CUSTOM PROTOCOL",
    risk: "VARIABLE",
    description: "Assemble a custom ORLYNZA formation around an objective that does not fit a standard mission profile.",
    objective: "Describe the exact business outcome ORLYNZA must deliver.",
    deliverables: ["Mission analysis", "Custom formation", "Execution roadmap", "Success metrics"],
    units: ["archon"],
    duration: "SCOPING",
    readiness: "76%",
  },
};

const state = {
  activeMission: "brand",
  selectedUnits: new Set(missions.brand.units),
  focusedUnit: "archon",
  launched: false,
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

document.body.classList.add("booting");

function bootSequence() {
  const screen = $("#bootScreen");
  const bar = $("#bootProgress");
  const percent = $("#bootPercent");
  const message = $("#bootMessage");
  const messages = [
    [18, "Establishing secure uplink"],
    [42, "Synchronizing five units"],
    [67, "Loading mission protocols"],
    [88, "Verifying command integrity"],
    [100, "Mission Control online"],
  ];
  let progress = 0;
  let interval;

  const complete = () => {
    clearInterval(interval);
    progress = 100;
    bar.style.width = "100%";
    percent.textContent = "100%";
    message.textContent = "Mission Control online";
    window.setTimeout(() => {
      screen.classList.add("is-complete");
      document.body.classList.remove("booting");
      $$(".command-deck .reveal").forEach((item, index) => {
        window.setTimeout(() => item.classList.add("in-view"), 120 * index);
      });
    }, 260);
  };

  interval = window.setInterval(() => {
    progress += Math.max(1, Math.round((100 - progress) / 12));
    progress = Math.min(progress, 100);
    bar.style.width = `${progress}%`;
    percent.textContent = `${String(progress).padStart(2, "0")}%`;
    const current = messages.find(([threshold]) => progress <= threshold) || messages.at(-1);
    message.textContent = current[1];
    if (progress >= 100) complete();
  }, 55);

  $("#skipBoot").addEventListener("click", complete, { once: true });
}

function setupSignalField() {
  const canvas = $("#signalField");
  const context = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let points = [];
  let raf;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const total = Math.min(65, Math.floor(window.innerWidth / 23));
    points = Array.from({ length: total }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.1 + .2,
      v: Math.random() * .09 + .025,
      a: Math.random() * .45 + .12,
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const point of points) {
      context.beginPath();
      context.fillStyle = `rgba(202,165,91,${point.a})`;
      context.arc(point.x, point.y, point.r, 0, Math.PI * 2);
      context.fill();
      if (!reducedMotion) {
        point.y -= point.v;
        if (point.y < -2) point.y = window.innerHeight + 2;
      }
    }
    if (!reducedMotion) raf = requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener("resize", () => {
    cancelAnimationFrame(raf);
    resize();
    draw();
  }, { passive: true });
}

function setupScrollEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: "0px 0px -7% 0px" });

  $$(".reveal")
    .filter((item) => !item.closest(".command-deck"))
    .forEach((item) => observer.observe(item));

  const meter = $("#scrollMeter");
  const parallax = $("[data-parallax]");
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    meter.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    if (parallax && window.innerWidth > 820 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const rect = parallax.getBoundingClientRect();
      const offset = (window.innerHeight * .5 - (rect.top + rect.height * .5)) * Number(parallax.dataset.parallax);
      parallax.style.translate = `0 ${Math.max(-26, Math.min(26, offset))}px`;
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

function setupPointer() {
  const aura = $(".cursor-aura");
  window.addEventListener("pointermove", (event) => {
    aura.style.setProperty("--x", `${event.clientX}px`);
    aura.style.setProperty("--y", `${event.clientY}px`);
  }, { passive: true });
}

function renderDossier(unitKey) {
  const unit = units[unitKey];
  if (!unit) return;
  state.focusedUnit = unitKey;
  $("#dossierId").textContent = unit.id;
  $("#dossierName").textContent = unit.name;
  $("#dossierCopy").textContent = unit.copy;
  $(".dossier-stats").innerHTML = unit.stats.map(([label, value]) => `
    <span><i style="--value:${value}%"></i><b>${label} ${value}%</b></span>
  `).join("");
}

function renderUnitSelection() {
  $$(".unit-card").forEach((card) => {
    const selected = state.selectedUnits.has(card.dataset.unit);
    card.classList.toggle("is-selected", selected);
    $(".card-top i", card).textContent = selected ? "ACTIVE" : "READY";
    $(":scope > button", card).innerHTML = selected
      ? "UNIT SELECTED <span>✓</span>"
      : "ADD TO MISSION <span>+</span>";
  });

  $("#assignedUnits").innerHTML = [...state.selectedUnits].map((key) => {
    const unit = units[key];
    return `<div class="assigned-unit"><span>${unit.name[0]}</span><strong>${unit.name}</strong><i title="Online"></i></div>`;
  }).join("");
  $("#unitCount").textContent = `${state.selectedUnits.size} / 5`;

  const readiness = Math.min(99, 70 + state.selectedUnits.size * 5 + (state.activeMission === "custom" ? 0 : 4));
  $("#readiness").textContent = `${readiness}%`;
}

function toggleUnit(unitKey) {
  if (state.selectedUnits.has(unitKey)) {
    if (state.selectedUnits.size === 1) {
      updateLog("WARN 01", "At least one ORLYNZA unit is required for mission integrity.");
      return;
    }
    state.selectedUnits.delete(unitKey);
  } else {
    state.selectedUnits.add(unitKey);
  }
  renderUnitSelection();
  state.launched = false;
  resetLaunchButton();
}

function openUnitModal(unitKey) {
  const unit = units[unitKey];
  const modal = $("#unitModal");
  state.focusedUnit = unitKey;
  $("#modalIndex").textContent = `${unit.id.replace("O–", "UNIT 0")} / ${unit.role.toUpperCase()}`;
  $("#modalName").textContent = unit.name;
  $("#modalDescription").textContent = unit.copy;
  $("#modalCapabilities").innerHTML = unit.capabilities.map((item) => `<span>${item}</span>`).join("");
  $("#modalSelect").textContent = state.selectedUnits.has(unitKey) ? "REMOVE UNIT FROM MISSION" : "ADD UNIT TO MISSION";
  modal.showModal();
}

function setupUnits() {
  $$(".unit-card").forEach((card) => {
    const unitKey = card.dataset.unit;
    card.addEventListener("mouseenter", () => renderDossier(unitKey));
    card.addEventListener("focus", () => renderDossier(unitKey));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openUnitModal(unitKey);
      }
    });
    $(":scope > button", card).addEventListener("click", () => toggleUnit(unitKey));
  });

  $$(".unit-hotspot").forEach((hotspot) => hotspot.addEventListener("click", () => openUnitModal(hotspot.dataset.unit)));
  $("#modalClose").addEventListener("click", () => $("#unitModal").close());
  $("#unitModal").addEventListener("click", (event) => {
    if (event.target === $("#unitModal")) $("#unitModal").close();
  });
  $("#modalSelect").addEventListener("click", () => {
    toggleUnit(state.focusedUnit);
    $("#modalSelect").textContent = state.selectedUnits.has(state.focusedUnit) ? "REMOVE UNIT FROM MISSION" : "ADD UNIT TO MISSION";
  });
}

function setMission(missionKey, { scroll = false } = {}) {
  const mission = missions[missionKey];
  if (!mission) return;
  state.activeMission = missionKey;
  state.selectedUnits = new Set(mission.units);
  state.launched = false;

  $$("[data-mission]").forEach((button) => {
    const active = button.dataset.mission === missionKey;
    button.classList.toggle("is-active", active);
    if (button.getAttribute("role") === "tab") button.setAttribute("aria-selected", String(active));
  });

  $("#missionCode").textContent = mission.code;
  $("#missionName").textContent = mission.name;
  $("#missionRisk").textContent = mission.risk;
  $("#missionDescription").textContent = mission.description;
  $("#missionObjective").value = mission.objective;
  $("#charCount").textContent = mission.objective.length;
  $("#deliverablesList").innerHTML = mission.deliverables.map((item) => `<li>${item}</li>`).join("");
  $("#missionDuration").textContent = mission.duration;
  renderUnitSelection();
  resetLaunchButton();
  updateLog("SYS 01", `${mission.name} loaded. ${mission.units.length} units assigned.`);
  if (scroll) $("#mission").scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateLog(code, text) {
  $("#missionLog span").textContent = code;
  $("#missionLog p").textContent = text;
}

function resetLaunchButton() {
  const button = $("#launchMission");
  button.classList.remove("is-running");
  button.disabled = false;
  button.innerHTML = "<span>INITIATE PROTOCOL</span><i aria-hidden=\"true\">↗</i>";
  $("#systemState span").textContent = "5 UNITS ONLINE";
  $("#systemState").classList.remove("is-deployed");
}

function launchMission() {
  const objective = $("#missionObjective").value.trim();
  const button = $("#launchMission");
  if (objective.length < 12) {
    $("#missionObjective").focus();
    updateLog("WARN 02", "Mission objective is too brief. Define a measurable outcome before deployment.");
    return;
  }

  button.disabled = true;
  button.classList.add("is-running");
  button.innerHTML = "<span>SYNCHRONIZING UNITS…</span><i aria-hidden=\"true\">◌</i>";
  updateLog("RUN 01", `Parsing objective: ${objective.slice(0, 72)}${objective.length > 72 ? "…" : ""}`);

  const logs = [
    [650, "RUN 02", `ARCHON mapping success criteria for ${missions[state.activeMission].name}.`],
    [1300, "RUN 03", `${state.selectedUnits.size} assigned units synchronized. Mission architecture stable.`],
    [2050, "READY", "Protocol initialized. Strategic brief queued for human review before execution."],
  ];
  logs.forEach(([delay, code, text], index) => {
    window.setTimeout(() => {
      updateLog(code, text);
      if (index === logs.length - 1) {
        state.launched = true;
        button.disabled = false;
        button.innerHTML = "<span>PROTOCOL INITIALIZED</span><i aria-hidden=\"true\">✓</i>";
        $("#systemState span").textContent = "MISSION ACTIVE";
        $("#systemState").classList.add("is-deployed");
      }
    }, delay);
  });
}

function setupMissionControl() {
  $$(".mission-tabs [data-mission]").forEach((button) => button.addEventListener("click", () => setMission(button.dataset.mission)));
  $$(".quick-option").forEach((button) => button.addEventListener("click", () => setMission(button.dataset.mission, { scroll: true })));

  const objective = $("#missionObjective");
  objective.addEventListener("input", () => {
    if (objective.value.length > 280) objective.value = objective.value.slice(0, 280);
    $("#charCount").textContent = objective.value.length;
    state.launched = false;
    resetLaunchButton();
  });
  $("#launchMission").addEventListener("click", launchMission);

  const updateClock = () => {
    $("#consoleClock").textContent = `${new Date().toISOString().slice(11, 19)} UTC`;
  };
  updateClock();
  window.setInterval(updateClock, 1000);
}

function setupNavigation() {
  const topbar = $(".topbar");
  const toggle = $("#menuToggle");
  toggle.addEventListener("click", () => {
    const open = topbar.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$(".topbar nav a").forEach((link) => link.addEventListener("click", () => {
    topbar.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

bootSequence();
setupSignalField();
setupScrollEffects();
setupPointer();
setupUnits();
setupMissionControl();
setupNavigation();
renderUnitSelection();
