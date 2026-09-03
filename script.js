const units = {
  archon: {
    code: "O–01",
    name: "ARCHON",
    role: "STRATEGY INTELLIGENCE",
    status: "STRATEGIC COMMAND ENTITY",
    coordinates: "U–01 // 84.002",
    copy: "Maps markets, sharpens offers and converts uncertainty into a decisive operating architecture.",
    capabilities: ["MARKET INTELLIGENCE", "OFFER ARCHITECTURE", "DECISION SYSTEMS"],
    metrics: [["ANALYSIS", 96], ["PLANNING", 91], ["COORDINATION", 88]],
  },
  forge: {
    code: "O–02",
    name: "FORGE",
    role: "DIGITAL ENGINEERING",
    status: "SYNTHETIC BUILD ENTITY",
    coordinates: "U–02 // 71.884",
    copy: "Engineers high-performance sites, commerce systems and automations that turn the mission into working infrastructure.",
    capabilities: ["WEB EXPERIENCES", "COMMERCE SYSTEMS", "AUTOMATION BUILDS"],
    metrics: [["ENGINEERING", 97], ["SYSTEMS", 94], ["CONVERSION", 89]],
  },
  muse: {
    code: "O–03",
    name: "MUSE",
    role: "CREATIVE INTELLIGENCE",
    status: "GENERATIVE CULTURE ENTITY",
    coordinates: "U–03 // 93.317",
    copy: "Creates identity, narrative and cinematic content that gives a business a coherent world people can recognize and remember.",
    capabilities: ["BRAND DIRECTION", "AI CONTENT STUDIO", "CAMPAIGN SYSTEMS"],
    metrics: [["IDENTITY", 95], ["NARRATIVE", 93], ["PRODUCTION", 90]],
  },
  vector: {
    code: "O–04",
    name: "VECTOR",
    role: "GROWTH OPERATIONS",
    status: "MARKET VELOCITY ENTITY",
    coordinates: "U–04 // 62.409",
    copy: "Finds demand, initiates qualified conversations and converts attention into a measurable, repeatable growth trajectory.",
    capabilities: ["LEAD INTELLIGENCE", "OUTBOUND SYSTEMS", "GROWTH CAMPAIGNS"],
    metrics: [["PROSPECTING", 94], ["CAMPAIGNS", 91], ["PIPELINE", 92]],
  },
  aegis: {
    code: "O–05",
    name: "AEGIS",
    role: "QUALITY & CONTINUITY",
    status: "SYSTEM GUARDIAN ENTITY",
    coordinates: "U–05 // 98.770",
    copy: "Protects delivery standards, client continuity and system integrity while the mission evolves after launch.",
    capabilities: ["QUALITY ASSURANCE", "CLIENT OPERATIONS", "CONTINUOUS TUNING"],
    metrics: [["QUALITY", 98], ["SUPPORT", 95], ["CONTINUITY", 93]],
  },
};

const missions = {
  brand: {
    code: "PX–01",
    name: "BRAND GENESIS",
    risk: "MEDIUM",
    description: "Transform an early business idea into a distinct, market-ready brand with a strategic position, visual world and launch system.",
    objective: "Build a premium, credible brand system ready to enter the market.",
    outputs: ["MARKET POSITION", "IDENTITY SYSTEM", "LAUNCH NARRATIVE", "90-DAY PLAN"],
    units: ["archon", "muse", "vector"],
    duration: "21 DAYS",
  },
  commerce: {
    code: "PX–02",
    name: "COMMERCE LAUNCH",
    risk: "HIGH",
    description: "Deploy a differentiated commerce experience from offer and storefront to content, acquisition and launch readiness.",
    objective: "Launch a premium commerce experience engineered for conversion.",
    outputs: ["OFFER SYSTEM", "COMMERCE BUILD", "PRODUCT CONTENT", "LAUNCH CAMPAIGN"],
    units: ["archon", "forge", "muse", "vector", "aegis"],
    duration: "35 DAYS",
  },
  growth: {
    code: "PX–03",
    name: "GROWTH OFFENSIVE",
    risk: "HIGH",
    description: "Create a focused acquisition engine that finds qualified demand, starts conversations and converts attention into managed pipeline.",
    objective: "Create a repeatable B2B pipeline with measurable weekly momentum.",
    outputs: ["LEAD MAP", "OUTBOUND SYSTEM", "CAMPAIGN ASSETS", "PIPELINE CONTROL"],
    units: ["archon", "muse", "vector", "aegis"],
    duration: "28 DAYS",
  },
  autonomy: {
    code: "PX–04",
    name: "AUTONOMOUS OPS",
    risk: "ADVANCED",
    description: "Install an AI-assisted operating layer across strategy, delivery, content, growth and client continuity, with human approval at decisive points.",
    objective: "Build a review-first AI operating system for the business.",
    outputs: ["OPERATING MAP", "AGENT WORKFLOWS", "APPROVAL SYSTEM", "CONTROL DASHBOARD"],
    units: ["archon", "forge", "muse", "vector", "aegis"],
    duration: "42 DAYS",
  },
  custom: {
    code: "PX–05",
    name: "CUSTOM PROTOCOL",
    risk: "VARIABLE",
    description: "Assemble a custom ORLYNZA formation around an objective that does not fit a standard mission profile.",
    objective: "Describe the exact business outcome ORLYNZA must deliver.",
    outputs: ["MISSION ANALYSIS", "CUSTOM FORMATION", "EXECUTION ROADMAP", "SUCCESS METRICS"],
    units: ["archon"],
    duration: "SCOPING",
  },
};

