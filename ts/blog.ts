type BlogDirectoryPost = {
  path: string;
  publishedAt: string;
  summary: string;
  title: string;
};

const blogPosts: BlogDirectoryPost[] = [
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
  }
];

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
      const dateDelta = new Date(right.post.publishedAt).getTime() - new Date(left.post.publishedAt).getTime();
      if (dateDelta !== 0) {
        return dateDelta;
      }

      return left.index - right.index;
    })
    .map(({ post }) => post);
}

function renderBlogArticles(searchTerm: string): void {
  const target = document.getElementById("blog-articles");
  const statusElement = document.getElementById("blogResultsStatus");

  if (!target || !statusElement) {
    return;
  }

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredPosts = getSortedBlogPosts().filter((post) => {
    return post.title.toLowerCase().includes(normalizedSearchTerm);
  });

  if (filteredPosts.length === 0) {
    target.innerHTML = `
      <section class="privacy-section blog-empty-state">
        <h2>No matching articles</h2>
        <p>Try a different title search.</p>
      </section>
    `;
    statusElement.textContent = "0 articles shown.";
    return;
  }

  target.innerHTML = filteredPosts
    .map((post) => {
      return `
        <article class="privacy-section blog-directory-card">
          <p class="blog-directory-card__date">${formatBlogDate(post.publishedAt)}</p>
          <h2><a href="${post.path}">${post.title}</a></h2>
          <p>${post.summary}</p>
          <a class="blog-directory-card__link" href="${post.path}">Read article</a>
        </article>
      `;
    })
    .join("");

  statusElement.textContent = `${filteredPosts.length} article${filteredPosts.length === 1 ? "" : "s"} shown. Sorted newest first.`;
}

function initializeBlogDirectory(): void {
  const searchInput = document.getElementById("blogSearchInput") as HTMLInputElement | null;
  if (!searchInput) {
    return;
  }

  renderBlogArticles("");
  searchInput.addEventListener("input", () => {
    renderBlogArticles(searchInput.value);
  });
}

document.addEventListener("DOMContentLoaded", initializeBlogDirectory);
