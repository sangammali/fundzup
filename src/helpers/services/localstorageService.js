// localstorageService.js

const localstorageService = {};

localstorageService.set = (key, value) => {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
};

localstorageService.get = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value === null ? undefined : JSON.parse(value);
  } catch (e) {
    console.error(`Error parsing JSON for key: ${key}`, e);
    return undefined;
  }
};

localstorageService.clear = () => {
  localStorage.clear();
};

localstorageService.remove = (key) => {
  localStorage.removeItem(key);
};

export { localstorageService };
