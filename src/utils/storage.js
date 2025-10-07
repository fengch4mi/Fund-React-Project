export const putAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const clearAccessToken = () => {
  localStorage.removeItem('accessToken');
};

export const putAuthUser = (user) => {
  try {
    localStorage.setItem('authUser', JSON.stringify(user));
  } catch (e) {
    // ignore serialization errors
  }
};

export const getAuthUser = () => {
  try {
    const v = localStorage.getItem('authUser');
    return v ? JSON.parse(v) : null;
  } catch (e) {
    return null;
  }
};

export const clearAuthUser = () => {
  localStorage.removeItem('authUser');
};
