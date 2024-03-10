<script lang="ts" setup>
import { ref } from 'vue';
import { useParamStore } from './store/index.js';

const paramStore = useParamStore();

// Knob values (range 0-100)
const decayKnob = ref(50);
const sizeKnob = ref(50);
const modKnob = ref(50);
const mixKnob = ref(50);

// Actual parameter values (range 0.0-1.0)
const decay = ref(0.5);
const size = ref(0.5);
const mod = ref(0.5);
const mix = ref(0.5);

const updateDecay = (newValue) => {
    decayKnob.value = newValue;
    decay.value = newValue / 100;
    paramStore.requestParamValueUpdate('decay', decay.value);
};

const updateSize = (newValue) => {
    sizeKnob.value = newValue;
    size.value = newValue / 100;
    paramStore.requestParamValueUpdate('size', size.value);
};

const updateMod = (newValue) => {
    modKnob.value = newValue;
    mod.value = newValue / 100; 
    paramStore.requestParamValueUpdate('mod', mod.value);
};

const updateMix = (newValue) => {
    mixKnob.value = newValue;
    mix.value = newValue / 100;
    paramStore.requestParamValueUpdate('mix', mix.value);
};

</script>

<template>
    <div class="w-full h-full min-w-screen min-h-screen bg-gray-200 p-8 space-y-16">
        <div class="h-3/5 flex justify-between items-center text-md select-none">
            <div class="h-8 w-auto text-primary-500">
                <svg class="w-6 h-6 text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z"/>
                </svg>
            </div>
            <div>
                <span className="font-bold text-primary-500">SRVB-Vue</span>
            </div>
        </div>

        <div class="flex flex-col h-full mt-16">
            <div class="flex flex-row justify-center items-center space-x-8 mt-8">
                <div>
                    <label class="block text-primary-500 text-center text-md font-medium mb-2">Size</label>
                    <Knob v-model="sizeKnob" :size="100" @update:modelValue="updateSize" />
                </div>
                <div>
                    <label class="block text-primary-500 text-center text-md font-medium mb-2">Decay</label>
                    <Knob v-model="decayKnob" :size="100" @update:modelValue="updateDecay" />
                </div>
                <div>
                    <label class="block text-primary-500 text-center text-md font-medium mb-2">Mod</label>
                    <Knob v-model="modKnob" :size="100" @update:modelValue="updateMod" />
                </div>
                <div>
                    <label class="block text-primary-500 text-center text-md font-medium mb-2">Mix</label>
                    <Knob v-model="mixKnob" :size="100" @update:modelValue="updateMix" />
                </div>
            </div>
        </div>
    </div>
</template>