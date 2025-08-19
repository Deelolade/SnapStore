import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';




const DashBoardGraph = ({ day,setDay }) => {
  const { selectedProduct } = useSelector((state) => state.product)
  console.log(selectedProduct)
  //  const data = selectedProduct.analytics||[]
  const filteredData = useMemo(() => {
    if (!selectedProduct?.analytics) return [];
    // Get the last N days, where N = day
     const formatDate = (dateString)=>{
        return  new Date(dateString).toLocaleDateString("en-us",{
          day: "numeric",
          month: "short",
        })
     }
    return selectedProduct.analytics
      .slice(-day) // assumes analytics is sorted oldest -> newest
      .map(item => ({
        name:formatDate(item.date),
        views: item.views || 0,
        clicks: item.clicks || 0,
      }));
  }, [selectedProduct, day]);
  return (
    <div className="w-full h-[45%] bg-white my-6 p-3 rounded-lg shadow-lg flex  ">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={600}
          height={400}
          data={filteredData}
          margin={{
            top: 5,
            right: 30,
            left: 5,
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
      <div className="">
       <select value={day} id="" onChange={(e)=> setDay(Number(e.target.value))}>
       <option value="" disabled >Select range</option>
        <option value={7}>7 Days</option>
        <option value={15}>15 Days</option>
        <option value={30}>30 Days</option>
       </select>
      </div>
    </div>
  );
}

export default DashBoardGraph
