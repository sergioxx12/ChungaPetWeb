document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("adoptionForm");
    const warning = document.getElementById("warning");
    const loading = document.getElementById("loading");
    const success = document.getElementById("success");
    const errorElement = document.getElementById("error"); // Renombrado para evitar conflicto
    
    // Inicializar EmailJS - REEMPLAZA CON TU USER_ID
    emailjs.init("ltD_4_rCbhIKR5iJs");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Obtener valores
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const pet = document.getElementById("pet").value.trim();
      const message = document.getElementById("message").value.trim();
  
      // Validación
      if (!name || !email || !pet || !message) {
        showMessage(warning);
        return;
      }
  
      // Simulación de envío
      showMessage(loading);
      
      // Preparar los parámetros para el correo
      const templateParams = {
        from_name: name,
        from_email: email,
        pet_name: pet,
        message: message
      };
      
      // Enviar el correo usando EmailJS
      // REEMPLAZA SERVICE_ID y TEMPLATE_ID con tus valores de EmailJS
      emailjs.send('service_2nmluhm', 'template_4f9w76n', templateParams)
        .then(function() {
            hideAllMessages();
            showMessage(success);
            setTimeout(() => {
              success.classList.add("hidden");
              const modalBg = document.getElementById("modal-background");
              if (modalBg) {
                modalBg.classList.add("hidden");
              }
            }, 3000);
            form.reset();
        }, function(err) { // Renombrado para evitar conflicto
            hideAllMessages();
            showMessage(errorElement); // Usar la variable renombrada
            setTimeout(() => {
              errorElement.classList.add("hidden");
              const modalBg = document.getElementById("modal-background");
              if (modalBg) {
                modalBg.classList.add("hidden");
              }
            }, 3000);
            console.error('Error:', err);
        });
    });
  
    function showMessage(el) {
        hideAllMessages();
        el.classList.remove("hidden");
      
        const modalBackground = document.getElementById("modal-background");
        
        // Verificar que modalBackground existe antes de usarlo
        if (modalBackground) {
          if (el.id === "error" || el.id === "loading") {
            modalBackground.classList.remove("hidden");
          }
        }
      
        if (el.id === "error") {
          setTimeout(() => {
            el.classList.add("hidden");
            const modalBg = document.getElementById("modal-background");
            if (modalBg) {
              modalBg.classList.add("hidden");
            }
          }, 3000);
        }
    }
      
    function hideAllMessages() {
      warning.classList.add("hidden");
      loading.classList.add("hidden");
      success.classList.add("hidden");
      errorElement.classList.add("hidden"); // Usar la variable renombrada
    }
});