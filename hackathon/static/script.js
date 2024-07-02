document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map', {
        center: [-23.442503, -58.443832], // Centrado en Sudamérica
        zoom: 4, // Nivel de zoom inicial
        dragging: false, // Deshabilita el movimiento del mapa
        zoomControl: false, // Deshabilita el control de zoom
        scrollWheelZoom: false, // Deshabilita el zoom con la rueda del ratón
        doubleClickZoom: false, // Deshabilita el zoom con doble clic
        boxZoom: false, // Deshabilita el zoom con el rectángulo de selección
        keyboard: false, // Deshabilita el movimiento del mapa con el teclado
        tap: false, // Deshabilita el zoom y el movimiento en dispositivos táctiles
        touchZoom: false // Deshabilita el zoom táctil
    });

    map.touchZoom.disable(); // Deshabilita el zoom táctil adicionalmente

    const bounds = [
        [-56.9, -105.2], // Suroeste de América Latina
        [14.7, -28.6]    // Noreste de América Latina
    ];

    map.fitBounds(bounds);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    function getStaticUrl(filename) {
        return '/static/logos/' + filename;
    }

    function mostrarUltimasMedicionesParaguay() {
        fetch('/api/ultimas-mediciones/paraguay')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error:', data.error);
                    return;
                }

                const popupContent = `
                    <div>
                        <img src="${getStaticUrl('paraguay.png')}" alt="Paraguay" width="50" height="50"><br>
                        <strong>Temperatura:</strong> ${data.temperatura}°C<br>
                        <strong>Humedad:</strong> ${data.humedad}%<br>
                        <strong>Fecha y Hora:</strong> ${data.fecha}<br>
                        <strong>Velocidad del Viento:</strong> ${data.velocidad} m/s<br>
                        <strong>Energia Solar</strong> ${data.energia}(W/m²)<br>
                        <a href="/mediciones/Paraguay">Ver Más</a>
                    </div>
                `;

                const paraguayMarker = L.marker([-25.301111, -57.571167]).addTo(map); // Coordenadas específicas de Paraguay
                paraguayMarker.bindPopup(popupContent);
            })
            .catch(error => {
                console.error('Error al obtener las mediciones de Paraguay:', error);
            });
    }

    mostrarUltimasMedicionesParaguay();
});
