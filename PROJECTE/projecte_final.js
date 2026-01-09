/**
 * PROYECTO: Registro de Supervivientes TLOU
 * Descripción: Script de validación de formulario con temática post-apocalíptica.
 * Puntos tratados: 1.1 al 1.11
 */

document.addEventListener("DOMContentLoaded", () => {
    const formulari = document.getElementById("formulari");

    // --- 1.1 FORMATEO DE NOMBRE Y APELLIDOS (Primera letra Mayúscula) ---
    const inputsTexto = [document.getElementById("name"), document.getElementById("lastname")];
    
    inputsTexto.forEach(input => {
        input.addEventListener("blur", () => {
            if (input.value) {
                input.value = input.value.split(' ')
                    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
                    .join(' ');
                validarCampo(input); // Validación inmediata al perder el foco
            }
        });
    });

    // --- 1.5 y 1.6 VISUALIZAR CARACTERES DE CONTRASEÑA ---
    const alternarVisibilidad = (checkId, passId) => {
        const checkbox = document.getElementById(checkId);
        const passInput = document.getElementById(passId);
        checkbox.addEventListener("change", () => {
            passInput.type = checkbox.checked ? "text" : "password";
        });
    };
    alternarVisibilidad("mostrarPass", "contrasenya");
     alternarVisibilidad("mostrarPass2", "contrasenya2");

    // --- FUNCIONES DE VALIDACIÓN ESPECÍFICAS ---

    // 1.3 Código Postal (5 dígitos)
    const validarCP = (cp) => /^\d{5}$/.test(cp);

    // 1.4 Correo Electrónico (una @ y al menos un punto después)
    const validarEmail = (email) => {
        const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    // 1.5 Reglas de Contraseña (8 chars, 1 Mayus, 1 Minus, 2 Números, 1 Especial)
    const validarPassPrivada = (pass) => {
        const minLength = pass.length >= 8;
        const hasUpper = /[A-Z]/.test(pass);
        const hasLower = /[a-z]/.test(pass);
        const hasTwoDigits = (pass.match(/\d/g) || []).length >= 2;
        const hasSpecial = /[!@#$%^&*()_+\[\]\-={};:\|,.<>\/?]/.test(pass);
        return minLength && hasUpper && hasLower && hasTwoDigits && hasSpecial;
    };

    // --- 1.9 VALIDACIÓN EN TIEMPO REAL ---
    const validarCampo = (input) => {
        let errorSpan = document.getElementById(`${input.id}-error`);
        // Caso especial para name/lastname que comparten el mismo span de error en tu HTML
        if (input.id === "name" || input.id === "lastname") {
            errorSpan = document.getElementById("name-error");
        }

        let mensaje = "";
        let esValido = true;

        switch (input.id) {
            case "name":
            case "lastname":
                if (input.value.trim().length < 2) {
                    mensaje = "Se requiere identificación válida.";
                    esValido = false;
                }
                break;
            case "edat":
                if (input.value === "") {
                    mensaje = "Debes seleccionar un rango de edad.";
                    esValido = false;
                }
                break;
            case "cp":
                if (!validarCP(input.value)) {
                    mensaje = "El Código de Distrito debe tener 5 dígitos exactos.";
                    esValido = false;
                }
                break;
            case "email":
                if (!validarEmail(input.value)) {
                    mensaje = "Frecuencia de radio incorrecta (falta @ o punto).";
                    esValido = false;
                }
                break;
            case "contrasenya":
                if (!validarPassPrivada(input.value)) {
                    mensaje = "Cifrado débil: 8 chars, Mayús, Minús, 2 Núm y Símbolo.";
                    esValido = false;
                }
                break;
            case "contrasenya2":
                const original = document.getElementById("contrasenya").value;
                if (input.value !== original || input.value === "") {
                    mensaje = "Las claves de encriptación no coinciden.";
                    esValido = false;
                }
                break;
            case "privacitat":
                if (!input.checked) {
                    mensaje = "Es obligatorio aceptar el protocolo.";
                    esValido = false;
                }
                break;
        }

        if (errorSpan) {
            errorSpan.textContent = mensaje;
            input.style.borderColor = esValido ? "#4a5d23" : "#ff4d4d";
        }
        return esValido;
    };

    // Agregar escucha de eventos a todos los campos
    formulari.querySelectorAll("input, select, textarea").forEach(elemento => {
        elemento.addEventListener("input", () => validarCampo(elemento));
    });

    // --- 1.8 BOTÓN BORRAR ---
    document.getElementById("esborrar").addEventListener("click", () => {
        const errores = document.querySelectorAll(".error-msg");
        errores.forEach(span => span.textContent = "");
        const inputs = formulari.querySelectorAll("input");
        inputs.forEach(i => i.style.borderColor = "#333");
        console.log("Transmisión abortada. Datos borrados.");
    });

    // --- 1.9 BOTÓN ENVIAR ---
    formulari.addEventListener("submit", (e) => {
        e.preventDefault(); // Detiene el envío real para validar

        let formularioTodoCorrecto = true;
        formulari.querySelectorAll("input, select").forEach(input => {
            if (!validarCampo(input)) {
                formularioTodoCorrecto = false;
            }
        });

        if (formularioTodoCorrecto) {
            // Eliminar formulario y mostrar resumen (Punto 1.9 final)
            const nombre = document.getElementById("name").value;
            const apellidos = document.getElementById("lastname").value;
            const correo = document.getElementById("email").value;
            const zona = document.getElementById("cp").value;

            document.body.innerHTML = `
                <div class="container" style="text-align: center; border: 3px solid #4a5d23;">
                    <h1 style="color: #8fb339;">¡TRANSMISIÓN ENVIADA!</h1>
                    <p>El formulario se ha completado correctamente. Datos del superviviente:</p>
                    <div style="text-align: left; background: #222; padding: 20px; border-radius: 5px;">
                        <p><strong>Identificación:</strong> ${nombre} ${apellidos}</p>
                        <p><strong>Distrito:</strong> ${zona}</p>
                        <p><strong>Frecuencia:</strong> ${correo}</p>
                    </div>
                    <p style="margin-top: 20px; font-style: italic;">"Resiste y sobrevive."</p>
                    <button onclick="location.reload()" style="background:#4a5d23; color:white; padding:10px;">Nueva Transmisión</button>
                </div>
            `;
        } else {
            alert("⚠️ Error en la transmisión. Revisa los campos en rojo.");
        }
    });
});
// --- MENSAJE DE PROTOCOLO DE CONFIDENCIALIDAD (ALERT) ---
const linkProtocolo = document.querySelector(".form-terms a");

if (linkProtocolo) {
    linkProtocolo.addEventListener("click", (e) => {
        e.preventDefault(); // Evita que el link intente navegar a otra página
        
        alert(
            "⚠️ AVISO DEL DEPARTAMENTO DE DEFENSA (FEDRA) ⚠️\n\n" +
            "Protocolo de Confidencialidad de la Zona de Cuarentena:\n" +
            "1. Toda transmisión saliente es monitorizada.\n" +
            "2. El uso de frecuencias de radio civiles está estrictamente regulado.\n" +
            "3. La revelación de ubicaciones de suministros se considera alta traición.\n" +
            "4. En caso de infección confirmada, sus datos serán eliminados del registro central.\n\n" +
            "¿Desea continuar bajo su propio riesgo?"
        );
    });
}
