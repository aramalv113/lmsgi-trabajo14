const prompt = require('prompt')
const xml2js = require('xml2js')
const fs = require('fs')

function buscar () {
    console.log('\n*** Búsqueda de una nota ***\n')
    // Lectura del contenido del documento XML
    fs.readFile('notas.xml', 'utf-8', function(err, xml) {
        if (err) {
            throw err
        }
        // Conversión del documento xml leído a json para que podamos imprimirlo de una forma diferente a como lo imprime xml sin parsear
        xml2js.parseString(xml, function(err, json) {
            if (err) {
                throw err
            }
            // Simplificación de la parte del json que nos interesa iterar
            var notas = json.notas.nota
            prompt.start()
            console.log('Introduce el contenido que quieres buscar')
            prompt.get('cadena', function(err, result) {
                if (err) {
                    throw err
                }
                // Iteramos la variable notas para buscar la nota con el id introducido por el usuario
                var encontrado = false
                for (const i in notas) {
                    // Si se encuentra, la guardamos
                    if (notas[i].asignatura.toString().toLowerCase().includes(result.cadena) ||
                        notas[i].titulo.toString().toLowerCase().includes(result.cadena) ||
                        notas[i].creacion.toString().toLowerCase().includes(result.cadena) ||
                        notas[i].propietario.toString().toLowerCase().includes(result.cadena) ||
                        notas[i].descripcion.toString().toLowerCase().includes(result.cadena) ||
                        notas[i].codigo.toString().toLowerCase().includes(result.cadena)) {
                            encontrado = true
                            console.log('\n[' + notas[i].codigo + '] ' + notas[i].titulo)
                            console.log('    ' + notas[i].descripcion)
                            console.log('    De ' + notas[i].propietario + ' para la asignatura de ' + notas[i].asignatura)
                            console.log('\n                      (' + notas[i].creacion + ')\n')
                    }
                }
                // Mostramos el contenido de la nota si no es undefined
                if (!encontrado) {
                    console.log('\nNo se ha encontrado una nota que contenga ' + result.cadena + '\n')
                }
                console.log('*** Fin de la búsqueda ***\n')
            })
        })
    })
}

buscar()