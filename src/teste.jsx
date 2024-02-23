<div class="flex justify-center px-2 pb-3 text-base">
  <h1 class="font-semibold">Lista de pedidos</h1>
  <h1 class="hidden font-light ">Status Meus Pedidos</h1>
</div>
        <aside class=" bg-white w-full ">
            <menu class="flex flex-col px-6 py-3 hidden bg-slate-100 rounded-md">
                {options.map((option, index) => (
                    <input class={`${option === menuOptionSelected ? "text-orange-500" : "stone-500"} 
                    text-start py-4 pl-1 text-bold
                     bg-slate-100 
                     w-full ${index !== options.length - 1 && "border-b-[1px] border-stone-500"}`}
                        onClick={(e) => handleSelection(e)}
                        value={option}
                        key={index}
                        type="button"
                    />
                ))}
            </menu>
            <select class="bg-orange-500 w-full text-center text-zinc-50 text-base h-12 rounded-md font-semibold mb-6 outline-none md:hidden "
                onChange={(e) => handleSelection(e)}
            >
                <option value="Meus Pedidos">
                    Meus Pedidos
                </option>
                <option value="Minhas Informações">
                    Minhas Informações
                </option>
            </select>
        </aside>

                <details>
            <summary class="py-4 border-t-[1px] mt-4 border-stone-500">
              Compra do dia: {sale.date}
            </summary>
           
            {sale.products.map((product) => (
                <div class="flex flex-col md:flex-row justify-between md:items-center border-t border-stone-500" key={product.id}>
                    <div class="flex gap-4 py-5 ">
                        <img src={product.img} alt={product.name} class="h-20 w-18 rounded-md" />
                        <div class="flex flex-col justify-center">
                            <h1 class="text-black font-bold">{product.name}</h1>
                            <p>{product.category}</p>
                            <span class="text-orange-500 font-semibold">R$ {product.price}</span>
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <h1 class="md:hidden block">Status:</h1>
                        <h1 class={`font-bold text-end ${product.status === "Finalizado" ? "text-green-700" : "text-red-600"}`}>{product.status}</h1>
                    </div>

                </div>
            ))}


        </details>