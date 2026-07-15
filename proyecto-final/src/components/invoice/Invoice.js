import invoiceTemplate from './Invoice.html?raw';
import { jsPDF } from 'jspdf';
import { getCart, clearCart } from '../../state/store.js';

let pdfBlobUrl = null;

const Invoice = () => invoiceTemplate;

export const renderInvoice = () => {
  const itemsContainer = document.querySelector('#invoice-items');
  const subtotalElement = document.querySelector('#invoice-subtotal');
  const shippingElement = document.querySelector('#invoice-shipping');
  const totalElement = document.querySelector('#invoice-total');

  if (!itemsContainer || !subtotalElement || !shippingElement || !totalElement)
    return;

  const cart = getCart();

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <p class="text-sm text-black/40">
        No hay productos en el pedido.
      </p>
    `;

    return;
  }

  itemsContainer.innerHTML = cart
    .map(
      (product) => `

    <div class="flex justify-between text-sm">
      <div>
        <p class="font-medium">
          ${product.name}
        </p>
        <p class="text-xs text-black/40">
          Cantidad: ${product.quantity}
        </p>
      </div>
      <strong>
        $${(product.price * product.quantity).toFixed(2)}
      </strong>
    </div>

  `,
    )
    .join('');

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = Number(document.querySelector('#delivery-zone')?.value || 0);
  const total = subtotal + shipping;
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  shippingElement.textContent = `$${shipping.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
};

const validateField = (field, showError = false) => {
  const value = field.value.trim();

  const errorMap = {
    'customer-name': {
      error: '#name-error',
      valid: value.length >= 3,
    },

    'customer-id': {
      error: '#id-error',
      valid: value.length >= 10,
    },

    'customer-phone': {
      error: '#phone-error',
      valid: /^[0-9]{7,15}$/.test(value),
    },

    'customer-email': {
      error: '#email-error',
      valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    },

    'customer-address': {
      error: '#address-error',
      valid: value.length >= 5,
    },
  };

  const validation = errorMap[field.id];

  if (!validation) return true;

  const errorElement = document.querySelector(validation.error);

  if (!validation.valid) {
    if (showError) {
      field.classList.add('border-red-500');
      errorElement?.classList.remove('hidden');
    }

    return false;
  }

  if (showError) {
    field.classList.remove('border-red-500');
    errorElement?.classList.add('hidden');
  }

  return true;
};

const validateInvoiceForm = (showErrors = false) => {
  const name = document.querySelector('#customer-name');
  const id = document.querySelector('#customer-id');
  const phone = document.querySelector('#customer-phone');
  const email = document.querySelector('#customer-email');
  const address = document.querySelector('#customer-address');

  const showError = (id) => {
    if (showErrors) {
      document.querySelector(id)?.classList.remove('hidden');
    }
  };

  const hideError = (id) => {
    document.querySelector(id)?.classList.add('hidden');
  };

  let valid = true;

  if (name.value.trim().length < 3) {
    if (showErrors) {
      name.classList.add('border-red-500');
      showError('#name-error');
    }
    valid = false;
  } else {
    name.classList.remove('border-red-500');
    hideError('#name-error');
  }

  if (id.value.trim().length < 10) {
    if (showErrors) {
      id.classList.add('border-red-500');
      showError('#id-error');
    }
    valid = false;
  } else {
    id.classList.remove('border-red-500');
    hideError('#id-error');
  }

  const phoneRegex = /^[0-9]{7,15}$/;

  if (!phoneRegex.test(phone.value)) {
    if (showErrors) {
      phone.classList.add('border-red-500');
      showError('#phone-error');
    }
    valid = false;
  } else {
    phone.classList.remove('border-red-500');
    hideError('#phone-error');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.value)) {
    if (showErrors) {
      email.classList.add('border-red-500');
      showError('#email-error');
    }
    valid = false;
  } else {
    email.classList.remove('border-red-500');
    hideError('#email-error');
  }

  if (address.value.trim().length < 5) {
    if (showErrors) {
      address.classList.add('border-red-500');
      showError('#address-error');
    }
    valid = false;
  } else {
    address.classList.remove('border-red-500');
    hideError('#address-error');
  }

  return valid;
};

