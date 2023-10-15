import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Clear any user session data (e.g., token, user data) stored in localStorage
    localStorage.removeItem('token'); // Clear the authentication token
    // Optionally, you can clear other user-related data if needed.
    
    // Perform any additional actions you need for logging out.

    // You can also set a flag in your state to indicate that the user is logged out.
    // For example, if you have a state variable like `userLoggedIn`, set it to `false`.

    // Reload the page to ensure the changes take effect.
    window.location.reload();
  };

  return (
    <div>
      <p>Logging out...</p>
      <button onClick={handleLogout}>Logout</button> {/* Add a logout button */}
    </div>
  );
};

export default Logout;