const state = {
  focusedUnit: "archon",
  activeMission: "brand",
  selectedUnits: new Set(missions.brand.units),
  deploying: false,
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.body.classList.add("booting");

function runBootSequence() {
  const overlay = $("#boot");
  const bar = $("#bootBar");
  const value = $("#bootValue");
  const message = $("#bootMessage");
  const messages = [
    [20, "Opening quantum channel"],
    [41, "Locating five intelligence forms"],
    [64, "Synchronizing shared memory"],
    [83, "Calibrating human command layer"],
    [100, "ORLYNZA core online"],
  ];
  let progress = 0;
  let timer;

  const finish = () => {
    window.clearInterval(timer);
    progress = 100;
    bar.style.width = "100%";
    value.textContent = "100";
    message.textContent = "ORLYNZA core online";
    window.setTimeout(() => {
      overlay.classList.add("is-complete");
      document.body.classList.remove("booting");
      $$(".origin .reveal").forEach((item, index) => window.setTimeout(() => item.classList.add("in-view"), index * 180));
    }, reducedMotion ? 0 : 280);
  };

  timer = window.setInterval(() => {
    progress = Math.min(100, progress + Math.max(1, Math.round((100 - progress) / 9)));
    bar.style.width = `${progress}%`;
    value.textContent = String(progress).padStart(3, "0");
    const current = messages.find(([limit]) => progress <= limit) || messages[messages.length - 1];
    message.textContent = current[1];
    if (progress >= 100) finish();
  }, reducedMotion ? 12 : 48);

  $("#skipBoot").addEventListener("click", finish, { once: true });
}

function setupVoidField() {
  const canvas = $("#voidField");
  const context = canvas.getContext("2d");
  let particles = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let pointer = { x: -1000, y: -1000 };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(90, Math.max(36, Math.round(width / 18)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.15 + .2,
      vy: Math.random() * .12 + .025,
      vx: (Math.random() - .5) * .04,
      alpha: Math.random() * .36 + .08,
      ion: Math.random() > .72,
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    particles.forEach((particle) => {
      const distance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
      const glow = distance < 135 ? (135 - distance) / 135 : 0;
      context.beginPath();
      context.fillStyle = particle.ion
        ? `rgba(115,232,255,${particle.alpha + glow * .42})`
        : `rgba(202,164,90,${particle.alpha + glow * .3})`;
      context.arc(particle.x, particle.y, particle.r + glow * 1.4, 0, Math.PI * 2);
      context.fill();
      if (glow > .24) {
        context.beginPath();
        context.strokeStyle = `rgba(115,232,255,${glow * .08})`;
        context.moveTo(particle.x, particle.y);
        context.lineTo(pointer.x, pointer.y);
        context.stroke();
      }
      if (!reducedMotion) {
        particle.y -= particle.vy;
        particle.x += particle.vx;
        if (particle.y < -3) particle.y = height + 3;
        if (particle.x < -3) particle.x = width + 3;
        if (particle.x > width + 3) particle.x = -3;
      }
    });
    if (!reducedMotion) window.requestAnimationFrame(draw);
  };

  window.addEventListener("pointermove", (event) => {
    pointer = { x: event.clientX, y: event.clientY };
  }, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  resize();
  draw();
}

function setupScrollSystem() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1, rootMargin: "0px 0px -8%" });

  $$(".reveal").filter((item) => !item.closest(".origin")).forEach((item) => observer.observe(item));

  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    $("#pageProgress").style.width = `${max > 0 ? window.scrollY / max * 100 : 0}%`;
    $("#commandRail").classList.toggle("is-compact", window.scrollY > 70);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

function setupPointerSystems() {
  const cursor = $(".cursor-field");
  const nexus = $("#nexus");
  window.addEventListener("pointermove", (event) => {
    cursor.style.setProperty("--x", `${event.clientX}px`);
    cursor.style.setProperty("--y", `${event.clientY}px`);
  }, { passive: true });

  if (!reducedMotion && window.matchMedia("(pointer:fine)").matches) {
    nexus.addEventListener("pointermove", (event) => {
      const rect = nexus.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      nexus.style.setProperty("--ry", `${x * 3.2}deg`);
      nexus.style.setProperty("--rx", `${y * -2.4}deg`);
    });
    nexus.addEventListener("pointerleave", () => {
      nexus.style.setProperty("--ry", "0deg");
      nexus.style.setProperty("--rx", "0deg");
    });
  }
}

function setUnit(unitKey, { scroll = false } = {}) {
  const unit = units[unitKey];
  if (!unit) return;
  state.focusedUnit = unitKey;
  const os = $("#unitOS");
  os.dataset.activeUnit = unitKey;

  $$("[data-unit]").forEach((button) => {
    const active = button.dataset.unit === unitKey;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  $$("[data-robot]").forEach((robot) => robot.classList.toggle("is-active", robot.dataset.robot === unitKey));
  $$("[data-unit-card]").forEach((card) => card.classList.toggle("is-current", card.dataset.unitCard === unitKey));

  $("#unitCoordinates").textContent = unit.coordinates;
  $("#chamberStatus").textContent = unit.status;
  $("#unitCode").textContent = `ENTITY // ${unit.code}`;
  $("#unitRole").textContent = unit.role;
  $("#unitName").textContent = unit.name;
  $("#unitCopy").textContent = unit.copy;
  $(".unit-dossier").dataset.watermark = unit.name.slice(0, 1);
  $("#capabilityGrid").innerHTML = unit.capabilities.map((item) => `<span>${item}</span>`).join("");
  $("#neuralMetrics").innerHTML = unit.metrics.map(([label, score]) => `
    <div><span>${label}</span><i><b style="--level:${score}%"></b></i><em>${score}</em></div>
  `).join("");

  const assigned = state.selectedUnits.has(unitKey);
  const assignButton = $("#assignUnit");
  assignButton.classList.toggle("is-assigned", assigned);
  assignButton.innerHTML = assigned
    ? "<span>ASSIGNED TO FORMATION</span><b>✓</b>"
    : "<span>ADD TO FORMATION</span><b>+</b>";

  if (scroll) $("#units").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

function calculateReadiness() {
  return Math.min(99, 72 + state.selectedUnits.size * 5 + (state.activeMission === "custom" ? 0 : 4));
}

function renderFormation() {
  $$("[data-unit-toggle]").forEach((button) => button.classList.toggle("is-active", state.selectedUnits.has(button.dataset.unitToggle)));
  $("#unitCount").textContent = `${String(state.selectedUnits.size).padStart(2, "0")} / 05`;
  $("#readiness").textContent = `${calculateReadiness()}%`;
  setUnit(state.focusedUnit);
}

function toggleUnit(unitKey) {
  if (state.selectedUnits.has(unitKey)) {
    if (state.selectedUnits.size === 1) {
      updateMissionLog("WRN.001", "Mission integrity requires at least one active intelligence entity.");
      return;
    }
    state.selectedUnits.delete(unitKey);
  } else {
    state.selectedUnits.add(unitKey);
  }
  renderFormation();
  updateMissionLog("SYS.014", `${units[unitKey].name} ${state.selectedUnits.has(unitKey) ? "linked to" : "released from"} formation.`);
}

function setMission(missionKey) {
  const mission = missions[missionKey];
  if (!mission) return;
  state.activeMission = missionKey;
  state.selectedUnits = new Set(mission.units);

  $$("[data-mission]").forEach((button) => {
    const active = button.dataset.mission === missionKey;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });

  $("#missionCode").textContent = `PROTOCOL // ${mission.code}`;
  $("#briefName").textContent = mission.name;
  $("#missionRisk").textContent = mission.risk;
  $("#missionDescription").textContent = mission.description;
  $("#missionObjective").value = mission.objective;
  $("#charCount").textContent = mission.objective.length;
  $("#outputs").innerHTML = mission.outputs.map((output) => `<i>${output}</i>`).join("");
  $("#missionDuration").textContent = mission.duration;
  renderFormation();
  updateMissionLog("SYS.021", `${mission.name} loaded. ${mission.units.length} intelligence entities synchronized.`);
  resetLaunchButton();
}

function updateMissionLog(code, message) {
  $("#logCode").textContent = code;
  $("#missionLog").textContent = message;
}

function resetLaunchButton() {
  const button = $("#launchMission");
  button.disabled = false;
  button.innerHTML = "<span>INITIATE NEURAL PROTOCOL</span><i>↗</i>";
}

function launchMission() {
  if (state.deploying) return;
  const objective = $("#missionObjective").value.trim();
  if (objective.length < 12) {
    $("#missionObjective").focus();
    updateMissionLog("WRN.002", "Desired reality is incomplete. Add a measurable mission objective.");
    return;
  }

  state.deploying = true;
  const mission = missions[state.activeMission];
  const overlay = $("#deploymentSequence");
  const value = $("#sequenceValue");
  const title = $("#sequenceTitle");
  const log = $("#sequenceLog");
  const button = $("#launchMission");
  button.disabled = true;
  button.innerHTML = "<span>PROTOCOL IN MOTION</span><i>◌</i>";
  $("#sequenceCode").textContent = `${mission.code} / ${String(state.selectedUnits.size).padStart(2, "0")} ENTITIES`;
  overlay.classList.add("is-active");
  overlay.setAttribute("aria-hidden", "false");

  const phases = [
    [17, "READING HUMAN INTENT", "Parsing objective and extracting desired reality…"],
    [39, "FORMING SHARED MEMORY", "ARCHON is constructing the mission architecture…"],
    [63, "SYNCHRONIZING ENTITIES", `${state.selectedUnits.size} intelligence units are exchanging context…`],
    [84, "SIMULATING TRAJECTORY", "Testing dependencies, risk and measurable success conditions…"],
    [100, "MISSION READY", "Strategic brief prepared for human review before execution."],
  ];
  let progress = 0;
  const timer = window.setInterval(() => {
    progress = Math.min(100, progress + Math.max(1, Math.ceil((100 - progress) / 11)));
    value.textContent = `${String(progress).padStart(2, "0")}%`;
    const phase = phases.find(([limit]) => progress <= limit) || phases[phases.length - 1];
    title.textContent = phase[1];
    log.textContent = phase[2];
    if (progress >= 100) {
      window.clearInterval(timer);
      window.setTimeout(() => {
        overlay.classList.remove("is-active");
        overlay.setAttribute("aria-hidden", "true");
        button.innerHTML = "<span>PROTOCOL READY / HUMAN REVIEW</span><i>✓</i>";
        updateMissionLog("RDY.2080", `${mission.name} is initialized. No external action has been taken.`);
        state.deploying = false;
        button.disabled = false;
      }, reducedMotion ? 0 : 1150);
    }
  }, reducedMotion ? 12 : 72);
}

function setupInteractions() {
  $$("[data-unit]").forEach((button) => button.addEventListener("click", () => setUnit(button.dataset.unit)));
  $$("[data-unit-card]").forEach((card) => {
    card.addEventListener("mouseenter", () => setUnit(card.dataset.unitCard));
    card.addEventListener("click", () => setUnit(card.dataset.unitCard));
  });
  $$("[data-unit-focus]").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("is-pulsing");
      setUnit(button.dataset.unitFocus, { scroll: true });
      window.setTimeout(() => button.classList.remove("is-pulsing"), 900);
    });
  });
  $("#assignUnit").addEventListener("click", () => toggleUnit(state.focusedUnit));
  $$("[data-unit-toggle]").forEach((button) => button.addEventListener("click", () => toggleUnit(button.dataset.unitToggle)));
  $$("[data-mission]").forEach((button) => button.addEventListener("click", () => setMission(button.dataset.mission)));
  $("#missionObjective").addEventListener("input", (event) => {
    $("#charCount").textContent = event.target.value.length;
    resetLaunchButton();
  });
  $("#launchMission").addEventListener("click", launchMission);

  const menu = $("#commandRail");
  const toggle = $("#menuToggle");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("#primaryNav a").forEach((link) => link.addEventListener("click", () => {
    menu.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

function setupClock() {
  const update = () => {
    const time = new Date().toLocaleTimeString("en-GB", {
      timeZone: "UTC",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    $("#liveClock").textContent = `${time} UTC`;
    $("#consoleClock").textContent = time;
  };
  update();
  window.setInterval(update, 1000);
}

runBootSequence();
setupVoidField();
setupScrollSystem();
setupPointerSystems();
setupInteractions();
setupClock();
setUnit("archon");
renderFormation();
