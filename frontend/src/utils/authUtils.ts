// Utility functions for handling authentication tokens
export const setAuthToken = (token: string): void => {
    localStorage.setItem('authToken', token);
  };
  
  export const getAuthToken = (): string | null => {
    return localStorage.getItem('authToken');
  };
  
  export const removeAuthToken = (): void => {
    localStorage.removeItem('authToken');
  };