export const generateInvoicePDF = () => {
  const cart = getCart();

  if (cart.length === 0) {
    alert('No hay productos');

    return;
  }

  if (!validateInvoiceForm()) {
    return;
  }

  const customer = {
    name: document.querySelector('#customer-name').value,
    id: document.querySelector('#customer-id').value,
    phone: document.querySelector('#customer-phone').value,
    email: document.querySelector('#customer-email').value,
    address: document.querySelector('#customer-address').value,
  };

  const pdf = new jsPDF();

  pdf.setFontSize(20);
  pdf.text('Quito Coffee', 20, 20);
  pdf.setFontSize(12);
  pdf.text(`Factura de compra`, 20, 30);
  pdf.text(`Cliente: ${customer.name}`, 20, 45);
  pdf.text(`Cédula/RUC: ${customer.id}`, 20, 55);
  pdf.text(`Teléfono: ${customer.phone}`, 20, 65);
  pdf.text(`Correo: ${customer.email}`, 20, 75);
  pdf.text(`Dirección: ${customer.address}`, 20, 85);

  let y = 105;

  pdf.text('Detalle:', 20, y);

  y += 10;

  cart.forEach((product) => {
    pdf.text(
      `${product.name} x${product.quantity} - $${(
        product.price * product.quantity
      ).toFixed(2)}`,
      20,
      y,
    );

    y += 10;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  y += 10;

  pdf.setFontSize(14);
  pdf.text(`TOTAL: $${total.toFixed(2)}`, 20, y);

  const blob = pdf.output('blob');

  if (pdfBlobUrl) {
    URL.revokeObjectURL(pdfBlobUrl);
  }

  pdfBlobUrl = URL.createObjectURL(blob);

  const modal = document.querySelector('#pdf-modal');
  const preview = document.querySelector('#pdf-preview');

  if (!modal || !preview) {
    console.error('Modal PDF no encontrado');

    return;
  }

  preview.src = pdfBlobUrl;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

export const initInvoice = () => {
  const generateButton = document.querySelector('#generate-pdf');
  const downloadButton = document.querySelector('#download-pdf');
  const closeButton = document.querySelector('#close-pdf-modal');
  const modal = document.querySelector('#pdf-modal');

  const fields = [
    '#customer-name',
    '#customer-id',
    '#customer-phone',
    '#customer-email',
    '#customer-address',
  ];

  const checkButton = () => {
    const hasProducts = getCart().length > 0;

    const formIsValid = fields.every((field) => {
      const input = document.querySelector(field);

      return input && validateField(input, false);
    });

    generateButton.disabled = !(hasProducts && formIsValid);
  };

  fields.forEach((field) => {
    const input = document.querySelector(field);

    input?.addEventListener('input', () => {
      checkButton();
    });

    input?.addEventListener('blur', () => {
      validateField(input, true);

      checkButton();
    });
  });

  checkButton();

  generateButton.addEventListener('click', (e) => {
    e.preventDefault();

    const formValid = fields.every((field) => {
      const input = document.querySelector(field);

      return validateField(input, true);
    });

    if (!formValid) {
      return;
    }

    generateInvoicePDF();
  });

  downloadButton?.addEventListener('click', () => {
    if (!pdfBlobUrl) return;

    const link = document.createElement('a');
    link.href = pdfBlobUrl;
    link.download = 'Factura_Quito_Coffee.pdf';
    link.click();

    clearCart();

    document.querySelector('#invoice-form')?.reset();
    modal.classList.add('hidden');
    modal.classList.remove('flex');

    URL.revokeObjectURL(pdfBlobUrl);

    pdfBlobUrl = null;

    window.location.hash = '#catalogo';
  });

  closeButton?.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });
};

export default Invoice;
