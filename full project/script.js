// ======= To-Do List =======
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const tasksUL = document.getElementById('tasks');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function renderTasks() {
  tasksUL.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');

    li.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(removeBtn);
    tasksUL.appendChild(li);
  });
}

addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTaskBtn.click();
});
renderTasks();

// ======= Product Filter and Sort =======
const products = [
  { id: 1, name: 'Wireless Mouse', category: 'Electronics', price: 25, rating: 4.5 },
  { id: 2, name: 'Bluetooth Headphones', category: 'Electronics', price: 75, rating: 4.8 },
  { id: 3, name: 'Coffee Mug', category: 'Home & Kitchen', price: 15, rating: 4.2 },
  { id: 4, name: 'Yoga Mat', category: 'Fitness', price: 45, rating: 4.6 },
  { id: 5, name: 'Desk Lamp', category: 'Home & Kitchen', price: 55, rating: 4.1 },
  { id: 6, name: 'Running Shoes', category: 'Fitness', price: 120, rating: 4.7 },
  { id: 7, name: 'Smartphone Stand', category: 'Electronics', price: 30, rating: 4.3 },
  { id: 8, name: 'Blender', category: 'Home & Kitchen', price: 90, rating: 4.4 },
  { id: 9, name: 'Dumbbells Set', category: 'Fitness', price: 150, rating: 4.9 },
  { id: 10, name: 'USB-C Cable', category: 'Electronics', price: 10, rating: 4.0 },
];

const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const sortBySelect = document.getElementById('sort-by');
const productListDiv = document.getElementById('product-list');

const categories = [...new Set(products.map(p => p.category))];
categories.forEach(cat => {
  const option = document.createElement('option');
  option.value = cat;
  option.textContent = cat;
  categoryFilter.appendChild(option);
});

function filterAndSortProducts() {
  let filtered = [...products];
  const categoryVal = categoryFilter.value;
  const priceVal = priceFilter.value;
  const sortVal = sortBySelect.value;

  if (categoryVal !== 'all') {
    filtered = filtered.filter(p => p.category === categoryVal);
  }

  if (priceVal === 'under50') {
    filtered = filtered.filter(p => p.price < 50);
  } else if (priceVal === '50to100') {
    filtered = filtered.filter(p => p.price >= 50 && p.price <= 100);
  } else if (priceVal === 'above100') {
    filtered = filtered.filter(p => p.price > 100);
  }

  if (sortVal === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortVal === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortVal === 'rating-asc') {
    filtered.sort((a, b) => a.rating - b.rating);
  } else if (sortVal === 'rating-desc') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  renderProductList(filtered);
}

function renderProductList(productsArray) {
  productListDiv.innerHTML = '';
  if (productsArray.length === 0) {
    productListDiv.innerHTML = '<p>No products found.</p>';
    return;
  }

  productsArray.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <h4>${product.name}</h4>
      <p><strong>Category:</strong> ${product.category}</p>
      <p class="price">$${product.price.toFixed(2)}</p>
      <p><strong>Rating:</strong> ${product.rating.toFixed(1)} ⭐</p>
    `;
    productListDiv.appendChild(card);
  });
}

categoryFilter.addEventListener('change', filterAndSortProducts);
priceFilter.addEventListener('change', filterAndSortProducts);
sortBySelect.addEventListener('change', filterAndSortProducts);

filterAndSortProducts();

// ======= Contact Form =======
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for contacting me, ' + contactForm.name.value + '! I will get back to you soon.');
  contactForm.reset();
});
