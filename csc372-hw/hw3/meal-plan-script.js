const dishList = document.getElementById('dish-list');
const mealPlanList = document.getElementById('meal-plan-list');
const totalCostElement = document.getElementById('total-cost');
let totalCost = 0;

dishList.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-btn')) {
        const dishItem = event.target.parentElement;
        const dishName = dishItem.textContent.split(' - ')[0];
        const price = parseFloat(dishItem.getAttribute('data-price'));
        
        // Add to meal plan
        addDishToMealPlan(dishName, price);
    }
});

function addDishToMealPlan(name, price) {
    const existingDish = Array.from(mealPlanList.children).find(item => item.dataset.name === name);
    
    if (existingDish) {
        const quantitySpan = existingDish.querySelector('.quantity');
        const newQuantity = parseInt(quantitySpan.textContent) + 1;
        quantitySpan.textContent = newQuantity;
    } else {
        const li = document.createElement('li');
        li.dataset.name = name;
        li.innerHTML = `${name} - $${price} (<span class="quantity">1</span>) <button class="remove-btn">Remove</button>`;
        mealPlanList.appendChild(li);
        
        // Remove a dish from the plan
        li.querySelector('.remove-btn').addEventListener('click', () => {
            removeDishFromMealPlan(li, price);
        });
    }

    // Update the total cost when adding a dish
    totalCost = totalCost + price;
    totalCostElement.textContent = totalCost.toFixed(2);
}

function removeDishFromMealPlan(dishItem, price) {
    const quantitySpan = dishItem.querySelector('.quantity');
    const quantity = parseInt(quantitySpan.textContent);
    
    if (quantity > 1) {
        quantitySpan.textContent = quantity - 1;
        totalCost = totalCost - price; // Only subtract the price if quantity > 1
    } else {
        mealPlanList.removeChild(dishItem);
        totalCost = totalCost - price; // Subtract the price when removing the last item
    }

    // Prevent negative total cost
    totalCost = Math.max(totalCost, 0);
    totalCostElement.textContent = totalCost.toFixed(2);
}

