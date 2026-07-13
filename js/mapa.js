'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const mapElement = document.getElementById('mapaCabanita');

    if (!mapElement || typeof L === 'undefined') {
        return;
    }

    const lat = -5.6358125;
    const lng = -78.5335625;

    const businessName = "Pollos a la brasa 'La Cabañita'";
    const businessAddress = 'Av. Héroes del Cenepa 1466, Bagua 01721';
    const plusCode = '9F78+MH Bagua';

    const googleMapsQuery = encodeURIComponent(
        `${businessName}, ${businessAddress}, ${plusCode}`
    );

    const directionsUrl =
        `https://www.google.com/maps/search/?api=1&query=${googleMapsQuery}`;

    const map = L.map(mapElement, {
        scrollWheelZoom: false
    }).setView([lat, lng], 18);

    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }
    ).addTo(map);

    const icon = L.icon({
        iconUrl: 'imagenes/favicon-cabanita.png',
        iconSize: [72, 72],
        iconAnchor: [36, 68],
        popupAnchor: [0, -62],
        className: 'map-logo-marker'
    });

    L.marker([lat, lng], {
        icon,
        title: businessName
    })
        .addTo(map)
        .bindPopup(`
            <strong>${businessName}</strong><br>
            ${businessAddress}<br>
            <small>${plusCode}</small><br>
            <a
                href="${directionsUrl}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Cómo llegar
            </a>
        `)
        .openPopup();
});
