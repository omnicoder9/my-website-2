const blogCategoryLabels = [
  "AI & Machine Learning",
  "ASP.NET",
  "Android",
  "Angular",
  "Competitive Programming",
  "Cyber-Physical Systems",
  "DevSecOps",
  "Differential Equations",
  "Django",
  "Docker",
  "Engineering",
  "Kubernetes",
  "Learning",
  "Math & Physics",
  "Mobile App Development",
  "Networks",
  "Nmap",
  "Operating Systems",
  "Pentesting",
  "Philosophy",
  "Privacy",
  "Programming & Software",
  "Python",
  "Robotics",
  "Security",
  "Society & Civics",
  "Spring",
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
    path: "blog-articles/timing-attacks.html",
    publishedAt: "2026-06-11",
    summary: "A technical deep dive into timing side channels, covering constant-time failures, remote and local measurement models, classic cryptographic breaks, microarchitectural leakage, and defensive design patterns.",
    title: "Timing Attacks: The Clock as Cryptanalyst"
  },
  {
    path: "blog-articles/power-analysis-attacks.html",
    publishedAt: "2026-06-11",
    summary: "A field guide to power analysis attacks, covering simple and differential power analysis, leakage models, trace collection, key extraction workflows, countermeasures, and hardware-security tradeoffs.",
    title: "Power Analysis Attacks: Extracting Secrets from Silicon"
  },
  {
    path: "blog-articles/mobile-device-vulnerabilities.html",
    publishedAt: "2026-06-11",
    summary: "A technical reference on mobile device vulnerabilities, covering rooting and jailbreaking, outdated operating systems, radio-interface attacks, risky apps, and data-protection failures across modern phones.",
    title: "Mobile Device Vulnerabilities — A Field Guide to the Modern Handset Threat Model"
  },
  {
    path: "blog-articles/windows-legacy-security.html",
    publishedAt: "2026-06-10",
    summary: "A security and penetration-testing guide to legacy Windows systems in critical infrastructure, covering end-of-life risk, common exploit paths, segmentation, compensating controls, and modernization tradeoffs.",
    title: "Dead Code Walking: Security and Penetration Testing of Legacy Windows Systems in Critical Infrastructure"
  },
  {
    path: "blog-articles/cobol.html",
    publishedAt: "2026-06-10",
    summary: "A technical survey of COBOL covering its origins, language model, strengths in business processing, modernization pressure, tooling, mainframe reality, and why it still runs critical systems.",
    title: "COBOL: The Language That Runs the World — A Technical Survey"
  },
  {
    path: "blog-articles/advanced-graph-problems.html",
    publishedAt: "2026-06-10",
    summary: "A competitive programming field guide to advanced graph problems, including shortest paths, minimum spanning trees, constrained routing, bottleneck paths, Eulerian tours, and implementation pitfalls.",
    title: "Advanced Graph Problems — A Competitive Programming Field Guide"
  },
  {
    path: "blog-articles/cache-invalidation.html",
    publishedAt: "2026-06-10",
    summary: "A deep dive into cache invalidation across CPUs, distributed systems, CDNs, and application stacks, covering coherence, consistency, TTLs, event-driven invalidation, and failure modes.",
    title: "Cache Invalidation: The Problem That Ate Computer Science"
  },
  {
    path: "blog-articles/its-always-dns.html",
    publishedAt: "2026-06-10",
    summary: "A technical guide to DNS failure modes, history, and security, covering recursive resolution, delegation, caching behavior, outages, poisoning, hijacking, and defensive operations.",
    title: "It's Always DNS — Domain Name System Failure Modes, History, and Security"
  },
  {
    path: "blog-articles/printer-troubleshooting.html",
    publishedAt: "2026-06-10",
    summary: "A technical printer troubleshooting reference covering print paths, drivers, spoolers, network queues, laser and inkjet hardware faults, maintenance, and field diagnostics.",
    title: "Printer Troubleshooting: A Technical Reference — TechOps Series"
  },
  {
    path: "blog-articles/ping.html",
    publishedAt: "2026-06-09",
    summary: "A practical guide to advanced ping usage, covering controlled probes, IPv4 and IPv6 selection, path MTU testing, source interfaces, TTL, QoS markings, Windows options, and troubleshooting playbooks.",
    title: "Advanced Use of the Ping Utility: Options, Examples, and Troubleshooting Scenarios"
  },
  {
    path: "blog-articles/cpp.html",
    publishedAt: "2026-06-09",
    summary: "A technical deep dive into C++ covering language evolution, performance, memory management, templates, tooling, libraries, safety tradeoffs, and where C++ still matters.",
    title: "C++: The Enduring Colossus — A Technical Deep Dive"
  },
  {
    path: "blog-articles/graph-problems.html",
    publishedAt: "2026-06-09",
    summary: "Seven foundational graph problems with reusable DFS and BFS patterns, covering grids, islands, rotting oranges, water flow, clone graph, course scheduling, and word ladders across six languages.",
    title: "Every Grid Is a Graph — Seven Foundational Graph Problems"
  },
  {
    path: "blog-articles/supply-chain-vulnerabilities.html",
    publishedAt: "2026-06-08",
    summary: "A technical reference on software and hardware supply chain risk, covering malicious updates, dependency confusion, vendor access, CI/CD compromise, code signing, SBOMs, SLSA, and defensive governance.",
    title: "Supply Chain Vulnerabilities: Attack Vectors, Threat Actors, and Defence Strategies"
  },
  {
    path: "blog-articles/impossibility.html",
    publishedAt: "2026-06-07",
    summary: "A philosophical and technical essay on impossibility claims across logic, physics, computation, engineering, and the limits of what human systems can prove or achieve.",
    title: "Impossibility: Logic, Physics, Computation, and the Limits of Human Claims"
  },
  {
    path: "blog-articles/cloud-vulnerabilities.html",
    publishedAt: "2026-06-07",
    summary: "A technical deep dive into cloud-specific vulnerability patterns, including identity failures, metadata exposure, storage mistakes, network boundaries, supply chains, and shared-responsibility gaps.",
    title: "Cloud-Specific Vulnerabilities: A Technical Deep Dive"
  },
  {
    path: "blog-articles/app-vulns.html",
    publishedAt: "2026-06-07",
    summary: "A comprehensive application-security reference covering injection, XSS, broken access control, authentication flaws, deserialization, SSRF, dependency risk, and defensive testing.",
    title: "Application Vulnerabilities: A Comprehensive Technical Reference"
  },
  {
    path: "blog-articles/curl-reference.html",
    publishedAt: "2026-06-07",
    summary: "A practical curl reference covering options, request construction, authentication, uploads, debugging, redirects, TLS behavior, scripting patterns, and command-line examples.",
    title: "curl Reference — Options, Internals & Examples"
  },
  {
    path: "blog-articles/net_troubleshooting_tools.html",
    publishedAt: "2026-06-07",
    summary: "A networking troubleshooting guide covering diagnostic method, packet paths, DNS, routing, latency, throughput, packet capture, and common command-line tools.",
    title: "Networking Troubleshooting Fundamentals: Tools, Methods, and Field Examples"
  },
  {
    path: "blog-articles/hardware-installation-best-practices.html",
    publishedAt: "2026-06-06",
    summary: "A field guide to hardware installation practices, covering planning, ESD control, component handling, cabling, verification, diagnostics, documentation, and operational handoff.",
    title: "Hardware Installation Best Practices — A Field Guide for Engineers & Technicians"
  },
  {
    path: "blog-articles/storage-devices.html",
    publishedAt: "2026-06-06",
    summary: "A technical field guide to storage devices, covering HDDs, SSDs, flash memory, interfaces, performance characteristics, reliability, filesystems, and selection tradeoffs.",
    title: "Inside the Machine: A Technical Field Guide to Storage Devices"
  },
  {
    path: "blog-articles/cpu-fundamentals.html",
    publishedAt: "2026-06-06",
    summary: "A technical guide to modern CPUs, covering cores, threads, cache, sockets, thermals, integrated graphics, firmware, installation, performance tuning, and troubleshooting.",
    title: "Inside the Machine: A Technical Guide to Modern CPUs"
  },
  {
    path: "blog-articles/ram.html",
    publishedAt: "2026-06-06",
    summary: "A complete technical guide to RAM, covering DDR generations, timings, channels, capacity planning, ECC, installation, overclocking profiles, diagnostics, and compatibility.",
    title: "RAM (Memory): A Complete Technical Guide"
  },
  {
    path: "blog-articles/spring-cache.html",
    publishedAt: "2026-06-06",
    summary: "A Spring caching field guide covering Caffeine, Redis, cache annotations, invalidation strategies, latency tradeoffs, event-driven updates, and production cache design.",
    title: "The Heat Map of Latency — A Field Guide to Spring Cache, Caffeine, Redis & Event-Driven Invalidation"
  },
  {
    path: "blog-articles/complexity-classes.html",
    publishedAt: "2026-06-05",
    summary: "A guide to computational complexity classes, covering P, NP, NP-completeness, reductions, hardness, verification, open problems, and the frontier of tractability.",
    title: "The Architecture of Hardness — P, NP, and the Frontier of Computation"
  },
  {
    path: "blog-articles/memory-unsafe-c-cpp.html",
    publishedAt: "2026-06-05",
    summary: "A security-focused article on memory-unsafe C and C++ failure modes, including buffer overflows, use-after-free, null dereferences, data races, and mitigation strategies.",
    title: "Memory Unsafe — Buffer Overflows, Use-After-Free, Null Dereferences & Data Races in C/C++"
  },
  {
    path: "blog-articles/systems-engineering-methodologies.html",
    publishedAt: "2026-06-05",
    summary: "A systems engineering guide to disciplined practice, covering lifecycle models, MBSE, V-model reasoning, requirements, verification, validation, trade studies, and program governance.",
    title: "Engineering the Whole — Systems Engineering: Methodologies, Frameworks & the Architecture of Disciplined Practice"
  },
  {
    path: "blog-articles/system-reliability-patterns.html",
    publishedAt: "2026-06-05",
    summary: "A reliability engineering reference on timeouts, retries, circuit breakers, bulkheads, rate limits, graceful degradation, idempotency, observability, and recovery patterns.",
    title: "System Reliability Patterns — A Practitioner's Reference"
  },
  {
    path: "blog-articles/spring-cloud-devops.html",
    publishedAt: "2026-06-05",
    summary: "A cloud-native Spring operations guide covering microservice deployment, configuration, containers, Kubernetes, service discovery, CI/CD, observability, resilience, and delivery tradeoffs.",
    title: "From Code to Cluster: Deploying Spring Microservices in the Cloud-Native Era"
  },
  {
    path: "blog-articles/secure-architecture.html",
    publishedAt: "2026-06-05",
    summary: "A secure architecture field manual covering threat modeling, identity boundaries, segmentation, secrets, encryption, logging, hardening, resilience, and governance for defended enterprises.",
    title: "Secure Architecture — A Field Manual for the Defended Enterprise"
  },
  {
    path: "blog-articles/rust-programming-language.html",
    publishedAt: "2026-06-05",
    summary: "A technical portrait of Rust, explaining ownership, borrowing, lifetimes, traits, async, unsafe code, tooling, ecosystem growth, and its role in modern systems programming.",
    title: "Rust: The Language That Rewrote Systems Programming"
  },
  {
    path: "blog-articles/rlc-circuit-equation.html",
    publishedAt: "2026-06-05",
    summary: "A long-form technical treatment of the series RLC differential equation, covering derivation, damping regimes, resonance, physical intuition, applications, tools, and code.",
    title: "The RLC Circuit Equation — The Grammar of Linear Dynamics"
  },
  {
    path: "blog-articles/ot-ics-scada-pentesting.html",
    publishedAt: "2026-06-05",
    summary: "An availability-first review of authorized OT, ICS, and SCADA penetration testing, covering safety constraints, passive discovery, protocol risk, segmentation, reporting, and governance.",
    title: "Penetration Testing OT, ICS & SCADA — A Field Review"
  },
  {
    path: "blog-articles/interval-problems-playbook.html",
    publishedAt: "2026-06-05",
    summary: "A competitive programming playbook for interval problems, covering sorting, sweeping, merging, meeting rooms, stabbing queries, heap patterns, proofs, and multilingual implementations.",
    title: "The Interval Playbook — Sorting, Sweeping & Stabbing"
  },
  {
    path: "blog-articles/greedy-competitive-programming.html",
    publishedAt: "2026-06-05",
    summary: "A rigorous guide to greedy algorithms in competitive programming, covering local-choice proofs, exchange arguments, Jump Game, Gas Station, Partition Labels, and interval scheduling.",
    title: "The Greedy Contract — A Field Guide to Greedy Algorithms for Competitive Programming"
  },
  {
    path: "blog-articles/django-architecture-scaling.html",
    publishedAt: "2026-06-05",
    summary: "A Django scaling handbook covering project structure, data access, caching, async work, deployment topology, database pressure, observability, security, and operational growth.",
    title: "Django Architecture & Scaling — Engineering Handbook"
  },
  {
    path: "blog-articles/devsecops-engineer.html",
    publishedAt: "2026-06-05",
    summary: "A role-focused guide to DevSecOps engineering, covering secure pipelines, SAST, DAST, dependency scanning, IaC controls, policy as code, cloud security, and incident feedback.",
    title: "The DevSecOps Engineer: Automating Security Into the Pipeline"
  },
  {
    path: "blog-articles/angular-security-testing.html",
    publishedAt: "2026-06-05",
    summary: "A practical Angular security testing guide covering static analysis, dependency review, XSS prevention, auth flows, CSP, dynamic testing, penetration testing, and CI guardrails.",
    title: "Security Testing for Angular — Static Analysis, Dynamic Testing & Penetration Testing"
  },
  {
    path: "blog-articles/ai-cannot-compensate-for-natural-stupidity.html",
    publishedAt: "2026-06-05",
    summary: "An essay on the problems computation does not solve by itself: weak judgment, biological limits, deception, scarcity, incentives, social failure, and the continued need for agency.",
    title: "Artificial Intelligence Cannot Compensate for Natural Stupidity"
  },
  {
    path: "blog-articles/2d-dynamic-programming.html",
    publishedAt: "2026-06-05",
    summary: "A competitive programming field guide to two-dimensional dynamic programming, covering grids, subsequences, edit distance, paths, knapsack variants, state transitions, and table design.",
    title: "The Matrix Fills Itself — A Field Guide to 2D Dynamic Programming"
  },
  {
    path: "blog-articles/the-map-is-not-the-territory.html",
    publishedAt: "2026-06-03",
    summary: "A philosophical and security-minded essay on abstraction failure, threat models, formal systems, machine learning, and why engineered models never perfectly capture reality.",
    title: "The Map Is Not the Territory — Why Every Engineered System Can Be Hacked"
  },
  {
    path: "blog-articles/stacks-in-competitive-programming.html",
    publishedAt: "2026-06-03",
    summary: "A competitive programming guide to stack-based reasoning, covering deferred resolution, monotonic stacks, delimiter matching, expression parsing, amortized analysis, and common implementation traps.",
    title: "The Stack — Deferred Resolution & Monotonic Frontiers in Competitive Programming"
  },
  {
    path: "blog-articles/privilege-separation.html",
    publishedAt: "2026-06-03",
    summary: "A systems-security deep dive into privilege separation, covering least privilege, Unix users, capabilities, MAC, seccomp, pledge, unveil, microkernels, containers, and sandbox design.",
    title: "The Architecture of Trust: Privilege Separation in Modern Systems"
  },
  {
    path: "blog-articles/models-of-reality.html",
    publishedAt: "2026-06-03",
    summary: "A wide-ranging taxonomy of reality models, from metaphysics and scientific laws to simulations, statistics, machine learning, causal models, and the limits of representation.",
    title: "Models of Reality — From A Priori Metaphysics to Machine Learning"
  },
  {
    path: "blog-articles/mobile-security-architecture.html",
    publishedAt: "2026-06-03",
    summary: "A technical mobile security architecture survey covering Android, iOS, app sandboxes, secure boot, hardware roots of trust, key storage, exploit chains, and enterprise controls.",
    title: "Phantom Protocol — Mobile Platform Security: A Technical Deep Dive"
  },
  {
    path: "blog-articles/dc-infrastructure-security.html",
    publishedAt: "2026-06-03",
    summary: "A data center infrastructure security deep dive spanning physical controls, firmware, BMCs, supply chains, management networks, virtualization, storage, side channels, and operational defense.",
    title: "Data Center Infrastructure Security: A Technical Deep Dive"
  },
  {
    path: "blog-articles/nmap-mainframe-pentesting.html",
    publishedAt: "2026-06-01",
    summary: "A specialized guide to using Nmap in authorized mainframe penetration testing, covering TN3270, service discovery, enumeration restraint, legacy protocols, and operational safety.",
    title: "Green Screen Reconnaissance — Nmap Against the Mainframe"
  },
  {
    path: "blog-articles/nmap-cloud-pentesting.html",
    publishedAt: "2026-06-01",
    summary: "A cloud-focused Nmap penetration testing guide for authorized assessment, covering asset discovery, exposed services, provider boundaries, timing discipline, and reconnaissance workflows.",
    title: "The Mapmaker in the Mist — Nmap for Cloud Penetration Testing"
  },
  {
    path: "blog-articles/css-methodologies.html",
    publishedAt: "2026-06-01",
    summary: "A technical guide to CSS at scale, covering Sass, PostCSS, BEM, CSS Modules, CSS-in-JS, cascade layers, scoping, and maintainable stylesheet architecture.",
    title: "CSS at Scale: Methodologies for the Modern Web"
  },
  {
    path: "blog-articles/code-review-best-practices.html",
    publishedAt: "2026-06-01",
    summary: "A practical software engineering guide to code review, covering review goals, reviewer behavior, author preparation, review depth, tooling, culture, and quality outcomes.",
    title: "The Discipline of Peer Review: Code Review Best Practices"
  },
  {
    path: "blog-articles/backend-performance.html",
    publishedAt: "2026-06-01",
    summary: "An expert-level backend performance guide covering caching, APIs, databases, asynchronous systems, scaling, code optimization, observability, networking, security, and performance testing.",
    title: "Backend Performance Engineering: Caching, APIs, Databases, Asynchronism, Scaling, Code, Security, Observability, Networks, and Testing"
  },
  {
    path: "blog-articles/arrays-and-hashing-cp.html",
    publishedAt: "2026-06-01",
    summary: "A competitive programming guide to arrays and hashing patterns, focused on one-pass maps, frequency counting, complements, grouping, prefix states, and replacing nested loops.",
    title: "Arrays & Hashing — Competitive Programming Patterns"
  },
  {
    path: "blog-articles/two-pointers.html",
    publishedAt: "2026-06-01",
    summary: "A competitive programming guide to the two-pointers pattern, covering convergence, sliding windows, sorted arrays, linked-list runners, partitioning, and implementation traps.",
    title: "Two Pointers: The Art of Convergence"
  },
  {
    path: "blog-articles/trusted-hardware.html",
    publishedAt: "2026-06-01",
    summary: "A technical reference on hardware-rooted trust, covering TPMs, Secure Boot, remote attestation, Intel SGX, AMD SEV, ARM TrustZone, HSMs, side channels, and confidential computing.",
    title: "Foundations of Hardware Trust — TPM, SGX, SEV, TrustZone, HSMs & Confidential Computing"
  },
  {
    path: "blog-articles/nmap-red-team.html",
    publishedAt: "2026-06-01",
    summary: "A red-team-oriented Nmap guide focused on precision scanning, OPSEC tradeoffs, detection-aware reconnaissance, NSE usage, timing controls, and authorized adversary emulation.",
    title: "Nmap for Red Teams — Precision, OPSEC, and the Art of Staying Invisible"
  },
  {
    path: "blog-articles/1d-dynamic-programming.html",
    publishedAt: "2026-05-31",
    summary: "A competitive programmer's field guide to one-dimensional dynamic programming patterns, from climbing stairs and house robber to coin change, LIS, word break, and recurrence design.",
    title: "Along a Single Axis — A Field Guide to 1-D Dynamic Programming"
  },
  {
    path: "blog-articles/angular-performance.html",
    publishedAt: "2026-05-31",
    summary: "A technical Angular performance guide covering deferrable views, image optimization, zone pollution, slow-computation profiling, hydration, and Core Web Vitals tradeoffs.",
    title: "Performance in Angular: Deferrable Views, Image Optimisation, Zone Pollution, Slow Computations & Hydration"
  },
  {
    path: "blog-articles/animation-angular.html",
    publishedAt: "2026-05-31",
    summary: "A technical guide to animation in Angular, covering transitions, triggers, enter and leave behavior, reusable sequences, complex choreography, and route transitions.",
    title: "Animation in Angular: Transitions, Triggers, Complex Sequences, Reuse, and Route Transitions"
  },
  {
    path: "blog-articles/internationalization-angular.html",
    publishedAt: "2026-05-31",
    summary: "A practical guide to Angular internationalization with @angular/localize, covering locale identifiers, translation extraction, multi-locale builds, and localized application bundles.",
    title: "Comprehensive Internationalization in Angular with @angular/localize"
  },
  {
    path: "blog-articles/nmap-active-directory.html",
    publishedAt: "2026-05-31",
    summary: "A defensive guide to using Nmap for network-layer reconnaissance in Windows domain environments, focused on service discovery, domain exposure, and Active Directory attack surface mapping.",
    title: "Nmap for Active Directory — Network-Layer Reconnaissance of the Windows Domain"
  },
  {
    path: "blog-articles/nmap-advanced.html",
    publishedAt: "2026-05-31",
    summary: "An advanced Nmap deep dive covering scan anatomy, timing, scripting, evasion limits, service fingerprinting, and the engineering details behind reliable network reconnaissance.",
    title: "The Anatomy of a Scan — Nmap at Depth"
  },
  {
    path: "blog-articles/nmap-fundamentals.html",
    publishedAt: "2026-05-31",
    summary: "A foundational guide to ethical host discovery and port scanning with Nmap, covering scan types, service detection, output interpretation, lab setup, and safe operating boundaries.",
    title: "Nmap Fundamentals: Ethical Host Discovery & Port Scanning"
  },
  {
    path: "blog-articles/nmap-ics-ot-pentesting.html",
    publishedAt: "2026-05-31",
    summary: "An availability-first guide to Nmap in ICS and OT penetration testing, explaining fragile devices, passive-first workflows, careful probing, industrial protocols, and safety constraints.",
    title: "Mapping Without Breaking — Nmap in ICS/OT Penetration Testing"
  },
  {
    path: "blog-articles/nmap-reconnaissance-platform.html",
    publishedAt: "2026-05-31",
    summary: "A guide to Nmap as a reconnaissance platform beyond basic SYN scans, covering NSE, service and version detection, output pipelines, and repeatable assessment workflows.",
    title: "Beyond the SYN Scan — Nmap as a Reconnaissance Platform"
  },
  {
    path: "blog-articles/version_control.html",
    publishedAt: "2026-05-29",
    summary: "A comprehensive technical guide to Git fundamentals, repository hosting platforms, and the integrations that connect version control to CI/CD, project management, and team communication.",
    title: "Mastering Modern Version Control: Git & Repository Hosting Services"
  },
  {
    path: "blog-articles/soft-robotics.html",
    publishedAt: "2026-05-29",
    summary: "A technical field guide to compliant robots, soft actuators, underactuation, sensing, modeling, control, fabrication, and applications in messy physical environments.",
    title: "Soft Robotics: Underactuation, Compliance, Actuation, Sensing, and Control"
  },
  {
    path: "blog-articles/sfi.html",
    publishedAt: "2026-05-29",
    summary: "A systems-security deep dive into Software Fault Isolation, from address masking and inline reference monitors to Native Client, WebAssembly, control-flow integrity, and bypasses.",
    title: "The Sandbox in the Same Address Space — Software Fault Isolation"
  },
  {
    path: "blog-articles/rewriting_history_git.html",
    publishedAt: "2026-05-29",
    summary: "A practical guide to reshaping Git history safely, including force-with-lease workflows, autosquash, stacked pull requests, reflog recovery, and repository safety rails.",
    title: "Rewriting History Without Losing Your Team (or Your Mind)"
  },
  {
    path: "blog-articles/os-vm-isolation.html",
    publishedAt: "2026-05-29",
    summary: "A field guide to operating-system and virtual-machine isolation, covering address spaces, privilege rings, hypervisors, containers, VM escapes, and microarchitectural side channels.",
    title: "The Walls Between Us — A Field Guide to OS and VM Isolation"
  },
  {
    path: "blog-articles/network-observability.html",
    publishedAt: "2026-05-29",
    summary: "A practitioner-oriented survey of network observability, from packet capture and flow telemetry to SNMP, Prometheus, Grafana, commercial platforms, eBPF, and encrypted traffic.",
    title: "The Transparent Wire: A Field Guide to Network Observability"
  },
  {
    path: "blog-articles/mlops.html",
    publishedAt: "2026-05-29",
    summary: "A field guide to MLOps and LLMOps, covering production ML infrastructure, lifecycle automation, CI/CD/CT, model observability, governance, feature stores, and platform tooling.",
    title: "The Operations of Learning — A Field Guide to MLOps"
  },
  {
    path: "blog-articles/messaging-security.html",
    publishedAt: "2026-05-29",
    summary: "A cryptographic architecture guide to secure messaging, including threat modeling, the Signal Protocol, Double Ratchet, X3DH, group key agreement, MLS, metadata protection, and key transparency.",
    title: "Messaging Security: Cryptographic Architecture from Signal to MLS"
  },
  {
    path: "blog-articles/csharp.html",
    publishedAt: "2026-05-29",
    summary: "A technical portrait of C#, covering its history, runtime architecture, language design, ecosystem, frameworks, tooling, open-source position, and future direction.",
    title: "C# — The Language of a Generation"
  },
  {
    path: "blog-articles/concurrency_python.html",
    publishedAt: "2026-05-29",
    summary: "A technical guide to Python concurrency, including the GIL, multithreading, multiprocessing, asyncio, decision tradeoffs, ecosystem tools, and the impact of PEP 703 free-threading.",
    title: "Concurrency in Python: A Comprehensive Technical Guide"
  },
  {
    path: "blog-articles/aspnet-orm.html",
    publishedAt: "2026-05-29",
    summary: "A technical guide to data-access choices in ASP.NET Core, comparing Entity Framework Core, Dapper, RepoDB, and NHibernate across architecture, performance, testing, and operations.",
    title: "ASP.NET Core Object-Relational Mapping with Entity Framework Core, Dapper, RepoDB, and NHibernate"
  },
  {
    path: "blog-articles/aspnet-core-testing.html",
    publishedAt: "2026-05-29",
    summary: "A field guide to ASP.NET Core testing, from unit tests and assertions through fakes, mocks, integration testing, BDD workflows, and browser-driven end-to-end coverage.",
    title: "The Discipline of Doubt — A Field Guide to Testing in ASP.NET Core"
  },
  {
    path: "blog-articles/anonymous_comm.html",
    publishedAt: "2026-05-29",
    summary: "An expert guide to anonymous communication systems, covering onion routing, Tor internals, onion services, mix networks, traffic analysis, pluggable transports, and unlinkability limits.",
    title: "Anonymous Communication: Onion Routing, Mix Networks, Traffic Analysis, and the Engineering Limits of Unlinkability"
  },
  {
    path: "blog-articles/aspnet-dependency-injection.html",
    publishedAt: "2026-05-28",
    summary: "A technical guide to ASP.NET Core dependency injection, covering built-in service lifetimes, composition roots, Scrutor assembly scanning, decoration, interception, and practical registration patterns.",
    title: "ASP.NET Core Dependency Injection: Lifetimes, Scrutor, and Beyond"
  },
  {
    path: "blog-articles/android-app-components.html",
    publishedAt: "2026-05-23",
    summary: "A technical deep dive into Android's core app model, covering activities, services, broadcast receivers, content providers, intents, manifests, lifecycle behavior, and process boundaries.",
    title: "Android App Components: A Technical Deep Dive"
  },
  {
    path: "blog-articles/control_pyramid.html",
    publishedAt: "2026-05-23",
    summary: "A long-form survey of the industrial control pyramid, from PLC and DCS history to vendor lock-in, industrial protocols, SCADA, OPC UA, and the modernization pressures reshaping plant-floor systems.",
    title: "The Control Pyramid — Vendors, Protocols, and Power on the Plant Floor"
  },
  {
    path: "blog-articles/docker-data-persistence.html",
    publishedAt: "2026-05-23",
    summary: "An infrastructure article on Docker persistence, explaining volumes, bind mounts, tmpfs, storage drivers, CSI, backups, security boundaries, and the operational tradeoffs behind stateful containers.",
    title: "The Persistence Problem — Data Outside the Container"
  },
  {
    path: "blog-articles/go-language.html",
    publishedAt: "2026-05-23",
    summary: "A technical profile of Go's design, history, concurrency model, standard library, cloud-native ecosystem, adoption patterns, and the engineering philosophy behind its deliberate simplicity.",
    title: "The Go Programming Language: Engineering Simplicity at Scale"
  },
  {
    path: "blog-articles/kubernetes-deployment-patterns.html",
    publishedAt: "2026-05-23",
    summary: "A technical reference for Kubernetes deployment patterns, including rolling updates, blue-green releases, canaries, Helm, GitOps, CI/CD integration, rollback strategy, and production tradeoffs.",
    title: "Kubernetes Deployment Patterns — A Technical Reference"
  },
  {
    path: "blog-articles/malware-analysis.html",
    publishedAt: "2026-05-23",
    summary: "A defensive field guide to malware analysis, covering static and dynamic techniques, sandboxing, reverse engineering, indicators, YARA, anti-analysis behavior, and machine-learning-based classification.",
    title: "Reverse Engineering the Adversary — A Field Guide to Malware Analysis"
  },
  {
    path: "blog-articles/mojo.html",
    publishedAt: "2026-05-23",
    summary: "A language profile of Mojo, examining its Python-shaped syntax, MLIR foundation, GPU programming goals, performance model, ecosystem status, and the open question of AI infrastructure adoption.",
    title: "Mojo: The Pythonic Language That Wants to Talk to Your GPU"
  },
  {
    path: "blog-articles/autonomous-vehicles.html",
    publishedAt: "2026-05-21",
    summary: "An engineering analysis of why fully autonomous driving still fails at the edge cases that matter, from perception and long-tail uncertainty to embodied reasoning in open-world traffic.",
    title: "The Hardest Robotics Problem on Earth — Why Fully Autonomous Driving Has Resisted Five Decades of Engineering"
  },
  {
    path: "blog-articles/building-developer-communities.html",
    publishedAt: "2026-05-21",
    summary: "A practitioner's field manual on identifying audiences, choosing platforms, drafting governance, and cultivating the conditions in which developer communities actually thrive.",
    title: "The Architecture of Belonging — Building, Managing, and Engaging Developer Communities"
  },
  {
    path: "blog-articles/data-quality.html",
    publishedAt: "2026-05-21",
    summary: "A comprehensive examination of what makes data fit for purpose, from the roots of quality management through dimensions, tools, governance frameworks, and operational practice.",
    title: "Data Quality: Foundations, Dimensions, and Practice"
  },
  {
    path: "blog-articles/efficient-edge-ai.html",
    publishedAt: "2026-05-21",
    summary: "A technical essay on the shift from cloud-centralized AI toward on-device and edge intelligence, driven by latency, bandwidth, privacy, and deployment economics.",
    title: "Efficient & Edge AI — From Cloud Centralization to Intelligence at the Edge"
  },
  {
    path: "blog-articles/vibe-coding-risk-framework.html",
    publishedAt: "2026-05-21",
    summary: "A risk-management framework for AI-assisted software development, focused on distinguishing productive low-stakes use from the cases where governance, ownership, and controls are non-negotiable.",
    title: "A Risk Management Framework for Vibe Coding"
  },
  {
    path: "blog-articles/wireless-networking.html",
    publishedAt: "2026-05-21",
    summary: "A field manual for wireless networking, covering radio fundamentals, standards, deployment craft, and the security posture required to operate on a shared and physically constrained medium.",
    title: "The Invisible Wire — A Field Manual for Wireless Networking"
  },
  {
    path: "blog-articles/api-authentication.html",
    publishedAt: "2026-05-19",
    summary: "A technical guide to API authentication, covering identity, API keys, bearer tokens, JWT, OAuth 2.0, mutual TLS, session design, and the tradeoffs behind each approach.",
    title: "Proof of Identity — A Technical Guide to API Authentication"
  },
  {
    path: "blog-articles/bit-manipulation.html",
    publishedAt: "2026-05-19",
    summary: "A competitive programmer's field guide to bitwise thinking, including masks, XOR patterns, popcount, range tricks, and the problem-solving habits that make bit manipulation useful.",
    title: "Thinking in Bits — A Competitive Programmer's Field Guide"
  },
  {
    path: "blog-articles/error-prevention-high-stakes.html",
    publishedAt: "2026-05-19",
    summary: "A long-form essay on error prevention in high-stakes systems, from high-reliability organizations and Swiss-cheese defenses to software failures, drift, and safety culture.",
    title: "When Failure Is Not an Option — The Science of Averting Catastrophe"
  },
  {
    path: "blog-articles/Farm_Bill_2026.html",
    publishedAt: "2026-05-19",
    summary: "An analysis of the 2026 Farm Bill, focusing on subsidies, SNAP, climate politics, animal welfare, and the legislative struggle over food and agricultural power.",
    title: "The 2026 Farm Bill: A High-Stakes Battle Over Food, Farming, and Welfare"
  },
  {
    path: "blog-articles/frontend-performance.html",
    publishedAt: "2026-05-19",
    summary: "A practitioner's guide to frontend performance, spanning rendering internals, Core Web Vitals, bottlenecks, optimization tactics, tooling, and performance budgets.",
    title: "The Performance Ledger — A Practitioner's Guide to Frontend Speed"
  },
  {
    path: "blog-articles/purple-teamer-role.html",
    publishedAt: "2026-05-19",
    summary: "A role profile of the purple teamer, examining how offensive and defensive security are fused into collaborative validation, detection tuning, and continuous improvement.",
    title: "The Purple Teamer: Adversary Empathy at the Heart of Modern Defence"
  },
  {
    path: "blog-articles/service-mesh.html",
    publishedAt: "2026-05-19",
    summary: "A technical deep dive into service meshes, including sidecars, control planes, mTLS, observability, routing policy, operational tradeoffs, and mesh implementation choices.",
    title: "The Service Mesh — An Infrastructure Layer for the Age of Microservices"
  },
  {
    path: "blog-articles/system-design-interview-prep.html",
    publishedAt: "2026-05-19",
    summary: "A practical system design interview guide covering requirements, scale estimation, tradeoffs, bottlenecks, architecture communication, and common application patterns.",
    title: "System Design Interview Preparation: Requirements, Scale, Tradeoffs, and Common Architectures"
  },
  {
    path: "blog-articles/lua-programming-language.html",
    publishedAt: "2026-05-17",
    summary: "A technical portrait of Lua, examining its embedded-language design, unusual influence, and the engineering reasons it quietly powers games, servers, tools, and scripting-heavy systems.",
    title: "Lua: The Language That Hides in Plain Sight"
  },
  {
    path: "blog-articles/cyber-defense-forensics-analyst.html",
    publishedAt: "2026-05-17",
    summary: "A role profile of the cyber defense forensics analyst, covering evidence handling, incident reconstruction, host and disk analysis, reporting, and the place of forensics in modern security operations.",
    title: "Cyber Defense Forensics Analyst"
  },
  {
    path: "blog-articles/vgn-pressure-campaigns.html",
    publishedAt: "2026-05-17",
    summary: "A strategic analysis of vegan pressure campaigns, focusing on escalation, leverage, corporate and institutional targets, movement discipline, and the conditions under which pressure tactics work.",
    title: "The Art and Science of the Pressure Campaign"
  },
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
  "blog-articles/timing-attacks.html": ["Security", "Programming & Software"],
  "blog-articles/power-analysis-attacks.html": ["Security", "Engineering"],
  "blog-articles/mobile-device-vulnerabilities.html": ["Security", "Mobile App Development", "Android", "Operating Systems"],
  "blog-articles/windows-legacy-security.html": ["Security", "Operating Systems", "Pentesting", "Cyber-Physical Systems"],
  "blog-articles/cobol.html": ["Programming & Software", "Engineering"],
  "blog-articles/advanced-graph-problems.html": ["Competitive Programming", "Programming & Software", "Math & Physics"],
  "blog-articles/cache-invalidation.html": ["Programming & Software", "Engineering", "DevSecOps"],
  "blog-articles/its-always-dns.html": ["Networks", "Security"],
  "blog-articles/printer-troubleshooting.html": ["Engineering", "Operating Systems"],
  "blog-articles/ping.html": ["Networks"],
  "blog-articles/cpp.html": ["Programming & Software", "Operating Systems", "Engineering"],
  "blog-articles/graph-problems.html": ["Competitive Programming", "Programming & Software", "Math & Physics"],
  "blog-articles/supply-chain-vulnerabilities.html": ["Security", "DevSecOps", "Programming & Software", "Engineering"],
  "blog-articles/impossibility.html": ["Philosophy", "Math & Physics", "Engineering"],
  "blog-articles/cloud-vulnerabilities.html": ["Security", "Networks", "DevSecOps"],
  "blog-articles/app-vulns.html": ["Security", "Programming & Software", "DevSecOps"],
  "blog-articles/curl-reference.html": ["Programming & Software", "Networks"],
  "blog-articles/net_troubleshooting_tools.html": ["Networks", "Security"],
  "blog-articles/hardware-installation-best-practices.html": ["Engineering"],
  "blog-articles/storage-devices.html": ["Engineering", "Operating Systems"],
  "blog-articles/cpu-fundamentals.html": ["Engineering", "Operating Systems"],
  "blog-articles/ram.html": ["Engineering", "Operating Systems"],
  "blog-articles/spring-cache.html": ["Programming & Software", "DevSecOps", "Spring"],
  "blog-articles/complexity-classes.html": ["Math & Physics", "Programming & Software"],
  "blog-articles/memory-unsafe-c-cpp.html": ["Security", "Programming & Software", "Operating Systems"],
  "blog-articles/systems-engineering-methodologies.html": ["Engineering", "Cyber-Physical Systems", "Learning"],
  "blog-articles/system-reliability-patterns.html": ["Engineering", "DevSecOps", "Programming & Software"],
  "blog-articles/spring-cloud-devops.html": ["Programming & Software", "DevSecOps", "Kubernetes", "Networks", "Spring"],
  "blog-articles/secure-architecture.html": ["Security", "Engineering", "DevSecOps"],
  "blog-articles/rust-programming-language.html": ["Programming & Software", "Operating Systems", "Security"],
  "blog-articles/rlc-circuit-equation.html": ["Math & Physics", "Engineering", "Differential Equations"],
  "blog-articles/ot-ics-scada-pentesting.html": ["Security", "Cyber-Physical Systems", "Networks", "Pentesting"],
  "blog-articles/interval-problems-playbook.html": ["Math & Physics", "Programming & Software", "Competitive Programming"],
  "blog-articles/greedy-competitive-programming.html": ["Math & Physics", "Programming & Software", "Competitive Programming"],
  "blog-articles/django-architecture-scaling.html": ["Programming & Software", "Engineering", "DevSecOps", "Django"],
  "blog-articles/devsecops-engineer.html": ["DevSecOps", "Security", "Programming & Software"],
  "blog-articles/angular-security-testing.html": ["Web & UI", "Programming & Software", "Angular", "Security"],
  "blog-articles/ai-cannot-compensate-for-natural-stupidity.html": ["AI & Machine Learning", "Philosophy", "Society & Civics"],
  "blog-articles/2d-dynamic-programming.html": ["Math & Physics", "Programming & Software", "Competitive Programming"],
  "blog-articles/the-map-is-not-the-territory.html": ["Philosophy", "Security", "Engineering"],
  "blog-articles/stacks-in-competitive-programming.html": ["Math & Physics", "Programming & Software", "Competitive Programming"],
  "blog-articles/privilege-separation.html": ["Operating Systems", "Security", "Programming & Software"],
  "blog-articles/models-of-reality.html": ["Philosophy", "AI & Machine Learning", "Math & Physics"],
  "blog-articles/mobile-security-architecture.html": ["Security", "Mobile App Development", "Android", "Operating Systems"],
  "blog-articles/dc-infrastructure-security.html": ["Security", "Networks", "DevSecOps", "Engineering"],
  "blog-articles/nmap-mainframe-pentesting.html": ["Security", "Networks", "Nmap", "Pentesting"],
  "blog-articles/nmap-cloud-pentesting.html": ["Security", "Networks", "DevSecOps", "Nmap", "Pentesting"],
  "blog-articles/css-methodologies.html": ["Web & UI", "Programming & Software"],
  "blog-articles/code-review-best-practices.html": ["Programming & Software", "Engineering"],
  "blog-articles/backend-performance.html": ["Programming & Software", "Engineering", "DevSecOps"],
  "blog-articles/arrays-and-hashing-cp.html": ["Math & Physics", "Programming & Software", "Competitive Programming"],
  "blog-articles/two-pointers.html": ["Math & Physics", "Programming & Software", "Competitive Programming"],
  "blog-articles/trusted-hardware.html": ["Security", "Engineering", "Operating Systems"],
  "blog-articles/nmap-red-team.html": ["Security", "Networks", "Nmap", "Pentesting"],
  "blog-articles/1d-dynamic-programming.html": ["Math & Physics", "Programming & Software", "Competitive Programming"],
  "blog-articles/angular-performance.html": ["Web & UI", "Programming & Software", "Angular"],
  "blog-articles/animation-angular.html": ["Web & UI", "Programming & Software", "Angular"],
  "blog-articles/internationalization-angular.html": ["Web & UI", "Programming & Software", "Angular"],
  "blog-articles/nmap-active-directory.html": ["Security", "Networks", "Nmap", "Pentesting"],
  "blog-articles/nmap-advanced.html": ["Security", "Networks", "Nmap", "Pentesting"],
  "blog-articles/nmap-fundamentals.html": ["Security", "Networks", "Nmap", "Pentesting"],
  "blog-articles/nmap-ics-ot-pentesting.html": ["Security", "Networks", "Cyber-Physical Systems", "Nmap", "Pentesting"],
  "blog-articles/nmap-reconnaissance-platform.html": ["Security", "Networks", "Nmap", "Pentesting"],
  "blog-articles/version_control.html": ["Programming & Software"],
  "blog-articles/soft-robotics.html": ["Cyber-Physical Systems", "Engineering"],
  "blog-articles/sfi.html": ["Operating Systems", "Security", "Programming & Software"],
  "blog-articles/rewriting_history_git.html": ["Programming & Software"],
  "blog-articles/os-vm-isolation.html": ["Operating Systems", "Security", "Programming & Software"],
  "blog-articles/network-observability.html": ["Networks", "Security"],
  "blog-articles/mlops.html": ["AI & Machine Learning", "Engineering", "Programming & Software"],
  "blog-articles/messaging-security.html": ["Security", "Privacy", "Programming & Software"],
  "blog-articles/csharp.html": ["Programming & Software"],
  "blog-articles/concurrency_python.html": ["Python", "Programming & Software"],
  "blog-articles/aspnet-orm.html": ["ASP.NET", "Programming & Software"],
  "blog-articles/aspnet-core-testing.html": ["ASP.NET", "Programming & Software"],
  "blog-articles/anonymous_comm.html": ["Privacy", "Security", "Networks"],
  "blog-articles/aspnet-dependency-injection.html": ["ASP.NET", "Programming & Software"],
  "blog-articles/android-app-components.html": ["Programming & Software", "Engineering", "Android", "Mobile App Development"],
  "blog-articles/control_pyramid.html": ["Cyber-Physical Systems", "Engineering", "Networks"],
  "blog-articles/docker-data-persistence.html": ["Programming & Software", "Engineering", "Docker", "DevSecOps"],
  "blog-articles/go-language.html": ["Programming & Software"],
  "blog-articles/kubernetes-deployment-patterns.html": ["Programming & Software", "Engineering", "Networks", "Kubernetes", "DevSecOps"],
  "blog-articles/malware-analysis.html": ["Security"],
  "blog-articles/mojo.html": ["Programming & Software", "AI & Machine Learning"],
  "blog-articles/autonomous-vehicles.html": ["AI & Machine Learning", "Cyber-Physical Systems", "Engineering", "Robotics"],
  "blog-articles/building-developer-communities.html": ["Programming & Software", "Society & Civics"],
  "blog-articles/data-quality.html": ["AI & Machine Learning", "Engineering", "Programming & Software"],
  "blog-articles/efficient-edge-ai.html": ["AI & Machine Learning", "Cyber-Physical Systems", "Engineering"],
  "blog-articles/vibe-coding-risk-framework.html": ["AI & Machine Learning", "Programming & Software", "Security", "DevSecOps"],
  "blog-articles/wireless-networking.html": ["Networks", "Security"],
  "blog-articles/api-authentication.html": ["Security", "Programming & Software", "DevSecOps"],
  "blog-articles/bit-manipulation.html": ["Math & Physics", "Programming & Software", "Competitive Programming"],
  "blog-articles/error-prevention-high-stakes.html": ["Engineering"],
  "blog-articles/Farm_Bill_2026.html": ["Society & Civics", "Veganism"],
  "blog-articles/frontend-performance.html": ["Web & UI", "Programming & Software"],
  "blog-articles/purple-teamer-role.html": ["Security"],
  "blog-articles/service-mesh.html": ["Networks", "Programming & Software", "Kubernetes", "DevSecOps"],
  "blog-articles/system-design-interview-prep.html": ["Programming & Software", "Engineering"],
  "blog-articles/lua-programming-language.html": ["Programming & Software"],
  "blog-articles/cyber-defense-forensics-analyst.html": ["Security"],
  "blog-articles/vgn-pressure-campaigns.html": ["Veganism", "Society & Civics"],
  "blog-articles/threat-hunter-role.html": ["Security"],
  "blog-articles/swift-programming-language.html": ["Programming & Software", "Mobile App Development"],
  "blog-articles/senior-engineer-thinking.html": ["Programming & Software", "Engineering"],
  "blog-articles/red-teamer-infosec.html": ["Security"],
  "blog-articles/mcp.html": ["AI & Machine Learning", "Programming & Software", "Security"],
  "blog-articles/info-access-debate.html": ["Society & Civics", "Philosophy"],
  "blog-articles/embedded-firmware-layer.html": ["Cyber-Physical Systems", "Engineering", "Programming & Software"],
  "blog-articles/edge-computing-layer.html": ["Cyber-Physical Systems", "Engineering", "Networks", "Programming & Software"],
  "blog-articles/device-drivers-cps.html": ["Cyber-Physical Systems", "Engineering", "Programming & Software", "Networks"],
  "blog-articles/spring-testing-article.html": ["Programming & Software", "Security", "DevSecOps", "Docker", "Spring"],
  "blog-articles/signal-conditioning-hardware.html": ["Cyber-Physical Systems", "Engineering"],
  "blog-articles/planning-reduction-sat-modelchecking.html": ["AI & Machine Learning", "Programming & Software", "Math & Physics"],
  "blog-articles/math-geometry-competitive-programming.html": ["Math & Physics", "Programming & Software", "Competitive Programming"],
  "blog-articles/java-build-tools.html": ["Programming & Software"],
  "blog-articles/entertainment-sport-spectacle.html": ["Veganism", "Society & Civics"],
  "blog-articles/embedded-compute-layer.html": ["Cyber-Physical Systems", "Engineering"],
  "blog-articles/cps-physical-layer.html": ["Cyber-Physical Systems", "Engineering"],
  "blog-articles/ai-model-vulnerabilities.html": ["AI & Machine Learning", "Security", "DevSecOps"],
  "blog-articles/animal-research-science-education.html": ["Veganism", "Society & Civics"],
  "blog-articles/humane-ethical-small-scale-animal-use.html": ["Veganism", "Society & Civics"],
  "blog-articles/api-security-best-practices.html": ["Security", "Programming & Software", "DevSecOps"],
  "blog-articles/newtons_second_law_dynamics.html": ["Math & Physics", "Engineering", "Differential Equations"],
  "blog-articles/drl-humanoid-robotics.html": ["AI & Machine Learning", "Cyber-Physical Systems", "Engineering", "Robotics"],
  "blog-articles/causal_ai.html": ["AI & Machine Learning"],
  "blog-articles/cache-timing-attacks.html": ["Security", "Programming & Software"],
  "blog-articles/hidden-animal-ingredients.html": ["Veganism"],
  "blog-articles/action-model-learning.html": ["AI & Machine Learning", "Programming & Software"],
  "blog-articles/explainable-ai-lime-shap.html": ["AI & Machine Learning"],
  "blog-articles/insects-and-small-animals.html": ["Veganism", "Philosophy"],
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
  "blog-articles/zero-trust-architecture.html": ["Security", "Networks", "DevSecOps"],
  "blog-articles/edge-iot-networking.html": ["Networks", "Cyber-Physical Systems"],
  "blog-articles/vegan_business_models.html": ["Veganism", "Society & Civics"],
  "blog-articles/learning-modalities.html": ["Learning", "Society & Civics"],
  "blog-articles/corporate-vegan-pressure.html": ["Veganism", "Society & Civics"],
  "blog-articles/smart-grid-challenges.html": ["Cyber-Physical Systems", "Engineering", "Security"],
  "blog-articles/vegan-activism-incentives.html": ["Veganism", "Society & Civics"],
  "blog-articles/industrial-protocol-design.html": ["Cyber-Physical Systems", "Networks", "Security"],
  "blog-articles/medical_device_engineering_challenges.html": ["Cyber-Physical Systems", "Engineering", "Security"],
  "blog-articles/us-citizen-politics-guide.html": ["Society & Civics"],
  "blog-articles/vegan-legislative-activism.html": ["Veganism", "Society & Civics"],
  "blog-articles/suffering_humans_vs_animals.html": ["Veganism", "Philosophy"],
  "blog-articles/fraud-and-ai.html": ["AI & Machine Learning", "Security", "Society & Civics"],
  "blog-articles/outages-are-inevitable.html": ["Engineering", "Philosophy"],
  "blog-articles/limits-of-knowledge.html": ["Philosophy", "AI & Machine Learning"],
  "blog-articles/biology-engineering-challenge.html": ["Engineering", "Philosophy"],
  "blog-articles/engineering_as_philosophy.html": ["Engineering", "Philosophy"],
  "blog-articles/know-your-rights.html": ["Society & Civics"],
  "blog-articles/mental_health_blog.html": ["Society & Civics"],
  "blog-articles/information-security-for-everyone.html": ["Security", "Privacy"],
  "blog-articles/levels-of-digital-privacy.html": ["Privacy", "Security"],
  "blog-articles/why-digital-privacy-is-important.html": ["Privacy", "Security"],
  "blog-articles/event-driven-networks.html": ["Networks", "Programming & Software"],
  "blog-articles/networks-performance-reliability.html": ["Networks", "Engineering"],
  "blog-articles/ui-structure-concepts.html": ["Web & UI", "Programming & Software"],
  "blog-articles/vegan-activism-frmwrk.html": ["Veganism", "Society & Civics"],
  "blog-articles/vegan-education.html": ["Veganism", "Learning", "Society & Civics"],
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
  "blog-articles/pl-philosophy.html": ["Programming & Software", "Philosophy"],
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
