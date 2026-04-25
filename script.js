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

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section, .pizza-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

const filterButtons = document.querySelectorAll('.filter-btn');
const pizzaCards = document.querySelectorAll('.pizza-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update bouton actif
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        pizzaCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const moveX = (e.clientX * -0.05);
    const moveY = (e.clientY * -0.05);
    e.currentTarget.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
});

document.querySelector('.order-btn').addEventListener('click', () => {
    const notif = document.createElement('div');
    notif.className = 'cart-notification';
    notif.innerHTML = '🍕 Pizza ajoutée au panier !';
    document.body.appendChild(notif);
    notif.style.display = 'block';

    setTimeout(() => {
        notif.style.display = 'none';
        notif.remove();
    }, 3000);
});