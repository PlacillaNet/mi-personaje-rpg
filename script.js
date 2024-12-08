// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Función para mostrar detalles adicionales cuando se hace clic en un encabezado
    const abilityHeaders = document.querySelectorAll('.abilities h4');
    
    abilityHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            const details = this.nextElementSibling;  // Encuentra el siguiente elemento después del encabezado
            if (details.style.display === "none") {
                details.style.display = "block";  // Muestra los detalles
            } else {
                details.style.display = "none";  // Oculta los detalles
            }
        });
    });

    // Función para mostrar/ocultar las descripciones de las expansiones divinas
    const expansionHeaders = document.querySelectorAll('.special-abilities h4');
    
    expansionHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            const details = this.nextElementSibling;
            if (details.style.display === "none") {
                details.style.display = "block";
            } else {
                details.style.display = "none";
            }
        });
    });
});
