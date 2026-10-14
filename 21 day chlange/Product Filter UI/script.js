const filterButtons = document.querySelectorAll(".filter-buttons button");
const products = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        products.forEach(product => {

            if(filter === "all"){
                product.style.display = "block";
            }
            else if(product.classList.contains(filter)){
                product.style.display = "block";
            }
            else{
                product.style.display = "none";
            }

        });

    });
});