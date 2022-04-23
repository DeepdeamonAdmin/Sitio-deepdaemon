import React, { Component } from 'react';

export const FormCorreoJS = () => {
  
  function enviarEmail(e) {
    e.preventDefault();
    const { email, asunto, mensaje } = this.state;

    //post a la api
    fetch("/api/form", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            asunto: asunto,
            mensaje: mensaje
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    }
    )
    .catch(err => console.log(err));
    //fin post a la api
  }

  return (
    <div>
    <form className="formulario" onSubmit={this.enviarEmail}>
      <h1>Enviando Emails en React</h1>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" className="form-control"/>
      </div>
      <div>
        <label htmlFor="asunto">Asunto:</label>
        <input type="text" name="asunto" className="form-control" />
      </div>
      <div>
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea rows="4" name="mensaje" className="form-control"></textarea>
      </div>
      <div>
        <br />
        <button onClick={enviarEmail} type="submit" className="btn btn-primary">
          Enviar email
        </button>
      </div>
    </form>
  </div>
  )
  
}
