let productsData = [
    {
        id: 0,
        name: "მედიკამენტი",
        image: "assets/images/meds.png",
        price: 10,
    },
    {
        name: "მელატონინი",
        image: "assets/images/meds.png",
        price: 5,
    },
    {
        name: "სედატინი",
        image: "assets/images/meds.png",
        price: 7,
    },
    {
        name: "ანალგინი",
        image: "assets/images/meds.png",
        price: 8,
    },
    {
        name: "ნუროფენი",
        image: "assets/images/meds.png",
        price: 5,
    },
]

const productContainer = document.querySelector('.products-container')

productsData.forEach((e, index) => {

    // filter product names. 
    const splitName = e.name.split('')
    if(splitName.length > 12) {
        console.error("პროდუქტის სახელი არ შეიძლება იყოს 12 ასოზე მეტი")
        return
    }
    e.id = index
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    productDiv.innerHTML = `
        <div class="product-img">
            <img src="${e.image}" alt="${e.name}">
        </div>
        <div class="product-details">
            <div class="product-name">
                <span>${e.name}</span>
                <div class="product-price">
                    <img src="assets/images/pricetag.png" alt="pricetag">
                    <span>${e.price}</span>
                </div>
            </div>
            <div class="add-product" onclick="buyProduct(event)" data-id="${e.id}">
                <img src="assets/images/add.png" alt="Add">
            </div>
        </div>
    `;
    productContainer.appendChild(productDiv)
});

async function buyProduct(e) {
    const id = parseInt(e.currentTarget.getAttribute("data-id"))
    const product = productsData.find(e => e.id == id)

     const { value: quantity } = await Swal.fire({
        title: "ჩაწერეთ პროდუქტის რაოდენობა",
        input: "number",
        inputLabel: "პროდუქტის რაოდენობა",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "გთხოვთ ჩაწეროთ პროდუქტის რაოდენობა";
          }
        }
      });

      if (quantity.isConfirmed) {
        return 0;
      }
      let officialQuantity = Math.round(quantity)

      if(officialQuantity && officialQuantity >= 1 || typeof(officialQuantity) == Number) {

        if(officialQuantity > 50) {
            return Swal.fire({
                icon: "error",
                title: "შეცდომა",
                text: "პროდუქტების რაოდენობა არ შეიძლება იყოს 50 ზე მეტი",
                scrollbarPadding: false,
              });
            }
        }

        let sum = Math.round(officialQuantity * product.price)

        if(officialQuantity <= 0) {
            return Swal.fire({
                icon: "error",
                title: "შეცდომა",
                text: "პროდუქტების რაოდენობა არ შეიძლება იყოს 0 ან მასზე ნაკლები",
                scrollbarPadding: false,
              });
        }
        Swal.fire({
            title: "დასტური",
            text: `ნამდვილად გსურთ შეიძინოთ ${officialQuantity} ცალი ${product.name}, ${sum}$-ად?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "დიახ",
            scrollbarPadding: false,
          }).then((result) => {
            cef.on("pwd:getcash", (cash) => {
             if (result.isConfirmed && cash >= sum) {
              Swal.fire({
                title: "Done",
                text: `თქვენ შეიძინეთ ${officialQuantity} ცალი ${product.name}, ${sum}$-ად`,
                icon: "success",
                scrollbarPadding: false,
              });
              BuyProduct(product, sum, officialQuantity)
              //cef.emit("pwd:buyitem",GasagzavniData)
            }
            else if(result.isConfirmed && cash < sum) {
                Swal.fire({
                    icon: "error",
                    title: "შეცდომა",
                    text: "თქვენ არ გაქვთ საკმარისი თანხა",
                    scrollbarPadding: false,
                  });
                }
            });
        })
    }

cef.emit("onPlayerTest", "satesto vafvafi")
function BuyProduct(product, sum, quantity) {
    cef.emit("pwd:buyitem", product.name, sum, quantity) 
    // აქ მოვა პროდუქტის სახელი (product.name),
    // ჯამში რამდენი გადაიხადა (sum),
    // და რამდენი იყიდა (quantity)
}
