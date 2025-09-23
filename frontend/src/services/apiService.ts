// API Service for categories
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const apiService = {
  getAllCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw data from backend:', data);
      console.log('Data type:', typeof data);
      console.log('Is array:', Array.isArray(data));
      
      // Check if data is already in correct format or needs transformation
      if (Array.isArray(data)) {
        console.log('Data is array, using directly');
        return data.map((category: any) => ({
          id: category.id,
          name: category.name,
          description: category.description,
          image: category.image
        }));
      } else if (data.results && Array.isArray(data.results)) {
        console.log('Data has results property');
        return data.results.map((category: any) => ({
          id: category.id,
          name: category.name,
          description: category.description,
          image: category.image
        }));
      } else {
        console.log('Unexpected data format:', data);
        throw new Error('Unexpected data format from backend');
      }
    } catch (error) {
      console.error('Error fetching categories from backend:', error);
      
      // Return fallback data if backend fails
      return [
        { id: 1, name: 'RFID Readers' },
        { id: 2, name: 'RFID Tags' },
        { id: 3, name: 'RFID Antennas' },
        { id: 4, name: 'RFID Accessories' },
        { id: 5, name: 'RFID Software' },
        { id: 6, name: 'RFID Services' }
      ];
    }
  }
};

export default apiService;
