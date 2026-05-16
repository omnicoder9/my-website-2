const blogCategoryLabels = [
  "AI & Machine Learning",
  "Cyber-Physical Systems",
  "Engineering",
  "Math & Physics",
  "Networks",
  "Philosophy & Learning",
  "Privacy",
  "Programming & Software",
  "Security",
  "Society & Civics",
  "Veganism",
  "Web & UI"
] as const;

type BlogCategory = typeof blogCategoryLabels[number];

type BlogDirectoryPost = {
  path: string;
  publishedAt?: string;
  publishedLabel?: string;
  summary: string;
  title: string;
};

const blogPosts: BlogDirectoryPost[] = [
  {
    path: "blog-articles/threat-hunter-role.html",
    publishedAt: "2026-05-16",
    summary: "A technical role guide to threat hunting, covering investigative workflows, detection strategy, threat intelligence use, tooling, and the organizational function of proactive adversary pursuit.",
    title: "The Threat Hunter: Proactive Pursuit in the Age of Advanced Adversaries"
  },
  {
    path: "blog-articles/swift-programming-language.html",
    publishedAt: "2026-05-16",
    summary: "A comprehensive technical portrait of Swift, tracing its design philosophy, language evolution, performance model, ecosystem position, and growing reach beyond Apple platforms.",
    title: "Swift: Safe, Fast, and Expressive by Design"
  },
  {
    path: "blog-articles/senior-engineer-thinking.html",
    publishedAt: "2026-05-16",
    summary: "A practical essay on senior engineer judgment across architecture, tradeoffs, scalability, maintainability, leadership, mentoring, and build-vs-buy decision-making.",
    title: "Senior Engineer Thinking: Architecture, Tradeoffs, Growth, and Technical Leadership"
  },
  {
    path: "blog-articles/red-teamer-infosec.html",
    publishedAt: "2026-05-16",
    summary: "An inside look at professional red teaming, including adversary emulation, offensive methodology, tooling, credentials, and how red teams test whether security defenses truly hold.",
    title: "The Red Teamer: Thinking Like the Adversary"
  },
  {
    path: "blog-articles/mcp.html",
    publishedAt: "2026-05-16",
    summary: "A deep technical review of the Model Context Protocol, covering its architecture, deployment patterns, security risks, ecosystem evolution, and why it matters for modern AI agents.",
    title: "Model Context Protocol: Architecture, Deployment, and the Agentic Future"
  },
  {
    path: "blog-articles/info-access-debate.html",
    publishedAt: "2026-05-16",
    summary: "A historical and economic analysis of the access-to-knowledge debate, from open access and scholarly publishing to shadow libraries and new community-owned information commons.",
    title: "Information Wants to Be Free… Or Should It?"
  },
  {
    path: "blog-articles/embedded-firmware-layer.html",
    publishedAt: "2026-05-16",
    summary: "A systems-level survey of the embedded software and firmware layer in cyber-physical systems, from bare-metal programming and RTOS design to embedded Linux and secure boot.",
    title: "The Embedded Software & Firmware Layer"
  },
  {
    path: "blog-articles/edge-computing-layer.html",
    publishedAt: "2026-05-16",
    summary: "A technical guide to the edge computing layer of cyber-physical systems, focusing on local processing, protocol translation, resilience, orchestration, and real-time operational constraints.",
    title: "The Edge Computing Layer of Cyber-Physical Systems"
  },
  {
    path: "blog-articles/device-drivers-cps.html",
    publishedAt: "2026-05-16",
    summary: "A technical survey of device drivers and hardware interfaces in cyber-physical systems, spanning bus protocols, driver architecture, and the tradeoffs behind hardware-software integration.",
    title: "Device Drivers & Hardware Interfaces"
  },
  {
    path: "blog-articles/spring-testing-article.html",
    publishedAt: "2026-05-14",
    summary: "A practical technical guide to testing Spring applications across unit, slice, integration, security, persistence, and Testcontainers-based workflows.",
    title: "Testing Spring Applications: A Comprehensive Technical Guide"
  },
  {
    path: "blog-articles/signal-conditioning-hardware.html",
    publishedAt: "2026-05-14",
    summary: "A hardware-focused deep dive into amplification, filtering, isolation, bridge circuits, ADC interfacing, and the analog front-end techniques that turn noisy measurements into usable data.",
    title: "Signal Conditioning Hardware — From Raw Noise to Reliable Data"
  },
  {
    path: "blog-articles/planning-reduction-sat-modelchecking.html",
    publishedAt: "2026-05-14",
    summary: "A technical article on automated planning by reduction, explaining how SAT encodings, SATplan, bounded horizons, and model-checking ideas solve planning problems.",
    title: "Automated Planning by Reduction: SAT and Model Checking"
  },
  {
    path: "blog-articles/math-geometry-competitive-programming.html",
    publishedAt: "2026-05-14",
    summary: "A competitive programming guide to geometric reasoning, numeric techniques, line and polygon operations, and the mathematical patterns that show up in contest problems.",
    title: "Math & Geometry in Competitive Programming"
  },
  {
    path: "blog-articles/java-build-tools.html",
    publishedAt: "2026-05-14",
    summary: "A technical deep dive into Java build tools, covering Maven, Gradle, Ant, dependency management, build lifecycles, and the trade-offs between ecosystem approaches.",
    title: "Java Build Tools: A Technical Deep Dive"
  },
  {
    path: "blog-articles/entertainment-sport-spectacle.html",
    publishedAt: "2026-05-14",
    summary: "An analysis of how animals are used in entertainment, sport, and public spectacle, with attention to cultural normalization, welfare rhetoric, and structural harm.",
    title: "The Spectacle of Suffering: Animals in Entertainment, Sport, and Display"
  },
  {
    path: "blog-articles/embedded-compute-layer.html",
    publishedAt: "2026-05-14",
    summary: "A systems-level look at embedded compute platforms, covering MCUs, MPUs, memory, real-time constraints, sensor interfaces, and the processing layer behind connected devices.",
    title: "The Embedded Compute Layer: The Brain Behind the Sensor"
  },
  {
    path: "blog-articles/cps-physical-layer.html",
    publishedAt: "2026-05-14",
    summary: "A technical article on the physical layer of cyber-physical systems, connecting sensors, actuators, transducers, timing, and real-world signal behavior to higher-level system design.",
    title: "The Physical Layer of Cyber-Physical Systems"
  },
  {
    path: "blog-articles/ai-model-vulnerabilities.html",
    publishedAt: "2026-05-14",
    summary: "A field guide to AI model vulnerabilities, covering prompt injection, jailbreaks, data leakage, tool abuse, adversarial behavior, and practical red-team thinking for model security.",
    title: "Model Vulnerabilities: An AI Red Teamer's Field Guide"
  },
  {
    path: "blog-articles/animal-research-science-education.html",
    publishedAt: "2026-05-14",
    summary: "An analysis of animal use in biomedical research, product testing, and education, examining scientific claims, institutional incentives, ethics, and alternatives.",
    title: "The Scientific Use of Animals: Biomedical Research, Testing, and Education"
  },
  {
    path: "blog-articles/humane-ethical-small-scale-animal-use.html",
    publishedAt: "2026-05-11",
    summary: "A critical analysis of welfare branding, humanewashing, and small-scale animal use, arguing that 'humane' and 'ethical' framing relieves moral pressure without changing the underlying structure of exploitation.",
    title: "The Moral Escape Valve: \"Humane,\" \"Ethical,\" and Small-Scale Animal Use"
  },
  {
    path: "blog-articles/api-security-best-practices.html",
    publishedAt: "2026-05-10",
    summary: "A technical reference on API security covering the OWASP API Top 10, authentication, JWT, OAuth 2.0, access control, input validation, rate limiting, and runtime monitoring.",
    title: "API Security Best Practices — A Technical Reference"
  },
  {
    path: "blog-articles/newtons_second_law_dynamics.html",
    publishedAt: "2026-05-10",
    summary: "A dynamics-focused technical article on Newton's second law for particles and systems, connecting force balances, coordinate frames, free-body diagrams, and structural dynamics formulations.",
    title: "Newton's Second Law for a Particle & System — The Cornerstone Equation of Dynamics"
  },
  {
    path: "blog-articles/drl-humanoid-robotics.html",
    publishedAt: "2026-05-10",
    summary: "A technical review of deep reinforcement learning for humanoid robotics, covering actor-critic methods, sim-to-real transfer, locomotion, manipulation, and emerging embodied AI paradigms.",
    title: "Deep Reinforcement Learning for Humanoid Robotics"
  },
  {
    path: "blog-articles/causal_ai.html",
    publishedAt: "2026-05-10",
    summary: "A technical essay on causal AI, tracing the shift from correlational machine learning toward structural causal models, interventions, counterfactuals, and mechanism-aware intelligence.",
    title: "Causal AI: From Association to Mechanism"
  },
  {
    path: "blog-articles/cache-timing-attacks.html",
    publishedAt: "2026-05-10",
    summary: "A technical deep dive into cache timing attacks, covering CPU cache architecture, Prime+Probe and Flush+Reload techniques, Spectre and Meltdown, and defense strategies across hardware and software.",
    title: "Cache Timing Attacks: A Technical Deep Dive"
  },
  {
    path: "blog-articles/hidden-animal-ingredients.html",
    publishedAt: "2026-05-10",
    summary: "A reference guide to hidden animal-derived ingredients in food, pharmaceuticals, cosmetics, and consumer goods, with labeling pitfalls and activist strategy implications.",
    title: "Animal Ingredients Hidden in Plain Sight"
  },
  {
    path: "blog-articles/action-model-learning.html",
    publishedAt: "2026-05-08",
    summary: "A technical survey of action model learning in automated planning, covering STRIPS and PDDL model induction, observability constraints, symbolic and neural methods, and open research challenges.",
    title: "Action Model Learning in Automated Planning"
  },
  {
    path: "blog-articles/explainable-ai-lime-shap.html",
    publishedAt: "2026-05-08",
    summary: "A technical deep dive into LIME and SHAP, covering local explanation methods, Shapley-value foundations, implementation trade-offs, failure modes, and regulated use cases.",
    title: "Explainable AI: LIME & SHAP — A Technical Deep Dive"
  },
  {
    path: "blog-articles/insects-and-small-animals.html",
    publishedAt: "2026-05-08",
    summary: "An ethics-focused examination of insect sentience, small-animal exploitation, pest control, and how vegan advocacy should reason about trillions of overlooked animals.",
    title: "The Overlooked Trillions: Insects, Small Animals, and the Frontiers of Vegan Ethics"
  },
  {
    path: "blog-articles/automated-planning.html",
    publishedAt: "2026-05-07",
    summary: "A technical survey of classical AI planning and scheduling, covering state-space search, regression, partial-order planning, STRIPS, PDDL, and modern research directions.",
    title: "Automated Planning and Scheduling Algorithms"
  },
  {
    path: "blog-articles/digital-privacy-levels.html",
    publishedAt: "2026-05-07",
    summary: "An editorial guide to four practical privacy levels, from default exposure and basic hygiene to browser compartmentation and targeted-risk protection.",
    title: "The Four Levels of Digital Privacy"
  },
  {
    path: "blog-articles/digital-privacy-l4-l5.html",
    publishedAt: "2026-05-07",
    summary: "A long-form analysis of high-risk digital privacy practice, covering metadata exposure, hardened endpoints, adversarial environments, and the defensive lessons of Level 4 and Level 5 tradecraft.",
    title: "Hostile Terrain: Digital Privacy at Levels 4 and 5"
  },
  {
    path: "blog-articles/grc-enterprise-ai-data-governance.html",
    publishedAt: "2026-05-06",
    summary: "A long-form analysis of how enterprise GRC models need to adapt for AI, with emphasis on data governance, model accountability, monitoring, and regulatory readiness.",
    title: "GRC for Enterprise AI: Rethinking Data Governance from the Ground Up"
  },
  {
    path: "blog-articles/sdn-ibn-article.html",
    publishedAt: "2026-05-06",
    summary: "A long-form technical survey of software-defined networking and intent-based networking, from control-plane separation and OpenFlow to policy automation and programmable data planes.",
    title: "The Programmable Network: SDN and Intent-Based Networking"
  },
  {
    path: "blog-articles/market-based-vegan-activism.html",
    publishedAt: "2026-05-06",
    summary: "A strategy essay on venture capital, price parity, procurement, and market-shaping tactics as mechanisms for scaling vegan change beyond persuasion alone.",
    title: "The Market Is the Message: Market-Based Vegan Activism"
  },
  {
    path: "blog-articles/investigations-exposure-article.html",
    publishedAt: "2026-04-27",
    summary: "A long-form analysis of undercover investigations, whistleblowers, ag-gag laws, and exposure tactics as one of the movement's most effective tools against factory farming secrecy.",
    title: "Eyes Behind the Wall: Investigations and Exposure in Animal Activism"
  },
  {
    path: "blog-articles/vegan_cultural_change.html",
    publishedAt: "2026-04-26",
    summary: "An essay on narrative, documentary film, identity, norms, language, and religion as the slow but durable machinery of vegan cultural change.",
    title: "The Long Game: How Culture Becomes the Most Powerful Engine of Vegan Change"
  },
  {
    path: "blog-articles/network-layered-models.html",
    publishedAt: "2026-04-26",
    summary: "A long-form history and comparison of the OSI and TCP/IP models, from ARPANET and standards politics to modern cloud and SDN abstractions.",
    title: "The Architecture of Everything: Network Layered Models Explained"
  },
  {
    path: "blog-articles/vegan-behavioral-interventions.html",
    publishedAt: "2026-04-26",
    summary: "A research synthesis on defaults, nudges, product placement, habits, commitment devices, and framing as behavioral levers for plant-based eating.",
    title: "The Architecture of Choice: Behavioral Science and Plant-Based Eating"
  },
  {
    path: "blog-articles/zero-trust-architecture.html",
    publishedAt: "2026-04-26",
    summary: "A long-form analysis of zero trust architecture, from the collapse of perimeter security to identity-centric access control and microsegmentation.",
    title: "The Death of the Moat: Zero Trust and the End of the Perimeter"
  },
  {
    path: "blog-articles/edge-iot-networking.html",
    publishedAt: "2026-04-25",
    summary: "A technical survey of edge and IoT networking, from MQTT's origins and brokered messaging to device-gateway-cloud architecture and current design trade-offs.",
    title: "Edge & IoT Networking Models: The Architecture of the Always-On World"
  },
  {
    path: "blog-articles/vegan_business_models.html",
    publishedAt: "2026-04-24",
    summary: "A strategy essay on venture infrastructure, institutional defaults, subsidy reform, insurance, and investor pressure as business levers against factory farming.",
    title: "The Market for Mercy: How Business Is Ending Factory Farming"
  },
  {
    path: "blog-articles/learning-modalities.html",
    publishedAt: "2026-04-24",
    summary: "A research-heavy comparison of lectures, webinars, video, print, digital reading, hands-on learning, and audio through cognitive load and retention evidence.",
    title: "How We Learn: A Scientific Reckoning with Every Major Learning Medium"
  },
  {
    path: "blog-articles/corporate-vegan-pressure.html",
    publishedAt: "2026-04-24",
    summary: "An evidence-driven look at corporate campaigns, shareholder activism, institutional defaults, and supply-chain pressure as scalable vegan advocacy tactics.",
    title: "The Corporate Lever: Vegan Activism Beyond the Individual"
  },
  {
    path: "blog-articles/smart-grid-challenges.html",
    publishedAt: "2026-04-24",
    summary: "A systems-level survey of renewable integration, interoperability, cybersecurity, data management, aging infrastructure, and regulation in smart grid engineering.",
    title: "Powering the Future, Securing the Present: Smart Grid Engineering Challenges"
  },
  {
    path: "blog-articles/vegan-activism-incentives.html",
    publishedAt: "2026-04-23",
    summary: "A case for shifting vegan activism toward incentives, procurement, defaults, price signals, and market competition rather than moral persuasion alone.",
    title: "Don't Ask Nicely. Win the Market: A New Theory of Vegan Activism"
  },
  {
    path: "blog-articles/industrial-protocol-design.html",
    publishedAt: "2026-04-22",
    summary: "A protocol-engineering essay on determinism, interoperability, security debt, TSN, OPC UA, MQTT, and the trade-offs behind industrial automation networks.",
    title: "The Wiring Problem: Industrial Protocol Design"
  },
  {
    path: "blog-articles/medical_device_engineering_challenges.html",
    publishedAt: "2026-04-21",
    summary: "A systems-level tour of reliability, safety, power, software, cybersecurity, and regulatory constraints in electronic medical device engineering.",
    title: "Engineering Challenges in Electronic Medical Device Design"
  },
  {
    path: "blog-articles/us-citizen-politics-guide.html",
    publishedAt: "2026-04-20",
    summary: "A practical guide to political leverage for U.S. citizens, from voting and constituent contact to local elections and legislative tracking.",
    title: "Your Voice, Your Government: A Citizen's Guide to Political Power"
  },
  {
    path: "blog-articles/vegan-legislative-activism.html",
    publishedAt: "2026-04-19",
    summary: "A long-game view of vegan legislative and political activism through ballot measures, lobbying, litigation, and regulatory engagement.",
    title: "The Long Game: Vegan Legislative and Political Activism"
  },
  {
    path: "blog-articles/suffering_humans_vs_animals.html",
    publishedAt: "2026-04-16",
    summary: "A scientific and philosophical inquiry into pain, consciousness, emotional depth, and moral scale across humans and other animals.",
    title: "Who Suffers More? Humans vs. Animals"
  },
  {
    path: "blog-articles/fraud-and-ai.html",
    publishedAt: "2026-04-15",
    summary: "A history of fraud from ancient scams to AI-enabled deception, deepfakes, synthetic identities, and the future of trust.",
    title: "The Oldest Game: Fraud in the Age of AI"
  },
  {
    path: "blog-articles/outages-are-inevitable.html",
    publishedAt: "2026-04-14",
    summary: "The physics, mathematics, and organizational science that make failure unavoidable in sufficiently complex systems.",
    title: "Outages Are Inevitable. Here's the Proof."
  },
  {
    path: "blog-articles/limits-of-knowledge.html",
    publishedAt: "2026-04-13",
    summary: "A tour of the theorems, paradoxes, and epistemic boundaries that constrain human and machine intelligence.",
    title: "The Walls of Reason: On the Limits of Knowledge and Intelligence"
  },
  {
    path: "blog-articles/biology-engineering-challenge.html",
    publishedAt: "2026-04-10",
    summary: "A comparison between human-made complexity and the microscopic machinery of living systems.",
    title: "Life's Impossible Machine: Biology as the Ultimate Engineering Challenge"
  },
  {
    path: "blog-articles/engineering_as_philosophy.html",
    publishedAt: "2026-04-08",
    summary: "An essay on design, epistemology, and the hidden assumptions built into every system.",
    title: "Engineering Is Philosophy in Disguise"
  },
  {
    path: "blog-articles/know-your-rights.html",
    publishedAt: "2026-04-07",
    summary: "A civic reference guide to constitutional protections, police encounters, and the rights Americans carry with them.",
    title: "Know Your Rights: A Citizen's Field Guide"
  },
  {
    path: "blog-articles/mental_health_blog.html",
    publishedAt: "2026-04-06",
    summary: "A long-form look at the human, economic, and moral costs of untreated mental health problems.",
    title: "The Elephant in the Room and the Trillion-Dollar Problem No One Is Trying to Solve"
  },
  {
    path: "blog-articles/information-security-for-everyone.html",
    publishedAt: "2026-03-14",
    summary: "A practical baseline for protecting your accounts, identity, money, and reputation.",
    title: "What Everyone Should Know About Information Security"
  },
  {
    path: "blog-articles/levels-of-digital-privacy.html",
    publishedAt: "2026-03-11",
    summary: "A threat-model view of privacy, from basic hygiene through high-effort operational security.",
    title: "Levels of Digital Privacy: From No Precautions to Maximum-Effort OPSEC"
  },
  {
    path: "blog-articles/why-digital-privacy-is-important.html",
    publishedAt: "2026-03-07",
    summary: "Why privacy matters in ordinary life, security, autonomy, and real-world decision-making.",
    title: "Why Digital Privacy Is Important"
  },
  {
    path: "blog-articles/event-driven-networks.html",
    publishedAt: "2026-04-30",
    summary: "How event-driven and messaging networks rewrote the rules of distributed computing, from early pub/sub systems through Kafka-scale event streaming.",
    title: "The Architecture of Asynchrony"
  },
  {
    path: "blog-articles/networks-performance-reliability.html",
    publishedAt: "2026-04-28",
    summary: "An examination of latency, throughput, caching, redundancy, failover, and the design patterns that make modern networks fast and resilient.",
    title: "Performance & Reliability Models in Computer Networks"
  },
  {
    path: "blog-articles/ui-structure-concepts.html",
    publishedAt: "2026-05-04",
    summary: "A practitioner's guide to the structural concepts that determine how pages are organized, layered, and delivered across the modern web.",
    title: "The Architecture of the Visible Web"
  },
  {
    path: "blog-articles/vegan-activism-frmwrk.html",
    publishedAt: "2026-05-03",
    summary: "A cross-cutting strategy model for vegan activism that maps how legislation, markets, culture, and interpersonal persuasion reinforce one another.",
    title: "The Architecture of Change: A Cross-Cutting Framework for Vegan Activism"
  },
  {
    path: "blog-articles/vegan-education.html",
    publishedAt: "2026-05-02",
    summary: "Why education, research literacy, curriculum design, and myth-busting are foundational long-term levers for plant-based cultural change.",
    title: "The Knowledge Revolution: Education as the Engine of Vegan Change"
  },
  {
    path: "blog-articles/vegan-infrastructure.html",
    publishedAt: "2026-05-01",
    summary: "How apps, databases, certification systems, and product-discovery tools reduce friction and make vegan choices easier at scale.",
    title: "The Infrastructure of Choice"
  },
  {
    path: "blog-articles/making-animal-use-obsolete.html",
    publishedAt: "2026-04-17",
    summary: "A strategic survey of plant-based meat, cultivated meat, precision fermentation, and next-generation materials as technologies that can make animal exploitation obsolete.",
    title: "Making Animal Use Obsolete"
  },
  {
    path: "blog-articles/network_topologies.html",
    publishedAt: "2026-04-29",
    summary: "The physical and logical frameworks that determine how data moves, from bus and ring networks to leaf-spine fabrics in modern data centers.",
    title: "Network Topologies: The Architecture of Connectivity"
  },
  {
    path: "blog-articles/cloud-microservices-networking.html",
    publishedAt: "2026-04-16",
    summary: "A technical survey of VPCs, subnet design, API gateways, service meshes, and the east-west and north-south flows of cloud-native systems.",
    title: "Cloud & Microservices Networking: Architecture, Patterns, and Frontiers"
  },
  {
    path: "blog-articles/mass-media-vegan-activism.html",
    publishedAt: "2026-04-22",
    summary: "An analysis of documentaries, advertising, influencers, investigative journalism, and other mass-media channels for vegan advocacy.",
    title: "Reaching Millions: The Promise and Limits of Mass Persuasion"
  },
  {
    path: "blog-articles/protocol-oriented-design.html",
    publishedAt: "2026-04-27",
    summary: "From TCP handshakes to QUIC and HTTP/3, a long-form look at how protocol design decisions shape the internet's performance and behavior.",
    title: "Protocol-Oriented Design: How Communication Rules Shape the Internet"
  },
  {
    path: "blog-articles/vegan-advocacy-interpersonal.html",
    publishedAt: "2026-04-21",
    summary: "A research-grounded guide to one-on-one vegan advocacy, including street outreach, personal conversations, and the psychology of persuasion.",
    title: "The Art of the Conversation"
  },
  {
    path: "blog-articles/vegan-community.html",
    publishedAt: "2026-04-20",
    summary: "Why meetups, mentorship, online communities, and shared identity are central to helping people stay vegan over time.",
    title: "Together We Root: Making Veganism Socially Sustainable"
  },
  {
    path: "blog-articles/ui-components-article.html",
    publishedAt: "2026-04-26",
    summary: "A practitioner's guide to component taxonomy, interaction patterns, and the design theory behind robust user interfaces.",
    title: "The Anatomy of a User Interface"
  },
  {
    path: "blog-articles/privacy.html",
    publishedAt: "2026-05-06",
    summary: "A practical guide to reducing browser tracking, mobile telemetry, identity correlation, and common forms of quiet data leakage.",
    title: "Practical Defenses Against Tracking and Data Leakage"
  },
  {
    path: "blog-articles/distributed-systems-networks.html",
    publishedAt: "2026-05-06",
    summary: "A distributed-systems view of computer networks, covering coordination, failure, service discovery, CAP trade-offs, and the architecture of resilient communication.",
    title: "The Network as a System: A Distributed Computing Perspective"
  },
  {
    path: "blog-articles/pl-philosophy.html",
    publishedAt: "2026-05-05",
    summary: "A long-form essay on how logic, ideology, abstraction, and language design shape the philosophy of programming languages.",
    title: "The Art of Language: Philosophy, Ideology, and the Design of Programming Languages"
  },
  {
    path: "blog-articles/graph-theory-networks.html",
    publishedAt: "2026-05-05",
    summary: "An extended exploration of nodes, edges, paths, spanning structures, and why graph theory is the mathematical grammar of networking.",
    title: "The Graph Behind the Network: A Mathematical Anatomy of Routing"
  },
  {
    path: "blog-articles/hierarchical-network-design.html",
    publishedAt: "2026-05-05",
    summary: "A history and analysis of hierarchical enterprise network design, from classic three-tier campus models to spine-leaf fabrics and SDN-era adaptations.",
    title: "Hierarchical Design Models in Enterprise Networking"
  }
];

