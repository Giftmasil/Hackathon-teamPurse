import Navbar from "../components/Navbar";

export default function Onbording() {
  return (
    <div className="bg-[#FEF9F7] min-h-screen">
        <Navbar />
        <section className="onbording-section flex flex-col md:grid font-semibold">
            <article className="p-8">
                <h1 className="text-5xl mt-12 mb-9">Transforming Cities with <span className="text-[#E494A2]">AI-Powered </span>Insights</h1>
                <p className="text-xl leading-10">Empower your urban planning decisions with cutting-edge AI technology. Optimize infrastructure, predict growth patterns, and create smarter, more sustainable cities. Discover the future of urban planning today.</p>
            </article>
            <article className="place-content-center p-8">
                <img src="/images/city.svg" alt="city" width={420} height={420}/>
            </article>
        </section>
    </div>
  )
}
