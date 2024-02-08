const showDropdown = (content, button) => {
    const dropdownContent = document.getElementById(content),
        dropdownButton = document.getElementById(button);

    dropdownButton.addEventListener('click', () => {
        dropdownContent.classList.toggle('show-dropdown');

    });

    document.addEventListener('click', function(event) {
        var targetElement = event.target;

        if (dropdownContent.contains(targetElement) || targetElement.id === 'dropdown-button') {
            return;
        }
        dropdownContent.classList.remove('show-dropdown');
    });
}
