const haversineDistance = (loc1, loc2) => {
  const R = 6371; // Earth's radius in kilometers
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(loc2.lat - loc1.lat); // Latitude difference in radians
  const dLon = toRad(loc2.lng - loc1.lng); // Longitude difference in radians

  const a =
      Math.sin(dLat / 2) ** 2 +                    // sin²(Δlat/2)
      Math.cos(toRad(loc1.lat)) *                  // cos(lat1)
      Math.cos(toRad(loc2.lat)) *                  // cos(lat2)
      Math.sin(dLon / 2) ** 2;                     // sin²(Δlon/2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

module.exports = haversineDistance;
