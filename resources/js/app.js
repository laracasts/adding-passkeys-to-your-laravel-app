import './bootstrap';

import Alpine from 'alpinejs';
import axios from "axios";
import {startRegistration} from "@simplewebauthn/browser";

window.Alpine = Alpine;

document.addEventListener('alpine:init', () => {
    Alpine.data('registerPasskey', () => ({
        errors: null,
        async register(form) {
            const options = await axios.get('/api/passkeys/register', {
                validateStatus: (status) => [200, 422].includes(status),
            });

            if (options.status === 422) {
                this.errors = options.data.errors;
                return;
            }

            const passkey = await startRegistration(options.data);

            form.addEventListener('formdata', ({formData}) => {
                formData.set('passkey', JSON.stringify(passkey));
            });
            form.submit();
        },
    }));
});

Alpine.start();
