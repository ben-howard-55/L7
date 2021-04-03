type AuthState = {
  isAuthenticated?: boolean;
  isConfirmed?: boolean;
  isHydrated: boolean;
  user?: string;
  token?: string;
};

export default AuthState;
