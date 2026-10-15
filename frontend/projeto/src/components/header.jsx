import assets from "./assets";

export default function Header({
    cartCount = 0,
    onCartClick
}) {
    function scrollToSection(id) {
        const element =
            document.getElementById(id);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth"
            });
        }
    }

    return (
        <header className="header">

            <div className="header-container">

                <button
                    type="button"
                    className="brand"
                    onClick={() =>
                        scrollToSection("home")
                    }
                >
                    <img
                        src={assets.logo}
                        alt="Starbucks"
                    />
                </button>

                <nav className="navigation">

                    <button type="button" onClick={() => scrollToSection("home")}>Início</button>

                    <button type="button" onClick={() => scrollToSection("gift")}>Presentes</button>

                    <button type="button" onClick={() => scrollToSection("order")}>Cardápio</button>

                    <button type="button" onClick={() => scrollToSection("pay")}>Experiência</button>

                    <button type="button" onClick={() => scrollToSection("store")}>Lojas</button>

                </nav>

                <div className="header-actions">

                    <button
                        type="button"
                        className="header-icon"
                        aria-label="Pesquisar"
                    >
                        <span aria-hidden="true">⌕</span>
                    </button>

                    <button
                        type="button"
                        className="header-icon cart-icon"
                        aria-label="Carrinho"
                        onClick={onCartClick}
                    >
                        <span aria-hidden="true">🛍</span>

                        {cartCount > 0 && (
                            <span className="cart-badge">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        className="login-button"
                    >
                        <span aria-hidden="true">◉</span>

                        <span>
                            Entrar
                        </span>
                    </button>

                </div>

            </div>

        </header>
    );
}
