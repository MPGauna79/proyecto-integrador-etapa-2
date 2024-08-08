import './sass/main.scss'
import Handlebars from "handlebars";

const start = async () => {
    console.log('Hola mundo!')


    try {
    
    const respuesta = await fetch('templates/card.hbs')

    if( !respuesta.ok ) {
    throw new Error('No se pudo obtener la plantilla')
 } 
 
    const plantilla = await respuesta.text()

    //console.log(plantilla)


    const template = Handlebars.compile(plantilla)



   
    //const respuestaBack = await fetch('http://localhost:8080/productos/')
    const respuestaBack = await fetch('https://66b2a6d17fba54a5b7ea2fa8.mockapi.io/api/v1/productos/')

    if ( !respuestaBack.ok ) {
        throw new Error('Algo paso con los productos', respuestaBack.status)
    }

    const dataProductos = await respuestaBack.json()
    //console.log(dataProductos) // <---- array de productos

    const data = { productos: dataProductos }
    //console.log(data)
    const html = template(data)

   //console.log(html)

   const contenedorCards = document.querySelector('#contenedor-cards')

   contenedorCards.innerHTML = html
    
}catch (error) {
    console.log('[start]:', error)
}
}        
    
window.addEventListener('DOMContentLoaded', start)

