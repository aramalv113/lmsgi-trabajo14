const prompt = require('prompt')
const xml2js = require('xml2js')
const fs = require('fs')

// Inserta una nota en un documento XML
function insertar () {
    console.log('\n*** Creación e inserción de una nota ***\n')
    prompt.start()
    // Lectura del contenido del documento xml
    fs.readFile('notas.xml', 'utf-8', (err, xml) => {
        if (err) {
            throw err
        }
        // Conversión del documento xml leído a json
        xml2js.parseString(xml, (err, json) => {
            if (err) {
                throw err
            }
            // Solicitud al usuario de los datos necesarios para crear una nota
            prompt.get(['asignatura', 'propietario', 'titulo', 'descripcion'], function(err, result) {
                if (err) {
                    return err
                }
                // Con esto se inserta la nota dentro del objeto json
                json.notas.nota.push({
                    codigo: parseInt(json.notas.nota.at(-1).codigo) + 1,
                    creacion: new Date(Date.now()).toDateString(),
                    asignatura: result.asignatura,
                    propietario: result.propietario,
                    titulo: result.titulo,
                    descripcion: result.descripcion
                })
                // Creamos el builder que construirá el nuevo documento xml con la nota incluida
                // Ese contenido se almacenará en xmlModificado
                const builder = new xml2js.Builder()
                const xmlModificado = builder.buildObject(json)
                // Reescribimos de nuevo el documento xml con el contenido nuevo de xmlModificado
                fs.writeFile('notas.xml', xmlModificado, (err) => {
                    if (err) {
                        throw err
                    }
                    console.log('\n *** La nota ha sido insertada correctamente ***\n')
                })
            })
        })
    })
}

insertar()