import React from 'react';

const UserPage = ({ match }) => {
  // You can access the user's username from the URL parameter
  const username = match.params.username;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Welcome, {username}!</p>

      {/* Add more content to display user-specific information */}
      {/* For example, you can display user's lists, profile details, etc. */}
    </div>
  );
};

export default UserPage;