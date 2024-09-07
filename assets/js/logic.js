// Function to toggle light/dark mode and save the preference in localStorage
const toggleMode = () => {
  const body = document.body;

  // Check if dark mode is enabled
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');
    localStorage.setItem('theme', 'light'); // Save light mode preference
  } else {
    body.classList.remove('light');
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark'); // Save dark mode preference
  }
};

// Function to apply the saved theme from localStorage
const applySavedTheme = () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    document.body.classList.add(savedTheme);
  } else {
    document.body.classList.add('light'); // Default to light mode if no preference is found
  }
};

// Function to read blog data from local storage
const readLocalStorage = () => {
  const data = localStorage.getItem('blogData');
  return data ? JSON.parse(data) : []; // Return parsed data if exists, else return empty array
};

// Function to store blog data to local storage
const storeLocalStorage = (newBlog) => {
  let blogData = readLocalStorage(); // Get existing blog data from local storage
  blogData.push(newBlog); // Add the new blog post
  localStorage.setItem('blogData', JSON.stringify(blogData)); // Store updated blog data in local storage
};

// Redirect function
let redirectURL = '';

const redirectPage = function (url) {
  redirectURL = url;
  location.assign(url);
};

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Apply the saved theme (light/dark mode)
  applySavedTheme();

  // Add event listener to the toggle button
  const toggleButton = document.getElementById('toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleMode);
  } else {
    console.error('Toggle button with id "toggle" not found');
  }

  // Add event listener for the blog form submission
  const blogForm = document.getElementById('blogForm');
  if (blogForm) {
    blogForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent form from submitting normally

      // Get form values
      const username = document.getElementById('username').value;
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;

      // Basic validation
      if (!username || !title || !content) {
        document.getElementById('error').textContent = 'All fields are required!';
        return;
      }

      // Create new blog object
      const newBlog = {
        username,
        title,
        content,
        date: new Date().toLocaleString()
      };

      // Store new blog post in local storage
      storeLocalStorage(newBlog);

      // Redirect to a new page after storing the blog post
      redirectPage('./blog.html'); // Update this URL as needed
    });
  } else {
    console.error('Form with id "blogForm" not found');
  }
});