import { useEffect, useState,useRef } from 'react'
import './App.css'
import axios from "axios"
function App() {
  const [data, setData] = useState([]); 
  const [filterdata,setFilterData]=useState("");
  const [order,setOrder]=useState("ase")
//fetching the data
  async function fetchData() {
    try {
      let response = await axios.get("https://fakestoreapi.com/products");
      setData(response.data); 
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  //sorting the data by the using 
  const fiterthedata=data.filter((item)=>item.category.toLowerCase().includes(filterdata.toLowerCase()))
  .sort((a,b)=>{
    if(order==="ase"){
     return  a.price-b.price
       
    }
    else{
      return b.price-a.price
    }
  })
  //sorting the products based on the price;
 const handleSorting=((value)=>{
  setOrder(value)
 })
  return (
    <div>
      <input style={{height:"30px",borderRadius:"20px",backgroundColor:"brown",color:"black"}} value={filterdata} placeholder='enter the category' onChange={((e)=>setFilterData(e.target.value))}/>
      <select style={{paddingLeft:"10px" ,marginLeft:"10px",height:"30px" ,backgroundColor:"black",color:"white"}} onChange={((e)=>handleSorting(e.target.value))}>
        <option>Sorting the price</option>
        <option value="ase">Low to High</option>
        <option value="dse">High to Low</option>
      </select>
    
    <div>
    </div>
    <div className='container'>
      {fiterthedata .map((item) => (
        <div key={item.id} className='items'>
          <img src={item.image}/>
          <h3>Title:{item.title}</h3>
          <p>Description:{item.description}</p>
          <p>Category:{item.category}</p>
          <p>Price:{item.price}</p>
       
          <p>Rate:{item.rating.rate}</p>
          <p>Count:{item.rating.count}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
