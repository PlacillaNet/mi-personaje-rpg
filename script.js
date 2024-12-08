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
document.addEventListener("DOMContentLoaded", () => {
    const descTab = document.getElementById("desc-tab");
    const combatTab = document.getElementById("combat-tab");
    const descContent = document.getElementById("desc-content");
    const combatContent = document.getElementById("combat-content");
    const startCombatBtn = document.getElementById("start-combat");
    const combatControls = document.getElementById("combat-controls");
    const turnsCount = document.getElementById("turns-count");
    const incrementTurnBtn = document.getElementById("increment-turn");
    const nucleosCount = document.getElementById("nucleos-count");
    const increaseNucleosBtn = document.getElementById("increase-nucleos");
    const decreaseNucleosBtn = document.getElementById("decrease-nucleos");
    const maxNucleosInput = document.getElementById("max-nucleos");
  
    let turns = 0;
    let nucleos = 0;
    let maxNucleos = 43;
  
    // Mostrar la pestaña de descripción
    descTab.addEventListener("click", () => {
      descContent.classList.add("active");
      combatContent.classList.remove("active");
    });
  
    // Mostrar la pestaña de combate
    combatTab.addEventListener("click", () => {
      combatContent.classList.add("active");
      descContent.classList.remove("active");
    });
  
    // Iniciar combate
    startCombatBtn.addEventListener("click", () => {
      combatControls.style.display = "block";
      turns = 0;
      nucleos = parseInt(maxNucleosInput.value);
      turnsCount.textContent = turns;
      nucleosCount.textContent = nucleos;
    });
  
    // Incrementar el contador de turnos
    incrementTurnBtn.addEventListener("click", () => {
      turns++;
      turnsCount.textContent = turns;
    });
  
    // Aumentar el contador de núcleos
    increaseNucleosBtn.addEventListener("click", () => {
      nucleos++;
      nucleosCount.textContent = nucleos;
    });
  
    // Disminuir el contador de núcleos
    decreaseNucleosBtn.addEventListener("click", () => {
      if (nucleos > 0) {
        nucleos--;
        nucleosCount.textContent = nucleos;
      }
    });
  
    // Actualizar el número máximo de núcleos
    maxNucleosInput.addEventListener("input", () => {
      maxNucleos = parseInt(maxNucleosInput.value);
      nucleos = maxNucleos;  // Resetear los núcleos al máximo al modificarlo
      nucleosCount.textContent = nucleos;
    });
  });
  // Obtener elementos del DOM
const startCombatButton = document.getElementById("start-combat");
const maxHealthInput = document.getElementById("max-health");
const currentHealthInput = document.getElementById("current-health");
const damageInput = document.getElementById("damage");
const healingInput = document.getElementById("healing");
const applyDamageButton = document.getElementById("apply-damage");
const applyHealingButton = document.getElementById("apply-healing");
const combatStatus = document.getElementById("combat-status");

// Variables para almacenar los valores de vida
let maxHealth = 0;
let currentHealth = 0;

// Función para iniciar el combate
startCombatButton.addEventListener("click", () => {
  maxHealth = parseInt(maxHealthInput.value);
  if (isNaN(maxHealth) || maxHealth <= 0) {
    alert("Por favor, ingresa una vida máxima válida.");
    return;
  }
  currentHealth = maxHealth; // Inicializamos la vida actual con la vida máxima
  currentHealthInput.value = currentHealth;
  combatStatus.innerText = "Estado del combate: En progreso";
  maxHealthInput.disabled = true; // Deshabilitar campo de vida máxima una vez iniciado el combate
  startCombatButton.disabled = true; // Deshabilitar botón "Iniciar Combate" después de iniciar
});

// Función para aplicar daño a la vida actual
applyDamageButton.addEventListener("click", () => {
  const damage = parseInt(damageInput.value);
  if (isNaN(damage) || damage <= 0) {
    alert("Por favor, ingresa un daño válido.");
    return;
  }
  currentHealth -= damage; // Restar el daño de la vida actual
  if (currentHealth < 0) {
    currentHealth = 0; // Evitar que la vida sea negativa
  }
  currentHealthInput.value = currentHealth;
});

// Función para aplicar curación a la vida actual
applyHealingButton.addEventListener("click", () => {
  const healing = parseInt(healingInput.value);
  if (isNaN(healing) || healing <= 0) {
    alert("Por favor, ingresa una curación válida.");
    return;
  }
  currentHealth += healing; // Añadir la curación a la vida actual
  if (currentHealth > maxHealth) {
    currentHealth = maxHealth; // Evitar que la vida exceda la máxima
  }
  currentHealthInput.value = currentHealth;
});
