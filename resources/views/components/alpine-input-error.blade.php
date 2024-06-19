@props(['messages'])

<template x-if="{{ $messages }}">
    <ul {{ $attributes->merge(['class' => 'text-sm text-red-600 space-y-1']) }}>
        <template x-for="error in {{ $messages }}">
            <li x-text="error"></li>
        </template>
    </ul>
</template>
