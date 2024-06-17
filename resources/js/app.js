import './bootstrap';

import Alpine from 'alpinejs';
import axios from "axios";
import {startRegistration} from "@simplewebauthn/browser";

window.Alpine = Alpine;

document.addEventListener('alpine:init', () => {
    Alpine.data('registerPasskey', () => ({
        async register() {
            const options = await axios.get('/api/passkeys/register');
            const passkey = await startRegistration(options.data);
        },
    }));
});

Alpine.start();
