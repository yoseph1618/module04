// TODO: Create a variable that selects the main element, and a variable that selects the back button element
const mainElement = document.querySelector('main');
const backButton = document.getElementById('back');

// TODO: Create a function that builds an element and appends it to the DOM
const appendToDOM = (parent, elementType, content = '', className = '') => {
  const element = document.createElement(elementType);
  element.textContent = content;
  if (className) {
    element.classList.add(className);
  }
  parent.appendChild(element);
  return element;
};

// TODO: Create a function that handles the case where there are no blog posts to display
const noPostsMessage = () => {
  appendToDOM(mainElement, 'p', 'No blog posts available at the moment.', 'no-posts-message');
};

// TODO: Create a function called `renderBlogList` that renders the list of blog posts if they exist. If not, call the no posts function.
const renderBlogList = () => {
  // Retrieve blog posts from localStorage
  const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

  if (blogPosts.length === 0) {
    noPostsMessage();
    return;
  }

  // Render each blog post
  blogPosts.forEach(post => {
    const postContainer = appendToDOM(mainElement, 'div', '', 'blog-post');
    appendToDOM(postContainer, 'h2', post.title, 'blog-title');
    appendToDOM(postContainer, 'p', `By: ${post.username}`, 'blog-username');
    appendToDOM(postContainer, 'p', post.content, 'blog-content');
    appendToDOM(postContainer, 'small', `Posted on: ${post.date}`, 'blog-date');
  });
};

// TODO: Call the `renderBlogList` function
renderBlogList();

// TODO: Redirect to the home page using the `redirectPage` function found in logic.js when the back button is clicked
backButton.addEventListener('click', () => {
  redirectPage('./index.html');
});