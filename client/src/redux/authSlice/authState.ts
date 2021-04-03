type AuthState = {
  isAuthenticated?: boolean;
  isConfirmed?: boolean;
  isHydrated: boolean;
  user?: string;
};

export default AuthState;
