/* código de index opiniones */

var contenido = document.querySelector('#contenido');
        var frasesPersonalizadas = [
            "Estoy muy contento con la forma de enseñanza de este sitio. Aprendí mucho más rápido de lo que esperaba, y la plataforma es fácil de usar. ¡Altamente recomendado!",
            "Gracias al curso de francés, finalmente logré alcanzar la fluidez que tanto deseaba. Los materiales de estudio son excelentes y los profesores son muy atentos.",
            "La comunidad en línea de este programa es increíble. Conocí a personas de todo el mundo que comparten mi interés por aprender. Nos ayudamos mutuamente y nos alentamos constantemente.",
            "Gracias a este curso, pude cambiar de carrera y entrar en el mundo del desarrollo web. Antes no tenía experiencia en programación, pero ahora tengo confianza en mis habilidades y estoy trabajando en proyectos reales.",
            "Lo que más me gusta de estos cursos es que ofrecen una amplia variedad de temas, desde diseño web hasta programación backend. He estado tomando cursos aquí durante años y sigo aprendiendo y mejorando.",
            "Gracias a lo que aprendí en este curso, pude construir un portafolio impresionante de proyectos web. Esto me ayudó a destacar entre los empleadores y conseguir trabajos freelance."
        ];

        var resultadoActual = 0;

        function mostrarResultado() {
            contenido.innerHTML = '';
            fetch('https://randomuser.me/api')
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    let fraseAleatoria = frasesPersonalizadas[resultadoActual];
                    const elemento = document.createElement('div');
                    elemento.innerHTML = `
                        <img src="${res.results[0].picture.large}"  >
                        <p>- ${res.results[0].name.first}</p>
                        <p>${fraseAleatoria}</p>
                    `;
                    contenido.appendChild(elemento);
                    resultadoActual = (resultadoActual + 1) % frasesPersonalizadas.length;

                  
                    if (resultadoActual === 0) {
                        document.getElementById('button').textContent = 'Mostrar Testimonio';
                    } else {
                        document.getElementById('button').textContent = 'Siguiente Testimonio';
                    }
                });
        }

        document.querySelector('#button').addEventListener('click', mostrarResultado);
 
