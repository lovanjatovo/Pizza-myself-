document.addEventListener('DOMContentLoaded', () => {
    const baseSelect = document.getElementById('base-select');
    const checkboxes = document.querySelectorAll('.ingredients-grid input');
    const totalDisplay = document.getElementById('total-amount');
    const pizzaVisual = document.getElementById('pizza-visual');

    function updatePizza() {
        let total = 0;

        // 1. Gestion de la Base
        const selectedBase = baseSelect.options[baseSelect.selectedIndex];
        total += parseFloat(selectedBase.dataset.price);
        
        // Update visuel de la base
        pizzaVisual.className = 'pizza-base'; // Reset
        pizzaVisual.classList.add('base-' + baseSelect.value);

        // 2. Gestion des Ingrédients
        checkboxes.forEach(cb => {
            if (cb.checked) {
                total += parseFloat(cb.dataset.price);
            }
        });

        // 3. Affichage du prix
        totalDisplay.innerText = total.toFixed(2);
    }

    // Écouteurs d'événements
    baseSelect.addEventListener('change', updatePizza);
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updatePizza);
    });

    // Initialisation
    updatePizza();
});