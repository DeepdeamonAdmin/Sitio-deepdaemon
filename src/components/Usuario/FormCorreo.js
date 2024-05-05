//Uso de React
import React from 'react'

//Uso de Email
import emailjs from "emailjs-com";

const FormCorreo = () => {

  //Función para mostrar el div con id "formulario"
    const mostrarForm = () => {
        document.getElementById("formulario").style.display = "block";
        document.getElementById("botonoculta").style.display = "none";
    }

    //Función para el envio de correos
    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('gmailMessage', 'template_1q4f1nf', e.target, 'zJ3yCb5fjplDGCKWP')
        .then((result) => {
            alert("¡Correo enviado con éxito!");
        }, (error) => {
            alert(error.message)
        });
        e.target.reset();
    }
        
  //DEspliegue del formulario para el envio de un correo
  return (
    <div>
        <button className="btn2 btn-primary btn-large btn-block mb-3" onClick={mostrarForm} id="botonoculta">Contactanos</button>
        <div id="formulario" style={{display: "none"}}>
            <form onSubmit={sendEmail}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Nombre:</label>
                            </td>
                            <td>
                                <input className="col mb-2" type="text" name="nombre" id="nombre" placeholder='Tu nombre' required/>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <label>Correo:</label>
                            </td>
                            <td>
                                <input className="col mb-2" type="text" name="correo" id="correo" placeholder='Tu email' required/>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <label>Mensaje:</label>
                            </td>
                            <td>
                                <textarea className="col mb-2" name="mensaje" id="mensaje" placeholder='Lo que nos quieres decir' required></textarea>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td colSpan="2">
                                <input className="btn2 btn-primary btn-large btn-block mb-3" type="submit" value="Enviar" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <p>
            O envía correo a:
        </p>
    </div>
  )
}

export default FormCorreo