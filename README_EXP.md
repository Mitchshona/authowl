## Functionalities

### 1. User Authentication

- Implemented using Firebase Authentication.
- Sign-in page (`/signin`) with email and password login.
- Form validation for email format and password length (minimum 8 characters).
- Password visibility toggle for user convenience.
- "Remember me" option for persistent login.
- Forgot password link (functionality to be implemented).

### 2. Session Management

- User tokens are securely stored as HTTP-only cookies.
- Sessions last for 1 week before expiring.
- Logout functionality that clears the session cookie.

### 3. Route Protection

- Middleware ensures that:
  - Unauthenticated users are redirected to the sign-in page when trying to access protected routes.
  - Authenticated users are redirected to the settings page when trying to access the sign-in page or root route.
  - API routes include the authorization header for authenticated requests.

### 4. Settings Page

- Protected route that requires authentication to access.
- Fetches and displays member data from the backend API.
- Implements a side navigation component.
- Uses a settings layout component for consistent UI.

### 5. API Integration

- Custom `fetchWithAuth` utility for making authenticated API requests.
- Automatically refreshes and includes the Firebase ID token in API requests.
- Handles unauthorized errors (401) and other API errors.

### 6. Error Handling

- Displays error messages for authentication failures.
- Handles and displays errors when fetching member data.

### 7. Loading States

- Implements loading states during authentication checks and data fetching.

### 8. Responsive Design

- Uses Tailwind CSS for responsive and customizable UI components.

## File Structure

- `signin/page.tsx`: Implements the sign-in functionality and UI.
- `settings/page.tsx`: Implements the settings page with member data fetching.
- `api/auth/session/route.ts`: Handles session creation and token storage.
- `api/auth/logout/route.ts`: Handles user logout and session clearing.
- `utils/api.ts`: Contains the `fetchWithAuth` utility for authenticated API requests.
- `middleware.ts`: Implements route protection and request/response manipulation.
- `services/firebase/firebase.ts`: Initializes Firebase and exports the auth instance.

## Setup and Configuration

1. Ensure Firebase configuration is correctly set up in `services/firebase/firebase.ts`.
2. Set up environment variables for Firebase configuration (API key, etc.).
3. Implement the backend API at the specified endpoint (http://34.118.195.238:8080/api/v1).

## Future Improvements

1. Implement forgot password functionality.
2. Add user registration feature.
3. Enhance error handling and user feedback.
4. Implement additional settings management features.
5. Add unit and integration tests for robust functionality.
