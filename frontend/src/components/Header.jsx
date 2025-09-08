import { Link } from "react-router-dom";

const Header = () => {
    return(
            <header >
                <h1 className="text-4xl font-bold text-center text-orange-900">
                    <Link to="/"> What's for dinner?</Link>
                </h1>
            </header>
    )
}

export default Header;