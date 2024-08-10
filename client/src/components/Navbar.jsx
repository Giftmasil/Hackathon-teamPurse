import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-[#FEF9F7]">
        <nav className="bg-[white] font-semibold flex justify-between items-center p-4">
            <article className="flex justify-center items-center gap-3">
                <img src="/images/Ellipse 1.svg" alt="Ai Brain" width="40" height="40" />
                <Link className="text-[#745B67] md:text-4xl" to="/"><span className="text-[#E494A2]">Urban</span> Planners</Link>
            </article>
            <article className="flex justify-center md:text-2xl items-center gap-7">
                <Link className="hover:text-[#745B67]" to="/">Onbording</Link>
                <Link className="hover:text-[#745B67]" to="/chatbot">Chatbot</Link>
            </article>
        </nav>
    </div>
  )
}
