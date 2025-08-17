import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';




const  DashBoardGraph = () => {
  const { selectedProduct }   = useSelector((state)=> state.product)
console.log(selectedProduct)
//  const data = selectedProduct.analytics||[]
  const data = selectedProduct?.analytics.map(item => ({
    name: item.date,
    views: item.views,
    clicks: item.clicks
  })) || [];
  console.log(data)
  return (
    <div className="w-full h-[45%] bg-white my-6 p-3 rounded-lg shadow-lg "> 
           
           <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={600}
              height={400}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#50C878" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="clicks" stroke="#0056D2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
  );
}

export default DashBoardGraph