const blogPostCategoriesByPath: Record<string, BlogCategory[]> = {
  "blog-articles/threat-hunter-role.html": ["Security"],
  "blog-articles/swift-programming-language.html": ["Programming & Software"],
  "blog-articles/senior-engineer-thinking.html": ["Programming & Software", "Engineering"],
  "blog-articles/red-teamer-infosec.html": ["Security"],
  "blog-articles/mcp.html": ["AI & Machine Learning", "Programming & Software", "Security"],
  "blog-articles/info-access-debate.html": ["Society & Civics", "Philosophy & Learning"],
  "blog-articles/embedded-firmware-layer.html": ["Cyber-Physical Systems", "Engineering", "Programming & Software"],
  "blog-articles/edge-computing-layer.html": ["Cyber-Physical Systems", "Engineering", "Networks", "Programming & Software"],
  "blog-articles/device-drivers-cps.html": ["Cyber-Physical Systems", "Engineering", "Programming & Software", "Networks"],
  "blog-articles/spring-testing-article.html": ["Programming & Software", "Security"],
  "blog-articles/signal-conditioning-hardware.html": ["Cyber-Physical Systems", "Engineering"],
  "blog-articles/planning-reduction-sat-modelchecking.html": ["AI & Machine Learning", "Programming & Software", "Math & Physics"],
  "blog-articles/math-geometry-competitive-programming.html": ["Math & Physics", "Programming & Software"],
  "blog-articles/java-build-tools.html": ["Programming & Software"],
  "blog-articles/entertainment-sport-spectacle.html": ["Veganism", "Society & Civics"],
  "blog-articles/embedded-compute-layer.html": ["Cyber-Physical Systems", "Engineering"],
  "blog-articles/cps-physical-layer.html": ["Cyber-Physical Systems", "Engineering"],
  "blog-articles/ai-model-vulnerabilities.html": ["AI & Machine Learning", "Security"],
  "blog-articles/animal-research-science-education.html": ["Veganism", "Society & Civics"],
  "blog-articles/humane-ethical-small-scale-animal-use.html": ["Veganism", "Society & Civics"],
  "blog-articles/api-security-best-practices.html": ["Security", "Programming & Software"],
  "blog-articles/newtons_second_law_dynamics.html": ["Math & Physics", "Engineering"],
  "blog-articles/drl-humanoid-robotics.html": ["AI & Machine Learning", "Cyber-Physical Systems", "Engineering"],
  "blog-articles/causal_ai.html": ["AI & Machine Learning"],
  "blog-articles/cache-timing-attacks.html": ["Security", "Programming & Software"],
  "blog-articles/hidden-animal-ingredients.html": ["Veganism"],
  "blog-articles/action-model-learning.html": ["AI & Machine Learning", "Programming & Software"],
  "blog-articles/explainable-ai-lime-shap.html": ["AI & Machine Learning"],
  "blog-articles/insects-and-small-animals.html": ["Veganism", "Philosophy & Learning"],
  "blog-articles/automated-planning.html": ["AI & Machine Learning", "Programming & Software"],
  "blog-articles/digital-privacy-levels.html": ["Privacy", "Security"],
  "blog-articles/digital-privacy-l4-l5.html": ["Privacy", "Security"],
  "blog-articles/grc-enterprise-ai-data-governance.html": ["AI & Machine Learning", "Security", "Society & Civics"],
  "blog-articles/sdn-ibn-article.html": ["Networks", "Programming & Software"],
  "blog-articles/market-based-vegan-activism.html": ["Veganism", "Society & Civics"],
  "blog-articles/investigations-exposure-article.html": ["Veganism", "Society & Civics"],
  "blog-articles/vegan_cultural_change.html": ["Veganism", "Society & Civics"],
  "blog-articles/network-layered-models.html": ["Networks"],
  "blog-articles/vegan-behavioral-interventions.html": ["Veganism", "Society & Civics"],
  "blog-articles/zero-trust-architecture.html": ["Security", "Networks"],
  "blog-articles/edge-iot-networking.html": ["Networks", "Cyber-Physical Systems"],
  "blog-articles/vegan_business_models.html": ["Veganism", "Society & Civics"],
  "blog-articles/learning-modalities.html": ["Philosophy & Learning", "Society & Civics"],
  "blog-articles/corporate-vegan-pressure.html": ["Veganism", "Society & Civics"],
  "blog-articles/smart-grid-challenges.html": ["Cyber-Physical Systems", "Engineering", "Security"],
  "blog-articles/vegan-activism-incentives.html": ["Veganism", "Society & Civics"],
  "blog-articles/industrial-protocol-design.html": ["Cyber-Physical Systems", "Networks", "Security"],
  "blog-articles/medical_device_engineering_challenges.html": ["Cyber-Physical Systems", "Engineering", "Security"],
  "blog-articles/us-citizen-politics-guide.html": ["Society & Civics"],
  "blog-articles/vegan-legislative-activism.html": ["Veganism", "Society & Civics"],
  "blog-articles/suffering_humans_vs_animals.html": ["Veganism", "Philosophy & Learning"],
  "blog-articles/fraud-and-ai.html": ["AI & Machine Learning", "Security", "Society & Civics"],
  "blog-articles/outages-are-inevitable.html": ["Engineering", "Philosophy & Learning"],
  "blog-articles/limits-of-knowledge.html": ["Philosophy & Learning", "AI & Machine Learning"],
  "blog-articles/biology-engineering-challenge.html": ["Engineering", "Philosophy & Learning"],
  "blog-articles/engineering_as_philosophy.html": ["Engineering", "Philosophy & Learning"],
  "blog-articles/know-your-rights.html": ["Society & Civics"],
  "blog-articles/mental_health_blog.html": ["Society & Civics"],
  "blog-articles/information-security-for-everyone.html": ["Security", "Privacy"],
  "blog-articles/levels-of-digital-privacy.html": ["Privacy", "Security"],
  "blog-articles/why-digital-privacy-is-important.html": ["Privacy", "Security"],
  "blog-articles/event-driven-networks.html": ["Networks", "Programming & Software"],
  "blog-articles/networks-performance-reliability.html": ["Networks", "Engineering"],
  "blog-articles/ui-structure-concepts.html": ["Web & UI", "Programming & Software"],
  "blog-articles/vegan-activism-frmwrk.html": ["Veganism", "Society & Civics"],
  "blog-articles/vegan-education.html": ["Veganism", "Philosophy & Learning", "Society & Civics"],
  "blog-articles/vegan-infrastructure.html": ["Veganism", "Programming & Software", "Society & Civics"],
  "blog-articles/making-animal-use-obsolete.html": ["Veganism", "Engineering"],
  "blog-articles/network_topologies.html": ["Networks"],
  "blog-articles/cloud-microservices-networking.html": ["Networks", "Programming & Software"],
  "blog-articles/mass-media-vegan-activism.html": ["Veganism", "Society & Civics"],
  "blog-articles/protocol-oriented-design.html": ["Networks", "Programming & Software"],
  "blog-articles/vegan-advocacy-interpersonal.html": ["Veganism", "Society & Civics"],
  "blog-articles/vegan-community.html": ["Veganism", "Society & Civics"],
  "blog-articles/ui-components-article.html": ["Web & UI", "Programming & Software"],
  "blog-articles/privacy.html": ["Privacy", "Security"],
  "blog-articles/distributed-systems-networks.html": ["Networks", "Programming & Software"],
  "blog-articles/pl-philosophy.html": ["Programming & Software", "Philosophy & Learning"],
  "blog-articles/graph-theory-networks.html": ["Networks", "Math & Physics"],
  "blog-articles/hierarchical-network-design.html": ["Networks"]
};

function formatBlogDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${dateString}T00:00:00`));
}

function getSortedBlogPosts(): BlogDirectoryPost[] {
  return blogPosts
    .map((post, index) => ({ index, post }))
    .sort((left, right) => {
      const leftTime = left.post.publishedAt ? new Date(`${left.post.publishedAt}T00:00:00`).getTime() : Number.NEGATIVE_INFINITY;
      const rightTime = right.post.publishedAt ? new Date(`${right.post.publishedAt}T00:00:00`).getTime() : Number.NEGATIVE_INFINITY;
      const dateDelta = rightTime - leftTime;
      if (dateDelta !== 0) {
        return dateDelta;
      }

      return left.index - right.index;
    })
    .map(({ post }) => post);
}

function getPublishedLabel(post: BlogDirectoryPost): string {
  if (post.publishedLabel) {
    return post.publishedLabel;
  }

  if (post.publishedAt) {
    return formatBlogDate(post.publishedAt);
  }

  return "Undated";
}

function getFilenameLabel(post: BlogDirectoryPost): string {
  const segments = post.path.split("/");
  return segments[segments.length - 1] || post.path;
}

function getBlogPostCategories(post: BlogDirectoryPost): BlogCategory[] {
  return blogPostCategoriesByPath[post.path] || [];
}

function isBlogCategory(value: string): value is BlogCategory {
  return blogCategoryLabels.indexOf(value as BlogCategory) !== -1;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "\"":
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

function getBlogCategoryPostCount(category: BlogCategory): number {
  return blogPosts.filter((post) => getBlogPostCategories(post).indexOf(category) !== -1).length;
}

function renderBlogCategoryOptions(selectElement: HTMLSelectElement): void {
  const categoryOptions = blogCategoryLabels
    .map((category) => {
      const count = getBlogCategoryPostCount(category);
      return `<option value="${escapeHtml(category)}">${escapeHtml(category)} (${count})</option>`;
    })
    .join("");

  selectElement.innerHTML = `<option value="">All categories</option>${categoryOptions}`;
}

function renderBlogCategoryChips(post: BlogDirectoryPost): string {
  const categories = getBlogPostCategories(post);
  if (categories.length === 0) {
    return "";
  }

  const chips = categories
    .map((category) => `<span class="blog-category-chip">${escapeHtml(category)}</span>`)
    .join("");

  return `<div class="blog-category-chips" aria-label="Categories">${chips}</div>`;
}

function renderBlogArticles(searchTerm: string, categoryValue: string): void {
  const target = document.getElementById("blog-articles");
  const statusElement = document.getElementById("blogResultsStatus");

  if (!target || !statusElement) {
    return;
  }

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const activeCategory = isBlogCategory(categoryValue) ? categoryValue : "";
  const filteredPosts = getSortedBlogPosts().filter((post) => {
    const searchHaystack = `${post.title} ${getFilenameLabel(post)}`.toLowerCase();
    const matchesSearch = searchHaystack.includes(normalizedSearchTerm);
    const matchesCategory = activeCategory === "" || getBlogPostCategories(post).indexOf(activeCategory) !== -1;
    return matchesSearch && matchesCategory;
  });

  if (filteredPosts.length === 0) {
    target.innerHTML = `
      <section class="privacy-section blog-empty-state">
        <h2>No matching articles</h2>
        <p>Try a different title search or category.</p>
      </section>
    `;
    statusElement.textContent = "0 articles shown.";
    return;
  }

  target.innerHTML = filteredPosts
    .map((post) => {
      return `
        <article class="privacy-section blog-directory-card">
          <p class="blog-directory-card__date">${getPublishedLabel(post)}</p>
          ${renderBlogCategoryChips(post)}
          <h2><a href="${escapeHtml(post.path)}">${escapeHtml(post.title)}</a></h2>
          <p>${escapeHtml(post.summary)}</p>
          <a class="blog-directory-card__link" href="${escapeHtml(post.path)}">Read article</a>
        </article>
      `;
    })
    .join("");

  const categoryStatus = activeCategory ? ` in ${activeCategory}` : "";
  statusElement.textContent = `${filteredPosts.length} article${filteredPosts.length === 1 ? "" : "s"} shown${categoryStatus}. Sorted newest first.`;
}

function initializeBlogDirectory(): void {
  const searchInput = document.getElementById("blogSearchInput") as HTMLInputElement | null;
  const categorySelect = document.getElementById("blogCategorySelect") as HTMLSelectElement | null;
  if (!searchInput) {
    return;
  }

  if (categorySelect) {
    renderBlogCategoryOptions(categorySelect);
  }

  const updateBlogDirectory = (): void => {
    renderBlogArticles(searchInput.value, categorySelect ? categorySelect.value : "");
  };

  updateBlogDirectory();
  searchInput.addEventListener("input", () => {
    updateBlogDirectory();
  });

  if (categorySelect) {
    categorySelect.addEventListener("change", () => {
      updateBlogDirectory();
    });
  }
}

document.addEventListener("DOMContentLoaded", initializeBlogDirectory);
