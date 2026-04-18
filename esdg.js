function bookSeat(id, button) {
    const seatElement = document.getElementById(`seats-${id}`);
    let count = parseInt(seatElement.innerText);

    if (count > 0 && !button.classList.contains('booked')) {
       
        count--;
        seatElement.innerText = count;
        
        
        button.innerText = "Ваше місце";
        button.classList.add('booked');
        
        if(count === 0) {
            button.closest('.spot-card').querySelector('.status-dot').className = 'status-dot busy';
        }
        
        alert("Місто успішно заброньовано на 15 хвилин!");
    }
}


document.getElementById('searchInput').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.spot-card');
    
    cards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        card.style.display = name.includes(term) ? 'flex' : 'none';
    });
});
