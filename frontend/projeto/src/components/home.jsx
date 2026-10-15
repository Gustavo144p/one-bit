import { useEffect, useState } from "react";
import { getProducts } from "./api";
import Button from "./button";
import assets from "./assets";
import { formatPrice } from "./format";

export default function Home({ onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [activeProduct, setActiveProduct] = useState(0);

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch((error) => console.error("Erro ao carregar produtos:", error));
    }, []);

    const product = products[activeProduct];

    function changeProduct(direction) {
        if (!products.length) return;
        setActiveProduct((current) => (current + direction + products.length) % products.length);
    }

    return (
        <main>
            <section className="hero" id="home">
                <div className="hero-noise" aria-hidden="true" />
                <div className="hero-topline">
                    <span className="eyebrow"><i /> CAFÉ BOM, MOMENTOS MELHORES</span>
                    <span className="hero-edition">EST. 1971 · SEATTLE</span>
                </div>

                <div className="hero-copy">
                    <p className="hero-kicker">SEU MOMENTO, DO SEU JEITO</p>
                    <h1>Um bom café<br />muda <em>tudo.</em></h1>
                    <p className="hero-description">
                        Do primeiro gole ao último detalhe, encontre seu novo favorito
                        e transforme a pausa do dia em um momento especial.
                    </p>
                    <div className="hero-cta">
                        <Button onClick={() => product && onAddToCart(product)}>PEDIR AGORA</Button>
                        <a href="#order" className="text-link">Conheça nosso menu <span>↗</span></a>
                    </div>
                    <div className="hero-note">
                        <span className="note-star">✳</span>
                        <span><strong>Feito para você</strong><small>Seu café. Seu ritmo. Sua pausa.</small></span>
                    </div>
                </div>

                <div className="hero-art">
                    <div className="art-orbit orbit-one" />
                    <div className="art-orbit orbit-two" />
                    <div className="art-circle" />
                    {product && <img key={product.id} className="hero-drink" src={product.image} alt={product.name} />}
                    <div className="floating-tag"><span>☕</span><div><small>ESCOLHA DA VEZ</small><strong>{product ? product.name : "Seu café favorito"}</strong></div></div>
                    <div className="art-caption">GOOD COFFEE<br /><strong>GOOD MOOD.</strong></div>
                    <button className="slider-arrow arrow-left" onClick={() => changeProduct(-1)} aria-label="Produto anterior">←</button>
                    <button className="slider-arrow arrow-right" onClick={() => changeProduct(1)} aria-label="Próximo produto">→</button>
                    <div className="slider-dots">
                        {products.map((item, index) => <button key={item.id} type="button" aria-label={`Ver ${item.name}`} className={index === activeProduct ? "dot active" : "dot"} onClick={() => setActiveProduct(index)} />)}
                    </div>
                </div>

                {product && <div className="hero-product-card">
                    <span className="product-card-label">DESTAQUE DO MENU</span>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <div className="product-card-bottom"><strong>{formatPrice(product.price)}</strong><button type="button" onClick={() => onAddToCart(product)} aria-label={`Adicionar ${product.name} ao carrinho`}>＋</button></div>
                </div>}
                <div className="hero-bottom"><span>01 / 03</span><span>PAUSE. SIP. REPEAT.</span><span>SCROLL PARA DESCOBRIR ↓</span></div>
            </section>

            <section className="benefits" aria-label="Nossos diferenciais">
                <div><span className="benefit-icon">✳</span><p><strong>Feito com carinho</strong><small>Qualidade em cada xícara</small></p></div>
                <div><span className="benefit-icon">☕</span><p><strong>Seu café favorito</strong><small>Clássicos e novas descobertas</small></p></div>
                <div><span className="benefit-icon">♡</span><p><strong>Momentos especiais</strong><small>Uma pausa que faz bem</small></p></div>
            </section>

            <section className="feature-section" id="gift">
                <div className="feature-image gift-image"><img src={assets.coffee2} alt="Café preparado em uma cafeteria" /><span className="image-stamp">SHARE<br />THE LOVE</span></div>
                <div className="feature-copy"><span className="section-label">UM PRESENTE COM SIGNIFICADO</span><h2>Pequenos gestos.<br /><em>Grandes momentos.</em></h2><p>Surpreenda alguém com o sabor de uma pausa bem aproveitada. Porque os melhores presentes são aqueles que viram boas lembranças.</p><a className="outline-link" href="#order">Descobrir opções <span>↗</span></a></div>
            </section>

            <section className="menu-section" id="order">
                <div className="section-heading"><div><span className="section-label">ENCONTRE SEU FAVORITO</span><h2>Uma pausa com <em>mais sabor.</em></h2></div><p>Do espresso intenso às combinações geladas,<br />tem sempre algo esperando por você.</p></div>
                <div className="menu-grid">
                    {products.map((item, index) => <article className="menu-card" key={item.id}>
                        <div className={`menu-photo menu-photo-${index + 1}`}><img src={item.image} alt={item.name} /><span className="menu-number">0{index + 1}</span><button type="button" onClick={() => onAddToCart(item)} aria-label={`Adicionar ${item.name} ao carrinho`}>＋</button></div>
                        <div className="menu-card-info"><div><h3>{item.name}</h3><p>{item.description}</p></div><strong>{formatPrice(item.price)}</strong></div>
                    </article>)}
                </div>
            </section>

            <section className="dark-promo" id="pay">
                <div className="promo-mark">✳</div><div><span className="section-label">A SUA PAUSA MERECE</span><h2>Um ritual simples.<br /><em>Uma sensação única.</em></h2><p>Escolha seu pedido, adicione ao carrinho e imagine sua próxima pausa favorita.</p></div><a href="#order" className="promo-button">EXPLORAR MENU <span>↗</span></a>
            </section>

            <section className="store-section" id="store"><span className="section-label">SEMPRE PERTO DE VOCÊ</span><h2>Seu próximo café<br />está te <em>esperando.</em></h2><p>Reúna as pessoas, desacelere um pouco e aproveite o que importa.</p><a className="outline-link" href="#home">Voltar ao início ↑</a></section>
        </main>
    );
}
