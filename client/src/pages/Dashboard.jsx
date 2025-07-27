import Sidebar from "@/components/Sidebar"

const Dashboard = () => {
  return (
    <div>
      <section className="max-w-7xl  mx-auto h-screen flex  justify-between items-center gap-5">
      <Sidebar/>
        <h2 className='text-9xl pt-32'>Dashboard</h2>
      </section>
    </div>
  )
}

export default Dashboard