
import React, { useState , useEffect} from 'react';

const ManageAllOrders = () => {
    const [allOrders,setAllOrders]=useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/home')
        .then(res =>res.json())
        .then(data => setAllOrders(data))
        
    
    },[])
    const handelOrder =id=>{
        const proced=window.confirm('sure you want to delete');
            if(proced){
                const url=`http://localhost:5000/home/${id}`;
            fetch(url,{
                method:'DELETE',
                headers:{
                    "content-type":"application/json"
                }
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.deletedCount >0){
                    alert('delete sucessfuly')
                    const reminingUsers=allOrders.filter(user=> user._id !==id)
                    setAllOrders(reminingUsers)
                }
                
            });
            }
    }
    return (
    <div>
            <h2>ManageAllOrders</h2>
            {
        allOrders.map(allOrder=><div>
     <div class="card mb-3" style={{maxWidth:"540px"}}>
       <div class="row g-0">
       <div class="col-md-4">
       <img src={allOrder.img} class="img-fluid rounded-start" alt="..."/>
       </div>
       <div class="col-md-8">
       <div class="card-body">
        <h5 class="card-title">{allOrder.title}</h5>
        <p class="card-text">{allOrder.dec}</p>
        <p class="card-text"><small class="text-muted">Price $ {allOrder.price}</small></p>
        <button onClick={()=>handelOrder(allOrder._id)}>delete</button>
      </div>
    </div>
  </div>
</div>
                   
                </div>)
            }

            
        </div>
    );
};

export default ManageAllOrders;