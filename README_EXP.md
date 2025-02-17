## Functionalities

### 1. User Authentication

- Implemented using Firebase Authentication.
- Sign-in page (`/signin`) with email and password login.
- Form validation for email format and password length (minimum 8 characters).
- Password visibility toggle for user convenience.

### 2. Session Management

- User tokens are securely stored as HTTP-only cookies.
- Sessions last for 1 week before expiring.
- Logout functionality that clears the session cookie.

### 3. Route Protection

- Middleware ensures that:
  - Unauthenticated users are redirected to the sign-in page when trying to access protected routes.
  - Authenticated users are redirected to the settings page when trying to access the sign-in page or root route.

### 4. Settings Page

- Protected route that requires authentication to access.
- Fetches and displays member data from the backend API.
- Implements a side navigation component.
- Uses a settings layout component for consistent UI.

### 5. API Integration

- Custom `fetchWithAuth` utility for making authenticated API requests.
- Automatically refreshes and includes the Firebase ID token in API requests.


## File Structure

- `signin/page.tsx`: Implements the sign-in functionality and UI.
- `settings/page.tsx`: Implements the settings page with member data fetching.
- `api/auth/session/route.ts`: Handles session creation and token storage.
- `api/auth/logout/route.ts`: Handles user logout and session clearing.
- `utils/api.ts`: Contains the `fetchWithAuth` utility for authenticated API requests.
- `middleware.ts`: Implements route protection.
- `services/firebase/firebase.ts`: Initializes Firebase and exports the auth instance.

