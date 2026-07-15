import catalogTemplate from './Catalog.html?raw';
import { createIcons, icons } from 'lucide';
import { coffees } from '../../data/coffees.js';

const Catalog = () => catalogTemplate;

const createCard = (coffee) => {
  return `

<article
class="
bg-white
rounded-2xl
overflow-hidden
border
border-black/5
shadow-sm
hover:shadow-lg
transition
group
flex
flex-col
"
>


<div class="overflow-hidden">

<img
src="${coffee.image}"
alt="${coffee.name}"
class="
w-full
h-40
object-cover
group-hover:scale-105
transition
duration-500
"
/>

</div>



<div class="p-5 flex flex-col flex-1">


<h3
class="
font-semibold
text-lg
"
>
${coffee.name}
</h3>



<div
class="
flex
items-center
gap-2
text-xs
text-[#8A9A5B]
mt-2
"
>

<i
data-lucide="map-pin"
class="w-3.5 h-3.5"
></i>

${coffee.origin}

</div>




<div
class="
flex
items-start
gap-2
text-sm
text-black/50
mt-3
min-h-[52px]
"
>

<i
data-lucide="coffee"
class="w-4 h-4 mt-0.5"
></i>


<p>
${coffee.notes}
</p>


</div>




<div
class="
flex
items-center
justify-between
mt-auto
pt-5
"
>


<div
class="
flex
items-center
gap-2
font-semibold
"
>

<i
data-lucide="badge-dollar-sign"
class="w-4 h-4 text-[#8A9A5B]"
></i>


$${coffee.price.toFixed(2)}

</div>




<button
class="
add-coffee
flex
items-center
gap-2
bg-[#8A9A5B]
text-white
rounded-full
px-4
py-2
text-xs
hover:bg-[#718044]
transition
"
data-id="${coffee.id}"
>


<i
data-lucide="shopping-cart"
class="w-4 h-4"
></i>


Agregar


</button>



</div>


</div>


</article>


`;
};

const renderCards = (data) => {
  const container = document.querySelector('#coffee-list');

  if (!container) return;

  // Mantener siempre el grid correcto
  container.className = 'mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-6';

  container.innerHTML = data.map(createCard).join('');

  // Reactivar iconos Lucide después del render dinámico
  createIcons({
    icons,
  });
};

export const renderCatalog = () => {
  renderCards(coffees);
};

export const initCatalogFilters = () => {
  const search = document.querySelector('#search-coffee');

  const filter = document.querySelector('#origin-filter');

  if (!search || !filter) return;

  const update = () => {
    const text = search.value.toLowerCase();

    const origin = filter.value;

    const result = coffees.filter((coffee) => {
      const matchName = coffee.name.toLowerCase().includes(text);

      const matchOrigin = origin === 'Todos' || coffee.origin === origin;

      return matchName && matchOrigin;
    });

    renderCards(result);
  };

  search.addEventListener('input', update);

  filter.addEventListener('change', update);
};

export default Catalog;
