const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json(); 

  if (res.ok) {
    return jsonResponse; 
  } else {
    throw { 
      name: "servicesError", 
      message: jsonResponse 
    };
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
    const url = "https://wdd330-backend.onrender.com/checkout"; 
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    };
  
    console.log("Payload being sent to server:", JSON.stringify(order, null, 2));
  
    const response = await fetch(url, options);
    const result = await convertToJson(response);
  
    console.log("Server response:", result); 
  
    if (!response.ok) {
      throw new Error("Bad Response");
    }
  
    console.log("Server response:", result);
    return result;
  }
}