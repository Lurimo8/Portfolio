const GITHUB_USERNAME = "Lurimo8"; // Reemplaza con tu nombre real
const MAX_PROYECTOS = 4;

  document.addEventListener("DOMContentLoaded", () => {
    const contenedorProyectos = document.getElementById("proyectos-container");

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/starred`)
      .then(response => response.json())
      .then(repos => {
        const seleccionados = repos.slice(0, MAX_PROYECTOS);

        seleccionados.forEach(repo => {
          // Obtener lenguajes del repositorio
          fetch(repo.languages_url)
            .then(resp => resp.json())
            .then(languages => {
              const techList = Object.keys(languages);
              const techHTML = techList.length
                ? `<div class="tech-stack"><strong>Tecnologías:</strong> ${techList.join(", ")}</div>`
                : "";

              const proyectoDiv = document.createElement("div");
              proyectoDiv.classList.add("proyecto");

              proyectoDiv.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "Sin descripción."}</p>
                ${techHTML}
                <a href="${repo.html_url}" target="_blank">🔗 Ver en GitHub</a>
              `;

              contenedorProyectos.appendChild(proyectoDiv);
            })
            .catch(err => {
              console.error("Error al obtener tecnologías de", repo.name, err);
            });
        });
      })
      .catch(error => {
        console.error("Error al cargar los repositorios destacados:", error);
      });
  });