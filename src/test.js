const userId = localStorage.getItem('userId');
const cartItems = JSON.parse(localStorage.getItem('cartItems'));

const purchaseData = {
  user_id: userId,
  items: cartItems.map(item => ({
    product_id: item.id,
    purchase_price: item.price,
    quantity: item.qty,
    status: 'pending'
  }))
};

purchaseData.items.forEach(async (item) => {
  try {
    const response = await fetch('https://e-commerce-api-bay.vercel.app/api/v1/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});
