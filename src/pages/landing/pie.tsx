import React, { useEffect,useRef } from 'react';
import Axios from 'axios'
import Chart from 'chart.js'
const Pie = (props) => {
      async function fetchPie(){
        await Axios.get('https://cafetoria-backend.herokuapp.com/api/pie')
        .then((res) => {
            let formatData = {
                datasets: [{ 
                    data: [
                        res.data['meat'],
                        res.data['veggie'],
                        res.data['carbohydrates'],
                        res.data['fruits'],
                        res.data['fast-food']
                    ],
                    backgroundColor: [
                        '#ff7e67','#7579e7','#ffefa0','#41aea9','#f5a25d'
                    ]
                }],
                labels: ['Meat','Veggie','Carbs','Fruits','Fast Food']
            }
            const pieChartRef = chartRef.current.getContext('2d')
            new Chart(pieChartRef,{
                type: 'doughnut',
                data: formatData
            })
        })
    }
    let chartRef = useRef()
    useEffect(() => {
        fetchPie()
    },[])

    return (
        <div className='mb-5'>
            <canvas id='pieChart' ref={chartRef}>
            </canvas>
        </div>
    )
}
export default Pie;