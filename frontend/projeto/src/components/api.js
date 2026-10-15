const products = [
    {
        id: 1,
        name: "Caramel Frappuccino",
        description:
            "Café gelado com leite, gelo, caramelo e chantilly.",
        price: 18.90,
        image:
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=90"
    },

    {
        id: 2,
        name: "Caffè Latte",
        description:
            "Espresso suave combinado com leite vaporizado.",
        price: 15.90,
        image:
            "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=700&q=90"
    },

    {
        id: 3,
        name: "Cappuccino",
        description:
            "Espresso, leite vaporizado e espuma cremosa.",
        price: 14.90,
        image:
            "https://images.pexels.com/photos/6747870/pexels-photo-6747870.jpeg"
    }
];

export async function getProducts() {
    return products;
}

export async function getProduct(id) {
    return products.find(
        (product) => product.id === Number(id)
    );
}
