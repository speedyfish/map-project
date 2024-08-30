// Function to perform reverse geocoding
const getAreaName = async (lat, lng) => {
    try {
      // Nominatim reverse geocoding URL
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
      
      // Fetch the area name from Nominatim
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error fetching area name: ${response.statusText}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
      
      // Extract the display name or address from the response
      const areaName = data.display_name || 'Unknown location';
  
      console.log('Area Name:', areaName); 
      return areaName; 
  
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
      return 'Error fetching location';
    }
  };
  
export default getAreaName
  