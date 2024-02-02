export const fileToBase64 = (file) => {
    if (file) {
      return new Promise((resolve) => {
        let baseURL = "";
  
        let reader = new FileReader();
  
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          baseURL = reader.result.substr(reader.result.indexOf(",") + 1);
  
          resolve(baseURL);
        };
      });
    }
    return null;
  };
