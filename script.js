let map;
let markers = [];
let markerGroups = {
    landmarks: [],
    hotels: [],
    markets: []
};

function initMap() {
    // Center map on Accra
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 5.6037, lng: -0.1870 }, // Accra center coordinates
        mapTypeId: 'roadmap',
        streetViewControl: true,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true
    });

    // Add markers for various locations in Accra
    addAccraMarkers();
    
    // Add click handlers for buttons
    document.getElementById('show-all-btn').addEventListener('click', function() {
        showMarkerGroup('all');
    });
    
    document.getElementById('show-landmarks-btn').addEventListener('click', function() {
        showMarkerGroup('landmarks');
    });
    
    document.getElementById('show-hotels-btn').addEventListener('click', function() {
        showMarkerGroup('hotels');
    });
    
    document.getElementById('show-markets-btn').addEventListener('click', function() {
        showMarkerGroup('markets');
    });
}

function addAccraMarkers() {
    // Landmarks
    addMarker({
        position: { lat: 5.5476, lng: -0.2074 },
        title: "Kwame Nkrumah Memorial Park",
        category: "landmarks",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        content: "<div><strong>Kwame Nkrumah Memorial Park</strong><p>Memorial park dedicated to Ghana's first president</p></div>"
    });
    
    addMarker({
        position: { lat: 5.5554, lng: -0.1969 },
        title: "National Theatre of Ghana",
        category: "landmarks",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        content: "<div><strong>National Theatre of Ghana</strong><p>Major performing arts venue in Accra</p></div>"
    });
    
    addMarker({
        position: { lat: 5.5446, lng: -0.2059 },
        title: "Independence Square",
        category: "landmarks",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        content: "<div><strong>Independence Square</strong><p>Second largest city square in the world</p></div>"
    });
    
    addMarker({
        position: { lat: 5.5319, lng: -0.2057 },
        title: "Jamestown Lighthouse",
        category: "landmarks",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        content: "<div><strong>Jamestown Lighthouse</strong><p>Historic lighthouse in the old district of Accra</p></div>"
    });
    
    addMarker({
        position: { lat: 5.6268, lng: -0.1735 },
        title: "University of Ghana",
        category: "landmarks",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        content: "<div><strong>University of Ghana</strong><p>Premier university in Ghana, founded in 1948</p></div>"
    });
    
    // Hotels
    addMarker({
        position: { lat: 5.5663, lng: -0.1787 },
        title: "Kempinski Hotel Gold Coast City",
        category: "hotels",
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        content: "<div><strong>Kempinski Hotel Gold Coast City</strong><p>5-star luxury hotel</p></div>"
    });
    
    addMarker({
        position: { lat: 5.5578, lng: -0.1763 },
        title: "Mövenpick Ambassador Hotel",
        category: "hotels",
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        content: "<div><strong>Mövenpick Ambassador Hotel</strong><p>Luxury hotel with large pool and gardens</p></div>"
    });
    
    addMarker({
        position: { lat: 5.5687, lng: -0.1523 },
        title: "Labadi Beach Hotel",
        category: "hotels",
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        content: "<div><strong>Labadi Beach Hotel</strong><p>Beachfront luxury hotel</p></div>"
    });
    
    addMarker({
        position: { lat: 5.5932, lng: -0.1850 },
        title: "Tang Palace Hotel",
        category: "hotels",
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        content: "<div><strong>Tang Palace Hotel</strong><p>4-star hotel in the embassy district</p></div>"
    });
    
    // Markets
    addMarker({
        position: { lat: 5.5460, lng: -0.2099 },
        title: "Makola Market",
        category: "markets",
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        content: "<div><strong>Makola Market</strong><p>One of the largest markets in Ghana</p></div>"
    });
    
    addMarker({
        position: { lat: 5.5549, lng: -0.1867 },
        title: "Art Centre Market",
        category: "markets",
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        content: "<div><strong>Art Centre Market</strong><p>Famous for traditional crafts and souvenirs</p></div>"
    });
    
    addMarker({
        position: { lat: 5.5829, lng: -0.2206 },
        title: "Kaneshie Market",
        category: "markets",
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        content: "<div><strong>Kaneshie Market</strong><p>Major market and transportation hub</p></div>"
    });
    
    // Add more markers for Accra
    addMarker({
        position: { lat: 5.6356, lng: -0.1709 },
        title: "Accra Mall",
        category: "landmarks",
        icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
        content: "<div><strong>Accra Mall</strong><p>Largest shopping mall in Accra</p></div>"
    });
    
    addMarker({
        position: { lat: 5.6033, lng: -0.1871 },
        title: "37 Military Hospital",
        category: "landmarks",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        content: "<div><strong>37 Military Hospital</strong><p>One of Ghana's major medical centers</p></div>"
    });
    
    addMarker({
        position: { lat: 5.6025, lng: -0.1694 },
        title: "Flagstaff House",
        category: "landmarks",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        content: "<div><strong>Flagstaff House</strong><p>Presidential palace and office</p></div>"
    });
}

function addMarker(props) {
    const marker = new google.maps.Marker({
        position: props.position,
        map: map,
        title: props.title
    });
    
    // Set custom icon if provided
    if(props.icon) {
        marker.setIcon(props.icon);
    }
    
    // Add to appropriate category
    if(props.category) {
        markerGroups[props.category].push(marker);
    }
    
    markers.push(marker);
    
    // Add info window if content provided
    if(props.content) {
        const infoWindow = new google.maps.InfoWindow({
            content: props.content
        });
        
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    }
}

function showMarkerGroup(group) {
    // Hide all markers first
    markers.forEach(marker => {
        marker.setMap(null);
    });
    
    // Then show selected group
    if(group === 'all') {
        markers.forEach(marker => {
            marker.setMap(map);
        });
    } else {
        markerGroups[group].forEach(marker => {
            marker.setMap(map);
        });
    }
}