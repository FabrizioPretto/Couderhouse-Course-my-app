import './App.css';

function App() {

  //console.dir(document.body);
  class ProductManager {

    constructor() {
      this.events = [];
      this.products = [];
    }

    addProduct(code, title, description, price, stock) {
      const product = {
        code,
        id: this.getMaxId() + 1,
        title,
        description,
        price,
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fqNctbH-3InI1fsCGdV2iI0mnT-ZdaUhSA&usqp=CAU",
        stock
      };
      this.products.push(product);
      console.log("Se cargó correctamente el producto");
    }

    getMaxId() {
      let maxId = 0;
      this.products.map((product) => {
        if (product.id > maxId)
          maxId = product.id;
      })
      return maxId;
    };

    existCode(n) {
      if (this.products.includes(product => product.code === n)) {
        return true;
      }
      else
        return false;
    }

    showArray() {
      this.products.map((product) => {
        console.log("Id: " + product.id);
        console.log("Código: " + product.code);
        console.log("Nombre: " + product.title);
        console.log("Descripción: " + product.description);
        console.log("Precio: " + product.price);
        console.log("Stock: " + product.stock);
      })
    }

    getProductById() {
      let lookForId = document.getElementById("lookForCode").value;
      if (lookForId <= 0 || lookForId > this.products.length)
        console.log("Id no encontrado");
      else {
        console.log("Id: " + this.products[lookForId - 1].id);
        console.log("Código: " + this.products[lookForId - 1].code);
        console.log("Nombre: " + this.products[lookForId - 1].title);
        console.log("Descripción: " + this.products[lookForId - 1].description);
        console.log("Precio: " + this.products[lookForId - 1].price);
        console.log("Stock: " + this.products[lookForId - 1].stock);
      }
    }
  }

  const productManager = new ProductManager();


  //Validar Correctamente el código del producto
  const validateFields = () => {
    let exist = productManager.existCode(document.getElementById("codeInput").value);
    console.log("Exist: " + exist)
    if (exist === false) {
      if (document.getElementById("codeInput").value !== undefined && document.getElementById("codeInput").value > 0) {
        if (document.getElementById("titleInput").value !== undefined && document.getElementById("titleInput").value !== "") {
          if (document.getElementById("descriptionInput").value !== undefined && document.getElementById("descriptionInput").value !== "") {
            if (document.getElementById("priceInput").value !== undefined && document.getElementById("priceInput").value > 0) {
              if (document.getElementById("stockInput").value !== undefined && document.getElementById("stockInput").value > 0) {
                return true;
              } else {
                console.log("Debe cargar un stock del producto mayor a 0");
              }
            } else {
              console.log("Debe cargar un precio del producto mayor a $0");
            }
          } else {
            console.log("Debe cargar una descripción del producto");
          }
        }
        else
          console.log("Debe cargar el nombre del producto");
      }
      else
        console.log("El código debe ser mayor a 0");
    }
    else
      console.log("El código ya existe...Ingrese uno diferente")
    return false;
  }


  const loadNewProduct = () => {
    //let validate = validateFields();
    // if (validate === true) {
    let code = document.getElementById("codeInput").value;
    let title = document.getElementById("titleInput").value;
    let description = document.getElementById("descriptionInput").value;
    let price = document.getElementById("priceInput").value;
    let stock = document.getElementById("stockInput").value;
    productManager.addProduct(code, title, description, price, stock);
    cleanForm();
    //}
    /*else
      console.log("Faltan campos por ingresar...")*/
    /*let code = document.getElementById("codeInput").value;
    let title = document.getElementById("titleInput").value;
    let description = document.getElementById("descriptionInput").value;
    let price = document.getElementById("priceInput").value;
    let stock = document.getElementById("stockInput").value;
    let validate = validateFields()
    if (validate === true)
      productManager.addProduct(code, title, description, price, stock);
    else
      console.log("Faltan campos por ingresar...")*/
  }

  const cleanForm = () => {
    let form = document.getElementsByTagName("input");
    for (const input of form) {
      if (input[0])
        console.log("El primero no se toca")
      else
        input.value = "";
    }
  }

  const menuSelector = () => {
    let option = parseInt(document.getElementById("menuInput").value);
    switch (option) {
      case 1:
        document.getElementById("codeInput").focus();
        break;
      case 2:
        if (productManager.products.length !== 0)
          productManager.showArray();
        else
          console.log("No existen productos cargados...");
        break;
      case 3:
        document.getElementById("lookForCode").focus();
        break;
      case 9:
        console.log("Adiós...");
        break;
      default:
        console.log("Por favor seleccione una opción de las propuestas");
        break;
    }
  }





  return (
    <ul id="content">
      <li>
        <div id="menu">
          <h3>Menú de Opciones</h3>
          <h4>1_ Agregar un nuevo producto: </h4>
          <h4>2_ Ver todos los Productos: </h4>
          <h4>3_ Buscar Producto por código: </h4>
          <h4>9_ Salir</h4>
          <input type="number" name="option" id="menuInput"></input>
          <button onClick={() => menuSelector()}>Elegir</button>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </li>
      <li>
        <div id="form">
          <h3>Agregar nuevo producto</h3>
          <label>Código</label>
          <br></br>
          <input type="number" name="code" id="codeInput"></input>
          <br></br>
          <label>Nombre del Producto</label>
          <br></br>
          <input type="text" name="title" id="titleInput"></input>
          <br></br>
          <label>Descripción</label>
          <br></br>
          <input type="text" name="description" id="descriptionInput"></input>
          <br></br>
          <label>Precio</label>
          <br></br>
          <input type="number" name="price" id="priceInput"></input>
          <br></br>
          <label>Stock</label>
          <br></br>
          <input type="number" name="stock" id="stockInput"></input>
          <br></br>
          <br></br>
          <button onClick={() => {
            let validate = validateFields();
            console.log("Validate: " + validate)
            if (validate === true) {
              loadNewProduct();
              document.getElementById("menuInput").focus();
            }
            else
              console.log("Faltan campos por ingresar...");
          }}
          /*
          cleanForm();
          onSubmit={() => { validateFieldsEvent() }}*/
          >Cargar</button>
        </div>
      </li>
      <li>
        <div id="lookForDiv">
          <h3>Buscar por Id</h3>
          <label>Ingrese Id a buscar</label>
          <br></br>
          <input type="number" name="lookForCode" id="lookForCode"></input>
          <button onClick={() => {
            productManager.getProductById(document.getElementById("lookForCode"));
            document.getElementById("menuInput").focus();
            cleanForm();
          }}>Buscar</button>
        </div>
      </li>
    </ul>

  )
}


