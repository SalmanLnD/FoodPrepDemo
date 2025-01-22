
import {useState,useEffect} from 'react'
import './Add.css'
import {assets} from '../../assets/assets'

const Add = () => {
  const [image,setImage] = useState(false)

  const [data,setData] = useState({
    foodName:"",
    description:"",
    price:"",
    category:"Salad"
  })

  const onChangeHandler=(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData((data)=>({...data,[name]:value}))
  }

  const onSubmitHandler=(event)=>{
    event.preventDefault();
    const formData = new FormData()
    formData.append('name',data.foodName)
    formData.append('description',data.description)
    formData.append('price',data.price)
    formData.append('category',data.category)
    formData.append('image',image)
  }

  return (
    <div className='screen'> 
      <div className="container">
      <form onSubmit={onSubmitHandler} className='flex-col'>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img src={image? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id="image" hidden required/>
        </div>
        <div className="add-product-name flex-col">
          <p>Name</p>
          <input type="text" name='foodName' value={data.foodName} onChange={onChangeHandler} placeholder='Type here'/>
        </div>
        <div className="add-product-description flex-col">
          <p>Description</p>
          <textarea name="description" onChange={onChangeHandler} value={data.description} rows="6" placeholder='write content here'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category" id="">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='₹150' required />
          </div>
        </div>
        <button type='submit' className='add-btn'>
          ADD
        </button>
      </form>
      </div>
    </div>
  )
}

export default Add
