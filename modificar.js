const prompt = require('prompt')
const fs = require('fs')
const xml2js = require('xml2js')

function modificar (codigoNota) {
    prompt.start()
    // Lectura del contenido del documento XML
    fs.readFile('notas.xml', 'utf-8', function(err, xml) {
        if (err) {
            throw err
        }
        // Conversión del xml en json
        xml2js.parseString(xml, function(err, json) {
            if (err) {
                throw err
            }
            // Para simplificar el nombre, guardamos todo el contenido en una variable
            var notas = json.notas.nota
            var nota
            // Identificación de la nota con el id que nos han pasado por parámetro
            for (const i in notas) {
                if (notas[i].codigo==codigoNota) {
                    nota = notas[i]
                }
            }
            // Si no se ha encontrado el id, acabamos aquí
            if (nota===undefined) {
                console.log('\nNo se ha conseguido identificar la nota.\n')
                return
            }
            // Consulta del campo que se quiere cambiar
            console.log('\nIntroduce el nombre del campo a modificar (asignatura, titulo, propietario, descripcion)')
            prompt.get(['campo'], function(err, result1) {
                if (err) {
                    throw err
                }
                // Solicitud de nuevo contenido
                console.log('\nIntroduce el nuevo contenido')
                prompt.get('contenido', function(err, result2) {
                    if (err) {
                        throw err
                    }
                    // Modificación del campo
                    switch (result1.campo.toLowerCase()) {
                        case 'asignatura': nota.asignatura = result2.contenido; break
                        case 'titulo': nota.titulo = result2.contenido; break
                        case 'propietario': nota.propietario = result2.contenido; break
                        case 'asignatura': nota.asignatura = result2.contenido; break
                        default: console.log('\nNo se ha identificado el campo correctamente\n'); return
                    }
                    // Reescribimos el documento xml con la modificación
                    var builder = new xml2js.Builder()
                    var xmlModificado = builder.buildObject(json)
                    fs.writeFile('notas.xml', xmlModificado, (err) => {
                        if (err) {
                            throw err
                        }
                        console.log('\n*** Modificación realizada con éxito ***\n')
                    })
                })
            })
        })
    })
}

console.log('\n*** Modificación de una nota ***\n')

prompt.start()
console.log('Introduce el código de la nota a buscar')
prompt.get(['codigo'], function(err, result) {
    if (err) {
        throw err
    }
    modificar(result.codigo)
})