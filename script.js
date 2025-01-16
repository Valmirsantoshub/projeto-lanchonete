const cart = []; // Array para armazenar os itens do carrinho

// Adiciona evento aos botões de adicionar ao carrinho
document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", () => {
        const productName = item.querySelector("h3").textContent;
        const productPrice = item.querySelector("p").textContent;

        // Adiciona o produto ao carrinho
        cart.push({ name: productName, price: productPrice });
        updateCartDisplay(); // Atualiza o carrinho visualmente
    });
});

// Atualiza a exibição do carrinho
const updateCartDisplay = () => {
    const cartContainer = document.querySelector(".cart-container");
    cartContainer.innerHTML = ""; // Limpa o carrinho antes de recriar

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <span>${item.name} - ${item.price}</span>
            <button class="remove-button" data-index="${index}">Remover</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    updateCartCount();
    attachRemoveEvents(); // Reanexa os eventos de clique para os botões "Remover"
};

// Atualiza o contador do carrinho no botão de checkout
const updateCartCount = () => {
    const cartCount = cart.length;
    const checkoutButton = document.querySelector(".checkout-button span");
    checkoutButton.textContent = `(${cartCount})`;
};

// Adiciona eventos de remoção aos botões "Remover"
const attachRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            cart.splice(index, 1); // Remove o item do carrinho pelo índice
            updateCartDisplay(); // Atualiza o carrinho visualmente
        });
    });
};

// Evento para o botão de checkout
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // Constrói a mensagem do pedido
    let message = "Olá! Gostaria de fazer um pedido:\n\n";
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.price}\n`;
    });

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "5511966087062";
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
});
