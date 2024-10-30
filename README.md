# Frontend Developer Intern Take-Home Assignment

## Overview

Create a simple web application using Next.js that implements a login page and a user settings page. This assignment is designed to evaluate your understanding of frontend development fundamentals, React concepts and ability to implement common web application features.

## Boilerplate Code

We have provided a starter template that includes:

Firebase initialization file (firebase.ts)

### Important Note about Firebase Setup:

The provided Firebase configuration file will not work out of the box. Part of the assignment is to identify and make the necessary changes to get Firebase working. You will need to:

- Review the Firebase configuration
- Identify the missing pieces
- Make appropriate modifications

## Time Expectation

- Expected completion time: 1 week

## Requirements

### Technical Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Any component library

### Login Page (`/login`)

- Form with email and password inputs
- Basic form validation:
  - Email format validation
  - Password minimum length (8 characters)
- Loading state during form submission
- Error handling and display
- Redirect to settings page on successful login
- Users accessing root route and have not logged in should be redirected to '/login'

### Settings Page (`/settings`)

- Must be a protected route (only accessible after login)
- Include the following sections:
  - Name
    - First Name
    - Last Name
  - Profile picture
  - Signature
- Users that are accessing root route and have logged in should be redirected to '/settings'

### Additional Features

- Loading states for all async operations
- Basic error handling
- Clean and maintainable code structure

## Evaluation Criteria

We will evaluate your submission based on:

1. Code organization and cleanliness
2. Component structure and reusability
3. State management approach
4. Error handling
5. UI/UX considerations
6. Effective TypeScript usage

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

- A backend server is provided for this assignment, hosted at [34.118.195.238:8080/api/v1]
- API documentation is available through Swagger UI at [34.118.195.238:8080/swagger]
- You can explore and test all available endpoints directly in the Swagger interface

## Need Help?

If you have any questions or need clarification, please reach out to [digital@performance-rotors.com]. We're here to help!

Good luck!
