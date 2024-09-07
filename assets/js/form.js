// TODO: Create a variable that selects the form element
const blogForm = document.getElementById('blogForm');

// TODO: Create a function that handles the form submission
const handleFormSubmit = (e) => {
  e.preventDefault(); // Prevent form from submitting the default way

  // Grab the form data
  const username = document.getElementById('username').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  // Check for missing data
  if (!username || !title || !content) {
    document.getElementById('error').textContent = 'All fields are required!';
    return;
  }

  // Create a new blog post object
  const newBlogPost = {
    username,
    title,
    content,
    date: new Date().toLocaleString() // Add a timestamp
  };

  // Get existing blog posts from localStorage, or create a new array if none exist
  const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

  // Add the new blog post to the array
  blogPosts.push(newBlogPost);

  // Save the updated blog posts array to localStorage
  localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

  // Redirect to the blog page (use your redirect logic here)
  redirectPage('./blog.html'); // Make sure you have a blog.html page
};

// TODO: Add an event listener to the form on submit
if (blogForm) {
  blogForm.addEventListener('submit', handleFormSubmit);
} else {
  console.error('Form with id "blogForm" not found');
}