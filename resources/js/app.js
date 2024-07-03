import './bootstrap';

import Alpine from 'alpinejs';
import axios from "axios";
import {browserSupportsWebAuthn, startAuthentication, startRegistration} from "@simplewebauthn/browser";

window.Alpine = Alpine;

document.addEventListener('alpine:init', () => {
    Alpine.data('registerPasskey', () => ({
        name: '',
        errors: null,
        browserSupportsWebAuthn,
        async register(form) {
            this.errors = null;

            if (! this.browserSupportsWebAuthn()) {
                return;
            }

            const options = await axios.get('/api/passkeys/register', {
                params: { name: this.name },
                validateStatus: (status) => [200, 422].includes(status),
            });

            if (options.status === 422) {
                this.errors = options.data.errors;
                return;
            }

            let passkey;

            try {
                passkey = await startRegistration(options.data);
            } catch (e) {
                this.errors = { name: ['Passkey creation failed. Please try again.'] };

                return;
            }

            form.addEventListener('formdata', ({formData}) => {
                formData.set('passkey', JSON.stringify(passkey));
            });
            form.submit();
        },
    }));

    Alpine.data('authenticatePasskey', () => ({
        showPasswordField: ! browserSupportsWebAuthn(),
        email: '',
        async authenticate(form, manualSubmission = false) {
            if (this.showPasswordField) {
                return form.submit();
            }

            let answer;

            try {
                const options = await axios.get('/api/passkeys/authenticate', {
                    params: {email: this.email},
                });
                answer = await startAuthentication(options.data);
            } catch (e) {
                if (manualSubmission) {
                    this.showPasswordField = true;
                }

                return;
            }

            form.action = '/passkeys/authenticate';
            form.addEventListener('formdata', ({formData}) => {
                formData.set('answer', JSON.stringify(answer));
            });
            form.submit();
        }
    }));
});

Alpine.start();
