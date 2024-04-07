// import React from 'react';
// import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

// const geoJSONData = {
//     "type": "Feature",
//     "properties": {
//         "name": "Israel (Pre-1967)"
//     },
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [
//             [
//                 [34.267578125, 31.052933985705163],
//                 [34.2779541015625, 31.02407003014667],
//                 [34.309539794921875, 30.99161358183556],
//                 [34.35272216796875, 31.00344469545083],
//                 [34.3719482421875, 30.999534081874883],
//                 [34.38232421875, 31.00684876275269],
//                 [34.386444091796875, 31.021842285022008],
//                 [34.37675476074219, 31.033666177243554],
//                 [34.359588623046875, 31.04305599979497],
//                 [34.34104919433594, 31.05602465346048],
//                 [34.32868957519531, 31.052933985705163],
//                 [34.3060302734375, 31.06375877455725],
//                 [34.29161071777344, 31.06821559185842],
//                 [34.267578125, 31.052933985705163]
//             ]
//         ]
//     }
// };

// // Function to calculate bounds from GeoJSON coordinates
// function calculateBounds(geoJSONData) {
//     let minLat = Infinity;
//     let maxLat = -Infinity;
//     let minLng = Infinity;
//     let maxLng = -Infinity;

//     // Iterate over all coordinates to find the min and max values
//     geoJSONData.geometry.coordinates[0].forEach(coord => {
//         const [lng, lat] = coord;
//         minLat = Math.min(minLat, lat);
//         maxLat = Math.max(maxLat, lat);
//         minLng = Math.min(minLng, lng);
//         maxLng = Math.max(maxLng, lng);
//     });

//     // Return the bounds object
//     return [[minLat, minLng], [maxLat, maxLng]];
// }

// function MapBoard() {
//     const bounds = calculateBounds(geoJSONData);

//     return (
//         <div className="MapBoard">
//             <MapContainer bounds={bounds} center={[31.5, 34.9]} zoom={7} style={{ height: "600px", width: "100%" }}>
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 <GeoJSON data={geoJSONData} style={{ color: 'red', weight: 4 }} />
//             </MapContainer>
//         </div>
//     );
// }

// export default MapBoard;
