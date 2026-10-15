import { useEffect, useState } from "react";

import { getProducts } from "./api";
import Button from "./button";
import assets from "./assets";
import { formatPrice } from "./format";

export default function Home({ onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [activeProduct, setActiveProduct] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        }

        loadProducts();
    }, []);

    useEffect(() => {
        if (products.length < 2 || isHovering) return;

        const interval = setInterval(() => {
            setActiveProduct((current) => (current + 1) % products.length);
        }, 6500);

        return () => clearInterval(interval);
    }, [products, isHovering]);

    function nextProduct() {
        if (!products.length) return;

        setActiveProduct((current) => (current + 1) % products.length);
        setAdded(false);
    }

    function previousProduct() {
        if (!products.length) return;

        setActiveProduct((current) =>
            current === 0 ? products.length - 1 : current - 1
        );
        setAdded(false);
    }

    function handleAddToCart() {
        if (!product) return;

        onAddToCart(product);
        setAdded(true);
    }

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "ArrowRight") nextProduct();
            if (event.key === "ArrowLeft") previousProduct();
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    const product = products[activeProduct];

    return (
        <main>
            <section
                className="hero coffee-hero"
                id="home"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className="hero-glow" />
                <div className="hero-ring hero-ring-one" />
                <div className="hero-ring hero-ring-two" />

                <div className="hero-copy">
                    <span className="eyebrow">
                        <span className="eyebrow-dot" />
                        FEITO PARA O SEU MOMENTO
                    </span>

                    <h1>
                        Seu momento.
                        <br />
                        Seu <span>café.</span>
                    </h1>

                    <p className="hero-description">
                        Uma pausa na rotina, um sabor especial.
                        Descubra seu café favorito e aproveite cada gole.
                    </p>

                    <div className="hero-actions">
                        <button
                            type="button"
                            className="hero-primary"
                            onClick={() =>
                                document.getElementById("order")?.scrollIntoView({
                                    behavior: "smooth"
                                })
                            }
                        >
                            Explorar cafés <span>↗</span>
                        </button>

                        <div className="hero-note">
                            <span className="note-icon">✳</span>
                            <span>Um bom café muda o dia.</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="visual-label visual-label-top">
                        <span className="visual-label-icon">✦</span>
                        <span>Seu favorito está aqui</span>
                    </div>

                    <div className="coffee-orbit orbit-one" />
                    <div className="coffee-orbit orbit-two" />

                    <div className="coffee-image-stage">
                        {product && (
                            <img
                                key={product.id}
                                className="featured-coffee"
                                src={product.image}
                                alt={product.name}
                                draggable="false"
                            />
                        )}
                    </div>

                    <div className="visual-label visual-label-bottom">
                        <span className="label-line" />
                        <span>Feito para apreciar</span>
                    </div>

                    <div className="coffee-stamp">
                        <span>GOOD</span>
                        <strong>COFFEE</strong>
                        <span>GOOD MOOD</span>
                    </div>
                </div>

                {product && (
                    <div className="featured-product">
                        <div className="featured-product-top">
                            <span className="product-category">EM DESTAQUE</span>
                            <span className="product-number">
                                {String(activeProduct + 1).padStart(2, "0")}
                                <span> / {String(products.length).padStart(2, "0")}</span>
                            </span>
                        </div>

                        <h2>{product.name}</h2>
                        <p>{product.description}</p>

                        <div className="featured-product-bottom">
                            <strong className="featured-price">
                                {formatPrice(product.price)}
                            </strong>

                            <button
                                type="button"
                                className={`add-coffee-button ${added ? "is-added" : ""}`}
                                onClick={handleAddToCart}
                            >
                                {added ? "Adicionado ✓" : "Adicionar ao pedido"}
                                {!added && <span>+</span>}
                            </button>
                        </div>
                    </div>
                )}

                <button
                    type="button"
                    className="slider-arrow arrow-left"
                    onClick={previousProduct}
                    aria-label="Produto anterior"
                >
                    ←
                </button>

                <button
                    type="button"
                    className="slider-arrow arrow-right"
                    onClick={nextProduct}
                    aria-label="Próximo produto"
                >
                    →
                </button>

                <div className="slider-dots" aria-label="Selecionar café">
                    {products.map((item, index) => (
                        <button
                            type="button"
                            key={item.id}
                            aria-label={`Ver ${item.name}`}
                            aria-current={index === activeProduct ? "true" : undefined}
                            className={index === activeProduct ? "dot active" : "dot"}
                            onClick={() => {
                                setActiveProduct(index);
                                setAdded(false);
                            }}
                        />
                    ))}
                </div>

                <div className="hero-bottom-note">
                    <span>01</span>
                    <span className="bottom-note-line" />
                    <span>ENCONTRE SEU NOVO FAVORITO</span>
                </div>
            </section>

            <section className="coffee-benefits" aria-label="Nossa experiência">
                <div className="benefit-item">
                    <span className="benefit-icon">☕</span>
                    <div>
                        <strong>Sabor que acolhe</strong>
                        <p>Uma pausa que faz bem.</p>
                    </div>
                </div>

                <div className="benefit-divider" />

                <div className="benefit-item">
                    <span className="benefit-icon">✳</span>
                    <div>
                        <strong>Seu jeito de pedir</strong>
                        <p>Escolha o que combina com você.</p>
                    </div>
                </div>

                <div className="benefit-divider" />

                <div className="benefit-item">
                    <span className="benefit-icon">♡</span>
                    <div>
                        <strong>Momentos especiais</strong>
                        <p>Pequenos rituais, grandes dias.</p>
                    </div>
                </div>
            </section>

            <section className="simple-section coffee-story" id="gift">
                <div className="story-image">
                    <img
                        src={assets.coffee2}
                        alt="Café preparado com cuidado"
                        loading="lazy"
                    />
                    <span className="image-caption">UM MOMENTO SÓ SEU</span>
                </div>

                <div className="story-copy">
                    <span className="section-kicker">STARBUCKS GIFT</span>
                    <h2>Compartilhe bons momentos.</h2>
                    <p>
                        Um café pode ser um presente, uma conversa
                        ou simplesmente aquele instante para respirar.
                        Escolha algo especial para você ou para alguém querido.
                    </p>
                    <button
                        type="button"
                        className="text-link"
                        onClick={() =>
                            document.getElementById("order")?.scrollIntoView({
                                behavior: "smooth"
                            })
                        }
                    >
                        Descobrir cafés <span>↗</span>
                    </button>
                </div>
            </section>

            <section className="coffee-menu-section" id="order">
                <div className="menu-heading">
                    <div>
                        <span className="section-kicker">ESCOLHA O SEU</span>
                        <h2>Seu próximo favorito.</h2>
                    </div>

                    <p>
                        Do primeiro gole até o último,
                        encontre o sabor que combina com seu momento.
                    </p>
                </div>

                <div className="coffee-menu-grid">
                    {products.map((item, index) => (
                        <article
                            className={`coffee-menu-card ${
                                item.id === product?.id ? "selected" : ""
                            }`}
                            key={item.id}
                        >
                            <button
                                type="button"
                                className="menu-card-image"
                                onClick={() => {
                                    setActiveProduct(index);
                                    setAdded(false);
                                    document.getElementById("home")?.scrollIntoView({
                                        behavior: "smooth"
                                    });
                                }}
                                aria-label={`Destacar ${item.name}`}
                            >
                                <img src={item.image} alt={item.name} loading="lazy" />
                                <span className="menu-card-plus">↗</span>
                            </button>

                            <div className="menu-card-content">
                                <span className="menu-card-label">COFFEE MOMENT</span>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>

                                <div className="menu-card-bottom">
                                    <strong>{formatPrice(item.price)}</strong>
                                    <button
                                        type="button"
                                        onClick={() => onAddToCart(item)}
                                        aria-label={`Adicionar ${item.name} ao carrinho`}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="simple-section dark-section coffee-ordering" id="pay">
                <div>
                    <span className="section-kicker">SIMPLES ASSIM</span>
                    <h2>Seu café, do seu jeito.</h2>
                    <p>
                        Escolha seus favoritos, adicione ao carrinho
                        e monte seu pedido em poucos cliques.
                    </p>
                    <button
                        type="button"
                        className="hero-primary"
                        onClick={() =>
                            document.getElementById("order")?.scrollIntoView({
                                behavior: "smooth"
                            })
                        }
                    >
                        Montar meu pedido <span>↗</span>
                    </button>
                </div>
            </section>

            <section className="simple-section coffee-store" id="store">
                <div>
                    <span className="section-kicker">VAMOS TOMAR UM CAFÉ?</span>
                    <h2>Todo dia merece uma boa pausa.</h2>
                    <p>
                        Explore o cardápio e encontre o café
                        que vai acompanhar seu próximo momento.
                    </p>
                </div>
            </section>
        </main>
    );
}
