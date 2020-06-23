const presupuestoUsuario = prompt("¿Cúal es su presupuesto?");
const formulario = document.getElementById("agregar-gasto");
let cantidadPresupuesto;

class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
  }
  /**
   * Método para ir restando del presupuesto actual
   */
  presupuestoRestante(cantidad = 0) {
    return (this.restante -= Number(cantidad));
  }
}

class Interfaz {
  insertarPresupuesto(cantidad) {
    document.querySelector("span#total").innerHTML = `
        ${cantidad}
    `;
    document.querySelector("span#restante").innerHTML = `
        ${cantidad}
    `;
  }
  imprimirMensajes(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert"); //Agrega las clases de bootstrap para darle estilos al mensaje
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }
    divMensaje.appendChild(document.createTextNode(mensaje));
    //Insertando en el DOM
    document.querySelector(".primario").insertBefore(divMensaje, formulario);

    setTimeout(() => {
      document.querySelector(".primario .alert").remove();
      formulario.reset();
    }, 3000);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (presupuestoUsuario === null || presupuestoUsuario === "") {
    alert("Por favor, ingrese un valor numérico...");
    window.location.reload();
  } else {
    cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
    const ui = new Interfaz();
    ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
  }
});

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  const nombreGasto = document.getElementById("gasto").value;
  const cantidadGasto = document.getElementById("cantidad").value;

  //Comprobar campos
  if (nombreGasto === "" || cantidadGasto === "") {
    console.error("Campos vacios");
    new Interfaz().imprimirMensajes("Campos vacíos", "error");
  } else {
    console.log("Satisfactorio");
  }
});
