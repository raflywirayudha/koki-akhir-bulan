Act as an Expert UI/UX Designer (UI-UX-Pro-Max) and a Senior Frontend Developer. 

I need you to refactor and completely elevate the UI/UX of my web application project called "Koki Akhir Bulan" (End-of-Month Chef). The core concept is a chatbot that provides creative recipes based on whatever leftover ingredients the user has in their fridge.

Tech Stack: React (Functional Components, Hooks) and Tailwind CSS.

Currently, the app has 3 main pages/views: Landing Page, Chat (the core feature), and About. 

Please provide a complete frontend refactoring plan, including the `tailwind.config.js` theme setup, component structure, and the actual refactored React code. 

Here are the specific UI/UX requirements:

1. Global Design System (Appetizing & Approachable)
- Vibe/Mood: Warm, inviting, budget-friendly but premium-feeling.
- Color Palette (Tailwind Custom Colors): Food-inspiring warm tones (e.g., Burnt Orange as primary, Mustard Yellow as secondary, Cream/Off-white for backgrounds) with a touch of fresh Sage Green for accents/success states.
- Typography: Clean and modern sans-serif (e.g., Inter or Poppins).
- Responsiveness: Must be heavily optimized for mobile devices (mobile-first approach using Tailwind's `md:`, `lg:` prefixes).

2. Landing Page Component (<Landing />)
- Hero Section: A catchy, relatable headline (e.g., "Empty Wallet? Empty Fridge? Let's Cook Something Delicious.").
- CTA: A prominent, highly clickable button with nice hover effects (using Tailwind's `hover:`, `transition`, `transform`) that leads to the Chat interface.
- Visuals: Clean, breathable layout.

3. Chat Interface Components (<ChatLayout />, <ChatBubble />, <RecipeCard />)
- Input Area: A smart, fixed-bottom input field. Include horizontal scrollable "suggestion chips" for common leftovers (e.g., "Egg", "Rice", "Instant Noodles").
- Chat Bubbles: Differentiate user inputs and the bot's response using distinct background colors and alignments.
- Recipe Output Format: The bot's response MUST be formatted as a beautiful <RecipeCard /> component featuring: Title, Prep Time (with icons), List of Ingredients (with checkboxes if possible), and Step-by-Step instructions. 
- Empty State / Loading: Provide a styled loading state (e.g., a pulsing animation using Tailwind's `animate-pulse`) while the AI generates the recipe.

4. About Page Component (<About />)
- A clean, modern layout explaining the mission: saving money during the end of the month and reducing food waste.
- Present the information using a grid of simple, aesthetic cards (`grid-cols-1 md:grid-cols-3`).

Please start by providing the custom `tailwind.config.js` setup for the color palette and fonts. Then, provide the refactored React code for the Chat Interface (including the <RecipeCard /> and suggestion chips), as it is the most critical part of the app. Ensure the code is modular, uses best practices for React hooks, and looks visually stunning with Tailwind utility classes.