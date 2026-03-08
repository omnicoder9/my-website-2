async function getData() {
    try {
        //const response = await fetch('http://localhost:8080');
        const response = await fetch('http://localhost:8080', {
            method: 'GET',
            //mode: 'cors', // Explicitly set CORS mode
            headers: {
                'Content-Type': 'application/json',
            },
            //credentials: 'same-origin' // or 'include' if you need to send cookies
        });
        const statusElement = document.getElementById('server-status');
        if (!statusElement) {
            console.error("Error: #server-status element not found.");
            throw new Error('HTML server status "server-status" element not found.');
        }
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Success, server is running:', data);
        statusElement.innerHTML = '✅ Server is up';
        return data;
    } catch (error) {
        console.error('Error for real:', error);
        // throw error;
        // document.getElementById('server-status').innerHTML = '❌ Server is down';
        const statusElement = document.getElementById('server-status');
        if (statusElement) {
            statusElement.innerHTML = '❌ Server is down';
        }
        throw new Error("server is down");
    }
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = value;
    }
}

function getBrowserInfo(userAgent) {
    const ua = userAgent || "";
    let browser = "Unknown browser";
    let version = "unknown";

    if (/Edg\/([\d.]+)/.test(ua)) {
        browser = "Microsoft Edge";
        version = ua.match(/Edg\/([\d.]+)/)[1];
    } else if (/Chrome\/([\d.]+)/.test(ua) && !/Edg\//.test(ua)) {
        browser = "Google Chrome";
        version = ua.match(/Chrome\/([\d.]+)/)[1];
    } else if (/Firefox\/([\d.]+)/.test(ua)) {
        browser = "Mozilla Firefox";
        version = ua.match(/Firefox\/([\d.]+)/)[1];
    } else if (/Version\/([\d.]+).*Safari/.test(ua) && !/Chrome\//.test(ua)) {
        browser = "Safari";
        version = ua.match(/Version\/([\d.]+)/)[1];
    }

    return `${browser} ${version}`;
}

function getOsInfo(userAgent) {
    const ua = userAgent || "";
    if (/Windows NT/.test(ua)) return "Windows";
    if (/Mac OS X/.test(ua)) return "macOS";
    if (/Android/.test(ua)) return "Android";
    if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
    if (/Linux/.test(ua)) return "Linux";
    return "Unknown OS";
}

function getDeviceType(userAgent) {
    const ua = userAgent || "";
    if (/Tablet|iPad/.test(ua)) return "Tablet";
    if (/Mobi|Android/.test(ua)) return "Phone";
    return "Desktop";
}

async function populateVisitorInfo() {
    const userAgent = navigator.userAgent || "";
    const requestedPage = window.location.href;
    const requestTime = new Date().toISOString();
    const referrer = document.referrer || "Direct visit (no referrer)";
    const language = navigator.language || "Unknown";
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const networkType = (navigator.connection && (navigator.connection.effectiveType || navigator.connection.type))
        ? `${navigator.connection.effectiveType || navigator.connection.type}`
        : "Not available in this browser";
    const navEntry = performance.getEntriesByType("navigation")[0];
    const appProtocol = window.location.protocol.replace(":", "").toUpperCase();
    const transportProtocol = navEntry && navEntry.nextHopProtocol ? navEntry.nextHopProtocol : "unknown transport";
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

    try {
        const response = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        if (!response.ok) {
            throw new Error("IP lookup failed");
        }
        const data = await response.json();
        const ipAddress = data && data.ip ? data.ip : "Unavailable";
        const isp = data && data.org ? data.org : "Unavailable";
        setText("visitorIpAddress", ipAddress);
        setText("visitorIsp", isp);
    } catch (error) {
        console.error("IP/ISP lookup failed:", error);
        setText("visitorIpAddress", "Unavailable (blocked or offline)");
        setText("visitorIsp", "Unavailable (blocked or offline)");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateVisitorInfo();
    try{
        getData();//check for server connection
    } catch (error) {
        console.log("error: ", error);
    }
    console.log("l41");
    

    // Page Load Time
    const [navigationEntry] = performance.getEntriesByType('navigation');
    const x = navigationEntry.toJSON();
    console.log(x);

    if (navigationEntry) {
        // Calculate the load time in seconds
        console.log(x.loadEventEnd - x.startTime)
        // console.log(navigationEntry.loadEventEnd)
        // console.log(navigationEntry.startTime)
        const loadTimeInSeconds = ((navigationEntry.loadEventEnd - navigationEntry.startTime) / 1000).toFixed(5);

        // Update the HTML element with the measured load time
       
        document.getElementById('pageLoadTime').innerText = `${loadTimeInSeconds} seconds`;
    } else {
        document.getElementById('pageLoadTime').innerText = 'Performance data not available';
    }

    console.log("abcde")
    // const observer = new PerformanceObserver((list) => {
    //     list.getEntries().forEach((entry) => {
    //       const unloadEventTime = entry.unloadEventEnd - entry.unloadEventStart;
    //       if (unloadEventTime > 0) {
    //         console.log(
    //           `${entry.name}: unload event handler time: ${unloadEventTime}ms`,
    //         );
    //       }
    //     });
    //   });
      
    // observer.observe({ type: "navigation", buffered: true });
      
    const entries = performance.getEntriesByType("navigation");
    entries.forEach((entry) => {
    const loadEventTime = entry.loadEventEnd - entry.loadEventStart;
        if (loadEventTime > 0) {
            console.log(`${entry.name}:
            load event handler time: ${loadEventTime}ms`);
        }
    });


    // const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    // document.getElementById('pageLoadTime').textContent = `${loadTime} ms`;

    // Using PerformanceObserver for modern metrics
    // First Paint and First Contentful Paint
    new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        for (const entry of entries) {
            if (entry.name === 'first-paint') {
                document.getElementById('firstPaint').textContent = `${Math.round(entry.startTime)} ms`;
            }
            if (entry.name === 'first-contentful-paint') {
                document.getElementById('firstContentfulPaint').textContent = `${Math.round(entry.startTime)} ms`;
            }
        }
    }).observe({ type: 'paint', buffered: true });

    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        document.getElementById('largestContentfulPaint').textContent = `${Math.round(lastEntry.startTime)} ms`;
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // Cumulative Layout Shift
    new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        document.getElementById('cumulativeLayoutShift').textContent = lastEntry.value.toFixed(4);
    }).observe({ type: 'layout-shift', buffered: true });

    // Page Size (in KB)
    const pageSize = (performance.getEntriesByType('resource').reduce((acc, resource) => {
        return acc + (resource.transferSize || 0);
    }, 0) / 1024).toFixed(2);
    document.getElementById('pageSize').textContent = `${pageSize} KB`;

    // Number of HTTP Requests
    const httpRequests = performance.getEntriesByType('resource').length;
    document.getElementById('httpRequests').textContent = httpRequests;

    // Time to Interactive (using navigation timing)
    const tti = window.performance.timing.domInteractive - window.performance.timing.navigationStart;
    document.getElementById('timeToInteractive').textContent = `${tti} ms`;

    // Note: First Input Delay and Total Blocking Time require more complex measurement
    // and user interaction. For this example, we'll show placeholder values
    document.getElementById('firstInputDelay').textContent = 'Requires user interaction';
    document.getElementById('totalBlockingTime').textContent = 'Requires long task measurement';
});
