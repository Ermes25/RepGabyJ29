// Asegúrate de que este script se carga después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebarClose = document.getElementById('sidebar-close');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content'); // Se obtiene el contenedor principal

  // Mostrar y ocultar el sidebar y ajustar el contenido
  menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed'); // Alterna el estado del sidebar
      mainContent.classList.toggle('collapsed'); // Alterna el contenido
  });

  // Cerrar el sidebar cuando se haga clic en el botón de cerrar
  sidebarClose.addEventListener('click', () => {
      sidebar.classList.add('collapsed'); // Asegura que el sidebar se oculte
      mainContent.classList.add('collapsed'); // Ajusta el contenido al estado del sidebar
  });

  // Cerrar el sidebar cuando se haga clic fuera del sidebar en dispositivos móviles
  document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
          if (!sidebar.contains(e.target) && e.target !== menuToggle) {
              sidebar.classList.add('collapsed'); // Ocultar sidebar
              mainContent.classList.add('collapsed'); // Ajustar contenido
          }
      }
  });
});
