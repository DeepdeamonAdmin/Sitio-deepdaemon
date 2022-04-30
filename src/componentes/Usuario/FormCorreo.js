import React from 'react'
import emailjs from "emailjs-com";

const FormCorreo = () => {

  //Función para mostrar el div con id "formulario"
    const mostrarForm = () => {
        document.getElementById("formulario").style.display = "block";
        document.getElementById("botonoculta").style.display = "none";
    }

    //Función para ocultar el div con id "formulario"
    const ocultarForm = () => {
        document.getElementById("formulario").style.display = "none";
        document.getElementById("botonoculta").style.display = "block";
    }

    //Función on submit para enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Formulario enviado");
    }

    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('gmailMessage', 'template_1q4f1nf', e.target, 'zJ3yCb5fjplDGCKWP')
        .then((result) => {
            alert("¡Correo enviado con éxito!");
        }, (error) => {
            alert(error.message)
        });
        e.target.reset();

        //No funciono, es para el envio de correo con la api
        /*
        e.preventDefault();
        //Post a la api
        fetch("/api/correos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                mensaje: mensaje
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        }
        )
        .catch(err => console.log(err));
        */
    }
        
  return (
    <div>

        <button className="btn2 btn-primary btn-large btn-block mb-3" onClick={mostrarForm} id="botonoculta">Contactanos</button>

        <div id="formulario" style={{display: "none"}}>
            <form onSubmit={sendEmail}>
                <table>
                    <tr>
                        <td>
                            <label>Nombre:</label>
                        </td>
                        <td>
                            <input className="col mb-2" type="text" name="nombre" id="nombre" placeholder='Tu nombre' required/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Correo:</label>
                        </td>
                        <td>
                            <input className="col mb-2" type="text" name="correo" id="correo" placeholder='Tu email' required/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Mensaje:</label>
                        </td>
                        <td>
                            <textarea className="col mb-2" name="mensaje" id="mensaje" placeholder='Lo que nos quieres decir' required></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <input className="btn2 btn-primary btn-large btn-block mb-3" type="submit" value="Enviar" />
                        </td>
                    </tr>
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