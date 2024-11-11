// src/app/page.tsx

"use client"; // Keep this if you need to use hooks in this component.

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/signin'); // Redirect to the SignIn page
}
