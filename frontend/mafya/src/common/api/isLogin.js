export const isLogin = () => !!localStorage.getItem("userCode");
export const isAdmin = () => !!localStorage.getItem("isManager");
