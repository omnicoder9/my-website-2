const performanceState = {
    cls: 0,
    fid: null,
    lcp: null,
    longTaskCount: 0,
    pageLoadTime: null,
    pageWeight: 0,
    cachedResources: 0,
    requestCount: 0,
    tbt: 0,
    averageFrame: null,
    worstFrame: null,
    frameCount: 0,
    overBudgetFrames: 0
};
function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}
function setWidth(id, percent) {
    const element = document.getElementById(id);
    if (element instanceof HTMLElement) {
        element.style.width = `${Math.max(0, Math.min(100, percent))}%`;
    }
}
function setState(id, state, text) {
    const element = document.getElementById(id);
    if (!element) {
        return;
    }
    element.textContent = text;
    element.setAttribute("data-state", state);
}
function formatMilliseconds(value) {
    if (value === null || Number.isNaN(value)) {
        return "Not available";
    }
    if (value >= 1000) {
        return `${(value / 1000).toFixed(2)} s`;
    }
    return `${Math.round(value)} ms`;
}
function formatPerformanceBytes(bytes) {
    if (!bytes || bytes < 0) {
        return "0 KB";
    }
    if (bytes >= 1024 * 1024) {
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${(bytes / 1024).toFixed(1)} KB`;
}
function shortResourceName(url) {
    try {
        const parsed = new URL(url, window.location.href);
        return `${parsed.pathname.split("/").pop() || parsed.pathname}${parsed.search ? parsed.search : ""}`;
    }
    catch (_a) {
        const parts = url.split("/");
        return parts[parts.length - 1] || url;
    }
}
function getBrowserInfo(userAgent) {
    const ua = userAgent || "";
    let browser = "Unknown browser";
    let version = "unknown";
    const edgeMatch = ua.match(/Edg\/([\d.]+)/);
    const chromeMatch = ua.match(/Chrome\/([\d.]+)/);
    const firefoxMatch = ua.match(/Firefox\/([\d.]+)/);
    const safariMatch = ua.match(/Version\/([\d.]+).*Safari/);
    if (edgeMatch) {
        browser = "Microsoft Edge";
        version = edgeMatch[1];
    }
    else if (chromeMatch && !/Edg\//.test(ua)) {
        browser = "Google Chrome";
        version = chromeMatch[1];
    }
    else if (firefoxMatch) {
        browser = "Mozilla Firefox";
        version = firefoxMatch[1];
    }
    else if (safariMatch && !/Chrome\//.test(ua)) {
        browser = "Safari";
        version = safariMatch[1];
    }
    return `${browser} ${version}`;
}
function getOsInfo(userAgent) {
    const ua = userAgent || "";
    if (/Windows NT/.test(ua)) {
        return "Windows";
    }
    if (/Mac OS X/.test(ua)) {
        return "macOS";
    }
    if (/Android/.test(ua)) {
        return "Android";
    }
    if (/iPhone|iPad|iPod/.test(ua)) {
        return "iOS";
    }
    if (/Linux/.test(ua)) {
        return "Linux";
    }
    return "Unknown OS";
}
function getDeviceType(userAgent) {
    const ua = userAgent || "";
    if (/Tablet|iPad/.test(ua)) {
        return "Tablet";
    }
    if (/Mobi|Android/.test(ua)) {
        return "Phone";
    }
    return "Desktop";
}
function getNavigationEntry() {
    const navigationEntries = performance.getEntriesByType("navigation");
    return navigationEntries.length > 0 ? navigationEntries[0] : null;
}
function supportsObserverType(type) {
    if (!("PerformanceObserver" in window)) {
        return false;
    }
    const supportedTypes = PerformanceObserver.supportedEntryTypes;
    if (!supportedTypes || supportedTypes.length === 0) {
        return true;
    }
    return supportedTypes.indexOf(type) !== -1;
}
function observeEntryType(type, handler) {
    if (!supportsObserverType(type)) {
        return;
    }
    try {
        new PerformanceObserver((entryList) => {
            handler(entryList.getEntries());
        }).observe({ type, buffered: true });
    }
    catch (error) {
        console.error(`Performance observer setup failed for ${type}:`, error);
    }
}
function getLegacyDomInteractive() {
    if (!("timing" in performance)) {
        return null;
    }
    const timing = performance.timing;
    if (!timing || !timing.navigationStart || !timing.domInteractive) {
        return null;
    }
    return timing.domInteractive - timing.navigationStart;
}
function updateServerStatus(message, state) {
    setState("server-status", state, message);
}
async function getData() {
    try {
        const response = await fetch("/api/health", { cache: "no-store" });
        if (!response.ok) {
            if (response.status === 404) {
                updateServerStatus("Static mode only · no backend endpoint", "static");
                return;
            }
            throw new Error(`Health check returned ${response.status}`);
        }
        const data = (await response.json());
        const serviceLabel = data.service || "Backend";
        const uptimeLabel = data.uptime ? ` · uptime ${data.uptime}` : "";
        updateServerStatus(`${serviceLabel} ${data.status || "online"}${uptimeLabel}`, "live");
    }
    catch (error) {
        console.error("Backend health check failed:", error);
        updateServerStatus("Static mode only · backend unavailable", "static");
    }
}
function updateAssetMetrics() {
    const resourceEntries = performance.getEntriesByType("resource");
    const requestCount = resourceEntries.length;
    const totalTransfer = resourceEntries.reduce((sum, resource) => {
        return sum + (resource.transferSize || 0);
    }, 0);
    const totalDecoded = resourceEntries.reduce((sum, resource) => {
        return sum + (resource.decodedBodySize || resource.encodedBodySize || resource.transferSize || 0);
    }, 0);
    const cachedResources = resourceEntries.filter((resource) => {
        return resource.transferSize === 0 && (resource.decodedBodySize > 0 || resource.encodedBodySize > 0);
    }).length;
    const initiatorCounts = {};
    resourceEntries.forEach((resource) => {
        const key = resource.initiatorType || "other";
        initiatorCounts[key] = (initiatorCounts[key] || 0) + 1;
    });
    const assetMix = Object.keys(initiatorCounts)
        .sort((left, right) => initiatorCounts[right] - initiatorCounts[left])
        .slice(0, 4)
        .map((key) => `${key} ${initiatorCounts[key]}`)
        .join(" • ");
    const rankedResources = resourceEntries
        .map((resource) => {
        const weight = resource.transferSize || resource.decodedBodySize || resource.encodedBodySize || 0;
        return {
            name: resource.name,
            shortName: shortResourceName(resource.name),
            type: resource.initiatorType || "other",
            weight
        };
    })
        .sort((left, right) => right.weight - left.weight);
    const largestAsset = rankedResources[0];
    const topAssetsList = document.getElementById("topAssetsList");
    if (topAssetsList) {
        topAssetsList.innerHTML = "";
        if (rankedResources.length === 0) {
            const listItem = document.createElement("li");
            listItem.textContent = "No resource timing entries were exposed by this browser.";
            topAssetsList.appendChild(listItem);
        }
        else {
            rankedResources.slice(0, 5).forEach((resource) => {
                const listItem = document.createElement("li");
                const label = document.createElement("span");
                label.textContent = resource.shortName;
                const meta = document.createElement("strong");
                meta.textContent = `${formatPerformanceBytes(resource.weight)} · ${resource.type}`;
                listItem.appendChild(label);
                listItem.appendChild(meta);
                topAssetsList.appendChild(listItem);
            });
        }
    }
    performanceState.pageWeight = totalTransfer;
    performanceState.cachedResources = cachedResources;
    performanceState.requestCount = requestCount;
    setText("pageSize", formatPerformanceBytes(totalTransfer));
    setText("decodedWeight", formatPerformanceBytes(totalDecoded));
    setText("httpRequests", requestCount.toLocaleString());
    setText("cachedResources", cachedResources.toLocaleString());
    setText("largestAsset", largestAsset ? `${largestAsset.shortName} (${formatPerformanceBytes(largestAsset.weight)})` : "No assets recorded");
    setText("assetTypeMix", assetMix || "No resource mix available");
}
function updateLoadMetrics() {
    const navigationEntry = getNavigationEntry();
    const pageLoadTime = navigationEntry
        ? navigationEntry.loadEventEnd - navigationEntry.startTime
        : null;
    const timeToInteractive = navigationEntry
        ? navigationEntry.domInteractive - navigationEntry.startTime
        : getLegacyDomInteractive();
    performanceState.pageLoadTime = pageLoadTime && pageLoadTime > 0 ? pageLoadTime : null;
    setText("pageLoadTime", performanceState.pageLoadTime !== null ? formatMilliseconds(performanceState.pageLoadTime) : "Performance data not available");
    setText("timeToInteractive", formatMilliseconds(timeToInteractive));
    setText("firstInputDelay", "Awaiting first user input");
    setText("totalBlockingTime", "0 ms");
    setText("paintEntryCount", performance.getEntriesByType("paint").length.toLocaleString());
    setText("layoutShiftCount", "0");
    setText("longTaskCount", "0");
}
function updateOverallSummary() {
    const scoreParts = [];
    if (performanceState.pageLoadTime !== null) {
        scoreParts.push(scoreLowerIsBetter(performanceState.pageLoadTime, 2000, 4500));
    }
    if (performanceState.lcp !== null) {
        scoreParts.push(scoreLowerIsBetter(performanceState.lcp, 2500, 4000));
    }
    scoreParts.push(scoreLowerIsBetter(performanceState.cls, 0.1, 0.25));
    scoreParts.push(scoreLowerIsBetter(performanceState.tbt, 200, 600));
    if (performanceState.averageFrame !== null) {
        scoreParts.push(scoreLowerIsBetter(performanceState.averageFrame, 16.7, 30));
    }
    const score = scoreParts.length === 0
        ? 0
        : Math.round(scoreParts.reduce((sum, part) => sum + part, 0) / scoreParts.length);
    const overBudgetRatio = performanceState.frameCount > 0
        ? performanceState.overBudgetFrames / performanceState.frameCount
        : 0;
    let summary = "Collecting runtime data.";
    if (score >= 85) {
        summary = "Lean page load with comfortable render headroom.";
    }
    else if (score >= 65) {
        summary = "Healthy overall, with a few measurable hotspots worth tuning.";
    }
    else if (score > 0) {
        summary = "The page works, but rendering or load cost is noticeably heavier than it should be.";
    }
    if (performanceState.requestCount > 50) {
        summary += " Request volume is high.";
    }
    if (performanceState.pageWeight > 1024 * 1024) {
        summary += " Transfer weight has crossed 1 MB.";
    }
    if (overBudgetRatio > 0.25) {
        summary += " Frame pacing is also spending a lot of time over budget.";
    }
    setText("performanceScore", score > 0 ? `${score}/100` : "Pending");
    setText("performanceSummary", summary);
}
function scoreLowerIsBetter(value, goodThreshold, poorThreshold) {
    if (value <= goodThreshold) {
        return 100;
    }
    if (value >= poorThreshold) {
        return 35;
    }
    const ratio = (value - goodThreshold) / (poorThreshold - goodThreshold);
    return Math.round(100 - ratio * 65);
}
function startAnimationBudgetSample() {
    const sampleDuration = 3000;
    const budgetPerFrame = 16.7;
    const start = performance.now();
    let previousFrame = start;
    let frameCount = 0;
    let totalFrameTime = 0;
    let overBudgetFrames = 0;
    let worstFrame = 0;
    const sampleFrame = (currentTime) => {
        const delta = currentTime - previousFrame;
        previousFrame = currentTime;
        if (frameCount > 0) {
            totalFrameTime += delta;
            worstFrame = Math.max(worstFrame, delta);
            if (delta > budgetPerFrame) {
                overBudgetFrames += 1;
            }
        }
        frameCount += 1;
        if (currentTime - start < sampleDuration) {
            window.requestAnimationFrame(sampleFrame);
            return;
        }
        const measuredFrames = Math.max(frameCount - 1, 0);
        const averageFrame = measuredFrames > 0 ? totalFrameTime / measuredFrames : null;
        const overBudgetRatio = measuredFrames > 0 ? overBudgetFrames / measuredFrames : 0;
        const healthPercent = measuredFrames > 0 ? Math.round((1 - overBudgetRatio) * 100) : 0;
        performanceState.averageFrame = averageFrame;
        performanceState.worstFrame = worstFrame || null;
        performanceState.frameCount = measuredFrames;
        performanceState.overBudgetFrames = overBudgetFrames;
        setText("animationFrameCount", measuredFrames.toLocaleString());
        setText("animationAverageFrame", averageFrame !== null ? `${averageFrame.toFixed(1)} ms` : "Not available");
        setText("animationWorstFrame", worstFrame > 0 ? `${worstFrame.toFixed(1)} ms` : "Not available");
        setText("animationOverBudget", `${overBudgetFrames.toLocaleString()} frames`);
        setWidth("animationBudgetBar", healthPercent);
        if (averageFrame === null) {
            setText("animationBudgetStatus", "Unavailable");
            setText("animationBudgetNote", "Not enough animation frames were sampled.");
        }
        else if (overBudgetRatio <= 0.1) {
            setText("animationBudgetStatus", "Comfortable");
            setText("animationBudgetNote", `Average frame time stayed near ${averageFrame.toFixed(1)} ms with only ${(overBudgetRatio * 100).toFixed(0)}% of frames over budget.`);
        }
        else if (overBudgetRatio <= 0.25) {
            setText("animationBudgetStatus", "Tight");
            setText("animationBudgetNote", `Frame pacing is acceptable but ${(overBudgetRatio * 100).toFixed(0)}% of sampled frames exceeded 16.7 ms.`);
        }
        else {
            setText("animationBudgetStatus", "Janky");
            setText("animationBudgetNote", `Rendering pressure is visible: ${(overBudgetRatio * 100).toFixed(0)}% of sampled frames missed the 16.7 ms budget.`);
        }
        updateOverallSummary();
    };
    window.requestAnimationFrame(sampleFrame);
}
function populateVisitorInfo() {
    var _a, _b;
    const userAgent = navigator.userAgent || "";
    const requestedPage = window.location.href;
    const requestTime = new Date().toISOString();
    const referrer = document.referrer || "Direct visit (no referrer)";
    const language = navigator.language || "Unknown";
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const navigationEntry = getNavigationEntry();
    const networkType = ((_a = navigator.connection) === null || _a === void 0 ? void 0 : _a.effectiveType) || ((_b = navigator.connection) === null || _b === void 0 ? void 0 : _b.type) || "Not available in this browser";
    const appProtocol = window.location.protocol.replace(":", "").toUpperCase();
    const transportProtocol = navigationEntry ? navigationEntry.nextHopProtocol || "unknown transport" : "unknown transport";
    const protocolInfo = `${appProtocol} / ${transportProtocol}; TLS version not exposed by browser`;
    setText("visitorNetworkType", networkType);
    setText("visitorBrowser", getBrowserInfo(userAgent));
    setText("visitorOs", getOsInfo(userAgent));
    setText("visitorDeviceType", getDeviceType(userAgent));
    setText("visitorScreenResolution", screenResolution);
    setText("visitorLanguage", language);
    setText("visitorReferrer", referrer);
    setText("visitorRequestedPage", requestedPage);
    setText("visitorRequestTime", requestTime);
    setText("visitorProtocolInfo", protocolInfo);
    void fetch("https://ipapi.co/json/", { cache: "no-store" })
        .then((response) => {
        if (!response.ok) {
            throw new Error("IP lookup failed");
        }
        return response.json();
    })
        .then((data) => {
        setText("visitorIpAddress", data.ip || "Unavailable");
        setText("visitorIsp", data.org || "Unavailable");
    })
        .catch((error) => {
        console.error("IP/ISP lookup failed:", error);
        setText("visitorIpAddress", "Unavailable (blocked or offline)");
        setText("visitorIsp", "Unavailable (blocked or offline)");
    });
}
function initializePerformanceDashboard() {
    updateLoadMetrics();
    updateAssetMetrics();
    updateOverallSummary();
    populateVisitorInfo();
    void getData();
    const existingPaintEntries = performance.getEntriesByType("paint");
    setText("paintEntryCount", existingPaintEntries.length.toLocaleString());
    if (!supportsObserverType("paint")) {
        setText("firstPaint", "Not available");
        setText("firstContentfulPaint", "Not available");
    }
    if (!supportsObserverType("largest-contentful-paint")) {
        setText("largestContentfulPaint", "Not available");
    }
    if (!supportsObserverType("layout-shift")) {
        setText("cumulativeLayoutShift", "Not available");
        setText("layoutShiftCount", "Not available");
    }
    if (!supportsObserverType("first-input")) {
        setText("firstInputDelay", "Not available");
    }
    if (!supportsObserverType("longtask")) {
        setText("totalBlockingTime", "Not available");
        setText("longTaskCount", "Not available");
    }
    observeEntryType("paint", (entries) => {
        const allPaintEntries = performance.getEntriesByType("paint");
        setText("paintEntryCount", allPaintEntries.length.toLocaleString());
        entries.forEach((entry) => {
            if (entry.name === "first-paint") {
                setText("firstPaint", formatMilliseconds(entry.startTime));
            }
            if (entry.name === "first-contentful-paint") {
                setText("firstContentfulPaint", formatMilliseconds(entry.startTime));
            }
        });
    });
    observeEntryType("largest-contentful-paint", (entries) => {
        const lastEntry = entries[entries.length - 1];
        if (!lastEntry) {
            return;
        }
        performanceState.lcp = lastEntry.startTime;
        setText("largestContentfulPaint", formatMilliseconds(lastEntry.startTime));
        updateOverallSummary();
    });
    let layoutShiftCount = 0;
    observeEntryType("layout-shift", (entries) => {
        entries.forEach((entry) => {
            const layoutEntry = entry;
            if (!layoutEntry.hadRecentInput && layoutEntry.value !== undefined) {
                performanceState.cls += layoutEntry.value;
                layoutShiftCount += 1;
            }
        });
        setText("cumulativeLayoutShift", performanceState.cls.toFixed(4));
        setText("layoutShiftCount", layoutShiftCount.toLocaleString());
        updateOverallSummary();
    });
    observeEntryType("first-input", (entries) => {
        const firstInputEntry = entries[0];
        if (!firstInputEntry || firstInputEntry.processingStart === undefined) {
            return;
        }
        performanceState.fid = firstInputEntry.processingStart - firstInputEntry.startTime;
        setText("firstInputDelay", formatMilliseconds(performanceState.fid));
    });
    observeEntryType("longtask", (entries) => {
        entries.forEach((entry) => {
            performanceState.longTaskCount += 1;
            performanceState.tbt += Math.max(0, entry.duration - 50);
        });
        setText("totalBlockingTime", formatMilliseconds(performanceState.tbt));
        setText("longTaskCount", performanceState.longTaskCount.toLocaleString());
        updateOverallSummary();
    });
    if (document.readyState === "complete") {
        startAnimationBudgetSample();
    }
    else {
        window.addEventListener("load", () => {
            updateLoadMetrics();
            updateAssetMetrics();
            startAnimationBudgetSample();
            updateOverallSummary();
        }, { once: true });
    }
}
document.addEventListener("DOMContentLoaded", initializePerformanceDashboard);
