import Sidbar from "./_components/sidebar"
import Mobilesidebar from "./_components/mobilesidebar"


export default function Dashboard({children}:{children:any}) {
  return (
    <div className="grid bg-white text-black min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidbar />
      <Mobilesidebar children={children} />
    </div>
  )
}
