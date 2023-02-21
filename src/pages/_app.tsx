'use client';
import '../styles/style.css'
import React from "react";
import Image from 'next/image'
import { useForm } from "react-hook-form";

export default function Home(): JSX.Element {
  const { register, handleSubmit } = useForm<FormValues>()

  type FormValues = {
    formName: string,
    formEmail: string,
    formInstance: string
  }

  async function handleRegistration(fields: FormValues) {
    const data = {
      formName: fields.formName,
      formEmail: fields.formEmail,
      formInstance: fields.formInstance
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = '/api/hello';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();
    console.log(result);
    alert(`Agradeçemos a sua mensagem! Após analisarmos, entraremos em contato com você!`);
  }

  return (
    <div className="Home">
      <header className="App-header">
        {/* <img src="../../logo_vanildaiafelix.png" className="App-logo" alt="logo" /> */}
        <Image
          src="/logo_vanildaiafelix.png"
          alt="Vanilda Iafelix Logo"
          className="App-logo"
          width={300}
          height={300}
        />
      </header>
      <main className="App-main">
        <div className="App-WhatsApp"><a href="" className="App-Contact">Conversar via WhatsApp</a></div>
        <p>OU</p>
        <form  onSubmit={handleSubmit(handleRegistration)} className="App-form">
          <p className="App-form-title">Nos conte mais sobre seu caso e entramos em contato com você!</p>
          <label htmlFor="formName">
            Seu nome completo
            <input type="text"  {...register("formName")} className="App-form-name"  />
          </label>
          <label htmlFor="formEmail">
            Seu email pra contato
            <input type="email" {...register("formEmail")} className="App-form-email" />
          </label>
          <label htmlFor="formInstance">
            Descreva brevemente o seu caso para analisarmos
            <textarea {...register("formInstance")}  cols={30} rows={10} className="App-form-instance"></textarea>
          </label>
          <input type="submit" value="Enviar" className="App-submit"></input>
        </form>
      </main>
      <footer className="App-footer">
        <p className="App-powered">powered by MzK Studio Inc.®</p>
      </footer>
    </div>
  )
}
