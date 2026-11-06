// main.js - Lógica de captura de formulario e inserción en Supabase

// 1. Referencias a los elementos del DOM
const formSerie = document.getElementById('form-serie');
const inputTitulo = document.getElementById('titulo');
const selectGenero = document.getElementById('genero');
const inputPuntuacion = document.getElementById('puntuacion');
const inputImagenUrl = document.getElementById('imagen_url');
const textareaResena = document.getElementById('resena');
const btnSubmit = document.getElementById('btn-submit');

// 2. Escuchar el evento de envío (submit) del formulario
formSerie.addEventListener('submit', async (e) => {
  e.preventDefault(); // Previene que la página se recargue

  // Deshabilitar botón durante el envío para evitar múltiples clics
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Guardando...';

  // 3. Capturar valores del formulario
  const nuevaSerie = {
    titulo: inputTitulo.value.trim(),
    genero: selectGenero.value,
    puntuacion: parseFloat(inputPuntuacion.value),
    imagen_url: inputImagenUrl.value.trim(),
    resena: textareaResena.value.trim()
  };

  try {
    // 4. Inserción de datos en la tabla 'series' de Supabase
    const { data, error } = await supabaseClient
      .from('series')
      .insert([nuevaSerie]);

    if (error) {
      console.error('Error al insertar en Supabase:', error.message);
      alert('❌ Ocurrió un error al guardar la recomendación: ' + error.message);
    } else {
      alert('✅ ¡Recomendación guardada con éxito en Supabase!');
      formSerie.reset(); // Limpiar los campos del formulario
    }
  } catch (err) {
    console.error('Error inesperado:', err);
    alert('❌ Error al conectar con el servidor.');
  } finally {
    // Reinstaurar el botón
    btnSubmit.disabled = false;
    btnSubmit.textContent = 'Publicar Recomendación';
  }
});