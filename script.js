function initMap() {
    // Center map on Accra
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 5.6037, lng: -0.1870 }, // Accra center coordinates
        mapTypeId: 'satellite',
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
        zoomControl: true
    });

    // Generate 1000 random data points around Accra
    const heatmapData = generateAccraHeatmapData(1000);
    
    // Create and configure the heatmap layer
    const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map,
        radius: 25,
        opacity: 0.8,
        gradient: [
            'rgba(0, 255, 255, 0)',   // transparent
            'rgba(0, 255, 255, 1)',   // cyan (coolest)
            'rgba(0, 191, 255, 1)',   // light blue
            'rgba(0, 127, 255, 1)',   // blue
            'rgba(0, 63, 255, 1)',    // darker blue
            'rgba(255, 255, 0, 1)',   // yellow
            'rgba(255, 191, 0, 1)',   // light orange
            'rgba(255, 127, 0, 1)',   // orange
            'rgba(255, 63, 0, 1)',    // dark orange
            'rgba(255, 0, 0, 1)'      // red (hottest)
        ]
    });
}

// Function to generate 1000 data points for Accra with realistic temperature distribution
function generateAccraHeatmapData(numPoints) {
    const data = [];
    
    // Accra center coordinates
    const CENTER_LAT = 5.6037;
    const CENTER_LNG = -0.1870;
    
    // Define major areas of Accra with different temperature profiles
    const areas = [
        { name: "Central Accra", lat: 5.5504, lng: -0.2047, baseTemp: 32, radius: 0.03 },
        { name: "Airport Residential", lat: 5.6027, lng: -0.1718, baseTemp: 30, radius: 0.02 },
        { name: "Labadi", lat: 5.5601, lng: -0.1481, baseTemp: 29, radius: 0.025 },
        { name: "Cantonments", lat: 5.5763, lng: -0.1790, baseTemp: 30, radius: 0.02 },
        { name: "East Legon", lat: 5.6301, lng: -0.1517, baseTemp: 31, radius: 0.03 },
        { name: "Accra Mall area", lat: 5.6356, lng: -0.1709, baseTemp: 33, radius: 0.02 },
        { name: "Osu", lat: 5.5506, lng: -0.1752, baseTemp: 31, radius: 0.025 },
        { name: "Makola Market", lat: 5.5479, lng: -0.2101, baseTemp: 34, radius: 0.015 },
        { name: "Jamestown", lat: 5.5344, lng: -0.2146, baseTemp: 33, radius: 0.02 },
        { name: "Achimota", lat: 5.6515, lng: -0.2365, baseTemp: 30, radius: 0.03 }
    ];
    
    // Function to calculate distance between two coordinates
    function getDistance(lat1, lng1, lat2, lng2) {
        return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2));
    }
    
    // Generate points distributed across Accra
    for (let i = 0; i < numPoints; i++) {
        // Random point within Accra boundaries
        const lat = CENTER_LAT + (Math.random() - 0.5) * 0.2;
        const lng = CENTER_LNG + (Math.random() - 0.5) * 0.25;
        
        // Determine temperature based on location relative to defined areas
        let temp = 28; // Default base temperature
        
        // Find closest area and adjust temperature
        let minDistance = 1.0;
        let closestArea = null;
        
        for (const area of areas) {
            const distance = getDistance(lat, lng, area.lat, area.lng);
            if (distance < area.radius * 3) {
                // Point is influenced by this area
                const influence = Math.max(0, 1 - (distance / (area.radius * 3)));
                temp += (area.baseTemp - temp) * influence;
            }
            
            if (distance < minDistance) {
                minDistance = distance;
                closestArea = area;
            }
        }
        
        // Add some randomness to the temperature
        temp += (Math.random() - 0.5) * 2;
        
        // Coastal areas are slightly cooler
        if (lng > -0.1670 && lat < 5.5600) {
            temp -= 1 + Math.random();
        }
        
        // Urban heat island effect - denser areas are warmer
        if (getDistance(lat, lng, 5.5504, -0.2047) < 0.05) {
            temp += 1 + Math.random();
        }
        
        // Add the data point
        data.push({
            location: new google.maps.LatLng(lat, lng),
            weight: temp
        });
    }
    
    return data;
}