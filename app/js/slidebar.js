// Asegúrate de que este script se carga después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
  
    // Asegurarse de que el sidebar esté cerrado por defecto al cargar la página
    sidebar.classList.add('collapsed');
    mainContent.classList.add('collapsed');
  
    // Mostrar y ocultar el sidebar y ajustar el contenido
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('collapsed');
    });
  
    // Cerrar el sidebar cuando se haga clic en el botón de cerrar
    sidebarClose.addEventListener('click', () => {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('collapsed');
    });
  
    // Cerrar el sidebar cuando se haga clic fuera del sidebar en dispositivos móviles
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && e.target !== menuToggle) {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('collapsed');
            }
        }
    });
  });