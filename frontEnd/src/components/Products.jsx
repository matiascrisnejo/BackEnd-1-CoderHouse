import React from 'react'
import { useState, useEffect } from "react";


export default function Products() {
    const [prods, setProds] = useState([])
    useEffect(() => {
        const fetchProds = async () => {
            try {
                const response = await fetch('/api/products', {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                    credentials: "include"
                })
                if(response.status == 200) {
                    const data = await response.json()
                    console.log(data);
                    
                    setProds(data)
                    console.log(prods);
                    
                } else {
                    console.log(response);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchProds()
    }, [])
  return (
    <div>
      <h1>Products Component</h1>
    </div>
  )
}
