<?php

namespace Database\Factories;

use App\Models\Passkey;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Webauthn\AttestationStatement\AttestationStatementSupportManager;
use Webauthn\Denormalizer\WebauthnSerializerFactory;
use Webauthn\PublicKeyCredentialSource;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Passkey>
 */
class PasskeyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->word,
            'credential_id' => Str::random(),
            'data' => call_user_func((new Passkey())->data()->get, file_get_contents(base_path('tests/Fixtures/passkey.json'))),
        ];
    }
}
