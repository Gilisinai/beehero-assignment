# React Native User and Post Management App

## Overview

This project is a React Native application built with TypeScript. It allows users to manage a list of users and their associated posts. The main features include:

- Displaying a list of users and their details.
- Viewing and editing posts associated with a selected user.
- Using Redux Toolkit for state management.
- Implementing custom components and styles for better UI/UX.
- Handling asynchronous actions with `createAsyncThunk`.
- Memoizing selectors and components to improve performance.

## Features

- **User Management**

  - Fetch and display a list of users.
  - Select a user to view their posts.
  - Remove a user from the list.

- **Post Management**

  - Fetch and display posts for a selected user.
  - Edit post titles and bodies with validation.
  - Remove posts from the list.

- **Location on a Map**

  - Show user's lat,lng with a bee marker on a map.

## Setup and Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Gilisinai/beehero-assignment.git
   cd beehero-assignment

   ```

2. **Install dependencies:**

   ```sh
   npm install

   ```

3. **Run the application:**
   ```sh
   npm run start
   ```

## Main Components and Features

- **UserCard Component**

  - Displays user details.
  - Includes a button to remove the user.
  - Navigates to a map view showing user's location coordinates.

- **PostCard Component**
  - Displays post title and body.
  - Includes a button to remove the post.
  - Truncates long titles with ellipsis.
- **EditPostModal Component**

  - Modal for editing post titles and bodies.
  - Validates input fields to ensure they are not empty.

- **Redux Integration**

  - State Management: Uses Redux Toolkit for managing state.
  - Thunks: Handles asynchronous actions using createAsyncThunk.
  - Selectors: Memoized selectors using reselect to optimize performance.

## Improvements and Future Enhancements

- Styling Enhancements: Refine styling for a more polished and consistent look across the application (adding more global styles etc... ).
- Making more reusable components , CustomInput , Loader that recieves state dynamically, reusable Card etc.. .
- Adding a Create Post functionality , for now , if all the posts of a user is deleted , the app will refetch them from the api as new ones.
