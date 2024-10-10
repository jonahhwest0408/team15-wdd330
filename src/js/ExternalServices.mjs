const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor(category) {
  }

  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // checkout method to submit the order
  async checkout(order) {
    const url = 'https://wdd330-backend.onrender.com/checkout'; 
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    };
  
    console.log("Payload being sent to server:", JSON.stringify(order, null, 2));
  
    const response = await fetch(url, options);
    const result = await response.text(); 
  
    console.log("Server response:", result); 
  
    if (!response.ok) {
      throw new Error("Bad Response");
    }
  
    return result;
  }
}