import { useState , useEffect} from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

  const initialState = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialState)

  const minimumItem = 0

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    const itemExits = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExits >= 0)
      {
        const updatedCart = [...cart]
        updatedCart [itemExits].quantity++
        setCart(updatedCart)

      }
      else{
        item.quantity = 1
      setCart( [...cart, item] )
      }
  }
  const removeFromCart = (id) => {
    setCart( preveCart => preveCart.filter( guitar => guitar.id !== id))
    console.log("Eliminando")

}

const increseQuantity = (id) =>{
  const updateCart = cart.map(item => {
    if(item.id === id){
      return{
        ...item,
        quantity: item.quantity + 1

      }
    }
      return item
  })
  setCart(updateCart)
}

const decreaseQuantity = (id) =>{
  const updateCart = cart.map(item => {
    if(item.id === id && item.quantity > minimumItem){
      return{
        ...item,
        quantity: item.quantity - 1

      }
    }
      return item
  })
  setCart(updateCart)
}

const emptyCart = () =>{
  setCart([])
}

  return (
    <>  
    <Header
    cart={cart}
    removeFromCart={removeFromCart}
    increseQuantity={increseQuantity}
    decreaseQuantity={decreaseQuantity}
    emptyCart={emptyCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">

        {data.map((guitar) =>(
       <Guitar
       key = {guitar.id}
       guitar={guitar}
       setCart={setCart}
       addToCart={addToCart}
       />
        ))}

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarStore - Todos los derechos Reservados 2024</p>
        </div>
    </footer>

    </>
  )
}

export default App
