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
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Success, server is running:', data);
        return data;
    } catch (error) {
        console.error('Error for real:', error);
        throw error;
    }
}
console.log("here")
getData()
console.log("there")

document.addEventListener('DOMContentLoaded', () => {
    // Page Load Time
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    document.getElementById('pageLoadTime').textContent = `${loadTime} ms`;

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