function bookSeat(id, button) {
    const seatElement = document.getElementById(`seats-${id}`);
    if (!seatElement) return;

    let count = parseInt(seatElement.innerText);

    if (count > 0 && !button.classList.contains('booked')) {
        count--;
        seatElement.innerText = count;
        button.innerText = "Ваше місце";
        button.classList.add('booked');

        if (count === 0) {
            const card = button.closest('.spot-card');
            const dot = card ? card.querySelector('.status-dot') : null;
            if (dot) dot.className = 'status-dot busy';
        }
        alert("Успішно заброньовано!");
    }
}

// 2. Пошук та завантаження
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const list = document.getElementById('locationsList');

    // Пошук
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.spot-card');
            cards.forEach(card => {
                const name = card.getAttribute('data-name') || "";
                card.style.display = name.includes(term) ? 'flex' : 'none';
            });
        });
    }

    // Завантаження постів з 'mySpots'
    const savedSpots = JSON.parse(localStorage.getItem('mySpots')) || [];

    savedSpots.forEach(spot => {
        const card = document.createElement('div');
        card.className = 'spot-card';
        
        // Зберігаємо тег для пошуку
        const searchTag = (spot.name + " " + (spot.location || "")).toLowerCase();
        card.setAttribute('data-name', searchTag);
        
        card.innerHTML = `
            <div class="spot-info">
                <h3>${spot.name}</h3>
                <p>${spot.location}</p>
                <div class="stats">
                    <span class="status-dot online"></span>
                    Місць: <span id="seats-${spot.id}">${spot.seats}</span>
                </div>
            </div>
            <div class="action">
                <button onclick="bookSeat('${spot.id}', this)" class="btn-main">Відгукнутись</button>
            </div>
        `;
        if (list) list.appendChild(card);
    });
});
