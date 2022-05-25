const fs = require('fs')
const xml2js = require('xml2js')

function imprimir () {
    console.log('\n*** Contenido de las notas ***\n')
    // Lectura del contenido del documento XML
    fs.readFile('notas.xml', 'utf-8', function(err, xml) {
        if (err) {
            throw err
        }
        // Conversión del documento xml leído a json para que podamos imprimirlo de una forma diferente a como lo imprime xml sin parsear
        xml2js.parseString(xml, (err, json) => {
            if (err) {
                throw err
            }
            var contenido = json.notas.nota
            for (const i in contenido) {
                console.log('[' + contenido[i].codigo + '] ' + contenido[i].titulo)
                console.log('    ' + contenido[i].descripcion)
                console.log('    De ' + contenido[i].propietario + ' para la asignatura de ' + contenido[i].asignatura)
                console.log('\n                      (' + contenido[i].creacion + ')\n')
            }
            console.log('*** Fin de la impresión ***\n')
        })
    })
}

imprimir()