export default App;

/*
 return (
    function App() {

      class ProductManager {

        constructor() {
          this.events = [];
          this.products = [];
        }


        addProduct(code, title, description, price, stock) {

          const product = {
            code,
            id: this.getMaxId() + 1,
            title,
            description,
            price,
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fqNctbH-3InI1fsCGdV2iI0mnT-ZdaUhSA&usqp=CAU",
            stock
          };

          this.products.push(product);
        }


        existCode(n) {
          if (this.products.includes(product => product.code === n)) {
            return true;
          }
          else
            return false;
        }

        getMaxId() {
          let maxId = 0;
          this.products.map((event) => {
            if (event.id > maxId) maxId = event.id;
          })
          return maxId;
        };

        getEvents() {
          return this.events;
        }

        getProducts() {
          if (this.products.length != 0)
            console.log(this.products);
          else
            alert("No hay productos ingresados");
        }

        getProductById(lookFor) {
          let position = this.products.find((product) => product.id === lookFor)
          return position;
        }

      }


      let opcion1 = 'Agregar un nuevo producto: ';
      let opcion2 = 'Ver todos los Productos: ';
      let opcion3 = 'Buscar Producto por código: ';

      let choice = "";

      const productManager = new ProductManager();

      while (choice != 9) {
        let choice = parseInt(prompt("¡Bienvenido!\nPor favor ingrese un valor para la opción elegida:\n\n1 "
          + opcion1 + "\n2 " + opcion2 + "\n3 " + opcion3 + "\n\n9 Salir"));
        switch (choice) {
          case (1):
            let code = parseInt(prompt("Por favor ingrese el código del producto: "));
            let result = productManager.existCode(code);
            if (result == false) {
              let title = prompt("Por favor ingrese nombre del producto: ");
              let description = prompt("Por favor ingrese descripción del producto: ");
              let price = parseFloat(prompt("Por favor ingrese precio del producto: "));
              let stock = parseInt(prompt("Por favor ingrese stock del producto: "));
              productManager.addProduct(code, title, description, price, stock);
            }
            else {
              alert("El código de producto ya existe");
              break
            };
          case (2):
            productManager.getProducts();
            break;
          case (3):
            let lookFor = parseInt(prompt("Por favor ingrese el código de producto a buscar: "));
            let i = productManager.getProductById(lookFor);
            if (i !== undefined)
              console.log(productManager.this.products[i]);
            else
              console.log("Producto no encontrado...");
            break;
          case (9):
            break;
          default:
            alert("Por favor seleccione uno de los valores predefinidos");
            break;
        }
      }

    }

  );
*/

