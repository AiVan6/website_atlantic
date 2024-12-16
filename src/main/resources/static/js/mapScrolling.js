
function mapSwitch() {
    const mapElement = document.getElementById('map');
    let isDoubleClickEnabled = false;

// Включаем перемещение карты при двойном щелчке
    mapElement.addEventListener('dblclick', () => {
        isDoubleClickEnabled = !isDoubleClickEnabled;
        if (isDoubleClickEnabled) {
            mapElement.style.pointerEvents = 'auto'; // Разрешаем взаимодействие с картой
        } else {
            mapElement.style.pointerEvents = 'none'; // Запрещаем взаимодействие с картой
        }
    });
// Блокируем прокрутку карты при одиночном касании
    mapElement.addEventListener('touchstart', (e) => {
        if (!isDoubleClickEnabled) {
            e.preventDefault(); // Предотвращаем прокрутку
        }
    });
}

mapSwitch();