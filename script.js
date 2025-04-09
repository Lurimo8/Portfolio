const GITHUB_USERNAME = "Lurimo8"; // ← Cambia esto por tu nombre de usuario de GitHub

const container = document.getElementById("proyectos-container");

async function cargarProyectos() {
    try {
      const respuesta = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
      const repositorios = await respuesta.json();
  
      console.log(repositorios);  // Aquí ves lo que devuelve la API
  
      if (repositorios.length === 0) {
        container.innerHTML = "<p>No tienes proyectos públicos en GitHub.</p>";
      }
  
      // Filtrar solo repositorios relevantes (puedes adaptar el criterio si quieres)
      const proyectosFiltrados = repositorios.filter(repo => !repo.fork && repo.description);
  
      // Mostrar los primeros 6
      proyectosFiltrados.slice(0, 6).forEach(repo => {
        const proyecto = document.createElement("div");
        proyecto.classList.add("proyecto");
  
        proyecto.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>
          <a href="${repo.html_url}" target="_blank">Ver en GitHub</a>
        `;
  
        container.appendChild(proyecto);
      });
  
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
      container.innerHTML = "<p>No se pudieron cargar los proyectos desde GitHub.</p>";
    }
  }
  

// Ejecutar al cargar
cargarProyectos();