//let formulario = document.getElementById("form");
///formulario.addEventListener("submit", validateFieldsEvent);
/*function validateFieldsEvent(e) {

  if (
    document.getElementById("codeInput").value === undefined
    || document.getElementById("codeInput").value <= 0
    || document.getElementById("titleInput").value === undefined
    || document.getElementById("descriptionInput").value === undefined
    || document.getElementById("priceInput").value === undefined
    || document.getElementById("priceInput").value <= 0
    || document.getElementById("stockInput").value === undefined
    || document.getElementById("stockInput").value <= 0
  ) {
    e.preventDefault();
    console.log("Faltan campos por ingresar...")
  }
  else
    loadNewProduct();
}*/


/*const isNotNull = () => {
  /*let changeVisible = document.getElementById("form");
  console.log(changeVisible);
  //changeVisible.setAttribute('style', 'visibility: collapse');
  document.getElementById("codeInput").focus();

  let code = document.getElementById("codeInput").value;
  let existFlag = productManager.existCode(code);
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionInput").value;
  let price = document.getElementById("priceInput").value;
  let stock = document.getElementById("stockInput").value;

  if (existFlag === false) {
    if (code.value !== undefined && title.value !== undefined
      && description.value !== undefined && price.value !== undefined && stock.value !== undefined) {

      return true;
    }
  }
  else {
    console.log("El código ya existe...");
    document.getElementById("menuInput").focus();
    return false;
  }
}*/

/*this.products.map((product) => {
     if (lookForId === product.id)
       found = product.id;
   })*/
//this.products.includes(product => product.code === n)

//found = this.products.indexOf(product => product.code !== lookForId);
//console.log("El posición encontrada es: " + found)
/*
      if (found > this.products.length || found < 0)
        console.log("Id no encontrado");
      else {
        if (found === 0) {//console.log(this.products[lookForId]);
          console.log("Id: " + this.products[lookForId].id);
          console.log("Código: " + this.products[lookForId].code);
          console.log("Nombre: " + this.products[lookForId].title);
          console.log("Descripción: " + this.products[lookForId].description);
          console.log("Precio: " + this.products[lookForId].price);
          console.log("Stock: " + this.products[lookForId].stock);
        }
        else {
          console.log("Id: " + this.products[lookForId - 1].id);
          console.log("Código: " + this.products[lookForId - 1].code);
          console.log("Nombre: " + this.products[lookForId - 1].title);
          console.log("Descripción: " + this.products[lookForId - 1].description);
          console.log("Precio: " + this.products[lookForId - 1].price);
          console.log("Stock: " + this.products[lookForId - 1].stock);
        }*/