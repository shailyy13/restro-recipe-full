document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const galleryContent = document.getElementById('recipe-gallery');
  const recipeForm = document.getElementById('recipe-form');
  const submissionMessage = document.getElementById('submission-message');
  let recipes = [];

  // Fetch recipes from the backend and display them
  const fetchAndDisplayRecipes = () => {
      fetch('http://localhost:7000/api/recipes')
          .then(response => response.json())
          .then(data => {
              recipes = data; // Store recipes in a variable
              displayRecipes(); // Display recipes initially
          })
          .catch(error => {
              console.error('Error fetching recipes:', error);
              galleryContent.innerHTML = '<p>Sorry, there was an error fetching the recipes.</p>';
          });
  };

  // Display recipes based on the search query
  const displayRecipes = () => {
      galleryContent.innerHTML = ''; // Clear existing content

      const query = searchInput.value.toLowerCase(); // Get search query
      const filteredRecipes = recipes.filter(recipe => {
          return recipe.name.toLowerCase().includes(query) ||
                 (recipe.cuisine && recipe.cuisine.toLowerCase().includes(query)) ||
                 (recipe.meal && recipe.meal.toLowerCase().includes(query)) ||
                 (recipe.method && recipe.method.toLowerCase().includes(query)) ||
                 (recipe.ingredient && recipe.ingredient.toLowerCase().includes(query));
      });

      filteredRecipes.forEach(recipe => {
          const card = document.createElement('div');
          card.classList.add('g-card');

          card.innerHTML = `
              <img src="${recipe.imgUrl}" alt="${recipe.name}" />
              <h1>${recipe.name}</h1>
              <h3><span class="highlight">Cuisine:</span> ${recipe.cuisine || 'N/A'}</h3>
              <h3><span class="highlight">Meal:</span> ${recipe.meal || 'N/A'}</h3>
              <h3><span class="highlight">Method:</span> ${recipe.method || 'N/A'}</h3>
              <h3><span class="highlight">Ingredients:</span> ${recipe.ingredient || 'N/A'}</h3>
          `;

          galleryContent.appendChild(card);
      });
  };

  // Fetch recipes initially
  if (searchInput) {
      fetchAndDisplayRecipes();
  }

  // Add event listener to search input
  if (searchInput) {
      searchInput.addEventListener('input', () => {
          displayRecipes(); // Filter and display recipes based on search input
      });
  }

  // Handle form submission
  if (recipeForm) {
      recipeForm.addEventListener('submit', (event) => {
          event.preventDefault(); // Prevent default form submission

          const formData = new FormData(recipeForm);
          const newRecipe = {
              id: Date.now().toString(), // Generate a unique ID based on current timestamp
              name: formData.get('name'),
              cuisine: formData.get('cuisine'),
              meal: formData.get('meal'),
              ingredient: formData.get('ingredient'),
              method: formData.get('method'),
              imgUrl: formData.get('imgUrl')
          };

          // Send the new recipe data to the server
          fetch('http://localhost:7000/api/recipes', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(newRecipe)
          })
              .then(response => response.json())
              .then(() => {
                  submissionMessage.textContent = 'Recipe submitted successfully!';
                  recipeForm.reset(); // Reset form fields
                  fetchAndDisplayRecipes(); // Refresh recipe gallery
              })
              .catch(error => {
                  console.error('Error submitting recipe:', error);
                  submissionMessage.textContent = 'There was an error submitting your recipe.';
              });
      });
  }
});
//select for menu
const menuBar = document.querySelector("#menu-bar");
const navbar = document.querySelector(".navbar");

//select for menu image
const catagory = document.querySelectorAll(".catagory input");
const cataImg = document.querySelector("#c-img");

// select for connect section with nav item
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar ul li a");

// event listener for toggle menu
menuBar.addEventListener("click", () => {
  menuBar.classList.toggle("fa-times");
  menuBar.classList.toggle("active");
  navbar.classList.toggle("active");
});

// scroll event
document.addEventListener("scroll", () => {
  menuBar.classList.remove("fa-times");
  menuBar.classList.remove("active");
  navbar.classList.remove("active");

  // conect With nav link
  connectSecWithNavLink();
});

// controlling menu image
catagory.forEach((element) => {
  element.addEventListener("click", () => {
    catagory.forEach((ele) => {
      ele.classList.remove("active");
    });

    let values = element.value;
    element.classList.add("active");
  });
});

// handeling scroll event and mar nav item
const connectSecWithNavLink = () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    let linkAttribute = link.attributes.href.value;
    link.classList.remove("active");

    if (linkAttribute === `#${current}`) {
      link.classList.add("active");
    }
  });
};

