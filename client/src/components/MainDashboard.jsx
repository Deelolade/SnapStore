import Example from './DashboardGraph'
import { useSelector } from 'react-redux'
import DashboardProductLists from './DashboardProductLists'
import ShareLinkButton from './shareLinkButton'


const MainDashboard = () => {
  const currentUser = useSelector((state) => state.user.user)
  
  return (
    <>
      <main className=" w-[85%] px-8 h-screen py-10">
        <div className="flex justify-between">
          <h1 className='text-4xl font-semibold'>Welcome, {currentUser.name.split(" ").at(-1)} 👋</h1>
<ShareLinkButton/>
</div>
        <Example />
        <DashboardProductLists />
      </main>
    </>
  )
}

export default MainDashboard