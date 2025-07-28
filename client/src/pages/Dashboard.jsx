import MainDashboard from "@/components/MainDashboard"
import Sidebar from "@/components/Sidebar"

const Dashboard = () => {
  return (
    <div>
      <section className="max-w-7xl  mx-auto h-screen flex  justify-between items-center gap-5">
      <Sidebar/>
        <MainDashboard/>
      </section>
    </div>
  )
}

export default Dashboard