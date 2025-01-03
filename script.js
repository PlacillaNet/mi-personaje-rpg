document.addEventListener("DOMContentLoaded", function() {
    // Función para mostrar detalles adicionales cuando se hace clic en un encabezado de habilidad
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

    // Pestañas
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

    const maxHealthInput = document.getElementById("max-health");
    const currentHealthInput = document.getElementById("current-health");
    const damageInput = document.getElementById("damage");
    const healingInput = document.getElementById("healing");
    const applyDamageButton = document.getElementById("apply-damage");
    const applyHealingButton = document.getElementById("apply-healing");

    // Elementos de la habilidad Castigo del Leviatán
    const launchAttackBtn = document.getElementById("launch-attack");
    const coreSelectionDiv = document.getElementById("core-selection");
    const coreButtons = document.querySelectorAll(".core-button");
    const attackResultDiv = document.getElementById("attack-result");
    const attackRollText = document.getElementById("attack-roll");
    const damageRollText = document.getElementById("damage-roll");
    const attackBonusInput = document.getElementById("attack-bonus");
    const damageBonusInput = document.getElementById("damage-bonus");

    let turns = 0;
    let nucleos = 0;
    let maxNucleos = 43;
    let maxHealth = 0;
    let currentHealth = 0;

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
        
        maxHealth = parseInt(maxHealthInput.value);
        currentHealth = maxHealth;
        currentHealthInput.value = currentHealth;
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

    // Función para lanzar un dado de 20 caras
    function rollAttack() {
        return Math.floor(Math.random() * 20) + 1; // Dado de 20 caras
    }

    // Función para lanzar los dados de daño
    function rollDamage(numCores) {
        let damage = 0;

        // Lanzar 5 dados de 12 caras
        for (let i = 0; i < 5; i++) {
            damage += Math.floor(Math.random() * 12) + 1;
        }

        // Lanzar 2 dados de 8 caras
        for (let i = 0; i < 2; i++) {
            damage += Math.floor(Math.random() * 8) + 1;
        }

        // Lanzar un dado de 8 caras extra por cada núcleo
        for (let i = 0; i < numCores; i++) {
            damage += Math.floor(Math.random() * 8) + 1;
        }

        return damage;
    }

    // Función para lanzar el ataque
    launchAttackBtn.addEventListener("click", () => {
        const attackBonus = parseInt(attackBonusInput.value);  // Bonificador de ataque
        const damageBonus = parseInt(damageBonusInput.value);  // Bonificador de daño

        const attackRoll = rollAttack() + attackBonus;  // Lanza el dado de ataque y añade el bonificador
        let coresUsed = 0;

        attackRollText.textContent = `Tirada de Ataque: ${attackRoll}`;
        coreSelectionDiv.style.display = "block"; // Mostrar la selección de núcleos
        attackResultDiv.style.display = "none";  // Esconder el resultado del ataque hasta que se haya elegido núcleos

        // Evento para seleccionar el número de núcleos a consumir
        coreButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const numCores = parseInt(event.target.getAttribute("data-cores"));
                coresUsed = numCores;

                // Actualizar el contador de núcleos
                let nucleos = parseInt(nucleosCount.textContent);
                nucleos -= coresUsed;  // Restar los núcleos consumidos
                nucleosCount.textContent = nucleos;

                // Calcular y mostrar el daño
                const damageRoll = rollDamage(coresUsed) + damageBonus;  // Sumar el bonificador de daño
                damageRollText.textContent = `Tirada de Daño: ${damageRoll}`;
                attackResultDiv.style.display = "block";  // Mostrar el resultado del ataque
            });
        });
    });
});
