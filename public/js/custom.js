//search input script


	const input = document.getElementById("myInput");
	const list = document.getElementById("myUL");
	const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig"];

	input.addEventListener("input", function () {
	  // Clear the list
	  while (list.firstChild) {
		list.removeChild(list.firstChild);
	  }

	  // Filter the items based on the current value of the input
	  const filteredItems = items.filter(function (item) {
		return item.toLowerCase().startsWith(input.value.toLowerCase());
	  });

	  // Add the filtered items to the list
	  filteredItems.forEach(function (item) {
		const li = document.createElement("li");
		li.textContent = item;
		li.addEventListener("click", function () {
		  input.value = item;
		  list.innerHTML = "";
		});
		list.appendChild(li);
	  });
	});






// fetch product price
$(document).ready(function () {
		$("#ProductId").change(function () {

			let productName=document.getElementById("ProductId").value;
			$.post("/request",
				{
				name: productName,
                designation: "Professional gamer"
					
				},
				function (data, status) {
					console.log(data);
					// alert(data.productPrice)
					let proPrice=document.getElementById("productPrice").value=data.productPrice;
					
				});
		});
		});

// fetch product quantity
$(document).ready(function () {
		$("#quantity").change(function () {

			let quantity=document.getElementById("quantity").value;
			let proPrice=document.getElementById("productPrice").value;
			console.log(quantity,proPrice)
			$.post("/calculaction",
				{
				quantity:quantity,
				proPrice:proPrice,
			
		        },
				function (data, status) {
					console.log(data);
					// alert(data.productPrice)
					let amount=document.getElementById("amount").value=data.amount;
					
				});
		});
		});



// <!-- printBtn scrpt -->



let printBtn=document.getElementById("printBtn");

    printBtn.addEventListener("click",()=>{
	
		
   let printRow =printBtn.parentElement.parentElement;

      window.print()

  console.log(printRow)
	})
// 	 function printInvoice(e){
// 	


// 	 }
